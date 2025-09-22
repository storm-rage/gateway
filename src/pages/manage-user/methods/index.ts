/*
 * @Author: chenmeifeng
 * @Date: 2024-12-16 10:47:55
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-05-07 17:13:39
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

let roleList: any = []
// 执行数据查询
export async function getSettingUserSchData(pageInfo?: IPageInfo) {
  const params = {
    pageNum: pageInfo?.current,
    pageSize: pageInfo?.pageSize,
  }
  const res = await doBaseServer<IUserListParam>("getAllUser", params)
  if (validResErr(res)) return null
  return { records: res?.list || [], total: res?.total }
}

export const getRoleList = async () => {
  if (roleList.length) return roleList
  const res = await doNoParamServer<any>("getRoleUser")
  if (validResErr(res)) return null
  roleList = res.map((i: any) => {
    return {
      label: i.description,
      value: i.id,
    }
  })
  return roleList
}

export const addUserMethods = async (data: any, type: TModalType) => {
  const api = type == "add" ? "addUser" : "updateUser"
  const res = await doBaseServer<any>(api, data)
  return validOperate(res)
}

export const udPwMethods = async (data: any) => {
  const res = await doBaseServer<any>("updatePwdUser", data)
  return validOperate(res)
}

export const delUserMethods = async (data: any) => {
  const res = await doBaseServer<any>("deleteUser", data)
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
