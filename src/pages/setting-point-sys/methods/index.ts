/*
 * @Author: chenmeifeng
 * @Date: 2024-01-08 13:50:48
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-09-22 10:17:02
 * @Description:
 */
import { doBaseServer, doNoParamServer } from "@/api/serve-funs"
import { IFormInst, TFormItemConfig } from "@/components/custom-form/types"
import { StorageDeviceType, StorageStnDvsType } from "@/configs/storage-cfg"
import { TDeviceType } from "@/types/i-config"
import { IDvsMeasurePointData, IDvsModelMap, IStnDvsType4LocalStorage } from "@/types/i-device"
import { IPageInfo } from "@/types/i-table"
import { getDeviceModelMap, getDvsMeasurePointsData, getDvsMeasurePointsPageData } from "@/utils/device-funs"
import { getStorage, validOperate, validResErr } from "@/utils/util-funs"

import { IPointSysInfo, IStPiontSysListParam, TStPiontSysFormField } from "../types"
import { dealDownload4Response } from "@/utils/file-funs"
import { AxiosResponse } from "axios"
import { NO_TAGS } from "../configs"
let belongList = []
let dvsMeasurePoints = []
let refleshFlag = true // 记录是否需要调用查询接口，true表示调用，false表示用dvsMeasurePoints存储的数据，目的是为了刷新最新数据
// let dvsMeasurePoints = []
// 执行数据查询
export async function getSettingStIdexSchData(pageInfo?: IPageInfo, formData?) {
  const dvsMeasurePoint = await getDvsMeasurePointsPageData({
    modelId: formData.modelId,
    pointTypes: formData.pointTypes?.join(","),
    systemId: formData.systemId,
    deviceType: formData.deviceType,
    pageSize: pageInfo.pageSize,
    pageNum: pageInfo.current,
  })
  const records = dvsMeasurePoint.records?.map((i, idx) => {
    return {
      ...i,
      row_idx: idx + 1,
    }
  })
  refleshFlag = false
  return { records: records || [], total: dvsMeasurePoint.total }
}

export const changeRefleshFlag = (flag) => {
  refleshFlag = flag
}
export async function onSetPointSysSchFormChg(
  changedValue: IStPiontSysListParam,
  formInst: IFormInst,
): Promise<TFormItemConfig<TStPiontSysFormField>> {
  const [chgedKey, chgedVal] = Object.entries(changedValue || {})?.[0] || []
  if (!["stationId", "deviceType"].includes(chgedKey)) return {}
  const theFormInst = formInst?.getInst()
  if (chgedKey === "stationId") {
    const oneTypeModelList = await getStAllDeviceModel(chgedVal)
    theFormInst?.setFieldsValue({
      modelId: oneTypeModelList?.length ? oneTypeModelList[0].value : undefined,
    })
    return { modelId: { options: oneTypeModelList } }
  }
  if (chgedKey === "deviceType") {
    const dvsPoint = await getModel(chgedVal)
    theFormInst?.setFieldsValue({
      modelId: dvsPoint?.length ? dvsPoint[0].value : undefined,
    })

    return { modelId: { options: dvsPoint } }
  }
  return {}
}
export const getModel = async (deviceTypes) => {
  const dvsTypes = Array.isArray(deviceTypes) ? deviceTypes?.join(",") : deviceTypes
  const res = await doBaseServer("getAllDeviceModel", { deviceType: dvsTypes })
  if (validResErr(res)) return []
  const models = res?.map((i) => {
    return {
      value: i.id,
      label: i.model,
    }
  })
  return models
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

export const savePointSysData = async (data) => {
  const changeSysList = data.filter((i) => i.edit)
  if (!changeSysList.length) return Promise.resolve(false)
  const res = await doBaseServer<IPointSysInfo>("updatePointData", changeSysList)
  refleshFlag = true
  return validOperate(res)
}

// 归属系统下拉
export const getAllBelongSystem = async () => {
  if (belongList?.length) return belongList
  const res = await doNoParamServer<any>("getSubSystemTypeData")
  if (validResErr(res)) return []
  belongList =
    res?.map((i) => {
      return { label: i.name, value: i.id }
    }) || []
  return belongList
}

// 获取设备型号风/光/储
export const getDeciveMode = async () => {
  const { typeToOptionsMap } = await getDeviceModelMap()
  // const typeList = ["WT", "PVINV", "ESPCS"]
  const typeList = getStorage(StorageDeviceType)?.map((i) => i.code)
  const arr = typeList.map((i) => typeToOptionsMap?.[i] || []).reduce((prevx, cur) => prevx.concat(cur), [])
  // console.log(arr, typeToOptionsMap, "arr")
  // const oneTypeModelList = typeToOptionsMap[chgedVal]
  return { allModelList: arr }
}
export const addPointMethods = async (data: IDvsMeasurePointData) => {
  console.log(data, "data")

  const params = Object.keys(data)?.reduce(
    (prev, cur) => {
      if (NO_TAGS.includes(cur)) {
        prev[cur] = data[cur]
      } else {
        prev["tags"][cur] = data[cur]
      }
      return prev
    },
    { tags: {} },
  )
  const res = await doBaseServer<any>("insertPointData", params)
  return validOperate(res)
}

export const exportData = async (formData) => {
  const params = {
    ...formData,
    pointTypes: formData.pointTypes?.join(","),
  }
  doBaseServer<any, AxiosResponse>("pointExportData", params).then((data) => {
    dealDownload4Response(data, "导出表.xlsx")
  })
}
export const exportTemplate = async () => {
  doBaseServer<any, AxiosResponse>("pointExportTemplate").then((data) => {
    dealDownload4Response(data, "导出表.xlsx")
  })
}

export const importFile = async (formData) => {
  const res = await doBaseServer("pointImportData", formData)
  return validOperate(res)
}
export const delPointsMethods = async (data: any) => {
  const params = {
    idList: data?.map((i) => i.id) || [],
  }
  const res = await doBaseServer<any>("delPoints", params)
  return validOperate(res)
}
