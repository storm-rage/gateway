/*
 * @Author: chenmeifeng
 * @Date: 2024-12-16 10:47:55
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-05-07 17:19:53
 * @Description:
 */
import { doBaseServer, doNoParamServer } from "@/api/serve-funs"
import { validOperate, validResErr } from "@/utils/util-funs"

import { IUserListParam } from "../types"
import { TModalType } from "@/types/i-config"
import { AxiosResponse } from "axios"
import { dealDownload4Response } from "@/utils/file-funs"

// 执行数据查询
export async function getCpnySchData() {
  const res = await doBaseServer<IUserListParam>("getRegionCompany")
  if (validResErr(res)) return null
  return { records: res || [], total: res.length }
}

export const addUserMethods = async (data: any, type: TModalType) => {
  const api = type == "add" ? "insertRegionCompany" : "updateRegionCompany"
  const res = await doBaseServer<any>(api, data)
  return validOperate(res)
}

export const delUserMethods = async (data: any) => {
  const res = await doBaseServer<any>("delRegionCompany", data)
  return validOperate(res)
}

export const exportData = async () => {
  doBaseServer<any, AxiosResponse>("rgExportData").then((data) => {
    dealDownload4Response(data, "导出表.xlsx")
  })
}
export const exportTemplate = async () => {
  doBaseServer<any, AxiosResponse>("rgExportTemplate").then((data) => {
    dealDownload4Response(data, "导出表.xlsx")
  })
}

export const importFile = async (formData) => {
  const res = await doBaseServer("rgImportData", formData)
  return validOperate(res)
}
