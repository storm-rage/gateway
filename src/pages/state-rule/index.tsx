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
import { useAtomValue } from "jotai"
import React, { useEffect, useRef, useState } from "react"

import CustomForm from "@/components/custom-form"
import { IFormInst } from "@/components/custom-form/types.ts"
import CustomModal from "@/components/custom-modal"
import RemoveContent from "@/components/custom-modal/components/remove-content"
import CustomTable from "@/components/custom-table"
import useTableSelection from "@/hooks/use-table-selection"
import { AtomStation } from "@/store/atom-station"
import { showMsg } from "@/utils/util-funs"
import {
  delStateRule,
  handleBatchDel,
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
import { STATE_ATT_COLUMNS, STATE_RULE_FORM_ITEMS, STATE_RULE_SCH_FORM_BTNS } from "./configs"
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
  // 设置选中的一条数据
  const [selectRowInfo, setSelectRowInfo] = useState<stateInfo>()
  const [currentId, setCurrentId] = useState(undefined) // 当前列表的id

  const { stationOptions4Id } = useAtomValue(AtomStation)
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
  async function onFormAction(type) {
    setSelectRowInfo(null)
    setCurrentId(undefined)
    const formData = formRef.current?.getFormValues()
    if (type === "add" && modelId) {
      await searchTable()
      setCurrentId(dataSource?.[0]?.id)
      setIsModalOpen(type)
      setIsEditOrAdd("add")
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
    </div>
  )
}
