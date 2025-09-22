/*
 * @Author: chenmeifeng
 * @Date: 2024-12-05 17:03:20
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-06-03 09:49:52
 * @Description: 设备模型-型号
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
import { getStorage, showMsg } from "@/utils/util-funs"

import AddModal, { IOperateProps, IPerateRef } from "./components/edit"
import {
  addDvsMdMethods,
  delDvsMdCompany,
  exportData,
  exportTemplate,
  getDvsMdSchData,
  importFile,
} from "./methods/index"
import { IUserList, IUserListParam, TModelFrAndTbInfo, TUserTbActInfo } from "./types/index"
import { TModalType } from "@/types/i-config"
import { MODEL_COLUMNS, ST_MANAGE_SCH_FORM_BTNS, ST_MODEL_MODEL_FORM_ITEMS } from "./configs"
import { StorageDeviceType } from "@/configs/storage-cfg"
import FileImport from "@/components/custom-upload/upload"

const rowSelectProps = { needInfo: true }

export default function ModelStation() {
  const formRef = useRef<IFormInst | null>(null)
  const modeRef = useRef<any>(null)
  const [formList, setFormItemConfig] = useState({})
  const [importModal, setImportModal] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState("")
  const [isEditOrAdd, setIsEditOrAdd] = useState<TModalType>("add")
  const [deviceTypeList, setDeviceTypeList] = useState([])
  // 设置选中的一条数据
  const [selectRowInfo, setSelectRowInfo] = useState<IUserList | null>()

  // 选择框
  const { rowSelection, setSelectedRowKeys, selectedRowKeys, setSelectedRows } = useTableSelection(rowSelectProps)

  useEffect(() => {
    const formInst = formRef.current?.getInst?.()
    const dvsTypes = getStorage(StorageDeviceType)?.map((i) => {
      return {
        value: i.code,
        label: i.name,
      }
    })
    setDeviceTypeList(dvsTypes)
    setFormItemConfig({
      deviceType: {
        options: dvsTypes || [],
      },
    })
    formInst?.submit()
  }, [])

  // 执行查询的钩子
  const { dataSource, loading, pagination, onSearch } = usePageSearch<IUserListParam, IUserList>(
    { serveFun: getDvsMdSchData },
    { formRef, needFirstSch: false },
  )

  async function onFormAction(type: "add" | "batchDelete") {
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

  const onTbAction = async (record: IUserList, { key, label }: TUserTbActInfo) => {
    setIsModalOpen(key)
    setSelectRowInfo(record)
    if (key === "edit") {
      setIsEditOrAdd(key)
    }
    console.log(record, key, label)
  }

  // 新增和编辑用户信息
  const btnClkRef = async (type: "ok" | "close", data?: TModelFrAndTbInfo) => {
    setSelectRowInfo(null)
    // 执行
    if (type === "ok") {
      const res = await addDvsMdMethods(data, isEditOrAdd)
      if (!res) return
      setIsModalOpen("")
      return onSearch()
    }
    if (type === "close") return setIsModalOpen("")
  }

  const delBtnClkRef = async (type: "ok" | "close" | "delete_ok") => {
    // 执行
    if (type === "delete_ok") {
      const res = await delDvsMdCompany({
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
        itemOptionConfig={formList}
        itemOptions={ST_MODEL_MODEL_FORM_ITEMS}
        onSearch={onSearch}
        onAction={onFormAction}
      />
      <CustomTable
        rowKey="id"
        rowSelection={rowSelection}
        limitHeight
        loading={loading}
        columns={MODEL_COLUMNS({ onClick: onTbAction })}
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
        Component={AddModal}
        componentProps={{
          buttonClick: btnClkRef,
          editType: isEditOrAdd,
          selectRowInfo,
          deviceTypeList: deviceTypeList,
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
