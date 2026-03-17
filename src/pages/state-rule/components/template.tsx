/*
 *@Author: chenmeifeng
 *@Date: 2023-10-19 15:30:40
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2026-01-09 10:08:26
 *@Description: 删除内容
 */

import "./template.less"
import { Button, Space, Tabs } from "antd"

import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react"

import SelectOrdinary from "@/components/select-ordinary"
import TEMPLATE_OPTION from "../configs/point-json"
import { TDeviceType } from "@/types/i-config"
import { getDvsMeasurePointsData } from "@/utils/device-funs"
import { IDvsMeasurePointData } from "@/types/i-device"
import CustomTable from "@/components/custom-table"
import { TEMPLATE_ADD_COLUMNS, TEMPLATE_RESULT_COLUMNS } from "../configs/template"
import { showMsg } from "@/utils/util-funs"
import { stateInfo } from "../types"
import { addRule, extractVariables } from "../methods"
import StateRuleForm, { IStRuleFormProps } from "./form"
import CustomModal from "@/components/custom-modal"
import { doBaseServer } from "@/api/serve-funs"
interface TemplateChooseRef {}
interface IProps {
  deviceType: TDeviceType
  modelId: number
  tableSource: Array<stateInfo>
  templateModal: boolean
  btnClkCallback: (type) => void
  pointName: string
}
interface dataList {
  id: string
  originKey: string
  desc: string
  actualKey: string
  exist: boolean
}
const filterOption = (input, option) => ((option?.label as string) ?? "").toLowerCase().includes(input.toLowerCase())
const TemplateChoose = forwardRef<TemplateChooseRef, IProps>((props, ref) => {
  const { deviceType = "WT", modelId, tableSource, templateModal, btnClkCallback, pointName } = props
  const stepChgRef = useRef(() => {})
  const [currentStep, setCurrentStep] = useState(1)
  const [template, setTemplate] = useState("")
  const [loading, setLoading] = useState(false)
  const [exitPointList, setExitPointList] = useState<IDvsMeasurePointData[]>([])
  const [dataSourceList, setDataSourceList] = useState<dataList[]>([])
  const [column, setColumn] = useState([])
  const [replacePointsRes, setReplacePointsRes] = useState<any>([])
  const [isModalOpen, setIsModalOpen] = useState("")
  const [selectRowInfo, setSelectRowInfo] = useState<stateInfo>()

  const [currentTab, setCurrentTab] = useState('1')
  const [tabItems, setTabItems] = useState([
    {
      key: '1',
      label: '大状态',
    },
    {
      key: '2',
      label: '小状态',
    },
  ])
  const onTabChange = (key) => { 
    console.log('ontabchange',key)
    setCurrentTab(key)
    setTemplate(key)
  }

  const uniqueOptions = useMemo(() => {
    return (TEMPLATE_OPTION[deviceType] || []).map((item, index) => ({
      ...item,
      value: `${item.value}_${index}`,
      // 或者保留原始 value 在 extra 字段
      originalValue: item.value,
    }))
  }, [deviceType])
  const handleChange = (uniqueValue: string) => {
    const selected = uniqueOptions.find(opt => opt.value === uniqueValue)
    setTemplate(selected?.originalValue || '')
  }
  const setDataSource = ({ record, value, valkey }) => {
    const newData = [...dataSourceList]
    const index = newData.findIndex((item) => record.id === item.id)
    const item = newData[index]
    newData.splice(index, 1, {
      ...item,
      actualKey: value,
    })
    setDataSourceList(newData)
  }

  // 向外暴露的接口
  useImperativeHandle(ref, () => ({
    setStep: stepChgRef.current,
  }))

  const btnClk = (type: "save" | "close" | "reset" | "next" | "last") => {
    if (type === "next") {
      if (!template) return
      if (currentStep === 2 && !validateNone()) return
      if (currentStep === 2) getRepalcePoints()
      setCurrentStep((prev) => prev + 1)
    } else if (type === "reset") {
      if (currentStep === 1) setTemplate("")
      if (currentStep === 2) getInitDataSource()
    } else if (type === "save") {
      saveTemplate()
    } else if (type === "last") {
      setCurrentStep((prev) => prev - 1)
    } else if (type === "close") {
      btnClkCallback?.("close")
    }
  }
  const getUnrepeatKeys = (str) => {
    const arr = []
    str.split(",")?.forEach((i) => {
      if (i) {
        arr.push(i.split("@")[0])
      }
    })
    return [...new Set(arr)]
  }

  const currentTemplate = useMemo(() => {
    return TEMPLATE_OPTION[deviceType].find((i) => i.value === template)
  }, [template])
  const templatePointName = useMemo(() => {
    return TEMPLATE_OPTION[deviceType].find((i) => i.value == template)?.pointName
  }, [template])
  const getPoints = async () => {
    setLoading(true)
    const res = await getDvsMeasurePointsData({ modelId: modelId, pointTypes: "1,2" })
    setExitPointList(res)
    setLoading(false)
  }
  const getInitDataSource = () => {
    const point = getUnrepeatKeys(currentTemplate.input_points) || []
    const timestamp = new Date().getTime()
    const result = point?.map((i,index) => {
      const info = exitPointList.find((j) => j.pointName === i)
      return {
        id: i + timestamp,
        index: index + 1,
        originKey: i,
        desc: info?.pointDesc,
        actualKey: i,
        exist: info ? true : false,
      }
    })
    const res = JSON.parse(JSON.stringify(result))
    setDataSourceList(res)
  }

  const validateNone = () => {
    const length = dataSourceList?.filter((i) => !i.actualKey)?.length
    if (!length) return true
    showMsg("状态配置测点存在未配置的测点，请检查")
    return false
  }
  function replaceRuleFields(rule: string, list: dataList[]): string {
    let result = rule

    // 按长度降序排序，避免短字段名替换影响长字段名
    const sortedList = [...list].sort((a, b) => b.originKey.length - a.originKey.length)

    for (const item of sortedList) {
      // 使用正则表达式匹配字段名，确保匹配完整的单词，避免部分匹配
      const regex = new RegExp(`\\b${item.originKey}\\b`, "g")
      result = result.replace(regex, item.actualKey)
    }

    return result
  }
  const getRepalcePoints = async () => {
    const formula = JSON.parse(JSON.stringify(currentTemplate.formula))
    const replaceResult = formula?.reduce((acc, cur, idx) => {
      const rule = replaceRuleFields(cur.rule, dataSourceList)
      cur.rule = rule
      cur.id = tableSource.length && tableSource[0].id
      cur.index = idx+1
      acc.push(cur)
      return acc
    }, [])
    setReplacePointsRes(replaceResult)
  }
  const handleDataSource = async() => {
    let queryParams = {
      modelId,
      pageNum: 1,
      pageSize: 50
    }
    let api = 'getMngFormulaPage'
    const res = await doBaseServer(api, queryParams)
    const resRecord = res.records.find(item => item.pointName == templatePointName)
    return {
      targetTableSource: resRecord?.formula.map((i,idx)=>{
        return {
          ...i,
          modelId: res.records?.[0]?.modelId,
          id: resRecord?.id || '',
          idx: idx + 1,
          index: idx + 1,
        }
      }),
      id: resRecord?.id || '',
    }
  }

  const saveTemplate = async () => {
    //根据模板类型进行保存到对应的状态列表中
    let {targetTableSource, id } = await handleDataSource()
    const type = !targetTableSource ? "add" : "edit"
    replacePointsRes.forEach(item => {
      item.id = id
    })
    const editTypeForm = type === "edit" ? (targetTableSource as any)?.concat(replacePointsRes) : []
    const formula = type === "add" ? replacePointsRes : editTypeForm
    const params = {
      id: id,
      modelId,
      enabled: true,
      formula: formula,
      inputPoints: extractVariables(formula),
      pointName: templatePointName,
    }
    try {
      await addRule(params, type)
      btnClkCallback?.("ok")
    } catch (error) {
      console.log(error)
    }
  }
  const onTbAction = (record, { key }) => {
    console.log(key, record, "type")
    setSelectRowInfo(record)
    setIsModalOpen(key)
    // if (type === "edit")
  }
  const btnClkRef = (type, info) => {
    setIsModalOpen("")
    if (type === "ok") {
      const index = replacePointsRes.findIndex((i,index) => index+1 === info.index)
      const beforeArr = replacePointsRes.slice(0, index)
      const afterArr = replacePointsRes.slice(index + 1)
      console.log([...beforeArr, info, ...afterArr])

      setReplacePointsRes([...beforeArr, { ...info, id: selectRowInfo.id }, ...afterArr])
    }
  }
  useEffect(() => {
    if (template && currentTemplate) {
      getInitDataSource()
    }
  }, [template, currentTemplate, exitPointList])

  useEffect(() => {
    setColumn(TEMPLATE_ADD_COLUMNS(setDataSource, exitPointList))
  }, [dataSourceList, exitPointList])

  useEffect(() => {
    if (modelId) getPoints()
  }, [modelId])

  useEffect(() => {
    if (templateModal) {
      setReplacePointsRes([])
    }
  }, [templateModal])

  return (
    <div className="template-wrap">
      <div className="template-content">
        {currentStep === 1 ? (
          <div className="step-one">
            <span>选择模板：</span>
            {/* <SelectOrdinary options={uniqueOptions} value={template} onChange={(e) => setTemplate(e)} /> */}
            <SelectOrdinary 
              options={uniqueOptions}
              value={uniqueOptions.find(opt => opt.originalValue === template)?.value}
              onChange={handleChange} 
            />
          </div>
        ) : currentStep === 2 ? (
          <CustomTable rowKey="id" limitHeight columns={column} dataSource={dataSourceList} pagination={false} />
        ) : (
          <div className="tab-box">
          {/* <Tabs defaultActiveKey="1" items={tabItems} onChange={onTabChange} className="tabs"/> */}
          <CustomTable
            rowKey="id"
            limitHeight
            columns={TEMPLATE_RESULT_COLUMNS({ onClick: onTbAction }, template)}
            dataSource={replacePointsRes}
            pagination={false}
          />
          </div>
        )}
      </div>
      <div className="step-footer">
        <Space>
          {currentStep === 3 ? (
            <>
              <Button size="small" children={"上一步"} onClick={() => btnClk("last")} />
              <Button size="small" type="primary" children="保存" disabled={loading} onClick={() => btnClk("save")} />
            </>
          ) : (
            <>
              <Button size="small" children={"下一步"} disabled={loading} onClick={() => btnClk("next")} />
              <Button size="small" children={"重置"} onClick={() => btnClk("reset")} />
            </>
          )}

          <Button size="small" children={"取消"} onClick={() => btnClk("close")} />
        </Space>
      </div>
      <CustomModal<IStRuleFormProps>
        width="80%"
        title={isModalOpen === "see" ? "查看" : "编辑"}
        destroyOnClose
        open={isModalOpen === "edit" || isModalOpen === "see"}
        footer={null}
        onCancel={() => {
          setIsModalOpen("")
          setSelectRowInfo(null)
        }}
        Component={StateRuleForm}
        componentProps={{
          tableSource: tableSource,
          buttonClick: btnClkRef,
          editType: "edit",
          deviceType: deviceType,
          modelId: modelId,
          selectRowInfo: selectRowInfo,
          showBottom: false,
          currentId: null,
          currentTab: template,
        }}
      />
    </div>
  )
})

export default TemplateChoose
