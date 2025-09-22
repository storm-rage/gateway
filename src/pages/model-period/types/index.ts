/*
 * @Author: chenmeifeng
 * @Date: 2023-10-19 13:48:01
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2023-11-28 10:55:46
 * @Description:
 */

export interface IPeriodData {
  stationId: number
  stationName: string
  periodCode: number
  periodName: string
  id: number
}

export interface IPeriodDataParam {
  pageNum?: number
  pageSize?: number
  stationId?: number
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
