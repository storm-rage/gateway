/*
 * @Author: chenmeifeng
 * @Date: 2023-10-17 17:01:13
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-07-08 13:54:14
 * @Description:
 */

import "./index.less"

import usePageSearch from "@hooks/use-page-search.ts"
import { useAtomValue } from "jotai"
import React, { useEffect, useRef, useState } from "react"

import CustomForm from "@/components/custom-form"
import { IFormInst, TFormItemConfig } from "@/components/custom-form/types.ts"
// import CustomModal from "@/components/custom-modal"
import CustomTable from "@/components/custom-table"
import { AtomStation } from "@/store/atom-station"
import {
  DEVICE_ATT_COLUMNS,
  DEVICE_ATT_EDIT_COLUMNS,
  DEVICE_DEFAULT_TEXT_COLUMN,
  NO_TAGS,
  ST_MANAGE_FORM_ITEMS,
  ST_MANAGE_SCH_FORM_BTNS,
  getDeviceColumns,
} from "./configs/index"
import {
  addDvsMethods,
  changeRefleshFlag,
  delDvsMethods,
  exportData,
  exportTemplate,
  getMdList,
  getSettingMngSchData,
  importFile,
  onSettingMngSchFormChg,
  saveStnIdxData,
} from "./methods/index"
import { DevideListParam, IDeviceListData, TDeviceSchFormField } from "./types/index"
import { showMsg } from "@/utils/util-funs"
import CustomModal from "@/components/custom-modal"
import CustomAddModal, { IOperateProps, IPerateRef } from "@/components/custom-model-form"
import { formItemFuc } from "./configs/model"
import useTableSelection from "@/hooks/use-table-selection"
import FileImport from "@/components/custom-upload/upload"
import RemoveContent from "@/components/custom-modal/components/remove-content"
import { TFormType } from "@/types/i-config"
import { getStAllDeviceModel, getStationDvsTypes } from "@/utils/device-funs"
const rowSelectProps = { needInfo: true }
export default function DeviceManage() {
  const formRef = useRef<IFormInst | null>(null)
  //搜索组件数据集合
  const [formList, setFormItemConfig] = useState<TFormItemConfig<TDeviceSchFormField>>({})
  const { stationOptions4Id } = useAtomValue(AtomStation)
  const isEditState = useRef(false)
  const isFirst = useRef(true)
  const deviceTypeRef = useRef("WT")
  const [column, setColumn] = useState(DEVICE_ATT_COLUMNS.concat(DEVICE_DEFAULT_TEXT_COLUMN(deviceTypeRef.current)))
  const [dataSourceList, setDataSourceList] = useState([])
  const dvsTypeModels = useRef({})
  const dvsTypeLines = useRef({})
  const dvsTypePeriod = useRef({})
  const modeRef = useRef<any>(null)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [delModal, setDelModal] = useState(false)
  const [importModal, setImportModal] = useState(false)

  const [btnCombination, setBtnCombination] = useState([...ST_MANAGE_SCH_FORM_BTNS])
  // 执行查询的钩子
  //  usePageSearch<IRpPowerSchParams, IRpPowerData>
  const { dataSource, loading, pagination, onSearch } = usePageSearch<DevideListParam, IDeviceListData>(
    { serveFun: getSettingMngSchData },
    { formRef, needFirstSch: false },
  )

  // 选择框
  const { rowSelection, setSelectedRowKeys, selectedRowKeys, selectedRows, setSelectedRows } =
    useTableSelection(rowSelectProps)

  const setDataSource = ({ record, value, dataIndex }) => {
    const newData = [...dataSourceList]
    const index = newData.findIndex((item) => record.id === item.id)
    console.log(dataSourceList)

    const item = newData[index]
    const noTag = NO_TAGS.includes(dataIndex)
      ? {
          [dataIndex]: value,
        }
      : {
          tags: {
            ...(item?.deviceTags || {}),
            ...(item?.tags || {}),
            [dataIndex]: value,
          },
        }
    newData.splice(index, 1, {
      ...item,
      ...noTag,
      edit: true,
    })
    console.log(newData, "newData")

    setDataSourceList(newData)
  }

  async function onFormAction(type: TFormType) {
    if (type === "edit") {
      if (!isEditState.current && dataSource?.length > 100) {
        return showMsg("编辑条数过多,请选择100条以下的页码")
      }
      isEditState.current = !isEditState.current
      const groud = JSON.parse(JSON.stringify(ST_MANAGE_SCH_FORM_BTNS))
      groud.forEach((i) => {
        if (i.name === "edit") {
          i.label = isEditState.current ? "保存" : "批量编辑"
        }
      })
      setBtnCombination(groud)
      if (!isEditState.current) {
        await saveStnIdxData(dataSourceList)
          .then((res) => {
            if (!res) return
            onSearch()
          })
          .finally(() => {
            setColumn(DEVICE_ATT_COLUMNS.concat(DEVICE_DEFAULT_TEXT_COLUMN(deviceTypeRef.current)))
          })
      } else {
        console.log(deviceTypeRef.current, "deviceTypeRef.current")

        setColumn(
          DEVICE_ATT_EDIT_COLUMNS(
            setDataSource,
            dvsTypeModels.current,
            dvsTypeLines.current,
            dvsTypePeriod.current,
          ).concat(getDeviceColumns(deviceTypeRef.current, setDataSource)),
        )
      }
    } else if (type === "add") {
      setIsModalOpen(true)
    } else if (type === "batchDelete") {
      if (!selectedRowKeys.length) {
        return showMsg("请至少选择一条！")
      }
      setDelModal(true)
    } else if (type === "template") {
      const res = await exportTemplate()
    } else if (type === "import") {
      setImportModal(true)
    } else if (type === "export") {
      const formData = formRef.current?.getFormValues()
      exportData(formData)
    }
  }

  const onSchValueChgRef = async (changedValue) => {
    const chgOptions = await onSettingMngSchFormChg(changedValue, formRef.current)
    setFormItemConfig((prevState) => ({ ...prevState, ...chgOptions }))
  }
  const initData = async () => {
    const { stationId } = formRef.current?.getFormValues()
    const list = await getMdList(stationId)
    dvsTypeModels.current = list?.model
    dvsTypeLines.current = list?.line
    dvsTypePeriod.current = list?.period
  }
  const searchStnDvs = () => {
    changeRefleshFlag(true)
    const deviceType = formRef.current?.getFormValues()?.deviceType
    deviceTypeRef.current = deviceType
    console.log(deviceTypeRef.current, "deviceTypeRef.current")

    setColumn(DEVICE_ATT_COLUMNS.concat(DEVICE_DEFAULT_TEXT_COLUMN(deviceTypeRef.current)))
    onSearch()
  }
  const formSelectChange = useRef(async (changeVal, setFormConfigs) => {
    const formIns = modeRef.current?.getChildrenRef()?.getInst()
    if (changeVal?.stationId) {
      const list = await getMdList(changeVal?.stationId)
      const { line, period } = list || { line: [], period: [] }
      console.log(list, "list")
      formIns?.setFieldsValue?.({
        modelId: undefined,
        lineCode: undefined,
        periodCode: undefined,
        deviceType: undefined,
      })
      const dvsType = await getStationDvsTypes(changeVal?.stationId)
      const chgOptions = {
        lineCode: { options: line },
        periodCode: { options: period },
        deviceType: { options: dvsType },
      }
      setFormConfigs((prevState) => ({ ...prevState, ...chgOptions }))
    } else if (changeVal?.deviceType) {
      formIns?.setFieldsValue?.({ modelId: undefined })
      const chgOptions = { modelId: { options: dvsTypeModels?.current?.[changeVal?.deviceType] } }
      setFormConfigs((prevState) => ({ ...prevState, ...chgOptions }))
    }
  })
  // 新增和编辑
  const btnClkRef = async (type: "ok" | "close", data?) => {
    // 执行
    if (type === "ok") {
      const res = await addDvsMethods(data)
      if (!res) return
      setIsModalOpen(false)
      return onSearch()
    }
    if (type === "close") return setIsModalOpen(false)
  }
  const delBtnClkRef = async (type: "ok" | "close" | "delete_ok", info) => {
    // 执行
    if (type === "delete_ok") {
      const res = await delDvsMethods(selectedRows)
      if (!res) return
      setDelModal(false)
      setSelectedRowKeys([])
      setSelectedRows([])
      return onSearch()
    }
    if (type === "close") return setDelModal(false)
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
    if (isFirst.current) {
      isFirst.current = false
      const formInst = formRef.current?.getInst()
      setColumn(DEVICE_ATT_COLUMNS)
      formInst?.submit()
    }
  }, [])
  useEffect(() => {
    setDataSourceList(dataSource)
    initData()
  }, [dataSource])

  useEffect(() => {
    if (isEditState.current) {
      setColumn(
        DEVICE_ATT_EDIT_COLUMNS(
          setDataSource,
          dvsTypeModels.current,
          dvsTypeLines.current,
          dvsTypePeriod.current,
        ).concat(getDeviceColumns(deviceTypeRef.current, setDataSource)),
      )
    }
  }, [dataSourceList])

  useEffect(() => {
    // setFormItemConfig((prevState) => ({ ...prevState, stationId: { options: stationOptions4Id } }))
    const formInst = formRef.current?.getInst()
    formInst?.submit()
  }, [stationOptions4Id])
  return (
    <div className="page-wrap">
      <CustomForm
        ref={formRef}
        loading={loading}
        itemOptionConfig={formList}
        itemOptions={ST_MANAGE_FORM_ITEMS}
        buttons={btnCombination}
        formOptions={{
          // validateTrigger: ["onSubmit"],
          onValuesChange: onSchValueChgRef,
        }}
        onSearch={searchStnDvs}
        onAction={onFormAction}
      />
      <CustomTable
        rowKey="id"
        limitHeight
        columns={column}
        rowSelection={rowSelection}
        loading={loading}
        dataSource={dataSourceList}
        pagination={pagination}
      />
      <CustomModal<IOperateProps, IPerateRef>
        ref={modeRef}
        title="新增"
        destroyOnClose
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        Component={CustomAddModal}
        componentProps={{
          buttonClick: btnClkRef,
          editType: "add",
          formSelectChange: formSelectChange.current,
          FORM_ITEMS: formItemFuc(),
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
        open={delModal}
        footer={null}
        onCancel={() => setDelModal(false)}
        Component={RemoveContent}
        componentProps={{ buttonClick: delBtnClkRef }}
      />
    </div>
  )
}
