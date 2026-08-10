/*
 * @Author: chenmeifeng
 * @Date: 2024-12-16 10:47:55
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2024-12-16 11:30:46
 * @Description:
 */
import { doBaseServer, doNoParamServer } from "@/api/serve-funs"
// import { STATION_DATA_MAP } from "@/store/atom-station"
import { IPageInfo } from "@/types/i-table.ts"
import { validOperate, validResErr } from "@/utils/util-funs"

import { IUserListParam } from "../types"
import { TModalType } from "@/types/i-config"
import { dealDownload4Response } from "@/utils/file-funs"
import { AxiosResponse } from "axios"
import { TTreeOptions } from "@/types/i-antd"
import { message } from "antd"

// 执行数据查询
export async function getSettingUserSchData(pageInfo?: IPageInfo, formData?: any) {
  //先检查formData是否有场站，否则返回
  if (!formData?.stationId) return message.error("请选择场站！")
  const params = {
    pageNum: pageInfo?.current,
    pageSize: pageInfo?.pageSize,
    deviceCode: formData?.deviceCode,
    stationId: formData?.stationId,
    modelId: formData?.modelId && Number(formData?.modelId),
    protocolType: formData?.protocolType,
    state: formData?.state && Number(formData?.state)
  }
  // const res = await doBaseServer<IUserListParam>("deviceProtocolQueryPage", params)
  const resEx = await doBaseServer<any>("deviceProtocolQueryByModel", params)
  if (validResErr(resEx)) return null
  const records = handleProtocolTreeData(resEx)
  // return { records: res.records || [], total: res.records?.length }
  return { records: records || [], total: records?.length }
}

function handleProtocolTreeData(data: any[]) { 
  let records = []
  data.forEach((item) => {
    records.push(...item.modelProtocolList)
  })
  const handleRes = Array.from(
    new Map(
      records.map((item, index) => [item.modelId, { id: 'parent_' + index, modelId: item.modelId, children: [] }])
    ).values()
  )
  handleRes.forEach((item) => {
    records.forEach((i) => {
      if(item.modelId == i.modelId) {
        item.children.push(...i.protocolList)
      }
    })
  })
  return handleRes || []
}

export const addUserMethods = async (data: any, type: TModalType, selectRowInfo?: any) => {
  const api = type == "add" ? "deviceProtocolInsert" : selectRowInfo?.deviceCode ? "deviceProtocolUpdate" : "deviceProtocolUpdateByModel"
  const res = await doBaseServer<any>(api, data)
  return validOperate(res)
}

export const getDeviceType = async () => {
  const res = await doNoParamServer<any>("deviceModelDeviceType")
  return res
}

export const importFile = async (formData) => {
  const res = await doBaseServer("deviceProtocolImportData", formData)
  return validOperate(res)
}

export const exportFile = async (formData) => {
  doBaseServer<any, AxiosResponse>("deviceProtocolExportData", formData).then((data) => {
    dealDownload4Response(data, "导出表.xlsx")
  })
}

export const getStation = async () => {
  const params = {
    pageNum: 1,
    pageSize: 100,
  }
  const res = await doBaseServer("stationFindStation", params)
  
  if (validResErr(res)) return null
  return { records: res || [], total: res?.total }
}

export const getModel = async () => {
  const params = {
    pageNum: 1,
    pageSize: 100,
  }
  const res = await doBaseServer("deviceModelSelectByPage", params)
  
  if (validResErr(res)) return null
  return { records: res?.records || [], total: res?.total }
}
export const getStationDeviceTree = async () => {
  const res = await doNoParamServer("getStationDeviceTree")
  const treeData = handleTreeData(res as any[])
  return treeData
}

const handleTreeData = (data: any[]) => {
  if (!Array.isArray(data)) return [];

  return data.map((station) => ({
    title: station.stationName,
    key: station.stationId,
    ...station,
    children: Array.isArray(station.modelList)
      ? station.modelList.map((model) => ({
          title: model.modelName,
          key: model.modelId,
          ...model,
          children: Array.isArray(model.deviceInfoList)
            ? model.deviceInfoList.map((device) => ({
                title: device.deviceName,
                key: device.deviceId,
                ...device,
              }))
            : [],
        }))
      : [],
  }))
}

export const getDeviceCodeList = async (params) => {
  const res = await doBaseServer<IUserListParam>("deviceSelectByPage", params)
  if (validResErr(res)) return null
  return { records: res?.records || [], total: res?.total }
}

export const udPwMethods = async (data: any) => {
  const res = await doBaseServer<any>("updatePwdUser", data)
  return validOperate(res)
}

export const delUserMethods = async (data: any) => {
  const res = await doBaseServer<any>("deviceProtocolBatchDelete", data)
  return validOperate(res)
}

export function stationModelDeviceTree(deviceList) {
  return deviceTrform(deviceList, "deviceId", "deviceNumber", true)
}
export function deviceTrform(
  deviceList,
  key = "deviceId",
  title = "deviceNumber",
  parentDisableCheck = false,
): TTreeOptions {
  return deviceList.reduce((acc: TTreeOptions, cur) => {
    const info = acc?.filter((i) => i.modelId === cur.modelId)
    if (!info?.length) {
      acc.push({
        key: cur.modelId + "模型",
        title: cur.model,
        value: cur.modelId + "模型",
        selectable: false,
        disabled: parentDisableCheck,
        children: [],
        modelId: cur.modelId,
      })
    }
    acc?.forEach((i) => {
      if (i.modelId === cur.modelId) {
        i.children.push({
          key: cur[key],
          value: cur[key],
          title: cur[title],
          label: cur[title],
          modelId: cur.modelId,
        })
      }
    })
    return acc
  }, [])
}
