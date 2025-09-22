/*
 * @Author: chenmeifeng
 * @Date: 2024-12-16 10:47:55
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-05-15 15:21:04
 * @Description:
 */
import { doBaseServer, doNoParamServer } from "@/api/serve-funs"
// import { STATION_DATA_MAP } from "@/store/atom-station"
import { IPageInfo } from "@/types/i-table.ts"
import { validOperate, validResErr } from "@/utils/util-funs"

import { IUserListParam } from "../types"
import { TModalType } from "@/types/i-config"
import { dealDownload4Response } from "@/utils/file-funs"
import { AxiosResponse } from "axios"

// 执行数据查询
export async function getDvsMdSchData(pageInfo: IPageInfo, formData: any) {
  const params = {
    pageSize: pageInfo.pageSize,
    pageNum: pageInfo.current,
    deviceType: formData?.deviceType,
    model: formData?.model,
  }
  const res = await doBaseServer<IUserListParam>("getAllDeviceModelPage", params)
  if (validResErr(res)) return null
  return { records: res.records || [], total: res?.total }
}

export const addDvsMdMethods = async (data: any, type: TModalType) => {
  const api = type == "add" ? "insertDvsMdCompany" : "updateDvsMdCompany"
  const res = await doBaseServer<any>(api, data)
  return validOperate(res)
}

export const delDvsMdCompany = async (data: any) => {
  const res = await doBaseServer<any>("delDvsMdCompany", data)
  return validOperate(res)
}
export const exportData = async (data) => {
  const params = {
    deviceType: data.deviceType,
  }
  doBaseServer<any, AxiosResponse>("dvsMdExportData", params).then((data) => {
    dealDownload4Response(data, "导出表.xlsx")
  })
}
export const exportTemplate = async () => {
  doBaseServer<any, AxiosResponse>("dvsMdExportTemplate").then((data) => {
    dealDownload4Response(data, "导出表.xlsx")
  })
}

export const importFile = async (formData) => {
  const res = await doBaseServer("dvsMdImportData", formData)
  return validOperate(res)
}
