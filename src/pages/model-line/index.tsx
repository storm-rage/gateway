/*
 * @Author: chenmeifeng
 * @Date: 2024-12-05 17:03:20
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-06-04 16:42:11
 * @Description:设备模型-线路
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

// import AddModal, { IOperateProps, IPerateRef } from "./components/edit"
import { DEVICE_ATT_COLUMNS, LINE_EDIT_COLUMNS, LINE_MANAGE_FORM_ITEMS, ST_MANAGE_SCH_FORM_BTNS } from "./configs/index"
import {
  addUserMethods,
  delUserMethods,
  exportData,
  exportTemplate,
  getCpnySchData,
  importFile,
  saveLineIdxData,
} from "./methods/index"
import { ILineData, ILineDataParam, TModelFrAndTbInfo, TUserTbActInfo } from "./types/index"
import { TFormType, TModalType } from "@/types/i-config"
import { lineFormItem } from "./configs/model"
import FileImport from "@/components/custom-upload/upload"
import CustomAddModal, { IOperateProps, IPerateRef } from "@/components/custom-model-form"

const rowSelectProps = { needInfo: true }

export default function ModelStation() {
  const formRef = useRef<IFormInst | null>(null)
  const modeRef = useRef<any>(null)

  const [isModalOpen, setIsModalOpen] = useState("")
  const [importModal, setImportModal] = useState(false)
  const [isEditOrAdd, setIsEditOrAdd] = useState<TModalType>("add")
  // 设置选中的一条数据
  const [selectRowInfo, setSelectRowInfo] = useState<ILineData | null>()
  const [column, setColumn] = useState([])
  const [dataSourceList, setDataSourceList] = useState([])
  const isEditState = useRef(false)

  const [btnCombination, setBtnCombination] = useState([...ST_MANAGE_SCH_FORM_BTNS])

  // 选择框
  const { rowSelection, setSelectedRowKeys, selectedRowKeys, selectedRows, setSelectedRows } =
    useTableSelection(rowSelectProps)

  useEffect(() => {
    const formInst = formRef.current?.getInst?.()
    formInst?.submit()
    setColumn(DEVICE_ATT_COLUMNS({ onClick: onTbAction }))
  }, [])

  // 执行查询的钩子
  const { dataSource, loading, pagination, onSearch } = usePageSearch<ILineDataParam, ILineData>(
    { serveFun: getCpnySchData },
    { formRef, needFirstSch: false },
  )
  const setDataSource = ({ record, value, dataIndex }) => {
    const newData = [...dataSourceList]
    const index = newData.findIndex((item) => record.id === item.id)
    const item = newData[index]
    newData.splice(index, 1, {
      ...item,
      [dataIndex]: value,
      edit: true,
    })
    setDataSourceList(newData)
  }
  async function onFormAction(type: TFormType) {
    if (type === "edit" && dataSource?.length) {
      isEditState.current = !isEditState.current
      const groud = JSON.parse(JSON.stringify(ST_MANAGE_SCH_FORM_BTNS))
      groud.forEach((i) => {
        if (i.name === "edit") {
          i.label = isEditState.current ? "保存" : "批量编辑"
        }
      })
      setBtnCombination(groud)
      isEditState.current ? setColumn(LINE_EDIT_COLUMNS(setDataSource)) : ""
      !isEditState.current
        ? saveLineIdxData(dataSourceList)
            .then((res) => {
              if (!res) return
              onSearch()
            })
            .finally(() => {
              setColumn(DEVICE_ATT_COLUMNS({ onClick: onTbAction }))
            })
        : ""
    } else if (type === "add") {
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

  const onTbAction = async (record: ILineData, { key, label }: TUserTbActInfo) => {
    setIsModalOpen(key)
    setSelectRowInfo(record)
    if (key === "edit") {
      setIsEditOrAdd(key)
    }
    console.log(record, key, label)
  }

  // 新增和编辑
  const btnClkRef = async (type: "ok" | "close", data?: TModelFrAndTbInfo) => {
    setSelectRowInfo(null)
    // 执行
    if (type === "ok") {
      const res = await addUserMethods(data, isEditOrAdd)
      if (!res) return
      setIsModalOpen("")
      return onSearch()
    }
    if (type === "close") return setIsModalOpen("")
  }

  const delBtnClkRef = async (type: "ok" | "close" | "delete_ok", info) => {
    // 执行
    if (type === "delete_ok") {
      const res = await delUserMethods(selectRowInfo ? [selectRowInfo] : selectedRows)
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
  useEffect(() => {
    if (isEditState.current) {
      setColumn(LINE_EDIT_COLUMNS(setDataSource))
    }
  }, [dataSourceList])
  useEffect(() => {
    setDataSourceList(dataSource)
  }, [dataSource])
  return (
    <div className="page-wrap setting-user">
      <CustomForm
        ref={formRef}
        loading={loading}
        buttons={btnCombination}
        itemOptions={LINE_MANAGE_FORM_ITEMS}
        onSearch={onSearch}
        onAction={onFormAction}
      />
      <CustomTable
        rowKey="id"
        rowSelection={rowSelection}
        limitHeight
        loading={loading}
        columns={column}
        dataSource={dataSourceList}
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
          FORM_ITEMS: lineFormItem(false),
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
