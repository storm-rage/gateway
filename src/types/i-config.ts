/*
 * @Author: chenmeifeng
 * @Date: 2024-12-03 14:17:47
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-04-30 11:23:41
 * @Description:
 */
import { CSSProperties } from "react"

import { ILabelValue } from "@/types/i-antd.ts"
import { type } from "os"

export type TYear0Month = "month" | "year"

/*
 * WT(风机)
 * PVINV(光伏逆变器)
 * ESPCS(储能变流器系统)
 * SYZZZ(综自系统)
 * PVTRA(光伏箱变)
 * PVDCB(直流汇流箱)
 * PVTRS(光伏跟踪系统)
 * PVCOL(组串式逆变器数据采集器)
 * ESMON(储能监控系统)
 * ESTRA(储能箱变)
 * ESCTL(储能群控系统)
 * ESBAT(电池系统)
 * GLYC(功率预测)
 * DNJL(电能计量)
 * BX(保信系统)
 * AGVC(AGC/AVC)
 * GZLB(故障录波)
 * */
export type TDeviceType =
  | "WT"
  | "PVINV"
  | "ESPCS"
  | "SYZZZ"
  | "PVTRA"
  | "PVDCB"
  | "PVTRS"
  | "PVCOL"
  | "ESMON"
  | "ESTRA"
  | "ESCTL"
  | "ESBAT"
  | "GLYC"
  | "DNJL"
  | "BX"
  | "AGVC"
  | "GZLB"
  | "WTTRA"

// W(风电),S(光伏/光热),F(风储),G(光储),H(风光储),P(分布式光伏),E(独立储能),T(独立变电站)
export type TSiteType = "W" | "S" | "F" | "G" | "H" | "P" | "E" | "T"

export interface IConfigTypeData {
  id?: number
  code: TSiteType | TDeviceType
  name: string
}

// 子系统分类接口及处理后结构
export interface ISubSystemType extends ILabelValue<string | number> {
  id: number // 101 //子系统id,以设备类型区分：风机1开头，光伏逆变器2开头，储能变流器3开头，升压站4开头
  name: string // "主控系统"
  deviceType?: TDeviceType
}
export interface IDeviceTypeOfStation {
  stationId: number
  modelIds: number[]
  deviceTypes: TDeviceType[]
}

export interface IDeviceSignal {
  signState: string
  signDesc: string
}

export type TModalType = "add" | "update" | "deleted" | "edit"
export type TFormType = "add" | "batchDelete" | "export" | "import" | "template" | "edit"

export interface IPageData<data> {
  records: data[]
  total: number
}
