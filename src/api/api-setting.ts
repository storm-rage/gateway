/*
 * @Author: chenmeifeng
 * @Date: 2025-04-29 14:12:12
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-05-19 10:24:47
 * @Description:
 */
import { IApiMapItem } from "@/types/i-api.ts"

const SERVE_NAME = "/devicemng"
// 配置管理
export const configApiMap: IApiMapItem = {
  getCfgDeviceType: {
    url: `${SERVE_NAME}/config/deviceType`,
    method: "get",
    desc: "配置管理-查询所有设备类型",
  },
  getStationType: {
    url: `${SERVE_NAME}/config/stationType`,
    method: "get",
    desc: "配置管理-查询所有场站类型",
  },
  getDeviceStdState: {
    url: `${SERVE_NAME}/config/deviceStdNewState`,
    method: "get",
    desc: "配置管理-查询所有设备的标准状态",
    repeat_request: true,
  },
  getControlType: {
    url: `${SERVE_NAME}/config/controlType`,
    method: "get",
    desc: "配置管理-查询所有的控制类型",
  },
  getAllAlarmLevel: {
    url: `${SERVE_NAME}/config/alarmLevel`,
    method: "get",
    desc: "告警中心-告警等级",
  },
  getAllBrakeLevel: {
    url: `${SERVE_NAME}/config/brakeLevel`,
    method: "get",
    desc: "告警中心-停机等级",
  },
  getSubSystemTypeData: {
    url: `${SERVE_NAME}/config/system`,
    method: "get",
    desc: "设备管理-查询子系统分类数据",
    repeat_request: true,
  },
  getStnDeviceType: {
    url: `${SERVE_NAME}/station/allDeviceType`,
    method: "get",
    desc: "控制中心-控制日志-查询所有所有设备类型",
  },
  getProjectCompany: {
    url: `${SERVE_NAME}/projectCompany`,
    method: "get",
    desc: "所有检修公司/项目公司",
  },
}

// 场站管理
export const stationApiMap: IApiMapItem = {
  allStationsData: {
    url: `${SERVE_NAME}/station`,
    method: "get",
    desc: "场站管理-获取所有场站数据",
  },
  updateStationsData: {
    url: `${SERVE_NAME}/station/update`,
    method: "post",
    desc: "场站管理-更新场站数据",
  },
  insertStationsData: {
    url: `${SERVE_NAME}/station/insert`,
    method: "post",
    desc: "场站管理-添加场站数据",
  },
  queryStationsDataByParams: {
    url: `${SERVE_NAME}/station/detail`,
    method: "post",
    desc: "场站管理-根据参数获取场站数据",
  },
  delStnCompany: {
    url: `${SERVE_NAME}/station/batchDelete`,
    method: "post",
    desc: "删除",
  },
  stnExportTemplate: {
    url: `${SERVE_NAME}/station/exportTemplate`,
    method: "post",
    responseType: "blob",
    desc: "导出",
  },
  stnExportData: {
    url: `${SERVE_NAME}/station/exportData`,
    method: "post",
    responseType: "blob",
    desc: "导出",
  },
  stnImportData: {
    url: `${SERVE_NAME}/station/importData`,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data;charset=UTF-8",
    },
    desc: "导入",
  },
}

// 线路
export const lineApi: IApiMapItem = {
  getLineInfoPage: {
    url: `${SERVE_NAME}/config/lineInfo/selectByPage`,
    method: "post",
    desc: "查询所有的组织区域公司",
  },
  getLineInfo: {
    url: `${SERVE_NAME}/config/lineInfo`,
    method: "get",
    desc: "查询所有的组织区域公司",
  },
  updateLineInfo: {
    url: `${SERVE_NAME}/config/lineInfo/update`,
    method: "post",
    desc: "修改",
  },
  insertLineInfo: {
    url: `${SERVE_NAME}/config/lineInfo/insert`,
    method: "post",
    desc: "添加",
  },
  delLineInfo: {
    url: `${SERVE_NAME}/config/lineInfo/delete`,
    method: "post",
    desc: "删除",
  },
  lnExportTemplate: {
    url: `${SERVE_NAME}/config/lineInfo/exportTemplate`,
    method: "post",
    responseType: "blob",
    desc: "导出",
  },
  lnExportData: {
    url: `${SERVE_NAME}/config/lineInfo/exportData`,
    method: "post",
    responseType: "blob",
    desc: "导出",
  },
  lnImportData: {
    url: `${SERVE_NAME}/config/lineInfo/importData`,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data;charset=UTF-8",
    },
    desc: "导入",
  },
}

// 期次
export const periodApi: IApiMapItem = {
  getPeriodInfoPage: {
    url: `${SERVE_NAME}/config/periodInfo/selectByPage`,
    method: "post",
    desc: "查询所有的组织区域公司",
  },
  getPeriodInfo: {
    url: `${SERVE_NAME}/config/periodInfo`,
    method: "get",
    desc: "查询所有的组织区域公司",
  },
  updatePeriodInfo: {
    url: `${SERVE_NAME}/config/periodInfo/update`,
    method: "post",
    desc: "修改",
  },
  insertPeriodInfo: {
    url: `${SERVE_NAME}/config/periodInfo/insert`,
    method: "post",
    desc: "添加",
  },
  delPeriodInfo: {
    url: `${SERVE_NAME}/config/periodInfo/delete`,
    method: "post",
    desc: "删除",
  },
  pdExportTemplate: {
    url: `${SERVE_NAME}/config/periodInfo/exportTemplate`,
    method: "post",
    responseType: "blob",
    desc: "导出",
  },
  pdExportData: {
    url: `${SERVE_NAME}/config/periodInfo/exportData`,
    method: "post",
    responseType: "blob",
    desc: "导出",
  },
  pdImportData: {
    url: `${SERVE_NAME}/config/periodInfo/importData`,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data;charset=UTF-8",
    },
    desc: "导入",
  },
}
