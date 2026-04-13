/*
 * @Author: chenmeifeng
 * @Date: 2024-01-08 13:50:48
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2024-01-25 10:51:58
 * @Description:
 */
import { IDvsMeasurePointData } from "@/types/i-device"

export interface IPointSysInfo extends IDvsMeasurePointData {
  edit?: boolean // 判断是否编辑过
}

// 查询表单设置 options 的名称
export type TStationIdxSchFormField = "stationId"
export interface IStPiontSysListParam {
  stationId?: number
  modelIds: number
  controlType: number
}
export type TStTbActInfo = {
  key: string
  label: string
}
export interface stateInfo {
  id?: number
  idx?: number
  modelId?: number
  rule: string
  duration: number
  priority: number
  ruleBefore: string
  ruleBeforeInfo?: any
  subStateCode: number
  subStateName: string
  mainStateCode: number
  mainStateName: string
  condition?: string // 条件
}

export type TStPiontSysFormField = "stationId" | "modelIds" | "deviceIds" | "controlType" | "deviceType"
