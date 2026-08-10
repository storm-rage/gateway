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

import { IUserListParam, FindStationParam } from "../types"
import { TModalType } from "@/types/i-config"

// 执行数据查询
export async function getSettingUserSchData(pageInfo?: IPageInfo) {
  const params = {
    id: '',
    stationCode: "",
    parentComId: '',
    maintenanceComId: '',
    stationType: ""
  }
  const res = await doBaseServer<FindStationParam>("stationFindStation", params)
  console.log(res,'==res')
  if (validResErr(res)) return null
  return { records: res || [], total: res?.length }
}



export const addUserMethods = async (data: any, type: TModalType) => {
  const api = type == "add" ? "stationInsert" : "stationUpdate"
  const res = await doBaseServer<any>(api, type == "add" ? data: [{...data}])
  return validOperate(res)
}

export const udPwMethods = async (data: any) => {
  const res = await doBaseServer<any>("updatePwdUser", data)
  return validOperate(res)
}

export const delUserMethods = async (data: any) => {
  const res = await doBaseServer<any>("stationBatchDelete", data)
  return validOperate(res)
}
