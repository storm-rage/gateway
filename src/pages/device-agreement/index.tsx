/*
 * @Description: 设备协议
 */
import "./index.less"

import usePageSearch from "@hooks/use-page-search.ts"
import React, { useEffect, useRef, useState, useMemo } from "react"

import CustomForm from "@/components/custom-form"
import { IFormInst } from "@/components/custom-form/types.ts"
import CustomModal from "@/components/custom-modal"
import RemoveContent from "@/components/custom-modal/components/remove-content"
import CustomTable from "@/components/custom-table"
import useTableSelection from "@/hooks/use-table-selection"
import { showMsg } from "@/utils/util-funs"

import { DEVICE_ATT_COLUMNS, ST_MANAGE_SCH_FORM_BTNS, RP_DEVICE_SCH_FORM_ITEMS, ADD_FORM_ITEMS, ADD_FORM_ITEMS_BATCH } from "./configs/index"
import { addUserMethods, delUserMethods, getSettingUserSchData, importFile, exportFile, getDeviceType, getStation, getModel, getDeviceCodeList } from "./methods/index"
import { IUserList, TModelFrAndTbInfo, TUserTbActInfo } from "./types/index"
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
  const [deviceCodeList, setDeviceCodeList] = useState<{ label: string; value: string }[]>([])
  
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
        if(res) {
          res.records.forEach(item => {
            item.value = item.id
            item.label = item.shortName
          })
          setStationList(res.records)
          // 场站数据加载完成后，默认选中第一个并查询
          if (res.records.length > 0 && formRef.current) {
            const formInst = formRef.current.getInst()
            if (formInst) {
              formInst.setFieldsValue({
                stationId: res.records[0].id,
              })
              // 触发查询
              // onSearch()
            }
          }
        }
      })
      getModel().then(res => {
        if(res) {
          res.records.forEach(item => {
            item.value = item.id
            item.label = item.model
          })
          setDeviceModel(res.records)
        }
      })
      getDeviceCodeList({ pageNum: 1, pageSize: 100, deviceCode: ''}).then(res => {
        if(res?.records) {
          const uniqueCodes = new Map<string, { label: string; value: string }>()
          const filteredRecords = res.records.filter(item => item.stationId == formRef.current?.getFormValues().stationId)
          filteredRecords.forEach(item => {
            if (!uniqueCodes.has(item.deviceCode)) {
              uniqueCodes.set(item.deviceCode, { label: item.deviceCode, value: item.deviceCode })
            }
          })
          const list = Array.from(uniqueCodes.values())
          setDeviceCodeList(list)
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
    } else if (item.name === 'deviceCode') {
      return {
        ...item,
        props: {
          ...item.props,
          options: deviceCodeList,
        },
      }
    }
    return item
  })

  const addFormItemsBatch = ADD_FORM_ITEMS_BATCH.map(item => {
    return item
  })

  // 执行查询的钩子
  // const { dataSource, loading, pagination, onSearch } = usePageSearch<IUserListParam, IUserList>(
  const { dataSource, loading, pagination, onSearch } = usePageSearch<any>(
    { serveFun: async (pageInfo, formData) => {
      const res = await getSettingUserSchData(pageInfo, formData)
      // 如果返回的是 boolean（例如 false 表示失败），则返回空数据结构
      if (typeof res === 'boolean') {
        return { records: [], total: 0 }
      }
      return res
      }
    },
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
      const formData = formRef.current?.getFormValues?.() || {}
      const params = {
        "pageNum": pagination.current || 1,
        "pageSize": pagination.pageSize || 10,
        "deviceCode": formData.deviceCode || "",
        "modelId": formData.modelId || "",
        "stationId": formData.stationId || "",
        "protocolType": formData.protocolType || "",
        "state": formData.state || "",
      }
      exportFile(params)
    } else if(type === "search") {
      onSearch()
      setSelectedRowKeys([])
      setSelectedRows([])
      
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
  const btnClkRef = async (type: "ok" | "close", data?: TModelFrAndTbInfo, tag?: TModalType) => {
    // setSelectRowInfo(null)
    // 执行
    if (type === "ok") {
      let obj = {
        ...data,
        stationId: formRef.current?.getFormValues().stationId,
        modelId: selectRowInfo?.modelId,
      }
      const res = await addUserMethods(obj, tag, selectRowInfo)
      if (!res) return
      setIsModalOpen("")
      return onSearch()
    }
    if (type === "close") return setIsModalOpen("")
    setSelectRowInfo(null)
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
      console.log(selectedRowKeys,selectRowInfo,handleSelectRowIds,'===idList')
      const res = await delUserMethods({
        idList: handleSelectRowIds,
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
const handleSelectRowIds = useMemo(() => {
  let batchSelectIds = []
  dataSource.forEach(item => {
    selectedRowKeys.forEach(i => {
      if (item.id == i && item.children.length) {
        batchSelectIds = batchSelectIds.concat(item.children.map(i=>i.id))
      }
      if(item.id == i && !item.children.length) {
        batchSelectIds.push(i)
      }
    })
    
  })
  batchSelectIds = [...new Set(batchSelectIds)]
  return selectRowInfo ? dataSource.find(item=>item.id == selectRowInfo.id)?.children?.map(i=>i.id) || [] : batchSelectIds
  // return selectRowInfo ? selectRowInfo.[selectRowInfo.id] : selectedRowKeys

},[selectedRowKeys, selectRowInfo])

  const formSelectChange = useRef(async (changeVal, setFormConfigs) => {
    if (changeVal?.deviceCode) {
      
    }
  })
  
  const handleSwitchChange = async (checked: boolean, record: IUserList) => {
      btnClkRef("ok", { ...record, state: checked? '1':'0' }, "update")
    }
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([])
  const onExpand = (expanded: boolean, record: IUserList) => {
    if (expanded) {
      setExpandedRowKeys([...expandedRowKeys, record.id])
    } else {
      setExpandedRowKeys(expandedRowKeys.filter(key => key !== record.id))
    }
  }
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
        columns={DEVICE_ATT_COLUMNS({ onClick: onTbAction, onSwitchChange: handleSwitchChange })}
        dataSource={dataSource}
        pagination={pagination}
        expandable={{
          expandedRowKeys,
          onExpand,
        }}
      />
      <CustomModal<IOperateProps, IPerateRef>
        ref={modeRef}
        width={600}
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
          FORM_ITEMS: selectRowInfo?.children?.length ? addFormItemsBatch : addFormItems,
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
