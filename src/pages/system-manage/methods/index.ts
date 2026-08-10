/*
 * @Author: chenmeifeng
 * @Date: 2024-12-16 10:47:55
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2024-12-16 11:30:46
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
export async function getSettingUserSchData(pageInfo?: IPageInfo, formData?: any) {
  const params = {
    pageNum: pageInfo?.current,
    pageSize: pageInfo?.pageSize,
    businessType: formData?.businessType,
  }
  const res = await doBaseServer<IUserListParam>("configQueryPage", params)
  if (validResErr(res)) return null
  return { records: res?.records || [], total: res?.total }
}

export const addUserMethods = async (data: any, type: TModalType) => {
  const api = type == "add" ? "configInsert" : "constantUpdate"
  const res = await doBaseServer<any>(api, data)
  return validOperate(res)
}

export const importFile = async (formData) => {
  const res = await doBaseServer("configImportData", formData)
  return validOperate(res)
}
export const exportFile = async (formData) => {
  doBaseServer<any, AxiosResponse>("configExportData", formData).then((data) => {
    dealDownload4Response(data, "导出表.xlsx")
  })
}

export const udPwMethods = async (data: any) => {
  const res = await doBaseServer<any>("updatePwdUser", data)
  return validOperate(res)
}

export const delUserMethods = async (data: any) => {
  const res = await doBaseServer<any>("configDeleteBatch", data)
  return validOperate(res)
}
