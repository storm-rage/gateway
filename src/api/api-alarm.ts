import { IApiMapItem } from "@/types/i-api"

const SERVE_NAME = "/devicemng"

export const alarmRuleApi: IApiMapItem = {
  customAlarm: {
    url: `${SERVE_NAME}/alarmRule/select`,
    method: "post",
    // param_field: "hybrid",
    desc: "告警规则-自定义规则查询",
  },
  customAlarmSave: {
    url: `${SERVE_NAME}/alarmRule/insertBatch`,
    method: "post",
    desc: "告警规则-自定义规则新增",
  },
  customAlarmUpdate: {
    url: `${SERVE_NAME}/alarmRule/updateRules`,
    method: "post",
    desc: "告警规则-自定义规则修改",
  },
  customAlarmDelete: {
    url: `${SERVE_NAME}/alarmRule/deleteBatch`,
    method: "post",
    desc: "告警规则-自定义规则删除",
  },
  pointLastedValue: {
    url: `/defenses/customAlarm/pointValue`,
    method: "post",
    desc: "告警规则-测点最新值查询",
  },
}

// 厂家告警
export const mftAlarmApi: IApiMapItem = {
  mftAlarm: {
    url: `${SERVE_NAME}/alarmMap/queryMapByModel`,
    method: "post",
    desc: "告警规则厂家告警查询",
  },
  mftAlarmSave: {
    url: `${SERVE_NAME}/alarmMap/insert`,
    method: "post",
    desc: "告警规则-厂家告警新增",
  },
  mftAlarmUpdate: {
    url: `${SERVE_NAME}/alarmMap/updateBatch`,
    method: "post",
    desc: "告警规则-厂家告警修改",
  },
  mftAlarmDelete: {
    url: `${SERVE_NAME}/alarmMap/deleteBatch`,
    method: "post",
    desc: "告警规则-厂家告警删除",
  },
  mftExportTemplate: {
    url: `${SERVE_NAME}/alarmMap/exportTemplate`,
    method: "post",
    responseType: "blob",
    desc: "导出",
  },
  mftExportData: {
    url: `${SERVE_NAME}/alarmMap/exportData`,
    method: "post",
    responseType: "blob",
    desc: "导出",
  },
  mftImportData: {
    url: `${SERVE_NAME}/alarmMap/importData`,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data;charset=UTF-8",
    },
    desc: "导入",
  },
}
// 五防规则
export const alarmFiveRuleApi: IApiMapItem = {
  fiveRuleAlarm: {
    url: `${SERVE_NAME}/rule/selectPage`,
    method: "post",
    desc: "查询",
  },
  fiveRuleSave: {
    url: `${SERVE_NAME}/rule/insert`,
    method: "post",
    desc: "新增",
  },
  fiveRuleUpdate: {
    url: `${SERVE_NAME}/rule/update`,
    method: "post",
    desc: "修改",
  },
  fiveRuleDelete: {
    url: `${SERVE_NAME}/rule/delete`,
    method: "post",
    desc: "删除",
  },
  fiveRuleExport: {
    url: `${SERVE_NAME}/rule/exportData`,
    method: "post",
    responseType: "blob",
    desc: "导出",
  },
}

//状态规则
export const stateRuleApi: IApiMapItem = {
  getMngFormulaPage: {
    url: `${SERVE_NAME}/mngFormula/getMngFormulaPage`,
    method: "post",
    desc: "查询",
  },
  addMngFormula: {
    url: `${SERVE_NAME}/mngFormula/addMngFormula`,
    method: "post",
    desc: "新增",
  },
  updateMngFormula: {
    url: `${SERVE_NAME}/mngFormula/updateMngFormula`,
    method: "post",
    desc: "修改",
  },
  stateRuleDelete: {
    url: `${SERVE_NAME}/mngFormula/deleteBatch`,
    method: "post",
    desc: "删除",
  },
  exportMngFormula: {
    url: `${SERVE_NAME}/mngFormula/exportMngFormula`,
    method: "post",
    responseType: "blob",
    desc: "导出",
  },
  stateRuleImportData: {
    url: `${SERVE_NAME}/mngFormula/importData`,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data;charset=UTF-8",
    },
    desc: "导入",
  },
}
