/*
 * @Author: xiongman
 * @Date: 2023-02-06 13:46:24
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2024-12-05 16:34:32
 * @Description: 保存到本地数据的配置
 */

import { TStorageInfo } from "@/types/i-api"

const StorageUserInfo: TStorageInfo = {
  key: "ANY_INFO",
  store: "localStorage",
  desc: "登录用户信息",
}

const StorageSubSysType: TStorageInfo = {
  key: "SUB_SYS_TYPE",
  store: "localStorage",
  urlKey: "getSubSystemTypeData",
  desc: "子系统分类数据",
}

const StorageStationData: TStorageInfo = {
  key: "stationData",
  store: "localStorage",
  refresh: true,
  urlKey: "allStationsData",
  desc: "所有的场站数据",
}

const StorageCompanyData: TStorageInfo = {
  key: "proAndComList",
  store: "localStorage",
  refresh: true,
  urlKey: "getProjectCompany",
  desc: "检修公司或者区域公司",
}

const StorageDeviceType: TStorageInfo = {
  key: "DEVICE_TYPE",
  store: "localStorage",
  urlKey: "getCfgDeviceType",
  desc: "所有设备类型",
}
const StorageStationType: TStorageInfo = {
  key: "STATION_TYPE",
  store: "localStorage",
  urlKey: "getStationType",
  desc: "所有设备类型",
}
const StorageStnDvsType: TStorageInfo = {
  key: "STATION_DEVICE_TYPE",
  store: "localStorage",
  urlKey: "getStnDeviceType",
  desc: "各个场站的设备类型",
}
const StorageDeviceStdState: TStorageInfo = {
  key: "DEVICE_STD_STATE",
  store: "localStorage",
  urlKey: "getDeviceStdState",
  desc: "所有设备类型",
}
const StorageControlType: TStorageInfo = {
  key: "CONTROL_TYPE",
  store: "localStorage",
  urlKey: "getControlType",
  desc: "所有操作类型",
}

const StorageDeviceSystem: TStorageInfo = {
  key: "DEVICE_SYSTEM",
  store: "localStorage",
  urlKey: "getSubSystemTypeData",
  desc: "子系统映射",
}

const StorageConfigSystem: TStorageInfo = {
  key: "CONFIG_SYSTEM_MAP",
  store: "localStorage",
  desc: "子系统映射",
}
const StorageDeviceSignal: TStorageInfo = {
  key: "DEVICE_SIGNAL",
  store: "localStorage",
  urlKey: "getDeviceSignInfo",
  desc: "设备挂牌信息",
}

const StorageDeviceModelMap: TStorageInfo = {
  key: "DEVICE_MODEL_MAP",
  store: "localStorage",
  desc: "设备型号数据字典",
}

const StorageRolePermission: TStorageInfo = {
  key: "ROLE_PERMISSION",
  store: "localStorage",
  desc: "用户菜单按钮权限",
}
const StorageAlarmLevels: TStorageInfo = {
  key: "alarmlevelLs",
  store: "localStorage",
  urlKey: "getAllAlarmLevel",
  desc: "告警等级",
}
const StorageBrakeLevels: TStorageInfo = {
  key: "brakelevelLs",
  store: "localStorage",
  urlKey: "getAllBrakeLevel",
  desc: "告警等级",
}

// 刷新时需要清理存储的列表，用 TStorageInfo 的refresh判断收集
export const REFRESH_STORAGE: Record<"list", TStorageInfo[]> = { list: [] }

export {
  StorageCompanyData,
  StorageConfigSystem,
  StorageControlType,
  StorageDeviceModelMap,
  StorageDeviceStdState,
  StorageDeviceSystem,
  StorageDeviceType,
  StorageStationData,
  StorageStationType,
  StorageStnDvsType,
  StorageSubSysType,
  StorageUserInfo,
  StorageRolePermission,
  StorageAlarmLevels,
  StorageBrakeLevels,
  StorageDeviceSignal,
}
