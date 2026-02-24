/*
 
 * @Description: 权限配置-电气图管理
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
import { addPjctMethods, delPjctMethods, exportData, exportTemplate, getPjctSchData, importFile } from "./methods/index"
import { IRuleInfo, IRuleInfoParam, TModelFrAndTbInfo, TUserTbActInfo } from "./types/index"
import { TFormType, TModalType } from "@/types/i-config"
import FileImport from "@/components/custom-upload/upload"
import { delFiveRule } from "./methods/edit"

const rowSelectProps = { needInfo: true }

export default function EleDiagramMng() {
  const formRef = useRef<IFormInst | null>(null)
  const [formList, setFormItemConfig] = useState({})
  const [isModalOpen, setIsModalOpen] = useState("")
  const [importModal, setImportModal] = useState(false)
  const [isEditOrAdd, setIsEditOrAdd] = useState<TModalType>("add")
  // 设置选中的一条数据
  const [selectRowInfo, setSelectRowInfo] = useState<IRuleInfo | null>()

  // 选择框
  const { rowSelection, setSelectedRowKeys, selectedRowKeys, setSelectedRows, selectedRows } = useTableSelection(rowSelectProps)
  const initData = async () => {
    const formInst = formRef.current?.getInst?.()
    formInst?.submit()
  }

  useEffect(() => {
    initData()
  }, [])

  // 执行查询的钩子
  const { dataSource, loading, onSearch, pagination } = usePageSearch<IRuleInfoParam, IRuleInfo>(
    { serveFun: getPjctSchData },
    { formRef, needFirstSch: false },
  )

  async function onFormAction(type: TFormType) {
    const formData = formRef.current?.getFormValues()
    console.log("type==", type)
    if (type === "add") {
      setIsModalOpen("add")
      setIsEditOrAdd("add")
    } else if (type === "delete") {
      if (!selectedRowKeys.length) {
        return showMsg("请至少选择一条！")
      }
      setIsModalOpen("deleted")
    }  else if (type === "batchDelete") {
      if (!selectedRowKeys.length) {
        return showMsg("请至少选择一条！")
      }
      setIsModalOpen("deleted")
    } else if (type === "template") {
      const res = await exportTemplate()
    } else if (type === "import") {
      if(formData.stationCode) {
        setImportModal(true)
      } else {
        showMsg("请选择站点！")
      }
    } else if (type === "export") {
      console.log("selectedRows==", selectedRows,selectRowInfo)
      let batchParams = []
      if(selectedRows.length > 1) {
        selectedRows.forEach(item => {
          batchParams.push({
            stationCode: item.stationCode,
            fileName: item.fileName,
          })
        })
        exportData(batchParams)
      } else {
        let params = {
        stationCode: selectedRows[0].stationCode,
        fileName: selectedRows[0]?.fileName,
      }
        exportData(params)
      }
    }
  }
  const btnClick = useRef(async (type, form) => {
    const formData = formRef.current?.getFormValues()
    if (type === "ok") {
      let uploadedFile = form.getAll('files')
      if (uploadedFile.length === 0) {
        const singleFile = form.get('file')
        if (singleFile) {
          uploadedFile = [singleFile]
        }
      }
      if (!uploadedFile.length) {
        showMsg("请选择要上传的文件！")
        return
      }

      let newFormData = new FormData()
      newFormData.append('stationCode', formData.stationCode)
      if(uploadedFile.length > 1 && uploadedFile.constructor === Array ) {
        uploadedFile.forEach((file, index) => {
          
          newFormData.append('files', file)
        })
      } else if(uploadedFile.length == 1) {
        const singleFile = uploadedFile[0]
        if (singleFile instanceof File) {
          newFormData.append('file', singleFile)
        }
      }
      
      const res = await importFile(newFormData)
      if (res) {
        setImportModal(false)
        onSearch()
      }
    } else {
      setImportModal(false)
    }
  })
  const onTbAction = async (record: IRuleInfo, { key, label }: TUserTbActInfo) => {
    setIsModalOpen(key)
    setSelectRowInfo(record)
    if (key === "edit") {
      setIsEditOrAdd(key)
    } else if (key === "deleted") {
      setIsModalOpen("deleted")

    } else if (key == "export") {
      let params = {
        stationCode: record?.stationCode,
        fileName: record?.fileName,
      }
      exportData(params)
    }
  }



  const delBtnClkRef = async (type: "ok" | "close" | "delete_ok") => {
    // 执行
    if (type === "delete_ok") {
      let params = null
      if(selectedRows.length) {
         params = selectedRows.map(item => {
          return {
            stationCode: item.stationCode,
            fileName: item.fileName,
          }
        })
      } else if(selectRowInfo) {
         params = [{
          stationCode: selectRowInfo?.stationCode,
          fileName: selectRowInfo?.fileName,
        }]
      }
      console.log(selectedRowKeys,selectRowInfo,params, '====selectedRowKeys')

      const res = await delFiveRule(params)
      if (!res) return
      showMsg(res)
      setSelectRowInfo(null)
      setIsModalOpen("")
      setSelectedRowKeys([])
      setSelectedRows([])
      return onSearch()
    }
    setSelectRowInfo(null)
    if (type === "close") return setIsModalOpen("")
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
      />
      <CustomTable
        rowKey={(record) => record.stationCode+record.fileName}
        rowSelection={rowSelection}
        limitHeight
        columns={DEVICE_ATT_COLUMNS({ onClick: onTbAction })}
        dataSource={dataSource}
        pagination={pagination}
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
        width="600px"
        title="导入"
        destroyOnClose
        open={importModal}
        footer={null}
        onCancel={() => setImportModal(false)}
        Component={FileImport}
        componentProps={{ btnClick: btnClick.current, fileType: "image/svg+xml" }}
      />
    </div>
  )
}
