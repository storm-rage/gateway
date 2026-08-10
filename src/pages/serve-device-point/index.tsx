/*
 * @Description: 数据转发—设备测点
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

import { DEVICE_ATT_COLUMNS, ST_MANAGE_SCH_FORM_BTNS, RP_DEVICE_SCH_FORM_ITEMS, ADD_FORM_ITEMS } from "./configs/index.tsx"
import { addUserMethods, delUserMethods, getSettingUserSchData, udPwMethods, importFile, exportFile, getModel, getPointTemplate, getServe } from "./methods/index"
import { IUserList, IUserListParam, TModelFrAndTbInfo, TUserTbActInfo } from "./types/index"
import { TModalType } from "@/types/i-config"
import AddModal, { IOperateProps, IPerateRef } from "./components/edit"
import FileImport from "@/components/custom-upload/upload"

const rowSelectProps = { needInfo: true }

export default function ModelStation() {
  const formRef = useRef<IFormInst | null>(null)
  const modeRef = useRef<any>(null)

  const [isModalOpen, setIsModalOpen] = useState("")
  const [isEditOrAdd, setIsEditOrAdd] = useState<TModalType>("add")
  const [importModal, setImportModal] = useState(false)
  const [deviceModel, setDeviceModel] = useState<any>([])
  const [serveList, setServeList] = useState<any>([])
  const [templateList, setTemplateList] = useState<any>([])
  
  // 设置选中的一条数据
  const [selectRowInfo, setSelectRowInfo] = useState<IUserList | null>()

  // 选择框
  const { rowSelection, setSelectedRowKeys, selectedRowKeys, setSelectedRows } = useTableSelection(rowSelectProps)

  useEffect(() => {
    const formInst = formRef.current?.getInst?.()
    formInst?.submit()
  }, [])

  useEffect(() => {
    getPointTemplate({ "pageNum": 1, "pageSize": 10,}).then(res => {
      console.log("getPointTemplate===",res)
      if(res) {
        res.records.forEach(item => {
          item.value = item.id
          item.label = item.pointName
        })
        setTemplateList(res.records)
        
      }
    })
    getServe({ "pageNum": 1, "pageSize": 10,}).then(res => {
      console.log("getServe===",res)
      if(res && res.records) {
        res.records.forEach(item => {
          item.value = item.id
          item.label = item.ipAddress
        })
        setServeList(res.records)


        
      }
    })
  }, [])
  useEffect(() => { 
    formRef.current?.getInst()?.setFieldsValue({
      relayId: serveList[0]?.value,
    })
    onSchValueChgRef({relayId:serveList[0]?.value})

  }, [serveList])

  // 执行查询的钩子
  const { dataSource, loading, pagination, onSearch } = usePageSearch<IUserListParam, IUserList>(
    { serveFun: async (pageInfo, formData) => {
       return await getSettingUserSchData(pageInfo, formData)
    } },
    { formRef, needFirstSch: false },
  )

  async function onFormAction(type: "add" | "batchDelete") {
    const formData = formRef.current?.getInst()?.getFieldsValue()
    if(!formData.relayId) {
      return showMsg("请选择目标服务器！")
    }
    if (type === "add") {
      setIsModalOpen("add")
      setIsEditOrAdd("add")
    } else if (type === "batchDelete") {
      if (!selectedRowKeys.length) {
        return showMsg("请至少选择一条！")
      }
      setIsModalOpen("deleted")
    } else if (type === "import") {
        setImportModal(true)
  
    } else if(type === "export") {
      const formData = formRef.current?.getInst()?.getFieldsValue()
      const params = {
        "pageNum": pagination.current || 1,
        "pageSize": pagination.pageSize || 10,
        "id": "",
        "relayId": formData.relayId,
        "modelId": "",
        "templateId": "",
      }
      return exportFile(params)
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

  const onTbAction = async (record: IUserList, { key, label }: TUserTbActInfo) => {
    setIsModalOpen(key)
    setSelectRowInfo(record)
    if (key === "update") {
      setIsEditOrAdd(key)
      setIsModalOpen("edit")
    }
    console.log(record, key, label, '==record==')
  }

  const searchFormItems = RP_DEVICE_SCH_FORM_ITEMS.map(item => {
      if (item.name === 'relayId') {
        return {
          ...item,
          props: {
            ...item.props,
            options: serveList,
          },
        }
      }
      return item
    })

  const addFormItems = ADD_FORM_ITEMS.map(item => {
      if (item.name === 'templateId') {
        return {
          ...item,
          props: {
            ...item.props,
            options: templateList,
          },
        }
      }
      return item
    })

  // 新增和编辑用户信息
  const btnClkRef = async (type: "ok" | "close", data?: TModelFrAndTbInfo) => {
    setSelectRowInfo(null)
    const formData = formRef.current?.getInst()?.getFieldsValue()
    console.log(formData,'===formData')
    // 执行
    if (type === "ok") {
      let obj = {
        relayId: formData.relayId,
        templateId: data?.templateId,
        id: selectRowInfo ? selectRowInfo.id : "",
      }
      const res = await addUserMethods(obj, isEditOrAdd)
      if (!res) return
      setIsModalOpen("")
      return onSearch()
    }
    if (type === "close") return setIsModalOpen("")
  }

  const delBtnClkRef = async (type: "ok" | "close" | "delete_ok") => {
    // 执行
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
  const onSchValueChgRef = async (changedValue) => {
    if(changedValue.relayId) {
      onSearch()
    }
  }
  return (
    <div className="page-wrap setting-user">
      <CustomForm
        ref={formRef}
        loading={loading}
        buttons={ST_MANAGE_SCH_FORM_BTNS}
        itemOptions={searchFormItems}
        formOptions={{
          onValuesChange: onSchValueChgRef,
        }}
        onSearch={onSearch}
        onAction={onFormAction}
      />
      <CustomTable
        rowKey="id"
        rowSelection={rowSelection}
        limitHeight
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
        Component={AddModal}
        componentProps={{
          buttonClick: btnClkRef,
          editType: isEditOrAdd,
          selectRowInfo,
          FORM_ITEMS: addFormItems,
        }}
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
        title="删除"
        destroyOnClose
        open={isModalOpen === "deleted"}
        footer={null}
        onCancel={() => setIsModalOpen("")}
        Component={RemoveContent}
        componentProps={{ buttonClick: delBtnClkRef, selectRowInfo }}
      />
    </div>
  )
}
