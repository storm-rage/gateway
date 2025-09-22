/*
 * @Author: chenmeifeng
 * @Date: 2024-08-29 10:55:17
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-07-08 13:42:56
 * @Description:
 */
import { IPageInfo } from "@/types/i-table"
import { getDvsMeasurePointsPageData } from "@/utils/device-funs"
import { AlarmSerForm, IAlarmRuleLs, IPointSch, IQueryAlarmRuleParams } from "../types/table"
import { doBaseServer, doRecordServer } from "@/api/serve-funs"
import { showMsg, validOperate, validResErr } from "@/utils/util-funs"
import { IEditFormData, ISchForm } from "../types/form"
let allPointList = []
export const getAlarmRuleSchData = async (pageInfo: IPageInfo, formData: AlarmSerForm) => {
  const params = {
    pageNum: pageInfo.current,
    pageSize: pageInfo.pageSize,
    deviceIds: formData.deviceIds,
  }
  const res = await doBaseServer<IQueryAlarmRuleParams>("customAlarm", params)
  if (validResErr(res)) return { records: [], total: 0 }
  return { records: res.records, total: res.total }
}
export const initPiontLs = async (pageInfo: IPageInfo, formData: IPointSch) => {
  const { deviceId, pointDesc, exitPointList } = formData
  const { current, pageSize } = pageInfo
  // if (isFirst) {
  //   allPointList = await getDvsMeasurePointsPageData({ deviceId, pointTypes: "2" })
  // }
  // if (allPointList?.length) isFirst = false
  const actualShowPt = pointDesc
    ? exitPointList?.filter((i) => i.pointDesc === pointDesc)
    : exitPointList?.slice((current - 1) * pageSize, current * pageSize)
  return {
    records: actualShowPt,
    total: pointDesc ? actualShowPt?.length : allPointList?.length,
  }
}

export const editAlarmRule = async (formData: ISchForm, devices) => {
  if (!formData.alarmRule?.length) {
    showMsg("请至少填写一条规则")
    return false
  }
  const alarmRule = formData.alarmRule?.reduce((prev, cur, idx) => {
    prev =
      prev +
      `${idx === 0 ? "" : " "}` +
      `${cur.pointName} ${cur.operator} ${cur.value}${idx === formData.alarmRule?.length - 1 ? "" : " " + cur.symbol}`
    return prev
  }, "")

  const params: Array<IEditFormData> = devices.map((i) => {
    return {
      ...formData,
      alarmRule,
      stationId: i.stationId,
      deviceId: i.deviceId,
    }
  })
  console.log(params, "formData")
  const apiKey = formData.id ? "customAlarmUpdate" : "customAlarmSave"
  const res = await doBaseServer<Array<IEditFormData>>(apiKey, params)
  return validOperate(res)
}

// 测点最新值查询
export const queryLastedVals = async (data, devices) => {
  const deviceCode = devices?.[0].deviceCode
  const params = data?.map((i) => {
    return {
      deviceCode,
      pointName: i.pointName,
    }
  })
  const res = await doBaseServer("pointLastedValue", params)

  if (validResErr(res)) return []
  return res.data
}

// 批量删除规则
export const batchDelRules = async (ids) => {
  const res = await doBaseServer("customAlarmDelete", { idList: ids })
  return validOperate(res)
}
