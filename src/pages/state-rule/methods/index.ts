/*
 * @Author: chenmeifeng
 * @Date: 2025-07-29 16:26:37
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-08-14 14:50:37
 * @Description:
 */
import { doBaseServer } from "@/api/serve-funs"
import { IFormInst, TFormItemConfig } from "@/components/custom-form/types"
import { dealDownload4Response } from "@/utils/file-funs"
import { getStorage, isEmpty, showMsg, validOperate, validResErr } from "@/utils/util-funs"
import { AxiosResponse } from "axios"
import { IPageSearch, ISearchFr, IStateRuleList } from "../types"
import { getCurDeviceModel } from "@/pages/setting-power-line/methods"
import { getTypeStationList } from "@/utils/device-funs"
import { IPageInfo } from "@/types/i-table"
import { StorageStnDvsType, StorageDeviceType } from "@/configs/storage-cfg"
import { IStnDvsType4LocalStorage } from "@/types/i-device"
import { IPageData } from "@/types/i-config"

export async function onSetStRuleSchFormChg(
  changedValue: ISearchFr,
  formInst: IFormInst,
): Promise<TFormItemConfig<any>> {
  const [chgedKey, chgedVal] = Object.entries(changedValue || {})?.[0] || []
  if (!["stationId", "deviceType"].includes(chgedKey) || isEmpty(chgedVal)) return {}
  const theFormInst = formInst?.getInst()
  if (chgedKey === "stationId") {
    const deviceTypesOfSt = getStorage<IStnDvsType4LocalStorage[]>(StorageStnDvsType)
    const deviceTypes = getStorage(StorageDeviceType) || []
    const items = deviceTypesOfSt.find((e) => e.stationId == chgedVal)
    const deviceTypeOptions = getIntersection(items?.deviceTypes || [], chgedVal, deviceTypes)
    return { deviceType: { options: deviceTypeOptions }, modelId: { options: [] } }
  }
  if (chgedKey === "deviceType") {
    theFormInst?.setFieldsValue({ modelId: null })
    const res = await doBaseServer("getAllDeviceModel", { deviceType: chgedVal })
    if (validResErr(res)) return { modelId: { options: [] } }
    const models = res?.map((i) => {
      return {
        value: i.id,
        label: i.model,
      }
    })
    return { modelId: { options: models } }
  }
  return {}
}

export const getStateRuleData = async (pageInfo?: IPageInfo, formData?: ISearchFr) => {
  if (!formData.modelId) {
    showMsg("请选择型号")
    return { records: [], total: 0 }
  }
  const params = {
    pageNum: pageInfo.current,
    pageSize: pageInfo.pageSize,
    modelId: formData.modelId,
    // enabled: true,
  }
  const res = await doBaseServer<IPageSearch, IPageData<IStateRuleList>>("getMngFormulaPage", params)
  if (validResErr(res)) return null
  const formula = res.records?.[0]?.formula ? JSON.parse(res.records?.[0]?.formula) : []
  const sortedByState = sortByState([...formula], "subStateCode")
  console.log(sortedByState, "sortedByState")

  const records = sortedByState?.map((i, idx) => {
    return {
      ...i,
      modelId: res.records?.[0]?.modelId,
      id: res.records?.[0]?.id,
      idx: idx + 1,
    }
  })
  return { records: records || [], total: res.total }
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

export const addRule = async (params, editType = "add") => {
  const api = editType === "add" ? "addMngFormula" : "updateMngFormula"
  const res = await doBaseServer(api, params)
  console.log(res, "sdf")
}

export const delStateRule = async (data = [], currentInfo) => {
  // 如果过滤后的数字长度小于1，那么删除这条数据
  const list = data?.filter((i) => i.idx !== currentInfo.idx)
  const api = list?.length ? "updateMngFormula" : "stateRuleDelete"
  const params = {
    pointName: "df",
    modelId: currentInfo.modelId,
    id: currentInfo.id,
    formula: JSON.stringify(list),
  }
  const delPrams = {
    idList: [currentInfo.id],
  }
  const res = await doBaseServer(api, list?.length ? params : delPrams)
  return validOperate(res)
}
export const exportTemplate = async (data) => {
  const params = {
    modelId: data.modelId,
  }
  doBaseServer<any, AxiosResponse>("exportMngFormula", params).then((data) => {
    dealDownload4Response(data, "导出表.xlsx")
  })
}

export const importFile = async (formData) => {
  const res = await doBaseServer("stateRuleImportData", formData)
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
      return {
        key: index + 1,
        value: JSON.parse(i),
      }
    })
    return { ...prev }
  }, {})
  return resultSign
}
export const processExpression = (str) => {
  return str.replace(/ in signState/g, "").replace(/\s/g, "")
}

const sortByState = (arr, field) => {
  return arr.sort((a, b) => {
    return parseInt(a[field]) - parseInt(b[field])
  })
}
