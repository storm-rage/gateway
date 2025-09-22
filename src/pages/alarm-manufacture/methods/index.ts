/*
 * @Author: chenmeifeng
 * @Date: 2024-01-08 13:50:48
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-06-27 17:33:20
 * @Description:
 */
import { doBaseServer, doNoParamServer } from "@/api/serve-funs"
import { IFormInst, TFormItemConfig } from "@/components/custom-form/types"
import { StorageDeviceType, StorageStnDvsType } from "@/configs/storage-cfg"
import { IPageData, TDeviceType } from "@/types/i-config"
import { IDvsModelMap, IStnDvsType4LocalStorage } from "@/types/i-device"
import { IPageInfo } from "@/types/i-table"
import { getDeviceModelMap, getDvsMeasurePointsPageData, getStAllDeviceModel } from "@/utils/device-funs"
import { getStorage, validOperate, validResErr } from "@/utils/util-funs"

import { IModelRuleInfo, IMdRuleParam, TStPiontSysFormField } from "../types"
import { dealDownload4Response } from "@/utils/file-funs"
import { AxiosResponse } from "axios"
let belongList = []
// 执行数据查询
export async function getSettingStIdexSchData(pageInfo?: IPageInfo, formData?) {
  const params = {
    modelId: formData.modelId,
    pageSize: pageInfo.pageSize,
    pageNum: pageInfo.current,
  }
  const dvsMeasurePoint = await doBaseServer<IMdRuleParam, IPageData<IModelRuleInfo>>("mftAlarm", params)
  const records = dvsMeasurePoint.records?.map((i) => {
    return {
      ...i,
      id: i.modelId + "_" + i.alarmId + "_" + i.alarmDesc,
    }
  })
  return { records: records || [], total: dvsMeasurePoint.total }
}
export async function onSetPointSysSchFormChg(
  changedValue: IMdRuleParam,
  formInst: IFormInst,
): Promise<TFormItemConfig<TStPiontSysFormField>> {
  const [chgedKey, chgedVal] = Object.entries(changedValue || {})?.[0] || []
  if (!["stationId"].includes(chgedKey)) return {}
  const theFormInst = formInst?.getInst()
  if (chgedKey === "stationId") {
    const oneTypeModelList = await getStAllDeviceModel(chgedVal)
    theFormInst?.setFieldsValue({
      modelId: oneTypeModelList?.length ? oneTypeModelList[0].value : undefined,
    })
    return { modelId: { options: oneTypeModelList } }
  }
  return {}
}

export const saveMftRuleData = async (data) => {
  const changeSysList = data.filter((i) => i.edit)
  if (!changeSysList.length) return Promise.resolve(false)
  const res = await doBaseServer<IModelRuleInfo>("mftAlarmUpdate", changeSysList)
  return validOperate(res)
}

// 归属系统下拉
export const getAllBelongSystem = async () => {
  if (belongList?.length) return belongList
  const res = await doNoParamServer<any>("getSubSystemTypeData")
  if (validResErr(res)) return []
  belongList =
    res?.map((i) => {
      return { label: i.name, value: i.id }
    }) || []
  return belongList
}

// 获取设备型号风/光/储
export const getDeciveMode = async () => {
  const { typeToOptionsMap } = await getDeviceModelMap()
  // const typeList = ["WT", "PVINV", "ESPCS"]
  const typeList = getStorage(StorageDeviceType)?.map((i) => i.code)
  const arr = typeList.map((i) => typeToOptionsMap?.[i] || []).reduce((prevx, cur) => prevx.concat(cur), [])
  // console.log(arr, typeToOptionsMap, "arr")
  // const oneTypeModelList = typeToOptionsMap[chgedVal]
  return { allModelList: arr }
}
export const addAlarmMethods = async (data: any) => {
  const res = await doBaseServer<any>("mftAlarmSave", data)
  return validOperate(res)
}

export const delUserMethods = async (data: any) => {
  const res = await doBaseServer<any>("mftAlarmDelete", data)
  return validOperate(res)
}

export const exportData = async (formData) => {
  doBaseServer<any, AxiosResponse>("mftExportData", formData).then((data) => {
    dealDownload4Response(data, "导出表.xlsx")
  })
}
export const exportTemplate = async () => {
  doBaseServer<any, AxiosResponse>("mftExportTemplate").then((data) => {
    dealDownload4Response(data, "导出表.xlsx")
  })
}

export const importFile = async (formData) => {
  const res = await doBaseServer("mftImportData", formData)
  return validOperate(res)
}
