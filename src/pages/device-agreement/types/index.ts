/*
 * @Author: chenmeifeng
 * @Date: 2023-10-19 13:48:01
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2023-11-28 10:55:46
 * @Description:
 */
import { TDeviceType } from "@/types/i-config"

export interface IUserList {
  loginName: string
  realName: string
  role: string
  roleDescription: string
  id: number
  roleId: number
  stationId: number | string
  state: string
  deviceCode: string
  modelId: string
  children?: IUserList[]
}

export interface IUserListParam {
  pageNum?: number
  pageSize?: number
}

export type TUserTbActInfo = {
  key: string
  label: string
  state: any
}
export interface TModelFrAndTbInfo {
  loginName?: string
  realName?: string
  id?: number
  roleId?: number
  password?: string
  newPassword?: string
  state?: number | string
}

export interface ISearchFr {
  modelId?: number
  stationId?: number
  deviceType?: TDeviceType
  currentTab?: string
  deviceCode?: string
}
