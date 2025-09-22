/*
 * @Author: chenmeifeng
 * @Date: 2024-12-05 17:03:20
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-06-25 14:43:10
 * @Description: 权限配置-静态表管理
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
import { DEVICE_ATT_COLUMNS, ST_MANAGE_SCH_FORM_BTNS } from "./configs/index"
import { addUserMethods, delUserMethods, exportData, exportTemplate, getCpnySchData, importFile } from "./methods/index"
import { IUserList, IUserListParam, TModelFrAndTbInfo, TUserTbActInfo } from "./types/index"
import { TFormType, TModalType } from "@/types/i-config"
import { FORM_ITEMS } from "./configs/model"
import FileImport from "@/components/custom-upload/upload"
import CustomAddModal, { IOperateProps, IPerateRef } from "@/components/custom-model-form"

const rowSelectProps = { needInfo: true }

export default function StaticMng() {
  const formRef = useRef<IFormInst | null>(null)
  const modeRef = useRef<any>(null)

  const [isModalOpen, setIsModalOpen] = useState("")
  const [importModal, setImportModal] = useState(false)
  const [isEditOrAdd, setIsEditOrAdd] = useState<TModalType>("add")
  // 设置选中的一条数据
  const [selectRowInfo, setSelectRowInfo] = useState(null)

  // 选择框
  const { rowSelection, setSelectedRowKeys, selectedRowKeys, setSelectedRows } = useTableSelection(rowSelectProps)

  useEffect(() => {
    const formInst = formRef.current?.getInst?.()
    formInst?.submit()
  }, [])

  // 执行查询的钩子
  const { dataSource, loading, pagination, onSearch } = usePageSearch<IUserListParam, IUserList>(
    { serveFun: getCpnySchData },
    { formRef, needFirstSch: false },
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
      exportData()
    }
  }

  const onTbAction = async (record, { key, label }) => {
    setIsModalOpen(key)
    setSelectRowInfo(record)
    if (key === "edit") {
      setIsEditOrAdd(key)
    }
  }

  // 新增和编辑
  const btnClkRef = async (type: "ok" | "close", data?) => {
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
      const res = await delUserMethods({
        key: selectRowInfo?.key,
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
  return (
    <div className="page-wrap setting-user">
      <CustomForm
        ref={formRef}
        loading={loading}
        buttons={ST_MANAGE_SCH_FORM_BTNS}
        onSearch={onSearch}
        onAction={onFormAction}
      />
      <CustomTable
        rowKey="id"
        rowSelection={rowSelection}
        limitHeight
        loading={loading}
        columns={DEVICE_ATT_COLUMNS({ onClick: onTbAction })}
        dataSource={dataSource}
        pagination={null}
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
          FORM_ITEMS: FORM_ITEMS(isModalOpen === "edit"),
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
