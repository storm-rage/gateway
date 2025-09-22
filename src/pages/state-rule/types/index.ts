import { TDeviceType } from "@/types/i-config"

export interface IStateRuleList {
  id: number
  modelId: number
  formula: string // 列表展示，对应状态配置
  enabled: true
  description: string
  createTime: string
  updateTime: string
}
export type TStTbActInfo = {
  key: string
  label: string
}
export interface ISearchFr {
  modelId?: number
  stationId?: number
  deviceType?: TDeviceType
}
export interface IPageSearch {
  pageNum: number
  pageSize: number
  modelId: number
  enabled?: boolean
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
export type TStAddOrEditFormField = "stationId" | "modelId"
