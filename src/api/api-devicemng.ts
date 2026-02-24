/*
 * @Author: chenmeifeng
 * @Date: 2025-04-29 14:29:44
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-07-08 10:13:27
 * @Description:
 */
import { IApiMapItem } from "@/types/i-api.ts"

const SERVE_NAME = "/devicemng"
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
