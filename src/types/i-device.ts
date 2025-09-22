/*
 * @Author: xiongman
 * @Date: 2023-09-19 19:44:55
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2024-05-20 10:10:03
 * @Description:
 */

import { TOptions } from "@/types/i-antd.ts"
import { TDeviceType } from "@/types/i-config.ts"
/**
 * 设备运行主状态标记
 * WT: "A" | "B" | "C" | "D" | "E" | "F"
 * PVINV/ESPCS: "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H"
 */
export type TDvsMainState = string | number //  "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H"

// 根据参数查询设备列表数据的查询参数
export interface IQueryDeviceDataParams {
  id?: number
  deviceCode?: string
  deviceType?: TDeviceType
  modelId?: number
  model?: string
  stationId?: number
  stationCode?: string
  periodCode?: number
  lineCode?: number
}

export interface IDeviceTags {
  operation_code: string // 设备编号
  rated_power: number // 额定功率
  inverter_type?: string
  pvcol?: number //数采设备id
  pvcolName?: string //数采设备名称
}

// 设备信息-附加设备运行数据字段
export interface IDeviceData {
  stationId: number
  array: number | string
  deviceId: number
  deviceCode: string // "441882W01WT1101001"
  deviceName: string // "风电机组"
  periodCode: number
  periodName: string
  lineCode: number
  lineName: string
  operationDate: string // "2023-07-18T16:00:00.000+00:00"
  operatDateStr?: string // 处理添加字段
  deviceTags: IDeviceTags
  deviceNumber?: string // JSON 解析处理字段
  ratedPower?: number // 处理添加字段,额定功率
  modelId: number
  model: string // "CS2500D120H120"
  version: string // "V1"
  manufacturer: string // "ZHONGCHE"
  deviceType: TDeviceType //  "WT"
  deviceTypeLabel?: string // 处理添加字段
  tdStableName: string | null
  stationCode: string // "441882W01"
  stationFullName: string // "清远连州风电场"
  stationName: string // "连州风电场"
  projectComId: number // 1
  projectComFullName: string // "清远风电开发有限公司"
  projectComShortName: string //  "清远公司"
  maintenanceComId: number // 1
  maintenanceComFullName: string // "清远风电开发有限公司"
  maintenanceComShortName: string // "清远公司"
  regionComId: number
  regionComFullName: string //  "华润广东新能源有限公司"
  regionComShortName: string //  "广东新能源"
  pointName?: any
  pointDesc?: string
  pid?: number
  parentName?: string
  pvcol?: number
}

export type TStnDvsRunData4MQ = {
  [stationId: number]: IDeviceData[]
}

// 配置管理-功率曲线-设备型号数据字典
export interface IDeviceModelData {
  id: number // 4
  deviceType: TDeviceType // "DNJL"
  manufacturer: string //"NANRUI"
  model: string //"NRDJL"
  version: string //"V1"
  tags: null
}

export interface IDvsModelMap {
  typeToOptionsMap?: Record<IDeviceModelData["deviceType"], TOptions<IDeviceModelData["id"]>>
  deviceModelList?: IDeviceModelData[]
  idToInfoMap?: Record<IDeviceModelData["id"], IDeviceModelData>
}

export interface IDvsStateData {
  mainState: string // "7"
  subState: string // "7" //设备当前二级状态
}

// 设备测点数据
export interface IDvsMeasurePointData {
  id?: number // 828
  modelId: number // 型号id 2
  pointDesc: string // 测点描述 "断路器2213合位"
  pointName: string // 测点编码 "CBClosedPosition_2213"
  //测点类型：2为遥测，1为遥信，3 遥控，4 摇调
  pointType: "1" | "2" | "3" | "4"
  systemId: number // 子系统id 401
  systemLabel?: string // 子系统名称，处理附加字段
  coefficient: number // 1.0 //测点系数
  unit: string | null // 测点单位
  maximum: number // 1.0
  minimum: number // 0.0
  tags?: {
    breaker_flag: number // 1
  }
}

export interface IDvsMeasurePointTreeData {
  title: string
  value: string
  modelId?: IDvsMeasurePointData["modelId"]
  pointType?: IDvsMeasurePointData["pointType"]
  isLeaf?: boolean
  disabled?: boolean
  children?: IDvsMeasurePointTreeData[]
}

export interface IDvsMeasurePointTreeVal {
  label: string
  value: string
  disabled: boolean
  halfChecked?: boolean
}

export interface IStnDvsType4LocalStorage {
  stationId: number
  modelIds: number[]
  deviceTypes: TDeviceType[]
}

export interface ICheckList {
  WT?: string[]
  PVINV?: string[]
  ESPCS?: string[]
}

type TMatrixDrawerName = "detail" | "dvsPart" | "glbFilter" | "signalModal"
export type TMatrixDrawerMap = { [drawerName in TMatrixDrawerName]?: boolean }

export type TModeShow = "box" | "table" | "block"

export interface ISysList {
  id: number
  name: string
}
export type TDvsQxzData = {
  [dvsCode: string]: any
}
export interface DvsStateInfo {
  deviceName: string
  deviceCode: string
  stationName: string
  state?: TDvsMainState
}
export interface IDvsStateSchForm {
  stationCode?: string
  deviceType?: string
  mainState?: string
  firstFlag?: any
  pageNum?: number
  pageSize?: number
}

export interface IDeviceState {
  count: {
    fault: number
    noCommunication: number
    normal: number
    rationing: number
    shutdown: number
    standby: number
    total: number
  }
  data: Array<IDvsStateDetail>
}
export interface IDvsStateDetail {
  deviceType: string
  stationCode: string
  mainState: number
  stationName: string
  time: number
  deviceCode: string
  firstFlag: number // 新增 要闪
  stationPriority: number
  deviceName: string
  id: string
  stateName: string
}

export interface IDeviceStatePage {
  count: {
    fault: number
    noCommunication: number
    normal: number
    rationing: number
    shutdown: number
    standby: number
    total: number
  }
  data: {
    total: number
    list: Array<IDvsStateDetail>
  }
}
export interface IQueryDeviceParams {
  id?: number
  deviceCode?: string
  deviceType?: TDeviceType | string
  modelId?: number
  model?: string
  stationId?: number
  stationCode?: string
  periodCode?: number
  lineCode?: number
}
