/*
 * @Author: chenmeifeng
 * @Date: 2024-01-08 13:50:48
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-05-16 16:04:49
 * @Description:
 */

export interface IModelRuleInfo {
  edit?: boolean // 判断是否编辑过
  modelId: number
  model: string
  manufacturer: string
  deviceType: string
  alarmId: string
  alarmDesc: string
  brakeLevelId: number
  brakeName: string
  alarmLevelId: number
  alarmName: string
  systemId: number
  systemName: string
  tags: string
}

// 查询表单设置 options 的名称
export type TStationIdxSchFormField = "stationId"
export interface IMdRuleParam {
  stationId?: string
  pageSize: number
  pageNum: number
}

export type TStPiontSysFormField = "stationId" | "modelId" | "pointTypes" | "systemId"
