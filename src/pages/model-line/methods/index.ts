/*
 * @Author: chenmeifeng
 * @Date: 2024-12-16 10:47:55
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-05-19 14:56:40
 * @Description:
 */
import { doBaseServer, doNoParamServer } from "@/api/serve-funs"
import { validOperate, validResErr } from "@/utils/util-funs"
import { IPageData, TModalType } from "@/types/i-config"
import { AxiosResponse } from "axios"
import { dealDownload4Response } from "@/utils/file-funs"
import { IPageInfo } from "@/types/i-table"
import { ILineDataParam } from "../types"

// 执行数据查询
export async function getCpnySchData(pageInfo: IPageInfo, formData) {
  const params = {
    pageSize: pageInfo.pageSize,
    pageNum: pageInfo.current,
    stationId: formData?.stationId,
  }
  const res = await doBaseServer<ILineDataParam, IPageData<any>>("getLineInfoPage", params)
  if (validResErr(res)) return null
  const records = res.records?.map((i) => {
    return {
      ...i,
      id: i.stationId + "_" + i.lineCode,
    }
  })
  return { records: records || [], total: res.total }
}

export const addUserMethods = async (data: any, type: TModalType) => {
  const api = type == "add" ? "insertLineInfo" : "updateLineInfo"
  const res = await doBaseServer<any>(api, [data])
  return validOperate(res)
}

export const delUserMethods = async (data: any) => {
  const res = await doBaseServer<any>("delLineInfo", data)
  return validOperate(res)
}

export const exportData = async (formData) => {
  doBaseServer<any, AxiosResponse>("lnExportData", formData).then((data) => {
    dealDownload4Response(data, "导出表.xlsx")
  })
}
export const exportTemplate = async () => {
  doBaseServer<any, AxiosResponse>("lnExportTemplate").then((data) => {
    dealDownload4Response(data, "导出表.xlsx")
  })
}

export const importFile = async (formData) => {
  const res = await doBaseServer("lnImportData", formData)
  return validOperate(res)
}

export const saveLineIdxData = async (data) => {
  const changeStnList = data.filter((i) => i.edit)
  if (!changeStnList.length) return Promise.reject()
  const res = await doBaseServer("updateLineInfo", changeStnList)
  return validOperate(res)
}
