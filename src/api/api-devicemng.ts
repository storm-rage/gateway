/*
 * @Author: chenmeifeng
 * @Date: 2025-04-29 14:29:44
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-07-08 10:13:27
 * @Description:
 */
import { IApiMapItem } from "@/types/i-api.ts"

const SERVE_NAME = "/devicemng"
const SERVE_GATEWAY = "/dataGateway"
// 功率曲线
export const settingApiMap: IApiMapItem = {
  getWtPowerCurveByStn: {
    url: `${SERVE_NAME}/wtPowerCurve`,
    method: "get",
    param_field: "params",
    desc: "配置管理-根据场站和设备型号查询功率曲线",
  },
  getWtPowerCurveById: {
    url: `${SERVE_NAME}/wtPowerCurve/id`,
    method: "get",
    param_field: "params",
    desc: "配置管理-功率曲线-根据功率曲线id查询功率曲线",
  },
  updateWtPowerCurve: {
    url: `${SERVE_NAME}/wtPowerCurve/update`,
    method: "post",
    data: "data",
    desc: "配置管理-功率曲线-更新功率曲线",
  },
  insertWtPowerCurve: {
    url: `${SERVE_NAME}/wtPowerCurve/insert`,
    method: "post",
    data: "data",
    desc: "配置管理-功率曲线-插入功率曲线",
  },
  getPvPowerCurveByStn: {
    url: `${SERVE_NAME}/pvPowerCurve`,
    method: "get",
    param_field: "params",
    desc: "配置管理-光伏根据场站和设备型号查询功率曲线",
  },
  updatePvPowerCurve: {
    url: `${SERVE_NAME}/pvPowerCurve/update`,
    method: "post",
    data: "data",
    desc: "配置管理-功率曲线-更新光伏功率曲线",
  },
  insertPvPowerCurve: {
    url: `${SERVE_NAME}/pvPowerCurve/insert`,
    method: "post",
    data: "data",
    desc: "配置管理-功率曲线-插入光伏功率曲线",
  },
  deleteWtPowerCurveById: {
    url: `${SERVE_NAME}/wtPowerCurve/delete/{id}`,
    method: "post",
    desc: "配置管理-功率曲线-删除单台风机功率曲线",
  },
  batchDltWtPowerCurveById: {
    url: `${SERVE_NAME}/wtPowerCurve/batchDelete`,
    method: "post",
    desc: "配置管理-功率曲线-删除单台风机功率曲线",
  },
  batchDltPvPowerCurveById: {
    url: `${SERVE_NAME}/pvPowerCurve/batchDelete`,
    method: "post",
    desc: "配置管理-功率曲线-删除单台风机功率曲线",
  },
  deletePvPowerCurveById: {
    url: `${SERVE_NAME}/pvPowerCurve/delete/{id}`,
    method: "post",
    desc: "配置管理-功率曲线-删除单台风机功率曲线",
  },
  ppExportTemplate: {
    url: `${SERVE_NAME}/pvPowerCurve/exportTemplate`,
    method: "post",
    responseType: "blob",
    desc: "导出",
  },
  ppExportData: {
    url: `${SERVE_NAME}/pvPowerCurve/exportData`,
    method: "post",
    responseType: "blob",
    desc: "导出",
  },
  ppImportData: {
    url: `${SERVE_NAME}/pvPowerCurve/importData`,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data;charset=UTF-8",
    },
    desc: "导入",
  },
  wpExportTemplate: {
    url: `${SERVE_NAME}/wtPowerCurve/exportTemplate`,
    method: "post",
    responseType: "blob",
    desc: "导出",
  },
  wpExportData: {
    url: `${SERVE_NAME}/wtPowerCurve/exportData`,
    method: "post",
    responseType: "blob",
    desc: "导出",
  },
  wpImportData: {
    url: `${SERVE_NAME}/wtPowerCurve/importData`,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data;charset=UTF-8",
    },
    desc: "导入",
  },
}

// 测点
export const dataPointApiMap: IApiMapItem = {
  getDeviceSubPartPointData: {
    url: `${SERVE_NAME}/dataPoint`,
    method: "get",
    desc: "设备管理-查询设备测点数据",
  },
  getPointDataPage: {
    url: `${SERVE_NAME}/dataPoint/selectPointByPage`,
    method: "post",
    desc: "设备管理-查询设备测点数据",
  },
  updatePointData: {
    url: `${SERVE_NAME}/dataPoint/update`,
    method: "post",
    desc: "修改测点信息",
  },
  insertPointData: {
    url: `${SERVE_NAME}/dataPoint/insert`,
    method: "post",
    desc: "新增测点信息",
  },
  delPoints: {
    url: `${SERVE_NAME}/dataPoint/batchDelete`,
    method: "post",
    desc: "删除",
  },
  pointExportTemplate: {
    url: `${SERVE_NAME}/dataPoint/exportTemplate`,
    method: "post",
    responseType: "blob",
    desc: "导出",
  },
  pointExportData: {
    url: `${SERVE_NAME}/dataPoint/exportData`,
    method: "post",
    responseType: "blob",
    desc: "导出",
  },
  pointImportData: {
    url: `${SERVE_NAME}/dataPoint/importData`,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data;charset=UTF-8",
    },
    desc: "导入",
  },
}

// 区域公司
export const regionCompany: IApiMapItem = {
  getRegionCompany: {
    url: `${SERVE_NAME}/regionCompany`,
    method: "get",
    desc: "查询所有的组织区域公司",
  },
  updateRegionCompany: {
    url: `${SERVE_NAME}/regionCompany/update`,
    method: "post",
    desc: "修改",
  },
  insertRegionCompany: {
    url: `${SERVE_NAME}/regionCompany/insert`,
    method: "post",
    desc: "添加",
  },
  delRegionCompany: {
    url: `${SERVE_NAME}/regionCompany/batchDelete`,
    method: "post",
    desc: "删除",
  },
  rgExportTemplate: {
    url: `${SERVE_NAME}/regionCompany/exportTemplate`,
    method: "post",
    responseType: "blob",
    desc: "导出",
  },
  rgExportData: {
    url: `${SERVE_NAME}/regionCompany/exportData`,
    method: "post",
    responseType: "blob",
    desc: "导出",
  },
  rgImportData: {
    url: `${SERVE_NAME}/regionCompany/importData`,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data;charset=UTF-8",
    },
    desc: "导入",
  },
}

// 项目公司
export const projectCompany: IApiMapItem = {
  // getPjtCompany: {
  //   url: `${SERVE_NAME}/projectCompany`,
  //   method: "get",
  //   desc: "查询所有的项目公司",
  // },
  updatePjtCompany: {
    url: `${SERVE_NAME}/projectCompany/update`,
    method: "post",
    desc: "修改",
  },
  insertPjtCompany: {
    url: `${SERVE_NAME}/projectCompany/insert`,
    method: "post",
    desc: "添加",
  },
  delPjtCompany: {
    url: `${SERVE_NAME}/projectCompany/batchDelete`,
    method: "post",
    desc: "删除",
  },
  pjtExportTemplate: {
    url: `${SERVE_NAME}/projectCompany/exportTemplate`,
    method: "post",
    responseType: "blob",
    desc: "导出",
  },
  pjtExportData: {
    url: `${SERVE_NAME}/projectCompany/exportData`,
    method: "post",
    responseType: "blob",
    desc: "导出",
  },
  pjtImportData: {
    url: `${SERVE_NAME}/projectCompany/importData`,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data;charset=UTF-8",
    },
    desc: "导入",
  },
}
// 设备型号
export const deviceModel: IApiMapItem = {
  getAllDeviceModel: {
    url: `${SERVE_NAME}/deviceModel`,
    method: "get",
    desc: "查询",
  },
  getAllDeviceModelPage: {
    url: `${SERVE_NAME}/deviceModel/selectByPage`,
    method: "post",
    desc: "查询",
  },
  updateDvsMdCompany: {
    url: `${SERVE_NAME}/deviceModel/update`,
    method: "post",
    desc: "修改",
  },
  insertDvsMdCompany: {
    url: `${SERVE_NAME}/deviceModel/insert`,
    method: "post",
    desc: "添加",
  },
  delDvsMdCompany: {
    url: `${SERVE_NAME}/deviceModel/batchDelete`,
    method: "post",
    desc: "删除",
  },
  dvsMdExportTemplate: {
    url: `${SERVE_NAME}/deviceModel/exportTemplate`,
    method: "post",
    responseType: "blob",
    desc: "导出",
  },
  dvsMdExportData: {
    url: `${SERVE_NAME}/deviceModel/exportData`,
    method: "post",
    responseType: "blob",
    desc: "导出",
  },
  dvsMdImportData: {
    url: `${SERVE_NAME}/deviceModel/importData`,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data;charset=UTF-8",
    },
    desc: "导入",
  },
}

// 计划电量
export const planQuantityApiMap: IApiMapItem = {
  getProductionPlan: {
    url: `${SERVE_NAME}/productionPlan`,
    method: "get",
    param_field: "params",
    desc: "计划电量-查询列表",
  },
  fetchInsert: {
    url: `${SERVE_NAME}/productionPlan/batchInsert`,
    method: "post",
    data: "data",
    desc: "计划电量-插入计划",
  },
  fetchDeletePlan: {
    url: `${SERVE_NAME}/productionPlan/batchDelete`,
    method: "post",
    param_field: "params",
    desc: "计划电量-删除计划",
  },
  fetchEditPlan: {
    url: `${SERVE_NAME}/productionPlan/batchUpdate`,
    method: "post",
    data: "data",
    desc: "计划电量-编辑计划",
  },
  getProductionPlanDetail: {
    url: `/monitor/info/getStationMonthlyProduction`,
    method: "get",
    param_field: "params",
    desc: "计划电量-详情",
  },
  getWTSvg: {
    url: `/WT/icon_WT.svg`,
    baseURL: `/`,
    withCredentials: false,
    desc: "风机-SVG",
  },
  peExportTemplate: {
    url: `${SERVE_NAME}/productionPlan/exportTemplate`,
    method: "post",
    responseType: "blob",
    desc: "导出",
  },
  peExportData: {
    url: `${SERVE_NAME}/productionPlan/exportData`,
    method: "post",
    responseType: "blob",
    desc: "导出",
  },
  peImportData: {
    url: `${SERVE_NAME}/productionPlan/importData`,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data;charset=UTF-8",
    },
    desc: "导入",
  },
}

// 设备管理
export const deviceApiMap: IApiMapItem = {
  allDevicesData: {
    url: `${SERVE_NAME}/device`,
    method: "get",
    desc: "设备管理-获取所有设备数据",
  },
  queryDevicesDataByParams: {
    url: `${SERVE_NAME}/device/detail`,
    method: "post",
    desc: "设备管理-根据参数获取设备数据",
    repeat_request: true,
  },
  selectDvsByPage: {
    url: `${SERVE_NAME}/device/selectByPage`,
    method: "post",
    desc: "设备管理-根据参数获取设备数据",
    repeat_request: true,
  },
  getDeviceInfoById: {
    url: `${SERVE_NAME}/device/{id}`,
    method: "get",
    desc: "设备管理-根据设备id获取设备信息",
  },
  updateDevicesData: {
    url: `${SERVE_NAME}/device/batchUpdate`,
    method: "post",
    desc: "设备管理-更新设备数据",
  },
  insertDevicesData: {
    url: `${SERVE_NAME}/device/insert`,
    method: "post",
    desc: "设备管理-添加设备数据",
  },
  delDvs: {
    url: `${SERVE_NAME}/device/batchDelete`,
    method: "post",
    desc: "设备管理-添加设备数据",
  },
  dvsExportTemplate: {
    url: `${SERVE_NAME}/device/exportTemplate`,
    method: "post",
    responseType: "blob",
    desc: "导出",
  },
  dvsExportData: {
    url: `${SERVE_NAME}/device/exportData`,
    method: "post",
    responseType: "blob",
    desc: "导出",
  },
  dvsImportData: {
    url: `${SERVE_NAME}/device/importData`,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data;charset=UTF-8",
    },
    desc: "导入",
  },
}
// eam设备
export const eamDvsApi: IApiMapItem = {
  eamSelectPage: {
    url: `${SERVE_NAME}/crpowerMap/selectPage`,
    method: "post",
    desc: "查询所有的项目公司",
  },
  updateEamDvs: {
    url: `${SERVE_NAME}/crpowerMap/update`,
    method: "post",
    desc: "修改",
  },
  insertEamDvs: {
    url: `${SERVE_NAME}/crpowerMap/insert`,
    method: "post",
    desc: "添加",
  },
  delEamDvs: {
    url: `${SERVE_NAME}/crpowerMap/delete`,
    method: "post",
    desc: "删除",
  },
  eamExportTemplate: {
    url: `${SERVE_NAME}/crpowerMap/importTemplate`,
    method: "post",
    responseType: "blob",
    desc: "导出",
  },
  eamExportData: {
    url: `${SERVE_NAME}/crpowerMap/exportData`,
    method: "post",
    responseType: "blob",
    desc: "导出",
  },
  eamImportData: {
    url: `${SERVE_NAME}/crpowerMap/importData`,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data;charset=UTF-8",
    },
    desc: "导入",
  },
}

// 静态表
export const staticMngApiMap: IApiMapItem = {
  queryMngStatic: {
    url: `${SERVE_NAME}/screenDisplay/selectStaticDataPage`,
    method: "post",
    desc: "查询",
  },
  insertMngStatic: {
    url: `${SERVE_NAME}/screenDisplay/insertMngStatic`,
    method: "post",
    desc: "新增",
  },
  updateMngStatic: {
    url: `${SERVE_NAME}/screenDisplay/updateMngStatic`,
    method: "post",
    desc: "修改",
  },
  delMngStatic: {
    url: `${SERVE_NAME}/screenDisplay/delete`,
    method: "post",
    desc: "删除",
  },
}

// 控制规则
export const controlRuleApi: IApiMapItem = {
  ctlRuleSelectPage: {
    url: `${SERVE_NAME}/command/selectPage`,
    method: "post",
    desc: "查询",
  },
  updatectlRules: {
    url: `${SERVE_NAME}/command/upateBatch`,
    method: "post",
    desc: "修改",
  },
  insertctlRule: {
    url: `${SERVE_NAME}/command/add`,
    method: "post",
    desc: "添加",
  },
  delctlRule: {
    url: `${SERVE_NAME}/command/delete`,
    method: "post",
    desc: "删除",
  },
  ctlRuleExportTemplate: {
    url: `${SERVE_NAME}/command/importTemplate`,
    method: "post",
    responseType: "blob",
    desc: "导出",
  },
  ctlRuleExportData: {
    url: `${SERVE_NAME}/command/export`,
    method: "post",
    responseType: "blob",
    desc: "导出",
  },
  ctlRuleImportData: {
    url: `${SERVE_NAME}/command/import`,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data;charset=UTF-8",
    },
    desc: "导入",
  },
}
// 时序库迁移规则
export const timeRuleApi: IApiMapItem = {
  queryDeviceList: {
    url: `${SERVE_NAME}/iotdb/queryDeviceList`,
    method: "get",
    desc: "查询",
  },
  queryMeasurement: {
    url: `${SERVE_NAME}/iotdb/queryMeasurement`,
    method: "post",
    desc: "修改",
  },
  migrateDevice: {
    url: `${SERVE_NAME}/iotdb/migrateDevice`,
    method: "post",
    desc: "新增",
  },
  queryPage: {
    url: `${SERVE_NAME}/iotdb/queryPage`,
    method: "post",
    desc: "查询",
  },
  export: {
    url: `${SERVE_NAME}/iotdb/export`,
    method: "post",
    responseType: "blob",
    desc: "导出",
  },
}
// 虚拟点规则
export const virtualRuleApi: IApiMapItem = {
  selectFormulaV2: {
    url: `${SERVE_NAME}/mngFormulaV2/selectFormulaV2`,
    method: "post",
    desc: "查询",
  },
  addMngFormulaV2: {
    url: `${SERVE_NAME}/mngFormulaV2/addMngFormulaV2`,
    method: "post",
    desc: "新增",
  },
  updateMngFormulaV2: {
    url: `${SERVE_NAME}/mngFormulaV2/updateMngFormulaV2`,
    method: "post",
    desc: "修改",
  },
  delete: {
    url: `${SERVE_NAME}/mngFormulaV2/delete`,
    method: "post",
    desc: "删除",
  },
  batchDelete: {
    url: `${SERVE_NAME}/mngFormulaV2/batchDelete`,
    method: "post",
    desc: "批量删除",
  },
  updateEnable: {
    url: `${SERVE_NAME}/mngFormulaV2/updateEnable`,
    method: "post",
    desc: "批量删除",
  },
  exportDate: {
    url: `${SERVE_NAME}/mngFormulaV2/exportDate`,
    method: "post",
    responseType: "blob",
    desc: "导出",
  },
  exportTemplate: {
    url: `${SERVE_NAME}/mngFormulaV2/exportTemplate`,
    method: "post",
    responseType: "blob",
    desc: "导出模板",
  },
  importData: {
    url: `${SERVE_NAME}/mngFormulaV2/importData`,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data;charset=UTF-8",
    },
    desc: "导入",
  },
}

// 电气图管理
export const eleDiagramApiMap: IApiMapItem = {
  getSvgFileList: {
    url: `${SERVE_NAME}/static/stationSvg/getSvgFileList`,
    method: "get",
    desc: "查询",
  },
  deleteFile: {
    url: `${SERVE_NAME}/static/deleteFile`,
    method: "post",
    desc: "删除",
  },
  upload: {
    url: `${SERVE_NAME}/static/upload`,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data;charset=UTF-8",
    },
    desc: "导入",
  },
  batchUpload: {
    url: `${SERVE_NAME}/static/batchUpload`,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data;charset=UTF-8",
    },
    desc: "批量导入",
  },
  download: {
    url: `${SERVE_NAME}/static/download`,
    method: "post",
    responseType: "blob",
    desc: "导出",
  },
  batchDownload: {
    url: `${SERVE_NAME}/static/batchDownload`,
    method: "post",
    responseType: "blob",
    desc: "批量导出",
  },
}
// 音频管理
export const audioApiMap: IApiMapItem = {
  getAudioFileList: {
    url: `${SERVE_NAME}/static/stationSvg/getAudioFileList`,
    method: "get",
    desc: "查询",
  },
}
//设备管理
export const pageIndexApiMap: IApiMapItem = {
  deviceUpdate: {
    url: `${SERVE_GATEWAY}/device/update`,
    method: "post",
    desc: "更新设备",
  },
  updateDeviceTags: {
    url: `${SERVE_GATEWAY}/device/updateDeviceTags`,
    method: "post",
    desc: "批量更新设备tags",
  },
  deviceSelectByPage: {
    url: `${SERVE_GATEWAY}/device/selectByPage`,
    method: "post",
    desc: "分页查询设备信息",
  },
  deviceInsert: {
    url: `${SERVE_GATEWAY}/device/insert`,
    method: "post",
    desc: "添加设备",
  },
  deviceImportData: {
    url: `${SERVE_GATEWAY}/device/importData`,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data;charset=UTF-8",
    },
    desc: "导入数据",
  },
  deviceExportTemplate: {
    url: `${SERVE_GATEWAY}/device/exportTemplate`,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data;charset=UTF-8",
    },
    desc: "导入模板",
  },
  deviceExportData: {
    url: `${SERVE_GATEWAY}/device/exportData`,
    method: "post",
    responseType: "blob",
    desc: "导出数据",
  },
  deviceDelete: {
    url: `${SERVE_GATEWAY}/device/delete/{id}`,
    method: "post",
    desc: "根据id删除设备",
  },
  deviceBatchUpdate: {
    url: `${SERVE_GATEWAY}/device/batchUpdate`,
    method: "post",
    desc: "批量更新设备",
  },
  batchInsert: {
    url: `${SERVE_GATEWAY}/device/batchInsert`,
    method: "post",
    desc: "批量新增设备",
  },
  deviceBatchDelete: {
    url: `${SERVE_GATEWAY}/device/batchDelete`,
    method: "post",
    desc: "批量删除设备",
  },
  getStationDeviceTree: {
    url: `${SERVE_GATEWAY}/device/getStationDeviceTree`,
    method: "get",
    desc: "获取场站-设备树",
  },
  detail: {
    url: `${SERVE_GATEWAY}/device/detail/{id}`,
    method: "get",
    desc: "根据ID查询设备信息",
  },
}
//场站管理
export const stationManageApiMap: IApiMapItem = { 
  stationUpdate: {
    url: `${SERVE_GATEWAY}/station/update`,
    method: "post",
    desc: "批量更新场站",
  },
  stationInsert: {
    url: `${SERVE_GATEWAY}/station/insert`,
    method: "post",
    desc: "新增场站",
  },
  stationImportData: {
    url: `${SERVE_GATEWAY}/station/importData`,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data;charset=UTF-8",
    },
    desc: "场站数据导入",
  },
  stationFindStation: {
    url: `${SERVE_GATEWAY}/station/findStation`,
    method: "post",
    desc: "根据条件查询场站",
  },
  stationExportTemplate: {
    url: `${SERVE_GATEWAY}/station/exportTemplate`,
    method: "post",
    responseType: "blob",
    desc: "场站数据模板导出",
    
  },
  stationExportData: {
    url: `${SERVE_GATEWAY}/station/exportData`,
    method: "post",
    responseType: "blob",
    desc: "场站数据导出",
  },
  stationBatchDelete: {
    url: `${SERVE_GATEWAY}/station/batchDelete`,
    method: "post",
    desc: "批量删除场站",
  },
}
//设备型号管理
export const deviceModelApiMap: IApiMapItem = { 
  deviceModelUpdate: {
    url: `${SERVE_GATEWAY}/deviceModel/update`,
    method: "post",
    desc: "批量更新设备型号",
  },
  deviceModelSelectByPage: {
    url: `${SERVE_GATEWAY}/deviceModel/selectByPage`,
    method: "post",
    desc: "分页查询设备型号",
  },
  deviceModelInsert: {
    url: `${SERVE_GATEWAY}/deviceModel/insert`,
    method: "post",
    desc: "添加一个新的设备型号",
  },
  deviceModelImportData: {
    url: `${SERVE_GATEWAY}/deviceModel/importData`,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data;charset=UTF-8",
    },
    desc: "导入数据",
  },
  deviceModelExportData: {
    url: `${SERVE_GATEWAY}/deviceModel/exportData`,
    method: "post",
    responseType: "blob",
    desc: "导出数据",
  },
  deviceModelDelete: {
    url: `${SERVE_GATEWAY}/deviceModel/delete/{id}`,
    method: "post",
    desc: "根据id删除设备型号",
  },
  deviceModelBatchDelete: {
    url: `${SERVE_GATEWAY}/deviceModel/batchDelete`,
    method: "post",
    desc: "批量删除设备型号",
  },
  deviceModelById: {
    url: `${SERVE_GATEWAY}/deviceModel/{id}`,
    method: "get",
    desc: "根据id查询设备型号",
  },
  deviceModelDeviceType: {
    url: `${SERVE_GATEWAY}/deviceModel/deviceType`,
    method: "get",
    desc: "查询所有的设备类型",
  },
}
//设备协议管理
export const deviceProtocolApiMap: IApiMapItem = { 
  deviceProtocolUpdate: {
    url: `${SERVE_GATEWAY}/protocol/update`,
    method: "post",
    desc: "更新设备协议",
  },
  deviceProtocolUpdateByModel: {
    url: `${SERVE_GATEWAY}/protocol/updateByModel`,
    method: "post",
    desc: "根据场站-型号更新设备协议",
  },
  deviceProtocolQueryPage: {
    url: `${SERVE_GATEWAY}/protocol/queryPage`,
    method: "post",
    desc: "分页查询设备协议",
  },
  deviceProtocolQueryByModel: {
    url: `${SERVE_GATEWAY}/protocol/queryByModel`,
    method: "post",
    desc: "根据型号查询设备协议",
  },
  deviceProtocolInsert: {
    url: `${SERVE_GATEWAY}/protocol/insert`,
    method: "post",
    desc: "添加一个新的设备协议",
  },
  deviceProtocolImportTemplate: {
    url: `${SERVE_GATEWAY}/protocol/importTemplate`,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data;charset=UTF-8",
    },
    desc: "导入模板",
  },
  deviceProtocolImportData: {
    url: `${SERVE_GATEWAY}/protocol/importData`,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data;charset=UTF-8",
    },
    desc: "导入数据",
  },
  deviceProtocolExportData: {
    url: `${SERVE_GATEWAY}/protocol/exportData`,
    method: "post",
    responseType: "blob",
    desc: "导出数据",
  },
  deviceProtocolDelete: {
    url: `${SERVE_GATEWAY}/protocol/delete/{id}`,
    method: "post",
    desc: "根据id删除设备协议",
  },
  deviceProtocolBatchDelete: {
    url: `${SERVE_GATEWAY}/protocol/batchDelete`,
    method: "post",
    desc: "批量删除设备协议",
  },
  deviceProtocolById: {
    url: `${SERVE_GATEWAY}/protocol/{id}`,
    method: "get",
    desc: "根据id查询设备协议",
  },
}
//测点管理
export const pointApiMap: IApiMapItem = { 
  pointUpdate: {
    url: `${SERVE_GATEWAY}/dataPoint/update`,
    method: "post",
    desc: "修改测点",
  },
  pointUpdateBatch: {
    url: `${SERVE_GATEWAY}/dataPoint/updateBatch`,
    method: "post",
    desc: "批量修改测点",
  },
  pointSave: {
    url: `${SERVE_GATEWAY}/dataPoint/save`,
    method: "post",
    desc: "新增测点",
  },
  pointQueryPage: {
    url: `${SERVE_GATEWAY}/dataPoint/queryPage `,
    method: "post",
    desc: "分页查询测点",
  },
  pointDataImportData: {
    url: `${SERVE_GATEWAY}/dataPoint/importData`,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data;charset=UTF-8",
    },
    desc: "批量导入测点数据",
  },
  pointExportData: {
    url: `${SERVE_GATEWAY}/dataPoint/exportData`,
    method: "post",
    responseType: "blob",
    desc: "批量导出测点数据",
  },
  pointDelete: {
    url: `${SERVE_GATEWAY}/dataPoint/delete/{id}`,
    method: "post",
    desc: "删除测点",
  },
  pointBatchDelete: {
    url: `${SERVE_GATEWAY}/dataPoint/batchDelete`,
    method: "post",
    desc: "批量删除测点",
  },
  pointQueryByDeviceCode: {
    url: `${SERVE_GATEWAY}/dataPoint/queryByDeviceCode/{deviceCode}`,
    method: "get",
    desc: "根据设备编码查询测点",
  },
  pointQueryPointByDeviceCode: {
    url: `${SERVE_GATEWAY}/dataPoint/queryPointByDeviceCode/{deviceCode}`,
    method: "get",
    desc: "根据设备编码查询测点",
  },
}
//测点地址
export const pointAddressApiMap: IApiMapItem = { 
  pointAddressSelectByPage: {
    url: `${SERVE_GATEWAY}/devicePointAddressMapping/selectByPage`,
    method: "post",
    desc: "分页查询设备测点地址映射",
  },
  pointAddressDetail: {
    url: `${SERVE_GATEWAY}/devicePointAddressMapping/detail/{id}`,
    method: "get",
    desc: "根据ID查询详情",
  },
  pointAddressInsert: {
    url: `${SERVE_GATEWAY}/devicePointAddressMapping/insert`,
    method: "post",
    desc: "新增",
  },
  pointAddressUpdate: {
    url: `${SERVE_GATEWAY}/devicePointAddressMapping/update`,
    method: "post",
    desc: "编辑",
  },
  pointAddressDelete: {
    url: `${SERVE_GATEWAY}/devicePointAddressMapping/delete/{id}`,
    method: "post",
    desc: "删除",
  },
  pointAddressBatchDelete: {
    url: `${SERVE_GATEWAY}/devicePointAddressMapping/batchDelete`,
    method: "post",
    desc: "批量删除",
  },
  pointAddressExportTemplate: {
    url: `${SERVE_GATEWAY}/devicePointAddressMapping/exportTemplate`,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data;charset=UTF-8",
    },
    desc: "下载导入模板",
  },
  pointAddressExportData: {
    url: `${SERVE_GATEWAY}/devicePointAddressMapping/exportData`,
    method: "post",
    responseType: "blob",
    desc: "导出",
  },
  pointAddressImportData: {
    url: `${SERVE_GATEWAY}/devicePointAddressMapping/importData`,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data;charset=UTF-8",
    },
    desc: "导入",
  },
}
//设备拆分
export const deviceSplitApiMap: IApiMapItem = {
  deviceSplitQueryPage: {
    url: `${SERVE_GATEWAY}/configDeviceSplit/queryPage`,
    method: "post",
    desc: "分页查询设备拆分",
  },
  deviceSplitDetail: {
    url: `${SERVE_GATEWAY}/configDeviceSplit/detail/{id}`,
    method: "get",
    desc: "根据ID查询详情",
  },
  deviceSplitSelectList: {
    url: `${SERVE_GATEWAY}/configDeviceSplit/selectList`,
    method: "post",
    desc: "按条件查询所有匹配的设备拆分配置（不分页）",
  },
  deviceSplitSave: {
    url: `${SERVE_GATEWAY}/configDeviceSplit/save`,
    method: "post",
    desc: "新增一条设备拆分配置（源设备编码+目标设备编码唯一）",
  },
  deviceSplitBatchSave: {
    url: `${SERVE_GATEWAY}/configDeviceSplit/batchSave`,
    method: "post",
    desc: "批量新增设备拆分配置（存在则更新，不存在则插入）",
  },
  deviceSplitUpdate: {
    url: `${SERVE_GATEWAY}/configDeviceSplit/update`,
    method: "post",
    desc: "根据ID更新设备拆分配置",
  },
  deviceSplitBatchUpdate: {
    url: `${SERVE_GATEWAY}/configDeviceSplit/batchUpdate`,
    method: "post",
    desc: "批量更新设备拆分配置（存在则更新，不存在则插入）",
  },
  deviceSplitDelete: {
    url: `${SERVE_GATEWAY}/configDeviceSplit/delete/{id}`,
    method: "post",
    desc: "根据主键ID删除单条设备拆分配置",
  },
  deviceSplitBatchDelete: {
    url: `${SERVE_GATEWAY}/configDeviceSplit/batchDelete`,
    method: "post",
    desc: "根据ID列表批量删除设备拆分配置",
  },
  deviceSplitExportTemplate: {
    url: `${SERVE_GATEWAY}/configDeviceSplit/exportTemplate`,
    method: "post",
    responseType: "blob",
    desc: "下载Excel导入模板（含表头：主键ID、源设备编码、目标设备编码、IOA地址区间、备注）",
  },
  deviceSplitExportData: {
    url: `${SERVE_GATEWAY}/configDeviceSplit/exportData`,
    method: "post",
    responseType: "blob",
    desc: "按条件导出设备拆分配置为Excel文件",
  },
  deviceSplitImportData: {
    url: `${SERVE_GATEWAY}/configDeviceSplit/importData`,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data;charset=UTF-8",
    },
    desc: "导入设备拆分配置数据",
  },
}
//目标服务器
export const serviceRelayApiMap: IApiMapItem = { 
  serviceRelayQueryPage: {
    url: `${SERVE_GATEWAY}/serviceRelay/queryPage`,
    method: "post",
    desc: "分页查询设备服务继电器",
  },
  serviceRelayUpdate: {
    url: `${SERVE_GATEWAY}/serviceRelay/update`,
    method: "post",
    desc: "更新设备服务继电器",
  },
  serviceRelayInsert: {
    url: `${SERVE_GATEWAY}/serviceRelay/insert`,
    method: "post",
    desc: "新增设备服务继电器",
  },
  serviceRelayImportTemplate: {
    url: `${SERVE_GATEWAY}/serviceRelay/importTemplate`,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data;charset=UTF-8",
    },
    desc: "导入模板",
  },
  serviceRelayImportDate: {
    url: `${SERVE_GATEWAY}/serviceRelay/importData`,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data;charset=UTF-8",
    },
    desc: "批量导入设备服务继电器",
  },
  serviceRelayExportDate: {
    url: `${SERVE_GATEWAY}/serviceRelay/exportData`,
    method: "post",
    responseType: "blob",
    desc: "批量导出设备服务继电器",
  },
  serviceRelayDelete: {
    url: `${SERVE_GATEWAY}/serviceRelay/delete/{id}`,
    method: "post",
    desc: "删除设备服务继电器",
  },
  serviceRelayBatchDelete: {
    url: `${SERVE_GATEWAY}/serviceRelay/batchDelete`,
    method: "post",
    desc: "批量删除设备服务继电器",
  },
  serviceRelayGetList: {
    url: `${SERVE_GATEWAY}/serviceRelay/selectList`,
    method: "get",
    desc: "查询设备服务继电器",
  },
  serviceRelaySelectById: {
    url: `${SERVE_GATEWAY}/serviceRelay/selectById/{id}`,
    method: "get",
    desc: "根据ID查询设备服务继电器",
  },
}
//业务常量  公共配置管理
export const configBusinessApiMap: IApiMapItem = { 
  constantUpdate: {
    url: `${SERVE_GATEWAY}/config/update`,
    method: "post",
    desc: "更新公共配置",
  },
  configQueryPage: {
    url: `${SERVE_GATEWAY}/config/queryPage`,
    method: "post",
    desc: "分页查询业务常量",
  },
  configInsert: {
    url: `${SERVE_GATEWAY}/config/insert`,
    method: "post",
    desc: "新增公共配置",
  },
  configImportTemplate: {
    url: `${SERVE_GATEWAY}/config/importTemplate`,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data;charset=UTF-8",
    },
    desc: "导入公共配置模板",
  },
  configImportData: {
    url: `${SERVE_GATEWAY}/config/importData`,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data;charset=UTF-8",
    },
    desc: "批量导入公共配置",
  },
  configExportData: {
    url: `${SERVE_GATEWAY}/config/exportData`,
    method: "post",
    responseType: "blob",
    desc: "批量导出公共配置",
  },
  configDeleteBatch: {
    url: `${SERVE_GATEWAY}/config/deleteBatch`,
    method: "post",
    desc: "批量删除公共配置",
  },
  configDeleteById: {
    url: `${SERVE_GATEWAY}/config/delete/{id}`,
    method: "post",
    desc: "删除公共配置",
  },
  configSeletctById: {
    url: `${SERVE_GATEWAY}/config/selectById/{id}`,
    method: "get",
    desc: "根据ID查询公共配置",
  },
  configSeletctByType: {
    url: `${SERVE_GATEWAY}/config/selectByBusinessType/{businessType}`,
    method: "get",
    desc: "根据业务类型查询公共配置",
  },
}
//设备测点-转发
export const devicePointApiMap: IApiMapItem = { 
  devicePointQueryPage: {
    url: `${SERVE_GATEWAY}/dataPointRelay/queryPage`,
    method: "post",
    desc: "分页查询设备测点-转发",
  },
  devicePointUpdate: {
    url: `${SERVE_GATEWAY}/dataPointRelay/update`,
    method: "post",
    desc: "更新设备测点-转发",
  },
  devicePointSelectById: {
    url: `${SERVE_GATEWAY}/dataPointRelay/selectById/{id}`,
    method: "post",
    desc: "根据id查询设备测点模板-转发",
  },
  devicePointInsert: {
    url: `${SERVE_GATEWAY}/dataPointRelay/insert`,
    method: "post",
    desc: "新增设备测点-转发",
  },
  devicePointImportData: {
    url: `${SERVE_GATEWAY}/dataPointRelay/importData`,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data;charset=UTF-8",
    },
    desc: "导入数据",
  },
  devicePointExportData: {
    url: `${SERVE_GATEWAY}/dataPointRelay/exportData`,
    method: "post",
    responseType: "blob",
    desc: "导出数据",
  },
  devicePointDeleteBatch: {
    url: `${SERVE_GATEWAY}/dataPointRelay/deleteBatch`,
    method: "post",
    desc: "批量删除",
  },
  devicePointdeleteByid: {
    url: `${SERVE_GATEWAY}/dataPointRelay/delete/{id}`,
    method: "post",
    desc: "删除",
  },
}
