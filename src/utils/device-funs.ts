/*
 * @Author: chenmeifeng
 * @Date: 2025-04-29 11:35:47
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-05-15 15:55:01
 * @Description:
 */
import { TStorageInfo } from "@/types/i-api"
import { getStorage, isEmpty, reduceList2KeyValueMap, setStorage, stationTrform, uDate, validResErr } from "./util-funs"
import { doBaseServer, doNoParamServer } from "@/api/serve-funs"
import {
  StorageStnDvsType,
  StorageStationData,
  StorageCompanyData,
  StorageDeviceModelMap,
  StorageDeviceType,
} from "@/configs/storage-cfg"
import {
  IDeviceData,
  IDvsMeasurePointData,
  IDvsModelMap,
  IQueryDeviceParams,
  IStnDvsType4LocalStorage,
} from "@/types/i-device"
import { IPageData, TDeviceType } from "@/types/i-config"

// 获取配置数据，都是数组响应
export async function getConfigDataAndLocaled<T>(storageInfo: TStorageInfo): Promise<T[]> {
  const storeData = getStorage<T[]>(storageInfo)
  if (storeData) return storeData

  const { urlKey } = storageInfo
  const resData = await doNoParamServer<T[]>(urlKey)
  if (validResErr(resData) || !Array.isArray(resData)) return []
  setStorage(resData, storageInfo)
  return resData
}

// 根据StorageStnDvsType数据过滤出某个设备类型下有哪些场站
export const getTypeStationList = (type, key = "stationCode", isTree = true) => {
  const hasWTDvTypeStation =
    getStorage<IStnDvsType4LocalStorage[]>(StorageStnDvsType)?.filter((i) => i.deviceTypes.includes(type)) || []
  const { stationList } = getStorage(StorageStationData) || {}
  let result = []
  result = hasWTDvTypeStation?.map((i) => {
    const item = stationList?.find((item) => item.id === i.stationId)
    return {
      ...item,
      label: item?.shortName || "1",
      value: item?.[key] || "2",
    }
  })
  if (!isTree) return result
  const companyList = getStorage(StorageCompanyData)
  return stationTrform(result, companyList, key)
}
export async function getDeviceModelMap(reflesh = false) {
  const storeData = getStorage<IDvsModelMap>(StorageDeviceModelMap)
  if (storeData?.deviceModelList?.length && !reflesh) return storeData

  const resData = await doNoParamServer<IDvsModelMap["deviceModelList"]>("getAllDeviceModel")
  if (validResErr(resData) || !Array.isArray(resData)) return {} as IDvsModelMap
  const typeToOptionsMap = resData.reduce(
    (prev, next) => {
      if (!prev[next.deviceType]) prev[next.deviceType] = []
      prev[next.deviceType].push({ value: next.id, label: next.model })
      return prev
    },
    {} as IDvsModelMap["typeToOptionsMap"],
  )
  const deviceModelList = resData
  const idToInfoMap = reduceList2KeyValueMap(resData, { vField: "id" }, (data) => data)
  const dvsModelMap: IDvsModelMap = {
    typeToOptionsMap,
    deviceModelList,
    idToInfoMap,
  }
  setStorage(dvsModelMap, StorageDeviceModelMap)
  return dvsModelMap
}

interface IDvsMeasurePointsParams {
  modelId?: string | number | null
  pointTypes?: string
  deviceId?: number
  pointName?: string
  systemId?: number
  deviceCode?: string
  deviceType?: string
  pageNum?: number
  pageSize?: number
}

// 获取设备测点数据
export async function getDvsMeasurePointsPageData(
  params: IDvsMeasurePointsParams,
  api = "getPointDataPage",
): Promise<IPageData<IDvsMeasurePointData>> {
  const measurePoints = await doBaseServer<IDvsMeasurePointsParams, IPageData<IDvsMeasurePointData>>(api, params)
  if (validResErr(measurePoints)) return { records: [], total: 0 }
  return { records: measurePoints.records, total: measurePoints.total }
}

// 获取设备测点数据
export async function getDvsMeasurePointsData(
  params: IDvsMeasurePointsParams,
  api = "getDeviceSubPartPointData",
): Promise<IDvsMeasurePointData[]> {
  const measurePoints = await doBaseServer<IDvsMeasurePointsParams, IDvsMeasurePointData[]>(api, params)
  if (validResErr(measurePoints) || !measurePoints?.length) return []
  return measurePoints
}
export async function queryDevicesByParams(
  params: IQueryDeviceParams,
  deviceTypeMap?: Record<TDeviceType, string>,
): Promise<IDeviceData[]> {
  const resData = await doBaseServer<IQueryDeviceParams, IDeviceData[]>("queryDevicesDataByParams", params)
  if (validResErr(resData) || !Array.isArray(resData)) return []
  if (deviceTypeMap) dealDvs4StnInfo(resData, deviceTypeMap)
  return resData
}

// 处理场站设备各个字段数据
export function dealDvs4StnInfo(dvsList: IDeviceData[], deviceTypeMap?: Record<TDeviceType, string>) {
  dvsList.forEach((item) => {
    if (!isEmpty(deviceTypeMap)) {
      item.deviceTypeLabel = item.deviceTypeLabel || deviceTypeMap[item.deviceType]
    }
    item.deviceNumber = item.deviceTags?.operation_code || item.deviceName
    item.ratedPower = item.deviceTags?.rated_power
    item.operatDateStr = uDate(item.operationDate, undefined, "")
    item.pvcol = item.deviceTags?.pvcol
  })
}
export const getStAllDeviceModel = async (stationId?: number) => {
  if (!stationId) return [] as TDvsMdlOptions
  const deviceTypesOfSt = getStorage<IStnDvsType4LocalStorage[]>(StorageStnDvsType)
  const deviceModelOfStWT = deviceTypesOfSt?.find((i) => i.stationId == stationId)?.modelIds || []
  type TDvsMdlOptions = IDvsModelMap["typeToOptionsMap"][TDeviceType]
  const { deviceModelList } = await getDeviceModelMap()
  if (!deviceModelList) return [] as TDvsMdlOptions
  const actaulData = []
  deviceModelList.forEach((i) => {
    if (deviceModelOfStWT.findIndex((modeId) => modeId == i.id) !== -1) {
      actaulData.push({ label: i.model, value: i.id })
    }
  })
  return (actaulData || []) as TDvsMdlOptions
}
export const getStationDvsTypes = (stationId?: number) => {
  if (!stationId) return []
  const deviceTypesOfSt = getStorage<IStnDvsType4LocalStorage[]>(StorageStnDvsType)
  const allDvsType = getStorage(StorageDeviceType)
  const dvsTypes = deviceTypesOfSt?.find((i) => i.stationId == stationId)?.deviceTypes || []
  return dvsTypes?.map((i) => {
    return {
      value: i,
      label: allDvsType?.find((j) => j.code === i)?.name,
    }
  }) || []
}
