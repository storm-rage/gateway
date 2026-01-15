/*
 * @Author: chenmeifeng
 * @Date: 2024-12-16 10:47:55
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-05-12 17:07:08
 * @Description:
 */
import { doBaseServer, doNoParamServer } from "@/api/serve-funs"
// import { STATION_DATA_MAP } from "@/store/atom-station"
import { IPageInfo } from "@/types/i-table.ts"
import { validOperate, validResErr } from "@/utils/util-funs"

import { IRuleInfo, IRuleInfoParam } from "../types"
import { IPageData, TModalType } from "@/types/i-config"
import { AxiosResponse } from "axios"
import { dealDownload4Response } from "@/utils/file-funs"

// 执行数据查询
export async function getPjctSchData(pageInfo: IPageInfo, formData: IRuleInfoParam) {
  const params = {
    pageSize: pageInfo.pageSize,
    pageNum: pageInfo.current,
    stationCode: formData?.stationCode,
  }
  const res = await doBaseServer<IRuleInfoParam, IPageData<IRuleInfo>>("getAudioFileList", params)
  if (validResErr(res)) return null
  return { records: res as any , total: res.length }
}

export const addPjctMethods = async (data: any, type: TModalType) => {
  const api = type == "add" ? "insertPjtCompany" : "updatePjtCompany"
  const params = {
    ...data,
    type: "MAINTENANCE",
  }
  const res = await doBaseServer<any>(api, params)
  return validOperate(res)
}

export const delPjctMethods = async (data: any) => {
  const res = await doBaseServer<any>("delPjtCompany", data)
  return validOperate(res)
}

export const exportData = async (data) => {
  const params = {
    stationCode: data.stationCode,
    fileName: data.fileName
  }
  doBaseServer<any, AxiosResponse>("download", params).then((data) => {
    dealDownload4Response(data, "导出表.xlsx")
  })
}
export const exportTemplate = async () => {
  doBaseServer<any, AxiosResponse>("pjtExportTemplate").then((data) => {
    dealDownload4Response(data, "导出表.xlsx")
  })
}

export const importFile = async (formData) => {
  const res = await doBaseServer("upload", formData)
  return validOperate(res)
}
