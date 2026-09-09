/*
 * @Author: chenmeifeng
 * @Date: 2024-12-03 14:09:47
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-07-31 15:03:51
 * @Description: 集中合并各个模块的接口信息
 */

import { IApiMapItem } from "@/types/i-api.ts"
import { controlApiMap } from "./api-modal"
import { ssoApiMap } from "./api-sso"
import { manageApiMap } from "./api-manage"
import { configApiMap, lineApi, periodApi, stationApiMap } from "./api-setting"
import {
  settingApiMap,
  dataPointApiMap,
  regionCompany,
  projectCompany,
  deviceModel,
  planQuantityApiMap,
  deviceApiMap,
  eamDvsApi,
  staticMngApiMap,
  controlRuleApi,
  timeRuleApi,
  virtualRuleApi,
  eleDiagramApiMap,
  audioApiMap,
  pageIndexApiMap,
  stationManageApiMap,
  deviceModelApiMap,
  deviceProtocolApiMap,
  pointApiMap,
  pointAddressApiMap,
  serviceRelayApiMap,
  configBusinessApiMap,
  devicePointApiMap,
  deviceSplitApiMap,
} from "./api-devicemng"
import { userMngApi } from "./api-user"
import { alarmFiveRuleApi, alarmRuleApi, mftAlarmApi, stateRuleApi } from "./api-alarm"
import { planEcle } from "./api-statistics"
import { dvsSignalApiMap } from "./api-monitor"
const API_LIST = {
  controlApiMap,
  ssoApiMap,
  manageApiMap,
  configApiMap,
  stationApiMap,
  settingApiMap,
  dataPointApiMap,
  regionCompany,
  projectCompany,
  deviceModel,
  userMngApi,
  planQuantityApiMap,
  deviceApiMap,
  alarmRuleApi,
  lineApi,
  periodApi,
  mftAlarmApi,
  alarmFiveRuleApi,
  planEcle,
  eamDvsApi,
  staticMngApiMap,
  stateRuleApi,
  dvsSignalApiMap,
  controlRuleApi,
  timeRuleApi,
  virtualRuleApi,
  eleDiagramApiMap,
  audioApiMap,
  pageIndexApiMap,
  stationManageApiMap,
  deviceModelApiMap,
  deviceProtocolApiMap,
  pointApiMap,
  pointAddressApiMap,
  serviceRelayApiMap,
  configBusinessApiMap,
  devicePointApiMap,
  deviceSplitApiMap,
}

const API_MAP = (function () {
  const result = {
    apiMap: {} as IApiMapItem,
    urlMap: {} as Record<string, string>,
  }
  const { apiMap } = Object.values(API_LIST).reduce((prev, next) => {
    Object.entries(next).forEach(([apiKey, apiInfo]) => {
      if (prev.apiMap[apiKey]) {
        console.error(`有重复的apiKey：`, apiKey, prev.apiMap[apiKey], apiInfo)
        console.warn("将以后者为准")
      }
      prev.apiMap[apiKey] = apiInfo
      if (prev.urlMap[apiInfo?.url as string]) {
        console.error(
          `有重复的apiUrl信息：url:${apiInfo?.url}, apiKey1: ${
            prev.urlMap[apiInfo?.url as string]
          }, apiKey2: ${apiKey}`,
        )
        console.warn("请去除重复的接口信息！")
      }
      prev.urlMap[apiInfo?.url as string] = apiKey
    })
    return prev
  }, result)
  return apiMap
})()

export default API_MAP
