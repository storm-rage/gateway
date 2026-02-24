
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
  const res = await doBaseServer<IRuleInfoParam, IPageData<IRuleInfo>>("getSvgFileList", params)
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
  if(data.constructor === Object) {
    const params = {
      stationCode: data.stationCode,
      fileName: data.fileName
    }
    doBaseServer<any, AxiosResponse>("download", params).then((data) => {
      dealDownload4Response(data, "导出表.xlsx")
    })
  } else if (data.constructor === Array) {
    doBaseServer<any, AxiosResponse>("batchDownload", data).then((data) => {
      dealDownload4Response(data, "导出表.xlsx")
    })
  }
  
}
export const exportTemplate = async () => {
  doBaseServer<any, AxiosResponse>("pjtExportTemplate").then((data) => {
    dealDownload4Response(data, "导出表.xlsx")
  })
}

export const importFile = async (formData) => {
  let uploadData = new FormData()
  uploadData.append('stationCode', formData.get('stationCode'))
  if(formData.get('file')) {
    uploadData.append('file', formData.get('file'))
    const res = await doBaseServer("upload", uploadData)
    return validOperate(res)
  }
  if(formData.getAll('files')) {
    const files = formData.getAll('files')
    files.forEach(file => {
      uploadData.append('files', file)
    })

    console.log(uploadData.getAll('files'),'==formData.getAll',files)
    const res = await doBaseServer("batchUpload", uploadData)
    return validOperate(res)
  }
}
