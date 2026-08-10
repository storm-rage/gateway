/*
 * @Author: chenmeifeng
 * @Date: 2023-10-19 13:48:01
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2023-11-28 10:55:46
 * @Description:
 */

export interface IUserList {
  loginName: string
  realName: string
  role: string
  roleDescription: string
  id: number
  roleId: number
}

export interface IUserListParam {
  pageNum?: number
  pageSize?: number
}

export interface FindStationParam {
  id: string,
  stationCode: string,
  parentComId: string,
  maintenanceComId: string,
  stationType: string
}

export type TUserTbActInfo = {
  key: string
  label: string
}
export interface TModelFrAndTbInfo {
  loginName?: string
  realName?: string
  id?: number
  roleId?: number
  password?: string
  newPassword?: string
}
export interface IBatchStn2DvsTreeData {
  id: string | number
  key: string | number
  title: string
  deviceCode: string
  deviceId?: number
  ratedPower?: number
  model?: string
  modelId?: number
  stationCode?: string
  stationId?: number
  stationName?: string
  deviceName?: string
  deviceType?: string
  level?: number
  isLeaf?: boolean
  children?: IBatchStn2DvsTreeData[]
}

export interface IRuleQuotaInfo {
  operator: string | number // 条件
  point?: string //指标输入框值
  pointName: string //指标输入框值
  value: string //指标输入框值
  id: number
  symbol: string // 与下一个的条件
}
