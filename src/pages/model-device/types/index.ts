/*
 * @Author: chenmeifeng
 * @Date: 2023-10-19 13:48:01
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2024-11-20 17:24:06
 * @Description:
 */
export interface IDeviceListData {
  deviceCode: string
  modelId: number
  lineCode: number
  regionComId: number
  projectComId: number
  maintenanceComId: number
  regionComShortName: string | number
  maintenanceComShortName: string | number
  projectComShortName: string | number
  stationName: string | number
  periodCode: string | number
  lineName: string | number
  deviceName: string
  deviceType: string | number
  name?: string // 设备名称
  manufacturer: string | number
  model: string | number
  deviceTags: ITags
  tags: ITags
  operationDate: string | number
}
export interface ITags {
  operation_code?: string | number
  rated_power?: string | number
  type?: string | number
  longitude?: string | number
  latitude?: string | number
  altitude?: string | number
  benchmark_flag?: string | number
  grid_on_date?: string | number
  install_date?: string | number
  out_of_warranty_date?: string | number
  rated_wspd?: string | number
  cut_in_wspd?: string | number
  cut_out_wspd?: string | number
  rotor_diameter?: string | number
  blade_length?: string | number
  hub_height?: string | number
  priority?: string | number
}
export interface ISearchFr {
  stationCode: string | number
  deviceType: string | number
}

export interface DevideListParam {
  stationCode: string
  deviceType: string
  pageNum: number
  pageSize: number
}

// 查询表单设置 options 的名称
export type TDeviceSchFormField = "stationId" | "deviceType" | "deviceIds"
