/*
 * @Author: chenmeifeng
 * @Date: 2024-12-16 10:47:55
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-05-19 14:32:08
 * @Description:
 */
import { doBaseServer, doNoParamServer } from "@/api/serve-funs"
import { validOperate, validResErr } from "@/utils/util-funs"

import { IPeriodDataParam } from "../types"
import { IPageData, TModalType } from "@/types/i-config"
import { AxiosResponse } from "axios"
import { dealDownload4Response } from "@/utils/file-funs"
import { IPageInfo } from "@/types/i-table"

// 执行数据查询
export async function getCpnySchData(pageInfo: IPageInfo, formData) {
  const params = {
    pageSize: pageInfo.pageSize,
    pageNum: pageInfo.current,
    stationId: formData?.stationId,
  }
  const res = await doBaseServer<IPeriodDataParam, IPageData<any>>("getPeriodInfoPage", params)
  if (validResErr(res)) return null
  const records = res.records?.map((i) => {
    return {
      ...i,
      id: i.stationId + "_" + i.periodCode,
    }
  })
  return { records: records || [], total: res.total }
}

export const addUserMethods = async (data: any, type: TModalType) => {
  const api = type == "add" ? "insertPeriodInfo" : "updatePeriodInfo"
  const res = await doBaseServer<any>(api, [data])
  return validOperate(res)
}

export const delUserMethods = async (data: any) => {
  const res = await doBaseServer<any>("delPeriodInfo", data)
  return validOperate(res)
}

export const exportData = async (formData) => {
  doBaseServer<any, AxiosResponse>("pdExportData", formData).then((data) => {
    dealDownload4Response(data, "导出表.xlsx")
  })
}
export const exportTemplate = async () => {
  doBaseServer<any, AxiosResponse>("pdExportTemplate").then((data) => {
    dealDownload4Response(data, "导出表.xlsx")
  })
}

export const importFile = async (formData) => {
  const res = await doBaseServer("pdImportData", formData)
  return validOperate(res)
}
export const saveLineIdxData = async (data) => {
  const changeStnList = data.filter((i) => i.edit)
  if (!changeStnList.length) return Promise.reject()
  const res = await doBaseServer("updatePeriodInfo", changeStnList)
  return validOperate(res)
}
