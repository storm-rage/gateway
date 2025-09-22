/*
 * @Author: chenmeifeng
 * @Date: 2024-12-05 17:03:20
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-07-08 11:08:22
 * @Description:平台信息映射管理
 */
import "./index.less"

import usePageSearch from "@hooks/use-page-search.ts"
import React, { useEffect, useRef, useState } from "react"

import CustomForm from "@/components/custom-form"
import { IFormInst } from "@/components/custom-form/types.ts"
import CustomModal from "@/components/custom-modal"
import RemoveContent from "@/components/custom-modal/components/remove-content"
import CustomTable from "@/components/custom-table"
import useTableSelection from "@/hooks/use-table-selection"
import { showMsg } from "@/utils/util-funs"

import { DEVICE_ATT_COLUMNS, PJCT_SEARCH_FORM_ITEMS, ST_MANAGE_SCH_FORM_BTNS } from "./configs/index"
import {
  addPjctMethods,
  delPjctMethods,
  exportData,
  exportTemplate,
  getDvsList,
  getPjctSchData,
  importFile,
  onEamDvsSchFormChg,
} from "./methods/index"
import { IEamDvs, IEamDvsParam, TModelFrAndTbInfo, TUserTbActInfo } from "./types/index"
import { TFormType, TModalType } from "@/types/i-config"
import { getCpnySchData } from "../company/methods"
import FileImport from "@/components/custom-upload/upload"
import CustomAddModal, { IOperateProps, IPerateRef } from "@/components/custom-model-form"
import { EAM_DVS_FORM_ITEMS } from "./configs/model"
import { AtomStation } from "@/store/atom-station"
import { useAtomValue } from "jotai"
import { getStationDvsTypes } from "@/utils/device-funs"

const rowSelectProps = { needInfo: true }

export default function ModelProjectCpny() {
  const formRef = useRef<IFormInst | null>(null)
  const modeRef = useRef<any>(null)
  const [formList, setFormItemConfig] = useState({})
  const [isModalOpen, setIsModalOpen] = useState("")
  const [importModal, setImportModal] = useState(false)
  const [isEditOrAdd, setIsEditOrAdd] = useState<TModalType>("add")
  // 设置选中的一条数据
  const [selectRowInfo, setSelectRowInfo] = useState<IEamDvs | null>()
  const { stationList } = useAtomValue(AtomStation)

  // 选择框
  const { rowSelection, setSelectedRowKeys, selectedRowKeys, setSelectedRows } = useTableSelection(rowSelectProps)
  const initData = async () => {
    const formInst = formRef.current?.getInst?.()
    formInst?.submit()
  }

  useEffect(() => {
    initData()
  }, [])

  // 执行查询的钩子
  const { dataSource, loading, onSearch, pagination } = usePageSearch<IEamDvsParam, IEamDvs>(
    { serveFun: getPjctSchData },
    {
      formRef,
      needFirstSch: false,
      otherParams: {
        stationList: stationList,
      },
    },
  )

  async function onFormAction(type: TFormType) {
    if (type === "add") {
      setIsModalOpen("add")
      setIsEditOrAdd("add")
    } else if (type === "batchDelete") {
      if (!selectedRowKeys.length) {
        return showMsg("请至少选择一条！")
      }
      setIsModalOpen("deleted")
    } else if (type === "template") {
      const res = await exportTemplate()
    } else if (type === "import") {
      setImportModal(true)
      // const res = await
    } else if (type === "export") {
      const formData = formRef.current?.getFormValues()
      exportData(formData)
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
  const onTbAction = async (record: IEamDvs, { key, label }: TUserTbActInfo) => {
    setIsModalOpen(key)
    setSelectRowInfo(record)
    if (key === "edit") {
      setIsEditOrAdd(key)
      const { stationCode } = record
      const dvsList = await getDvsList({ stationCode: stationCode })
      const chgOptions = { deviceCode: { options: dvsList } }
      modeRef.current?.getChildrenRef?.()?.setFormItemConfig((prevState) => ({ ...prevState, ...chgOptions }))
    }
    console.log(record, key, label)
  }

  // 新增和编辑用户信息
  const btnClkRef = async (type: "ok" | "close", data?: TModelFrAndTbInfo) => {
    setSelectRowInfo(null)
    // 执行
    if (type === "ok") {
      const res = await addPjctMethods(data, isEditOrAdd)
      if (!res) return
      setIsModalOpen("")
      return onSearch()
    }
    if (type === "close") return setIsModalOpen("")
  }

  const delBtnClkRef = async (type: "ok" | "close" | "delete_ok") => {
    // 执行
    if (type === "delete_ok") {
      const res = await delPjctMethods({
        idList: selectRowInfo ? [selectRowInfo.id] : selectedRowKeys,
      })
      if (!res) return
      setSelectRowInfo(null)
      setIsModalOpen("")
      setSelectedRowKeys([])
      setSelectedRows([])
      return onSearch()
    }
    setSelectRowInfo(null)
    if (type === "close") return setIsModalOpen("")
  }
  const onSchValueChgRef = useRef(async (changedValue) => {
    const chgOptions = await onEamDvsSchFormChg(changedValue, formRef.current)
    setFormItemConfig((prevState) => ({ ...prevState, ...chgOptions }))
  })
  const formSelectChange = async (changeVal, setFormConfigs) => {
    const formIns = modeRef.current?.getChildrenRef()?.getInst()
    if (changeVal?.stationCode) {
      formIns?.setFieldsValue?.({
        deviceCode: undefined,
        // deviceType: undefined,
      })
      // const stnId = stationList?.find((i) => i.stationCode === changeVal?.stationCode)?.id
      // const dvsType = await getStationDvsTypes(stnId)
      // const chgOptions = {
      //   deviceType: { options: dvsType },
      // }
      // setFormConfigs((prevState) => ({ ...prevState, ...chgOptions }))
      const dvsList = await getDvsList({ stationCode: changeVal?.stationCode })
      const chgOptions = { deviceCode: { options: dvsList } }
      setFormConfigs((prevState) => ({ ...prevState, ...chgOptions }))
    } else if (changeVal?.deviceType) {
      formIns?.setFieldsValue?.({ deviceCode: undefined })
      const stnCode = modeRef.current?.getChildrenRef()?.getInst?.()?.getFieldValue?.("stationCode")
      const dvsList = await getDvsList({ deviceType: changeVal?.deviceType, stationCode: stnCode })
      const chgOptions = { deviceCode: { options: dvsList } }
      setFormConfigs((prevState) => ({ ...prevState, ...chgOptions }))
    }
  }
  return (
    <div className="page-wrap setting-user">
      <CustomForm
        ref={formRef}
        loading={loading}
        buttons={ST_MANAGE_SCH_FORM_BTNS}
        itemOptionConfig={formList}
        itemOptions={PJCT_SEARCH_FORM_ITEMS}
        onSearch={onSearch}
        onAction={onFormAction}
        formOptions={{
          onValuesChange: onSchValueChgRef.current,
        }}
      />
      <CustomTable
        rowKey="id"
        rowSelection={rowSelection}
        limitHeight
        loading={loading}
        columns={DEVICE_ATT_COLUMNS({ onClick: onTbAction })}
        dataSource={dataSource}
        pagination={pagination}
      />
      <CustomModal<IOperateProps, IPerateRef>
        ref={modeRef}
        title={isEditOrAdd === "add" ? "新增" : "修改"}
        destroyOnClose
        open={isModalOpen === "add" || isModalOpen === "edit"}
        footer={null}
        onCancel={() => setIsModalOpen("")}
        Component={CustomAddModal}
        componentProps={{
          buttonClick: btnClkRef,
          editType: isEditOrAdd,
          selectRowInfo,
          formSelectChange: formSelectChange,
          FORM_ITEMS: EAM_DVS_FORM_ITEMS,
        }}
      />
      <CustomModal
        title="删除"
        destroyOnClose
        open={isModalOpen === "deleted"}
        footer={null}
        onCancel={() => setIsModalOpen("")}
        Component={RemoveContent}
        componentProps={{ buttonClick: delBtnClkRef, selectRowInfo }}
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
