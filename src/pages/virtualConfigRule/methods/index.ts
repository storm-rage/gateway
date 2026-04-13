/*
 * @Author: chenmeifeng
 * @Date: 2024-01-08 13:50:48
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-10-29 17:36:22
 * @Description:
 */
import { doBaseServer } from "@/api/serve-funs"
import { IFormInst, TFormItemConfig } from "@/components/custom-form/types"
import { IPageData } from "@/types/i-config"
import { IDvsMeasurePointData } from "@/types/i-device"
import { IPageInfo } from "@/types/i-table"
import { queryDevicesByParams, getStAllDeviceModel } from "@/utils/device-funs"
import { getStorage, validOperate, validResErr, deviceTrform } from "@/utils/util-funs"
import { getModel } from "@/pages/setting-point-sys/methods"
import { StorageStnDvsType, StorageDeviceType } from "@/configs/storage-cfg"
import { IStnDvsType4LocalStorage } from "@/types/i-device"

import { IPointSysInfo, IStPiontSysListParam, TStPiontSysFormField } from "../types"
import { dealDownload4Response } from "@/utils/file-funs"
import { AxiosResponse } from "axios"
let refleshFlag = true // 记录是否需要调用查询接口，true表示调用，false表示用dvsMeasurePoints存储的数据，目的是为了刷新最新数据
// let dvsMeasurePoints = []
// 执行数据查询
export async function getCtlRuleSchData(pageInfo?: IPageInfo, formData?) {
  let stationData = JSON.parse(localStorage.getItem("stationData"))
  const deviceList = await queryDevicesByParams({ stationCode: stationData.stationList.find((i) => i.id == formData?.stationId)?.stationCode })
  console.log(formData,'===formData')
  const params = {
    pageSize: pageInfo.pageSize,
    pageNum: pageInfo.current,
    // modelIds: formData?.modelIds,
    // stationId: formData?.stationId,
    // controlType: formData?.controlType,
    // stationCode: stationData.stationList.find((i) => i.id == formData?.stationId)?.stationCode,
    // deviceType: formData?.deviceType,
    "deviceCode": deviceList.find(item => formData?.deviceIds == item.deviceId)?.deviceCode || '',
    "deviceType": formData?.deviceType,
    "pointName": "",
    "pointType": "",
    "enabled": null,
    "modelId": ''
  }
  const res = await doBaseServer<any, IPageData<any>>("selectFormulaV2", params)
  if (validResErr(res)) return null
  console.log('res=', res)
  return { records: res.records || [], total: res.total }
}


export const getTimeDevices = async (chgedVal, formData) => {
  let stationData = JSON.parse(localStorage.getItem("stationData"))
  const params = {
    stationCode: stationData.stationList.find((i) => i.id == formData?.stationId)?.stationCode,
    deviceType: formData?.deviceType,
  }
  // const deviceList = await queryDevicesByParams({ stationCode: chgedVal })
  // const list = deviceList?.map((item) => ({ label: item.deviceName, value: item.deviceId }))
  // return list
  const res = await doBaseServer<any, IPageData<any>>("queryDeviceList", params)
  if (validResErr(res)) return null
  console.log('res=', res)
  return res?.map(item => ({ label: `${item.deviceName}-${item.devicePath}`, value: item.devicePath })) || []

  // return { records: res || [], total: res.total }
}

export const handleAddSubmit = async (params, type) => {
  const api = type === 'add' ? 'addMngFormulaV2' : type === 'edit' ?'updateMngFormulaV2' : ''
  const res = await doBaseServer(api, params)
  return res
}

export const getMeasurement = async (devicePath: object) => {
  const res = await doBaseServer("queryMeasurement",devicePath)
  if (validResErr(res)) return []
  const uniqueNames = [...new Set(res?.map(item => item.name) || [])]
  const codes = uniqueNames.map(name => ({ label: name, value: name }))
  return codes

}


export const changeRefleshFlag = (flag) => {
  refleshFlag = flag
}
export async function onSetPointSysSchFormChg(
  changedValue: IStPiontSysListParam,
  formInst: IFormInst,
): Promise<TFormItemConfig<TStPiontSysFormField>> {
  const [chgedKey, chgedVal] = Object.entries(changedValue || {})?.[0] || []
  if (!["stationId"].includes(chgedKey)) return {}
  
  const theFormInst = formInst?.getInst()
  console.log(chgedKey,'====chgedKey')
    // const formInst = formInst?.getInst()
    theFormInst?.setFieldValue("deviceIds", [])
    const formValue: any = theFormInst.getFieldsValue()
    const deviceTypeMap = {}
    if (chgedKey === "stationId") {
      // const dvsTypeOptionsOfStn = dvsTypeInfoOfStnMap[chgedVal]

      const deviceType = theFormInst?.getFieldValue("deviceType")
      const currentTypeModelList = await getModel(deviceType, chgedVal)
      const deviceTypesOfSt = getStorage<IStnDvsType4LocalStorage[]>(StorageStnDvsType)
      const deviceTypes = getStorage(StorageDeviceType) || []
      const items = deviceTypesOfSt.find((e) => e.stationId == chgedVal)
      const deviceTypeOptions = getIntersection(items?.deviceTypes || [], chgedVal, deviceTypes)
      console.log(deviceTypeOptions,'===deviceTypeOptions stationId',deviceTypes)

      const dvsOptions = await commonDealDevice(null, formValue, deviceTypeMap)
      theFormInst?.setFieldsValue({ deviceType: undefined })
      console.log(dvsOptions,'===dvsOptions')
      return { deviceIds: { options: dvsOptions }, deviceType: { options: deviceTypeOptions } }
    }
    // if (chgedKey === "deviceIds") {
    //   const dvsOptions = await commonDealDevice(chgedVal, formValue, deviceTypeMap)
    //   return { deviceIds: { options: dvsOptions } }
    // }
  return {}
}

const commonDealDevice = async (chgedVal, formValue, deviceTypeMap) => {
  let schParams = {}
  if (!chgedVal) {
    schParams = { stationId: formValue.stationId }
  } else {
    schParams = { stationId: formValue.stationId, deviceType: chgedVal || null }
  }
  const dvsList = await queryDevicesByParams(schParams, deviceTypeMap)
  const dvsOptions = deviceTrform(dvsList)
  return dvsOptions
}

const getIntersection = (data = [], stationIds, dvsTypes = []) => {
  if (!data.length) return []
  const newData = data.map((item) => ({
    label: dvsTypes?.find((i) => i.code === item)?.name || item,
    value: item,
    stationIds,
  }))

  return newData
}

// export const getDevices = async (chgedVal) => {
//   const deviceList = await queryDevicesByParams({ stationCode: chgedVal })
//   const list = deviceList?.map((item) => ({ label: item.deviceName+'-'+item.devicePath, value: item.deviceId }))
//   return list
// }

export const getControlType = async () => {
  const res = await doBaseServer("getControlType")
  if (validResErr(res)) return []
  const list = res?.map((item) => ({ label: item.name, value: item.id }))
  return list
}
export const saveRuleData = async (data, name) => {
  const changeSysList = data.filter((i) => i.edit)?.map((i) => ({ ...i, operatorBy: name }))
  if (!changeSysList.length) return Promise.resolve(false)
  const res = await doBaseServer<IPointSysInfo>("updatectlRules", changeSysList)
  return validOperate(res)
}

export const addRuleMethods = async (data, name) => {
  console.log(data, "data")

  const params = Object.keys(data)?.reduce((prev, cur) => {
    prev[cur] = data[cur]
    return prev
  }, {})
  const res = await doBaseServer<any>("insertctlRule", { ...params, operatorBy: name })
  return validOperate(res)
}

export const exportData = async (formData) => {
  
  doBaseServer<any, AxiosResponse>("exportDate", formData).then((data) => {
    dealDownload4Response(data, "导出表.xlsx")
  })
}
export const exportTemplate = async () => {
  doBaseServer<any, AxiosResponse>("ctlRuleExportTemplate").then((data) => {
    dealDownload4Response(data, "导出表.xlsx")
  })
}

export const importFile = async (formData) => {
  const res = await doBaseServer("importData", formData)
  return validOperate(res)
}
export const delRuleSingle = async(data) => {
  const res = await doBaseServer<any>("delete", { id: data.id })
  return validOperate(res)
}
export const delRuleMethods = async (data: any) => {
  const params = {
    idList: data?.map((i) => i.id) || [],
  }
  const res = await doBaseServer<any>("batchDelete", params)
  return validOperate(res)
}
export const handleBatchDisable = async (data: any) => {
  const params = {
    idList: data?.map((i) => i.id) || [],
    enable: false
  }
  const res = await doBaseServer<any>("updateEnable", params)
  return validOperate(res)
}
export const handleBatchEnable = async (data: any) => {
  const params = {
    idList: data?.map((i) => i.id) || [],
    enable: true
  }
  const res = await doBaseServer<any>("updateEnable", params)
  return validOperate(res)
}
export const reverseParseSign = (signStr) => {
  // const de = `"124" in signState ||`
  const reverseData = processExpression(signStr)
  const res = reverseData?.endsWith("||") || reverseData.endsWith("&&") ? reverseData.slice(0, -2) : reverseData
  const data =
    res
      ?.split("||")
      ?.filter((i) => i)
      ?.map((i) => (i.includes("(") ? i.trim().slice(1, -1) : i.trim()))
      ?.map((j) => j.split("&&")) || []
  const resultSign = data?.reduce((prev, cur, idx) => {
    prev[idx + 1] = cur.map((i, index) => {
      const match = i.match(/['"]([^'"]+)['"]/)
      const value = match ? match[1] : i
      return {
        key: index + 1,
        value: value,
      }
    })
    return { ...prev }
  }, {})
  return resultSign
}
export const processExpression = (str) => {
  return str.replace(/ in signState/g, "").replace(/\s/g, "")
}
