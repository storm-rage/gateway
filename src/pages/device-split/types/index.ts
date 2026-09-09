/*
 * @Description: 设备拆分类型定义
 */

export interface IUserList {
  id: number
  sourceDeviceCode: string
  targetDeviceCode: string
  ioaRanges: string
  enabled: string
  remark: string
  updater: string
  updateTime: string
}

export interface IUserListParam {
  pageNum?: number
  pageSize?: number
  sourceDeviceCode?: string
}

export type TUserTbActInfo = {
  key: string
  label: string
}

export interface TModelFrAndTbInfo {
  id?: number
  sourceDeviceCode?: string
  targetDeviceCode?: string
  ioaRanges?: string
  enabled?: string
  remark?: string
}
