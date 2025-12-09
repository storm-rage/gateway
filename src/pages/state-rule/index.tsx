/*
 * @Author: chenmeifeng
 * @Date: 2025-07-29 15:39:54
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-10-30 10:17:59
 * @Description:
 */
/*
 * @Author: chenmeifeng
 * @Date: 2023-10-17 17:01:13
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-04-23 10:57:35
 * @Description: 功率曲线
 */

import "./index.less"

import usePageSearch from "@hooks/use-page-search.ts"
import { AtomConfigMap } from "@/store/atom-config"
import { useAtomValue } from "jotai"
import React, { useEffect, useRef, useState } from "react"

import { getModel } from "@/pages/setting-point-sys/methods"

import CustomForm from "@/components/custom-form"
import { IFormInst } from "@/components/custom-form/types.ts"
import CustomModal from "@/components/custom-modal"
import RemoveContent from "@/components/custom-modal/components/remove-content"
import CustomTable from "@/components/custom-table"
import CustomAddModal, { IOperateProps, IPerateRef } from "@/components/custom-model-form"
import useTableSelection from "@/hooks/use-table-selection"
import { AtomStation } from "@/store/atom-station"
import { showMsg } from "@/utils/util-funs"
import {
  delStateRule,
  handleBatchDel,
  handleBatchApply,
  exportTemplate,
  getStateRuleData,
  importFile,
  onSetStRuleSchFormChg,
  reverseParseSign, // delWtPowerCurveById,
  // exportData,
  // exportTemplate,
  // geStPwLineSchData,
  // getCurDeviceModel,
  // importFile,
  // insertWtPowerCurve,
  // onSetPWlIineSchFormChg,
} from "./methods/index"
import { TDeviceType } from "@/types/i-config"
import FileImport from "@/components/custom-upload/upload"
import { STATE_ATT_COLUMNS, STATE_RULE_FORM_ITEMS, STATE_RULE_SCH_FORM_BTNS, formItemFuc } from "./configs"
import { ISearchFr, IStateRuleList, TStTbActInfo, stateInfo } from "./types"
import { getCurDeviceModel } from "../setting-power-line/methods"
import StateRuleForm, { IStRuleFormProps } from "./components/form"

const rowSelectProps = {
  needInfo: true,
}
export default function DeviceManage() {
  const formRef = useRef<IFormInst | null>(null)
  //搜索组件数据集合
  const [formList, setFormItemConfig] = useState({})

  const [isModalOpen, setIsModalOpen] = useState("")
  const [isEditOrAdd, setIsEditOrAdd] = useState<"add" | "edit" | "see">("add")
  const [importModal, setImportModal] = useState(false)
  const [batchApplyModal, setBatchApplyModal] = useState(false)
  // 设置选中的一条数据
  const [selectRowInfo, setSelectRowInfo] = useState<stateInfo>()
  const [currentId, setCurrentId] = useState(undefined) // 当前列表的id

  const [modalFormDvsType, setModalFormDvsType] = useState("")

  const { stationOptions4Id } = useAtomValue(AtomStation)

  const { deviceSystemMap, deviceTypeMap } = useAtomValue(AtomConfigMap).map
  
  const [deviceType, setDeviceType] = useState<TDeviceType>()
  const [modelId, setModelId] = useState<number>(null)
  const [searchDvsTyps, setSearchDvsTyps] = useState<TDeviceType>("WT") // 点击查询时候的设备类型

  useEffect(() => {
    // reverseParseSign(11)
    setTimeout(() => {
      const formInst = formRef.current?.getInst()
      formInst?.submit()
    }, 1000)
  }, [stationOptions4Id])

  // 选择框
  const { selectedRowKeys, rowSelection, selectedRows, setSelectedRowKeys, setSelectedRows } =
    useTableSelection(rowSelectProps)

  // 执行查询的钩子
  const { dataSource, loading, pagination, onSearch } = usePageSearch<ISearchFr, stateInfo>(
    { serveFun: getStateRuleData },
    { formRef, needFirstSch: false },
  )

  const onSchValueChgRef = async (changedValue: ISearchFr) => {
    //清空选中的数据
    setSelectedRowKeys([])
    setSelectedRows([])
    setSelectRowInfo(null)
    setCurrentId(undefined)

    if (changedValue.modelId) {
      setModelId(changedValue.modelId)
    }
    const chgOptions = await onSetStRuleSchFormChg(changedValue, formRef.current)
    setFormItemConfig((prevState) => ({ ...prevState, ...chgOptions }))
  }

  const onTbAction = async (record: stateInfo, { key }: TStTbActInfo) => {
    setIsModalOpen(key)
    setSelectRowInfo(record)
    if (key === "edit" || key === "see") {
      setModelId(record.modelId)
      setIsEditOrAdd(key)
    }
  }
  const [modalFormItemConfig, setModalFormItemConfig] = useState({});

  async function onFormAction(type) {
    setSelectRowInfo(null)
    setCurrentId(undefined)
    const formData = formRef.current?.getFormValues()
    if (type === "add" && modelId) {
      await searchTable()
      setCurrentId(dataSource?.[0]?.id)
      setIsModalOpen(type)
      setIsEditOrAdd("add")
    } else if(type === "batchApply") {
      const currentFormData = formRef.current?.getFormValues()
      if(!rowSelection.selectedRowKeys.length) {
        return showMsg("请选择至少一条数据！")
      }
      if (currentFormData?.deviceType) {
        setModalFormDvsType(currentFormData.deviceType)
        
        await formSelectChange.current(
          { deviceType: currentFormData.deviceType },
          setModalFormItemConfig
        )
        setSearchDvsTyps(currentFormData.deviceType)
      }
      setBatchApplyModal(true)

    } else if (type === "batchDel") {
      // 批量删除
      if (!selectedRowKeys.length) {
        showMsg("请至少选择一条！")
        return
      }      
      let obj:stateInfo = null
      if(rowSelection.selectedRowKeys.length == 1) {
        obj = dataSource.find(item => item.idx == rowSelection.selectedRowKeys[0])
        setSelectRowInfo(obj)
      }
      setIsModalOpen("deleted")
    } else if (type === "import") {
      setImportModal(true)
      // const res = await
    } else if (type === "export") {
      exportTemplate(formData)
    }
  }
  const btnClick = useRef(async (type, formData) => {
    if (type === "ok") {
      const res = await importFile(formData)
      if (res) {
        setImportModal(false)
        onSearch()
      }
    } else {
      setImportModal(false)
    }
  })
  const btnClkRef = async (type: "ok" | "close", data?: any) => {
    // 执行
    if (type === "ok") {
      // const res = await insertWtPowerCurve(data, isEditOrAdd)
      // if (!res) return
      setIsModalOpen("")
      setSelectRowInfo(null)
      // setSelectedRowKeys([])
      // setSelectedRows([])
      return searchTable()
    }
    setSelectRowInfo(null)
    if (type === "close") return setIsModalOpen("")
  }
const extractVariables = (formula:any) => { 
    const variableRegex = /[a-zA-Z_][a-zA-Z0-9@_.]*/g; 
    const keywords = ['ABS', 'null', 'true', 'false'];
    const allVariables = new Set<string>();

    formula?.length && formula.forEach((item: any) => {
      if (item.rule) {
        const matches = item.rule.match(variableRegex);
        
        // 过滤出有效的变量名
        const variables = matches?.filter((match: string) => 
          !keywords.includes(match) &&           // 不是关键字
          isNaN(Number(match)) &&                // 不是纯数字
          !/[+\-*/=<>!&|]/.test(match)           // 不包含运算符
        ) || [];
        
        // 将变量添加到集合中（自动去重）
        variables.forEach(variable => allVariables.add(variable));
      }
    });
    
    return Array.from(allVariables).join(',');
  }
const applyBtnClkRef = async (type: "ok" | "close", data?: any) => {
    console.log("applyBtnClkRef===", type, data, 'modelId===',modelId)
    if (type === "ok") {
      
      setBatchApplyModal(false)
      //todo:先查询对应设备型号的modelId的规则列表，然后在选中的规则组装起来,
      // 如果需要继续支持多选设备型号，需要多次请求对应型号的规则数据，问题点接口按分页返回数据，不同分页可能存在相同数据
      let res = await getStateRuleData({current: 1, pageSize: 50}, {modelId: data.modelId})//data.modelId为单选，如果是多选则是数组需要另外处理
      const selectedData = dataSource
        .filter(item => 
          selectedRowKeys.includes(item.idx)
        ).map(item => ({
            ...item,
            modelId: data.modelId,
            // id: res.records[0].id
        }))
        console.log('selectedData===', selectedData)
      //如果得到的res.records为空，则说明没有规则数据，则需要调用新增，把规则数据添加到fomula中
      const removeUnwantedFields = (item) => {
      const { id, idx, index, modelId, ...rest } = item;
        return rest;
      }
      let targetArr = [
        ...res.records.map(removeUnwantedFields),
        ...selectedData.map(removeUnwantedFields)
      ]
      let type = res.records.length > 0 ? 'edit' : 'add'
      let params = {
        id: currentId,
        modelId: data.modelId,
        enabled: true,
        formula: targetArr,
        inputPoints: extractVariables(targetArr),
        pointName: "df",
      }

      handleBatchApply([...targetArr], rowSelection.selectedRowKeys, data.modelId, type, params)
    }
    if (type === "close") {
      setBatchApplyModal(false)
    }
  }

  const searchTable = async () => {
    await onSearch()
    const formInst = formRef.current?.getInst()
    const { deviceType, modelId } = formInst.getFieldsValue()
    setSearchDvsTyps(deviceType)
    setModelId(modelId)
  }

  const delSPBtnClkRef = async (type: "ok" | "close" | "delete_ok") => {
    // 执行
    if (type === "delete_ok") {
      // const dvsType = selectRowInfo?.deviceType || selectedRows?.[0].deviceType
      let res = null
      if(rowSelection.selectedRowKeys.length > 1) {
        res = await handleBatchDel(dataSource, rowSelection.selectedRowKeys)
      } else {
        res = await delStateRule(dataSource, selectRowInfo)
      }
      if (!res) return
      setSelectRowInfo(null)
      setIsModalOpen("")
      setSelectedRowKeys([])
      setSelectedRows([])
      return searchTable()
    }
    setSelectRowInfo(null)
    if (type === "close") return setIsModalOpen("")
  }
  const formSelectChange = useRef(async (changeVal, setFormConfigs) => {
    if (changeVal?.deviceType && changeVal?.deviceType !== modalFormDvsType) {
      const models = await getModel(changeVal?.deviceType)
      
      const chgOptions = { modelId: { options: models } }
      setFormConfigs((prevState) => ({ ...prevState, ...chgOptions }))
      setModalFormDvsType(changeVal?.deviceType)
    }
  })


  const [currentModelOptions, setCurrentModelOptions] = useState([]);

  useEffect(() => {
    const fetchModelOptions = async () => {
    const models = await getModel(searchDvsTyps);
      setCurrentModelOptions(models);
    };
  if (searchDvsTyps) {
    fetchModelOptions();
  }
  },[searchDvsTyps, batchApplyModal])

  return (
    <div className="page-wrap power-line">
      <CustomForm
        ref={formRef}
        loading={loading}
        itemOptionConfig={formList}
        itemOptions={STATE_RULE_FORM_ITEMS}
        buttons={STATE_RULE_SCH_FORM_BTNS}
        formOptions={{
          // validateTrigger: ["onSubmit"],
          onValuesChange: onSchValueChgRef,
        }}
        onSearch={searchTable}
        onAction={onFormAction}
      />
      <CustomTable
        rowKey="idx"
        loading={loading}
        rowSelection={rowSelection}
        limitHeight
        columns={STATE_ATT_COLUMNS({ onClick: onTbAction }, searchDvsTyps)}
        dataSource={dataSource}
        pagination={pagination}
      />
      <CustomModal<IStRuleFormProps>
        width="80%"
        title={isModalOpen === "edit" ? " 编辑" : "查看"}
        destroyOnClose
        open={isModalOpen === "add" || isModalOpen === "edit" || isModalOpen === "see"}
        footer={null}
        onCancel={() => {
          setIsModalOpen("")
          setSelectRowInfo(null)
        }}
        Component={StateRuleForm}
        componentProps={{
          tableSource: dataSource,
          buttonClick: btnClkRef,
          editType: isEditOrAdd,
          deviceType: searchDvsTyps,
          modelId: modelId,
          selectRowInfo: selectRowInfo,
          currentId: currentId,
        }}
      />
      <CustomModal
        title="删除"
        destroyOnClose
        open={isModalOpen === "deleted"}
        footer={null}
        onCancel={() => setIsModalOpen("")}
        Component={RemoveContent}
        componentProps={{ buttonClick: delSPBtnClkRef }}
      />
      <CustomModal
        width="20%"
        title="导入"
        destroyOnClose
        open={importModal}
        footer={null}
        onCancel={() => setImportModal(false)}
        Component={FileImport}
        componentProps={{ btnClick: btnClick.current }}
      />
      <CustomModal
        width="30%"
        title="批量应用"
        destroyOnClose
        open={batchApplyModal}
        footer={null}
        onCancel={() => setBatchApplyModal(false)}
        Component={CustomAddModal}
        componentProps={{ 
          buttonClick: applyBtnClkRef,
          editType: "add",
          formSelectChange: formSelectChange.current,
          FORM_ITEMS: formItemFuc({
              systems: deviceSystemMap,
              deviceTypes: deviceTypeMap,
              currentDvsType:  {
                deviceType: searchDvsTyps,
                modelId: currentModelOptions
              },
            }),
          initialValues: {
            deviceType: searchDvsTyps,
           },
         }}
      />
    </div>
  )
}
