/*
 * @Author: chenmeifeng
 * @Date: 2024-12-16 10:47:55
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-06-25 17:16:50
 * @Description:
 */
import { doBaseServer, doNoParamServer } from "@/api/serve-funs"
import { validOperate, validResErr } from "@/utils/util-funs"

import { IUserListParam } from "../types"
import { IPageData, TModalType } from "@/types/i-config"
import { AxiosResponse } from "axios"
import { dealDownload4Response } from "@/utils/file-funs"
import { IPageInfo } from "@/types/i-table"

// 执行数据查询
export async function getCpnySchData(pageInfo, form) {
  const params = {
    pageNum: pageInfo.current,
    pageSize: pageInfo.pageSize,
  }
  const res = await doBaseServer<any, IPageData<any>>("queryMngStatic", params)
  if (validResErr(res)) return null
  return {
    records:
      res.records?.map((i) => {
        return {
          ...i,
          data: JSON.stringify(i.data),
        }
      }) || [],
    total: res.total,
  }
}

export const addUserMethods = async (data: any, type: TModalType) => {
  const params = {
    id: data.id,
    key: data.key,
    data: JSON.parse(data.data),
  }
  const api = type == "add" ? "insertMngStatic" : "updateMngStatic"
  const res = await doBaseServer<any>(api, params)
  return validOperate(res)
}

export const delUserMethods = async (data: any) => {
  const res = await doBaseServer<any>("delMngStatic", data)
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
