/*
 * @Author: chenmeifeng
 * @Date: 2024-01-05 15:40:07
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-05-13 15:37:52
 * @Description:
 */
import { doBaseServer, doNoParamServer } from "@/api/serve-funs"
import { IStationData } from "@/types/i-station"
import { IPageInfo } from "@/types/i-table"
import { validOperate } from "@/utils/util-funs"

import { IProjectCompany } from "../types"
import { dealDownload4Response } from "@/utils/file-funs"
import { AxiosResponse } from "axios"
import { TModalType } from "@/types/i-config"
let stationIdxData = []
// 执行数据查询
export async function getSettingStIdexSchData(pageInfo?: IPageInfo, formData?) {
  const params = { stationCode: formData.stationCode }

  stationIdxData = await doBaseServer("allStationsData", params)
  stationIdxData = stationIdxData.map((i, idx) => {
    return {
      ...i,
      row_idx: idx + 1,
    }
  })
  return { records: stationIdxData || [], total: stationIdxData?.length }
}

export const changeRefleshFlag = (flag) => {
  // refleshFlag = flag
}

export const saveStnIdxData = async (data) => {
  const changeStnList = data.filter((i) => i.edit)
  if (!changeStnList.length) return Promise.reject()
  const res = await doBaseServer<IStationData>("updateStationsData", changeStnList)
  // refleshFlag = true
  return validOperate(res)
}
export const addStnMethods = async (data: any, type: TModalType) => {
  const params = {
    fullName: data.fullName,
    shortName: data.shortName,
    stationCode: data.stationCode,
    stationType: data.stationType,
    parentComId: data.parentComId,
    maintenanceComId: data.maintenanceComId,
    tags: {
      priority: data.priority,
      ip: data.ip,
      port: data.port,
    },
  }
  const api = type == "add" ? "insertStationsData" : "updateStationsData"
  const res = await doBaseServer<any>(api, params)
  return validOperate(res)
}

export const delStnMethods = async (data: any) => {
  const res = await doBaseServer<any>("delStnCompany", data)
  return validOperate(res)
}

export const exportData = async (formData) => {
  doBaseServer<any, AxiosResponse>("stnExportData", formData).then((data) => {
    dealDownload4Response(data, "导出表.xlsx")
  })
}
export const exportTemplate = async () => {
  doBaseServer<any, AxiosResponse>("stnExportTemplate").then((data) => {
    dealDownload4Response(data, "导出表.xlsx")
  })
}

export const importFile = async (formData) => {
  const res = await doBaseServer("stnImportData", formData)
  return validOperate(res)
}
