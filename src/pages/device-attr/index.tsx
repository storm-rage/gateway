/*
 * @Description: 设备属性
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

import { DEVICE_ATT_COLUMNS, ST_MANAGE_SCH_FORM_BTNS, RP_DEVICE_SCH_FORM_ITEMS, ADD_FORM_ITEMS, } from "./configs/index"
import { addUserMethods, delUserMethods, getSettingUserSchData, udPwMethods, importFile, exportFile, getStationDeviceTree, getDeviceType, getStation, getModel } from "./methods/index"
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
  // 设置选中的一条数据
  const [selectRowInfo, setSelectRowInfo] = useState<IUserList | null>()
  const [importModal, setImportModal] = useState(false)
  const [deviceTypeOptions, setDeviceTypeOptions] = useState<{ label: string; value: any }[]>([])
  const [stationDeviceTree, setStationDeviceTree] = useState<any>([])
  const [stationList, setStationList] = useState<any>([])
  const [deviceModel, setDeviceModel] = useState<any>([])
  
  // 选择框
  const { rowSelection, setSelectedRowKeys, selectedRowKeys, setSelectedRows } = useTableSelection(rowSelectProps)

  useEffect(() => {
    const formInst = formRef.current?.getInst?.()
    formInst?.submit()
  }, [])

  useEffect(() => {
      getDeviceType().then(res => {
        if (res && res.length) {
          const opts = res?.map(item => ({ label: item.name, value: item.code })) || []
          setDeviceTypeOptions(opts)
        }
      })
      getStation().then(res => {
        console.log("getStation===",res)
        if(res) {
          res.records.forEach(item => {
            item.value = item.id
            item.label = item.shortName
          })
          setStationList(res.records)
        }
      })
      getModel().then(res => {
        console.log("getModel===",res)
        if(res) {
          res.records.forEach(item => {
            item.value = item.id
            item.label = item.model
          })
          setDeviceModel(res.records)
        }
      })
    }, [])

  const addFormItems = ADD_FORM_ITEMS.map(item => {
    if (item.name === 'stationId') {
      return {
        ...item,
        props: {
          ...item.props,
          options: stationList,
        },
      }
    } else if (item.name === 'modelId') {
      return {
        ...item,
        props: {
          ...item.props,
          options: deviceModel,
        },
      }
    }
    return item
  })

  // 执行查询的钩子
  const { dataSource, loading, pagination, onSearch } = usePageSearch<IUserListParam, IUserList>(
    { serveFun: (pageInfo, formData) => getSettingUserSchData(pageInfo, formData), },
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
    } else if (type === "import") {
        setImportModal(true)
  
    } else if(type === "export") {
      const params = {
        "pageNum": pagination.current || 1,
        "pageSize": pagination.pageSize || 10,
        "id": "",
        "deviceCode": "",
        "deviceType": "",
        "modelId": "",
        "stationId": "",
        "stationCode": "",
        "periodCode": "",
        "lineCode": "",
      }
      exportFile(params)
    } else if(type === "search") {
      onSearch()
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
    }
    console.log(record, key, label)
  }

  // 新增和编辑用户信息
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

  const searchFormItems = RP_DEVICE_SCH_FORM_ITEMS.map(item => {
    if (item.name === 'stationId') {
      return {
        ...item,
        props: {
          ...item.props,
          options: stationList,
        },
      }
    } else if (item.name === 'deviceType') {
      return {
        ...item,
        props: {
          ...item.props,
          options: deviceTypeOptions,
        }
      }
    } else if (item.name === 'modelId') {
      return {
        ...item,
        props: {
          ...item.props,
          options: deviceModel,
        }
      }
    }
    return item
  })

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

  const formSelectChange = useRef(async (changeVal, setFormConfigs) => {
        
    if (changeVal?.stationId) {
      // const modelList = await getStAllDeviceModel(changeVal.stationId)
      // const chgOptions = {
      //   modelId: {
      //   options: modelList,
      //   ...(modelList?.length ? { value: modelList[0].value } : {})
      // }
    }
      // setFormConfigs((prevState) => ({ ...prevState, ...chgOptions }))
    // }
  })
  return (
    <div className="page-wrap setting-user">
      <CustomForm
        ref={formRef}
        loading={loading}
        buttons={ST_MANAGE_SCH_FORM_BTNS}
        itemOptions={searchFormItems}
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
        open={isModalOpen === "add" || isModalOpen === "update"}
        footer={null}
        onCancel={() => setIsModalOpen("")}
        Component={AddModal}
        componentProps={{
          buttonClick: btnClkRef,
          editType: isEditOrAdd,
          selectRowInfo,
          FORM_ITEMS: addFormItems,
          formSelectChange: formSelectChange.current,
          deviceModel,
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
