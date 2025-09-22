/*
 * @Author: chenmeifeng
 * @Date: 2023-10-19 13:47:55
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-06-13 15:23:16
 * @Description:
 */
import { doBaseServer } from "@/api/serve-funs"
import { IFormInst, TFormItemConfig } from "@/components/custom-form/types"
import { StorageDeviceType, StorageStationData, StorageStnDvsType } from "@/configs/storage-cfg"
// import { STATION_DATA_MAP } from "@/store/atom-station"
import { TOptions } from "@/types/i-antd"
import { IStationData } from "@/types/i-station"
import { IPageInfo } from "@/types/i-table.ts"
import { getStorage, isEmpty, validOperate, validResErr } from "@/utils/util-funs"

import { alldeviceTypes } from "../configs/index"
import { DevideListParam, IDeviceListData, TDeviceSchFormField } from "../types"
import { getDeviceModelMap } from "@/utils/device-funs"
import { IPageData } from "@/types/i-config"
import { dealDownload4Response } from "@/utils/file-funs"
import { AxiosResponse } from "axios"

let actualData = []
let refleshFlag = true
// let deviceList = []
// 执行数据查询
export async function getSettingMngSchData(pageInfo?: IPageInfo, formData?) {
  const { stationList } = getStorage(StorageStationData) || []
  const stationCode = formData.stationId
    ? stationList?.find((e) => e.id === parseInt(formData.stationId))?.stationCode || ""
    : ""
  const params = {
    stationCode: stationCode,
    deviceType: formData.deviceType,
    pageNum: pageInfo.current,
    pageSize: pageInfo.pageSize,
  }

  const res = await doBaseServer<DevideListParam, IPageData<IDeviceListData>>("selectDvsByPage", params)
  return { records: res.records, total: res?.total }
}

export const changeRefleshFlag = (flag) => {
  refleshFlag = flag
}

export async function onSettingMngSchFormChg(
  changedValue: DevideListParam,
  formInst: IFormInst,
): Promise<TFormItemConfig<TDeviceSchFormField>> {
  const [chgedKey, chgedVal] = Object.entries(changedValue || {})?.[0] || []
  if (!["stationId"].includes(chgedKey) || isEmpty(chgedVal)) return {}

  const theFormInst = formInst?.getInst()
  if (chgedKey === "stationId") {
    const deviceTypesOfSt = getStorage(StorageStnDvsType)
    const items = deviceTypesOfSt?.find((e) => e.stationId == chgedVal)

    const deviceTypeOptions = getIntersection(items?.deviceTypes || [], chgedVal)
    const theFirst: TOptions<string>[0] = deviceTypeOptions?.[0]
    theFormInst?.setFieldsValue({ deviceType: theFirst.value })
    return { deviceType: { options: deviceTypeOptions } }
  }
  return {}
}

const getIntersection = (data = [], stationIds) => {
  if (!data.length) return []
  const allDvsType = getStorage(StorageDeviceType)
  const newData = data.map((item) => ({
    label: allDvsType.find((i) => i.code === item)?.name || "未知",
    value: item,
    stationIds,
  }))

  return newData
}

export const saveStnIdxData = async (data) => {
  const changeStnList = data.filter((i) => i.edit)
  if (!changeStnList.length) return Promise.reject()
  const res = await doBaseServer<IStationData>("updateDevicesData", changeStnList)
  refleshFlag = true
  return validOperate(res)
}

export const getMdList = async (stationId) => {
  const res = await getDeviceModelMap(true)
  const res1 = await doBaseServer("getLineInfo", { stationId: stationId })
  const res2 = await doBaseServer("getPeriodInfo", { stationId: stationId })
  if (validResErr(res1) || validResErr(res2)) return null
  const line = res1?.map((i) => {
    return {
      value: i.lineCode,
      label: i.lineName,
    }
  })
  const period = res2?.map((i) => {
    return {
      value: i.periodCode,
      label: i.periodName,
    }
  })

  return { line, period, model: res?.typeToOptionsMap }
}
export const addDvsMethods = async (data: any) => {
  const res = await doBaseServer<any>("insertDevicesData", data)
  return validOperate(res)
}

export const exportData = async (formData) => {
  doBaseServer<any, AxiosResponse>("dvsExportData", { ...formData }).then((data) => {
    dealDownload4Response(data, "导出表.xlsx")
  })
}
export const exportTemplate = async () => {
  doBaseServer<any, AxiosResponse>("dvsExportTemplate").then((data) => {
    dealDownload4Response(data, "导出表.xlsx")
  })
}

export const importFile = async (formData) => {
  const res = await doBaseServer("dvsImportData", formData)
  return validOperate(res)
}
export const delDvsMethods = async (data: any) => {
  const params = {
    idList: data?.map((i) => i.id) || [],
  }
  const res = await doBaseServer<any>("delDvs", params)
  return validOperate(res)
}
