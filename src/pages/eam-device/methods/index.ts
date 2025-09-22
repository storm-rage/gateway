/*
 * @Author: chenmeifeng
 * @Date: 2024-12-16 10:47:55
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-06-17 14:27:07
 * @Description:
 */
import { doBaseServer, doNoParamServer } from "@/api/serve-funs"
// import { STATION_DATA_MAP } from "@/store/atom-station"
import { IPageInfo } from "@/types/i-table.ts"
import { getStorage, isEmpty, validOperate, validResErr } from "@/utils/util-funs"

import { IeamDvsParam, TeamDvsSchFormField } from "../types"
import { TModalType } from "@/types/i-config"
import { AxiosResponse } from "axios"
import { dealDownload4Response } from "@/utils/file-funs"
import { StorageDeviceType, StorageStnDvsType } from "@/configs/storage-cfg"
import { TOptions } from "@/types/i-antd"
import { IFormInst, TFormItemConfig } from "@/components/custom-form/types"
import { queryDevicesByParams } from "@/utils/device-funs"

// 执行数据查询
export async function getPjctSchData(pageInfo, formData) {
  // const stnCode = formData?.stationList?.find((i) => i.id === formData?.stationId)?.stationCode
  const params = {
    pageSize: pageInfo.pageSize,
    pageNum: pageInfo.current,
    stationCode: formData?.stationCode,
    deviceCode: formData?.deviceCode,
  }
  const res = await doBaseServer("eamSelectPage", params)
  if (validResErr(res)) return null
  return { records: res.records || [], total: res.total }
}

export const addPjctMethods = async (data: any, type: TModalType) => {
  const api = type == "add" ? "insertEamDvs" : "updateEamDvs"
  const params = {
    ...data,
  }
  const res = await doBaseServer<any>(api, params)
  return validOperate(res)
}

export const delPjctMethods = async (data: any) => {
  const res = await doBaseServer<any>("delEamDvs", data)
  return validOperate(res)
}

export const exportData = async (data) => {
  doBaseServer<any, AxiosResponse>("eamExportData", data).then((data) => {
    dealDownload4Response(data, "导出表.xlsx")
  })
}
export const exportTemplate = async () => {
  doBaseServer<any, AxiosResponse>("eamExportTemplate").then((data) => {
    dealDownload4Response(data, "导出表.xlsx")
  })
}

export const importFile = async (formData) => {
  const res = await doBaseServer("eamImportData", formData)
  return validOperate(res)
}
export async function onEamDvsSchFormChg(
  changedValue: IeamDvsParam,
  formInst: IFormInst,
): Promise<TFormItemConfig<TeamDvsSchFormField>> {
  const [chgedKey, chgedVal] = Object.entries(changedValue || {})?.[0] || []
  if (!["stationCode"].includes(chgedKey) || isEmpty(chgedVal)) return {}

  const theFormInst = formInst?.getInst()
  const { stationCode } = theFormInst?.getFieldsValue()
  if (chgedKey === "stationCode") {
    // const deviceTypesOfSt = getStorage(StorageStnDvsType)
    // const items = deviceTypesOfSt?.find((e) => e.stationId == chgedVal)

    // const deviceTypeOptions = getIntersection(items?.deviceTypes || [], chgedVal)
    // const theFirst: TOptions<string>[0] = deviceTypeOptions?.[0]
    // theFormInst?.setFieldsValue({ deviceType: theFirst.value })
    const dvsList = await getDvsList({ stationCode: chgedVal })
    return { deviceCode: { options: dvsList } }
  } else if (chgedKey === "deviceType") {
    const dvsList = await getDvsList({ deviceType: chgedVal, stationCode: stationCode })
    return { deviceCode: { options: dvsList } }
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
export const getDvsList = async (params) => {
  const res = await queryDevicesByParams(params)
  const dvsList = res?.map((i) => {
    return {
      value: i.deviceCode,
      label: i.deviceName,
    }
  })
  return dvsList
}
