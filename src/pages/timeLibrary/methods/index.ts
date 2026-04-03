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
  
  let target = {key:'',title:null}
  let targetDeviceNewPath = ''
  if(formData.modelIds) {
    let stationData = JSON.parse(localStorage.getItem("stationData"))
    const deviceParams = {
      stationCode: stationData.stationList.find((i) => i.id == formData?.stationId)?.stationCode,
      deviceType: formData?.deviceType,
    }
    const deviceRes = await doBaseServer<any, IPageData<any>>("queryDeviceList", deviceParams)
    const dvsOptions = await commonDealDevice(null, formData, formData.deviceType)
    for (const item of dvsOptions) {
      const found = item.children?.find(i => i.value == formData.modelIds)
      if (found) {
          target = {...found}
          break 
        }
    }
    console.log(target,'===target form',formData.modelIds,deviceRes)
    targetDeviceNewPath = (deviceRes as any).find(i => i.deviceName == target.title).devicePath
  }
  
  const params = {
    pageSize: pageInfo.pageSize,
    pageNum: pageInfo.current,
    oldDevicePath: "",
    newDevicePath: targetDeviceNewPath,
    status: formData.status,
  }
  const res = await doBaseServer<any, IPageData<any>>("queryPage", params)
  if (validResErr(res)) return null
  return { records: res.records|| [], total: res.total }
}



export const getTimeDevices = async (chgedVal, formData) => {
  let stationData = JSON.parse(localStorage.getItem("stationData"))
  const params = {
    stationCode: stationData.stationList.find((i) => i.id == formData?.stationId)?.stationCode,
    deviceType: formData?.deviceType,
  }
  console.log(params,'===getTimeDevices')
  // const deviceList = await queryDevicesByParams({ stationCode: chgedVal })
  // const list = deviceList?.map((item) => ({ label: item.deviceName, value: item.deviceId }))
  // return list
  const res = await doBaseServer<any, IPageData<any>>("queryDeviceList", params)
  if (validResErr(res)) return null
  return (res as any)?.map(item => ({ label: `${item.deviceName}-${item.devicePath}`, value: item.devicePath })) || []
}

export const handleAddSubmit = async (params) => {
  const res = await doBaseServer('migrateDevice',params)
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

export async function onSetPointSysSchFormChgInit(
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
      return { modelIds: { options: dvsOptions }, deviceType: { options: deviceTypeOptions } }
    }
    // if (chgedKey === "deviceIds") {
    //   const dvsOptions = await commonDealDevice(chgedVal, formValue, deviceTypeMap)
    //   return { deviceIds: { options: dvsOptions } }
    // }
  return {}
}

export async function onSetPointSysSchFormChg(
  changedValue: IStPiontSysListParam,
  formInst: IFormInst,
): Promise<TFormItemConfig<TStPiontSysFormField>> {
  const [chgedKey, chgedVal] = Object.entries(changedValue || {})?.[0] || []
  if (!["stationId","deviceType"].includes(chgedKey)) return {}
  
  const formValue: any = formInst?.getInst().getFieldsValue()
  const deviceTypeMap = {}
  const theFormInst = formInst?.getInst()
  console.log('time==',chgedKey, theFormInst)
  if (['stationId'].includes(chgedKey)) {
    const deviceType = theFormInst?.getFieldValue("deviceType")
    const currentTypeModelList = await getModel(deviceType, chgedVal)
    const deviceTypesOfSt = getStorage<IStnDvsType4LocalStorage[]>(StorageStnDvsType)
    const deviceTypes = getStorage(StorageDeviceType) || []
    const items = deviceTypesOfSt.find((e) => e.stationId == chgedVal)
    const deviceTypeOptions = getIntersection(items?.deviceTypes || [], chgedVal, deviceTypes)
    
    const deviceList = await getTimeDevices(chgedVal, {stationId:chgedVal,deviceType:theFormInst.getFieldValue("deviceType")})

    theFormInst?.setFieldsValue({
      modelIds:  undefined,
    })
    // if(!deviceList.length) return { deviceType: { options: deviceTypeOptions } }
    console.log(deviceList,'===11111 stationId')
    return { modelIds: { options: deviceList}, deviceType: { options: deviceTypeOptions } }
  }
  if (['deviceType'].includes(chgedKey)) {
    // const stationId = theFormInst?.getFieldValue("stationId")
    // const currentTypeModelList = await getModel(deviceType, chgedVal)
    // const deviceTypesOfSt = getStorage<IStnDvsType4LocalStorage[]>(StorageStnDvsType)
    // const deviceTypes = getStorage(StorageDeviceType) || []
    // const items = deviceTypesOfSt.find((e) => e.stationId == stationId)
    // const deviceTypeOptions = getIntersection(items?.deviceTypes || [], chgedVal, deviceTypes)
    const deviceList = await getTimeDevices(chgedVal, {stationId:theFormInst.getFieldValue("stationId"),deviceType:chgedVal})
    theFormInst?.setFieldsValue({
      modelIds: undefined,
    })

    console.log(deviceList,'===22222 deviceType')
    return { modelIds: { options: deviceList } }
  }
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
  const params = {
    ...formData,
    // pointTypes: formData.pointTypes?.join(","),
  }
  doBaseServer<any, AxiosResponse>("export", params).then((data) => {
    dealDownload4Response(data, "导出表.xlsx")
  })
}
export const exportTemplate = async () => {
  doBaseServer<any, AxiosResponse>("ctlRuleExportTemplate").then((data) => {
    dealDownload4Response(data, "导出表.xlsx")
  })
}

export const importFile = async (formData) => {
  const res = await doBaseServer("ctlRuleImportData", formData)
  return validOperate(res)
}
export const delRuleMethods = async (data: any) => {
  const params = {
    idList: data?.map((i) => i.id) || [],
  }
  const res = await doBaseServer<any>("delctlRule", params)
  return validOperate(res)
}
