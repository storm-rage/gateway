/*
 * @Description: 设备拆分接口方法
 */
import { doBaseServer } from "@/api/serve-funs"
import { IPageInfo } from "@/types/i-table.ts"
import { validOperate, validResErr } from "@/utils/util-funs"
import { TModalType } from "@/types/i-config"
import { AxiosResponse } from "axios"
import { dealDownload4Response } from "@/utils/file-funs"

// 执行数据查询
export async function getSettingUserSchData(pageInfo?: IPageInfo, formData?: any) {
  const params = {
    pageNum: pageInfo?.current,
    pageSize: pageInfo?.pageSize,
    sourceDeviceCode: formData?.sourceDeviceCode,
  }
  const res = await doBaseServer<any>("deviceSplitQueryPage", params)
  if (validResErr(res)) return null
  return { records: res?.records || [], total: res?.total || 0 }
}

export const addUserMethods = async (data: any, type: TModalType) => {
  const api = type === "add" ? "deviceSplitSave" : "deviceSplitUpdate"
  const res = await doBaseServer<any>(api, data)
  return validOperate(res)
}

export const delUserMethods = async (data: any) => {
  const res = await doBaseServer<any>("deviceSplitBatchDelete", data)
  return validOperate(res)
}

export const downloadTemplate = async () => {
  const api = "deviceSplitExportTemplate"
  doBaseServer<any, AxiosResponse>(api).then((data) => {
    dealDownload4Response(data, "导出表.xlsx")
  })
}
export const importFile = async (data: any) => {
  const res = await doBaseServer<any>("deviceSplitImportData", data)
  return validOperate(res)
}
export const exportData = async (data: any) => {
  doBaseServer<any, AxiosResponse>("deviceSplitExportData", data).then((data) => {
    dealDownload4Response(data, "导出表.xlsx")
  })
}

export const getPointListByDeviceCode = async (data: any) => {
  const res = await doBaseServer<any>("pointQueryPointByDeviceCode", data)
  if (validResErr(res)) return null
  return { records: res || [], total: res?.length || 0 }
}
