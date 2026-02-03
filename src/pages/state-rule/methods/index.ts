/*
 * @Author: chenmeifeng
 * @Date: 2025-07-29 16:26:37
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2026-01-08 15:26:02
 * @Description:
 */
import { doBaseServer } from "@/api/serve-funs"
import { IFormInst, TFormItemConfig } from "@/components/custom-form/types"
import { dealDownload4Response } from "@/utils/file-funs"
import { getStorage, isEmpty, showMsg, validOperate, validResErr } from "@/utils/util-funs"
import { AxiosResponse } from "axios"
import { IPageSearch, ISearchFr, IStateRuleList } from "../types"
import { getCurDeviceModel } from "@/pages/setting-power-line/methods"
import { getStAllDeviceModel, getTypeStationList } from "@/utils/device-funs"
import { IPageInfo } from "@/types/i-table"
import { StorageStnDvsType, StorageDeviceType } from "@/configs/storage-cfg"
import { IStnDvsType4LocalStorage } from "@/types/i-device"
import { IPageData } from "@/types/i-config"
import { getModel } from "@/pages/setting-point-sys/methods"

export async function onSetStRuleSchFormChg(
  changedValue: ISearchFr,
  formInst: IFormInst,
): Promise<TFormItemConfig<any>> {
  const [chgedKey, chgedVal] = Object.entries(changedValue || {})?.[0] || []
  if (!["stationId", "deviceType"].includes(chgedKey) || isEmpty(chgedVal)) return {}
  const theFormInst = formInst?.getInst()
  if (chgedKey === "stationId") {
    const oneTypeModelList = await getStAllDeviceModel(chgedVal)
    const deviceTypesOfSt = getStorage<IStnDvsType4LocalStorage[]>(StorageStnDvsType)
    const deviceTypes = getStorage(StorageDeviceType) || []
    const items = deviceTypesOfSt.find((e) => e.stationId == chgedVal)
    const deviceTypeOptions = getIntersection(items?.deviceTypes || [], chgedVal, deviceTypes)
    theFormInst?.setFieldsValue({
      modelId: oneTypeModelList?.length ? oneTypeModelList[0].value : undefined,
    })
    return { modelId: { options: oneTypeModelList }, deviceType: { options: deviceTypeOptions } }
  }
  if (chgedKey === "deviceType") {
    const stnId = theFormInst?.getFieldValue("stationId")
    const dvsPoint = await getModel(chgedVal, stnId)
    theFormInst?.setFieldsValue({
      modelId: dvsPoint?.length ? dvsPoint[0].value : undefined,
    })

    return { modelId: { options: dvsPoint } }
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

  //todo：模板编辑时候也需要获取formula，value:1大状态，value:2小状态
  //此时可以返回所有records，然后根据currentTab进行过滤
  const mStateRecord = res.records.find((item) => (item as any).pointName == 'MState')
  const sStateRecord = res.records.find((item) => (item as any).pointName == 'SState')
  const formula = formData.currentTab == '1' ?  mStateRecord?.formula //MState
                  : formData.currentTab == '2' ? sStateRecord?.formula : []//SState
  const sortedByState = formula && formula.length && sortByState([...formula], "priority")// 按优先级排序


  // const sortedByState1 = formula.length && sortByState([...formula.find(item=>(item as any).pointName == 'SState').formula], "priority")

  console.log('states===', mStateRecord,sStateRecord,)
  const records = sortedByState && sortedByState?.map((i, idx) => {
    return {
      ...i,
      modelId: res.records?.[0]?.modelId,
      id: i?.id || formula?.[0]?.id || (formData.currentTab == '1' ? mStateRecord?.id : sStateRecord?.id),
      idx: idx + 1,
      index: i.index || idx + 1,
    }
  })
  return { records: records || [], total: records && records.length, id: res.records?.[0]?.id || '' }
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
export const extractVariables = (formula: any) => {
  const variableRegex = /[a-zA-Z_][a-zA-Z0-9@_.]*/g
  const keywords = ["ABS", "null", "true", "false"]
  const allVariables = new Set<string>()

  formula?.length &&
    formula.forEach((item: any) => {
      if (item.rule) {
        const matches = item.rule.match(variableRegex)

        // 过滤出有效的变量名
        const variables =
          matches?.filter(
            (match: string) =>
              !keywords.includes(match) && // 不是关键字
              isNaN(Number(match)) && // 不是纯数字
              !/[+\-*/=<>!&|]/.test(match), // 不包含运算符
          ) || []

        // 将变量添加到集合中（自动去重）
        variables.forEach((variable) => allVariables.add(variable))
      }
    })

  return Array.from(allVariables).join(",")
}
export const addRule = async (params, editType = "add") => {
  const api = editType === "add" ? "addMngFormula" : "updateMngFormula"
  const res = await doBaseServer(api, params)
  return res
}
export const handleBatchApply = async (data = [], checkedItemsIds = [], modelId, type = "edit", param) => {
  const api = type == "edit" ? "updateMngFormula" : "addMngFormula" //如果目标设备型号下的recods为空，那么就添加
  const params = {
    pointName: "df",
    modelId: modelId,
    id: data[0].id,
    formula: data,
  }
  let res = null
  if (type == "edit") {
    res = await doBaseServer(api, params)
  } else {
    res = await doBaseServer(api, param)
  }
  return validOperate(res)
}
export const handleBatchDel = async (data = [], checkedItemsIds = [], pointName) => {
  const list = data?.filter((i) => !checkedItemsIds.includes(i.idx))
  const api = "updateMngFormula"
  const params = {
    pointName: pointName,
    modelId: data[0].modelId,
    id: data[0].id,
    formula: list,
  }
  console.log(params, "params")
  const res = await doBaseServer(api, params)
  return validOperate(res)
}

export const delStateRule = async (data = [], currentInfo, pointName) => {
  // 如果过滤后的数字长度小于1，那么删除这条数据
  const list = data?.filter((i) => i.idx !== currentInfo.idx)
  const api = list?.length ? "updateMngFormula" : "stateRuleDelete"
  const params = {
    pointName: pointName,
    modelId: currentInfo.modelId,
    id: currentInfo.id,
    formula: list,
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

const sortByState = (arr, field) => {
  return arr.sort((a, b) => {
    return parseInt(a[field]) - parseInt(b[field])
  })
}
