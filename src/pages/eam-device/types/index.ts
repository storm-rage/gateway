/*
 * @Author: chenmeifeng
 * @Date: 2023-10-19 13:48:01
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-06-17 11:29:32
 * @Description:
 */

export interface IEamDvs {
  id: number
  deviceId: number
  deviceCode: string
  deviceName: string
  stationId: number
  stationCode: string
  stationName: string
  eamDevice: string
  eamStation: string
}
export interface IEamDvsParam {
  pageNum?: number
  pageSize?: number
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
export interface IeamDvsParam {
  stationCode: number
  deviceType?: string
  deviceCode: string
}
export type TeamDvsSchFormField = "stationCode" | "deviceType" | "deviceCode"
