/*
 * @Author: chenmeifeng
 * @Date: 2024-01-08 13:50:48
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-10-29 17:36:22
 * @Description:
 */
import { doBaseServer } from "@/api/serve-funs"
import { IFormInst, TFormItemConfig } from "@/components/custom-form/types"
import { IPageData } from "@/types/i-config"
import { IDvsMeasurePointData } from "@/types/i-device"
import { IPageInfo } from "@/types/i-table"
import { queryDevicesByParams } from "@/utils/device-funs"
import { validOperate, validResErr } from "@/utils/util-funs"

import { IPointSysInfo, IStPiontSysListParam, TStPiontSysFormField } from "../types"
import { dealDownload4Response } from "@/utils/file-funs"
import { AxiosResponse } from "axios"
let refleshFlag = true // 记录是否需要调用查询接口，true表示调用，false表示用dvsMeasurePoints存储的数据，目的是为了刷新最新数据
// let dvsMeasurePoints = []
// 执行数据查询
export async function getCtlRuleSchData(pageInfo?: IPageInfo, formData?) {
  const params = {
    pageSize: pageInfo.pageSize,
    pageNum: pageInfo.current,
    deviceIds: formData?.deviceIds,
    stationId: formData?.stationId,
    controlType: formData?.controlType,
  }
  const res = await doBaseServer<any, IPageData<any>>("ctlRuleSelectPage", params)
  if (validResErr(res)) return null
  return { records: res.records || [], total: res.total }
}

export const changeRefleshFlag = (flag) => {
  refleshFlag = flag
}
export async function onSetPointSysSchFormChg(
  changedValue: IStPiontSysListParam,
  formInst: IFormInst,
): Promise<TFormItemConfig<TStPiontSysFormField>> {
  const [chgedKey, chgedVal] = Object.entries(changedValue || {})?.[0] || []
  if (!["stationId"].includes(chgedKey)) return {}
  if (chgedKey === "stationId") {
    const deviceList = await queryDevicesByParams({ stationId: chgedVal })
    const list = deviceList?.map((item) => ({ label: item.deviceName, value: item.deviceId }))
    return { deviceIds: { options: list } }
  }
  return {}
}
export const getDevices = async (chgedVal) => {
  const deviceList = await queryDevicesByParams({ stationCode: chgedVal })
  const list = deviceList?.map((item) => ({ label: item.deviceName, value: item.deviceId }))
  return list
}

export const getControlType = async () => {
  const res = await doBaseServer("getControlType")
  if (validResErr(res)) return []
  const list = res?.map((item) => ({ label: item.name, value: item.id }))
  return list
}
export const saveRuleData = async (data, name) => {
  const changeSysList = data.filter((i) => i.edit)?.map((i) => ({ ...i, operatorBy: name }))
  if (!changeSysList.length) return Promise.resolve(false)
  const res = await doBaseServer<IPointSysInfo>("updatectlRules", changeSysList)
  return validOperate(res)
}

export const addRuleMethods = async (data, name) => {
  console.log(data, "data")

  const params = Object.keys(data)?.reduce((prev, cur) => {
    prev[cur] = data[cur]
    return prev
  }, {})
  const res = await doBaseServer<any>("insertctlRule", { ...params, operatorBy: name })
  return validOperate(res)
}

export const exportData = async (formData) => {
  const params = {
    ...formData,
    pointTypes: formData.pointTypes?.join(","),
  }
  doBaseServer<any, AxiosResponse>("ctlRuleExportData", params).then((data) => {
    dealDownload4Response(data, "导出表.xlsx")
  })
}
export const exportTemplate = async () => {
  doBaseServer<any, AxiosResponse>("ctlRuleExportTemplate").then((data) => {
    dealDownload4Response(data, "导出表.xlsx")
  })
}

export const importFile = async (formData) => {
  const res = await doBaseServer("ctlRuleImportData", formData)
  return validOperate(res)
}
export const delRuleMethods = async (data: any) => {
  const params = {
    idList: data?.map((i) => i.id) || [],
  }
  const res = await doBaseServer<any>("delctlRule", params)
  return validOperate(res)
}
