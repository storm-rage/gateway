/*
 * @Description: 设备拆分
 */
import "./index.less"

import usePageSearch from "@hooks/use-page-search.ts"
import React, { useEffect, useRef, useState, useCallback } from "react"
// (editModalRef 已移除，CustomModal 通过 Component+componentProps 渲染)

import CustomForm from "@/components/custom-form"
import { IFormInst } from "@/components/custom-form/types.ts"
import CustomModal from "@/components/custom-modal"
import RemoveContent from "@/components/custom-modal/components/remove-content"
import CustomTable from "@/components/custom-table"
import useTableSelection from "@/hooks/use-table-selection"
import { showMsg } from "@/utils/util-funs"
import FileImport from "@/components/custom-upload/upload"

import { DEVICE_ATT_COLUMNS, ST_MANAGE_SCH_FORM_BTNS, RP_DEVICE_SCH_FORM_ITEMS } from "./configs/index"
import { addUserMethods, delUserMethods, getSettingUserSchData, downloadTemplate, importFile, exportData } from "./methods/index"
import { IUserList, IUserListParam, TModelFrAndTbInfo, TUserTbActInfo } from "./types/index"
import { TModalType } from "@/types/i-config"
import AddModal from "./components/edit"
import PointSelectModal from "./components/point-select"

const rowSelectProps = { needInfo: true }

export default function DeviceSplit() {
  const formRef = useRef<IFormInst | null>(null)
  const modeRef = useRef<any>(null)

  const [isModalOpen, setIsModalOpen] = useState("")
  const [isEditOrAdd, setIsEditOrAdd] = useState<TModalType>("add")
  const [selectRowInfo, setSelectRowInfo] = useState<IUserList | null>()
  const [importModal, setImportModal] = useState(false)

  // 选择框
  const { rowSelection, setSelectedRowKeys, selectedRowKeys, setSelectedRows } = useTableSelection(rowSelectProps)

  // 选择测点弹窗
  const [pointSelectOpen, setPointSelectOpen] = useState(false)
  const [pointSelectSource, setPointSelectSource] = useState<string>("")
  const [pointSelectIOA, setPointSelectIOA] = useState<string>("")

  useEffect(() => {
    const formInst = formRef.current?.getInst?.()
    formInst?.submit()
  }, [])

  const { dataSource, loading, pagination, onSearch } = usePageSearch<IUserListParam, IUserList>(
    { serveFun: (pageInfo, formData) => getSettingUserSchData(pageInfo, formData) },
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
    } else if (type === "search") {
      return onSearch()
    } else if (type === "template") {
      downloadTemplate()
    } else if (type === "import") {
      setImportModal(true)
      // importData()
    } else if (type === "export") {
      const formData = formRef.current?.getFormValues()
      exportData(formData)
    }
  }

  const onTbAction = async (record: IUserList, { key }: TUserTbActInfo) => {
    setIsModalOpen(key)
    setSelectRowInfo(record)
    if (key === "update") {
      setIsEditOrAdd(key)
      setIsModalOpen("edit")
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

  const btnClkRef = async (type: "ok" | "close", data?: TModelFrAndTbInfo, tag?: TModalType) => {
    setSelectRowInfo(null)
    if (type === "ok") {
      const res = await addUserMethods(data, tag)
      if (!res) return
      setIsModalOpen("")
      return onSearch()
    }
    if (type === "close") return setIsModalOpen("")
  }

  const delBtnClkRef = async (type: "ok" | "close" | "delete_ok") => {
    if (type === "delete_ok") {
      const res = await delUserMethods({
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

  // 打开始终测点弹窗
  const handleOpenPointSelect = useCallback((sourceDeviceCode: string, currentIOA: string) => {
    if (!sourceDeviceCode) {
      showMsg("请先选择源设备")
      return
    }
    setPointSelectSource(sourceDeviceCode)
    setPointSelectIOA(currentIOA || "")
    setPointSelectOpen(true)
  }, [])

  // 选择测点弹窗确认
  const handleConfirmPoints = useCallback((ioas: number[]) => {
    setPointSelectOpen(false)
    // 调用编辑弹窗暴露的 confirm 方法
    const confirmFn = (window as any).__deviceSplitConfirmPoints
    if (typeof confirmFn === "function") {
      confirmFn(ioas)
    }
  }, [])

  const handleSwitchChange = async (checked: boolean, record: IUserList) => {
    btnClkRef("ok", { ...record, enabled: checked? '1':'0' }, "update")
  }

  return (
    <div className="page-wrap setting-user">
      <CustomForm
        ref={formRef}
        loading={loading}
        buttons={ST_MANAGE_SCH_FORM_BTNS}
        itemOptions={RP_DEVICE_SCH_FORM_ITEMS}
        onSearch={onSearch}
        onAction={onFormAction}
      />
      <CustomTable
        rowKey="id"
        rowSelection={rowSelection}
        limitHeight
        columns={DEVICE_ATT_COLUMNS({ onClick: onTbAction, onSwitchChange: handleSwitchChange })}
        dataSource={dataSource}
        pagination={pagination}
      />
      <CustomModal
        title={isEditOrAdd === "add" ? "新增设备拆分配置" : "修改设备拆分配置"}
        destroyOnClose
        width={640}
        open={isModalOpen === "add" || isModalOpen === "edit"}
        footer={null}
        onCancel={() => setIsModalOpen("")}
        Component={AddModal}
        componentProps={{
          buttonClick: btnClkRef,
          editType: isEditOrAdd as "add" | "edit",
          selectRowInfo,
          onOpenPointSelect: handleOpenPointSelect,
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
      {/* 选择测点弹窗 */}
      <CustomModal
        title="选择测点"
        destroyOnClose
        width={600}
        open={pointSelectOpen}
        footer={null}
        onCancel={() => setPointSelectOpen(false)}
        Component={PointSelectModal as any}
        componentProps={{
          sourceDeviceCode: pointSelectSource,
          currentIOA: pointSelectIOA,
          onConfirm: handleConfirmPoints,
          onCancel: () => setPointSelectOpen(false),
        }}
      />
    </div>
  )
}
