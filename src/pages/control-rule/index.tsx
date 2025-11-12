/*
 * @Author: chenmeifeng
 * @Date: 2024-01-05 14:57:58
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-10-30 10:07:49
 * @Description:
 */
import { useEffect, useRef, useState } from "react"

import CustomForm from "@/components/custom-form"
import { IFormInst, TFormItemConfig } from "@/components/custom-form/types"
import CustomTable from "@/components/custom-table"
import { StorageDeviceSystem, StorageDeviceType, StorageSubSysType } from "@/configs/storage-cfg"
import usePageSearch from "@/hooks/use-page-search"
import { getStorage, showMsg } from "@/utils/util-funs"
import EditableInputCell from "@/pages/setting-station/components/edit-input"
import EditableCell from "./components/edit-select"
import {
  NO_TAGS,
  ST_POINT_SCH_FORM_BTNS,
  ST_STATION_FORM_ITEMS,
  ST_STATION_SYS_COLUMNS,
  ST_STATION_SYS_COLUMNS_SHOW,
} from "./configs"
import {
  addRuleMethods,
  changeRefleshFlag,
  delRuleMethods,
  exportData,
  exportTemplate,
  getDevices,
  getCtlRuleSchData,
  importFile,
  onSetPointSysSchFormChg,
  saveRuleData,
  getControlType,
} from "./methods"
import { IPointSysInfo, IStPiontSysListParam, TStationIdxSchFormField } from "./types"
import FileImport from "@/components/custom-upload/upload"
import CustomModal from "@/components/custom-modal"
import CustomAddModal, { IOperateProps, IPerateRef } from "@/components/custom-model-form"
import { AtomConfigMap } from "@/store/atom-config"
import { useAtomValue } from "jotai"
import { formItemFuc } from "./configs/model"
import useTableSelection from "@/hooks/use-table-selection"
import { TFormType } from "@/types/i-config"
import RemoveContent from "@/components/custom-modal/components/remove-content"
import { userInfoAtom } from "@/store/atom-auth"

const rowSelectProps = { needInfo: true }
export default function SettingStation() {
  const formRef = useRef<IFormInst | null>(null)
  //搜索组件数据集合
  const [formList, setFormItemConfig] = useState<TFormItemConfig<TStationIdxSchFormField>>({})
  const [dataSourceList, setDataSourceList] = useState([])
  const isEditState = useRef(false)
  const isFirst = useRef(true)
  const [column, setColumn] = useState(ST_STATION_SYS_COLUMNS_SHOW(""))
  const modeRef = useRef<any>(null)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [delModal, setDelModal] = useState(false)
  const [importModal, setImportModal] = useState(false)

  const [btnCombination, setBtnCombination] = useState([...ST_POINT_SCH_FORM_BTNS])
  const [controlTypeList, setControlTypeList] = useState([])
  const deviceTypeRef = useRef("")

  const userInfo = useAtomValue(userInfoAtom)
  const { dataSource, loading, pagination, onSearch } = usePageSearch<IStPiontSysListParam, IPointSysInfo>(
    { serveFun: getCtlRuleSchData },
    { formRef, needFirstSch: false },
  )
  // 选择框
  const { rowSelection, setSelectedRowKeys, selectedRowKeys, selectedRows, setSelectedRows } =
    useTableSelection(rowSelectProps)

  const setDataSource = async ({ record, value, dataIndex }) => {
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

  const init = async () => {
    const res = await getControlType()
    setFormItemConfig((prevState) => ({
      ...prevState,
      controlType: { options: res },
    }))
    setControlTypeList(res)
    const formInst = formRef.current?.getInst()
    formInst?.submit()
  }
  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false
      init()
    }
  }, [])

  useEffect(() => {
    setDataSourceList(dataSource)
    if (!isEditState.current) {
      setColumn(ST_STATION_SYS_COLUMNS_SHOW(deviceTypeRef.current))
    }
  }, [dataSource])

  useEffect(() => {
    if (isEditState.current) {
      setColumn(ST_STATION_SYS_COLUMNS(setDataSource, controlTypeList))
    }
  }, [dataSourceList])

  async function onFormAction(type: TFormType) {
    if (type === "edit") {
      isEditState.current = !isEditState.current
      const groud = JSON.parse(JSON.stringify(ST_POINT_SCH_FORM_BTNS))
      groud.forEach((i) => {
        if (i.name === "edit") {
          i.label = isEditState.current ? "保存" : "批量编辑"
        }
      })
      setBtnCombination(groud)
      isEditState.current
        ? setColumn(ST_STATION_SYS_COLUMNS(setDataSource, controlTypeList))
        : setColumn(ST_STATION_SYS_COLUMNS_SHOW(deviceTypeRef.current))
      !isEditState.current
        ? saveRuleData(dataSourceList, userInfo.loginName).then((res) => {
            if (!res) return
            onSearch()
          })
        : ""
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
  const onSchValueChgRef = async (changedValue) => {
    const chgOptions = await onSetPointSysSchFormChg(changedValue, formRef.current)

    setFormItemConfig((prevState) => ({ ...prevState, ...chgOptions }))
  }
  const formSelectChange = useRef(async (changeVal, setFormConfigs) => {
    if (changeVal?.stationCode) {
      const deviceId = await getDevices(changeVal?.stationCode)
      const chgOptions = { deviceId: { options: deviceId } }
      setFormConfigs((prevState) => ({ ...prevState, ...chgOptions }))
    }
  })
  // 新增和编辑
  const btnClkRef = async (type: "ok" | "close", data?) => {
    // 执行
    if (type === "ok") {
      const res = await addRuleMethods(data, userInfo.loginName)
      if (!res) return
      setIsModalOpen(false)
      return onSearch()
    }
    if (type === "close") return setIsModalOpen(false)
  }
  const delBtnClkRef = async (type: "ok" | "close" | "delete_ok", info) => {
    // 执行
    if (type === "delete_ok") {
      const res = await delRuleMethods(selectedRows)
      if (!res) return
      setDelModal(false)
      setSelectedRowKeys([])
      setSelectedRows([])
      return onSearch()
    }
    if (type === "close") return setDelModal(false)
  }
  const searchTable = () => {
    changeRefleshFlag(true)
    onSearch()
  }
  return (
    <div className="page-wrap">
      <CustomForm
        ref={formRef}
        loading={loading}
        itemOptionConfig={formList}
        itemOptions={ST_STATION_FORM_ITEMS}
        buttons={btnCombination}
        onSearch={searchTable}
        formOptions={{
          onValuesChange: onSchValueChgRef,
        }}
        onAction={onFormAction}
      />
      <CustomTable
        rowKey="id"
        loading={loading}
        limitHeight
        rowSelection={rowSelection}
        columns={column}
        dataSource={dataSourceList}
        pagination={pagination}
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
          FORM_ITEMS: formItemFuc({
            controlType: controlTypeList,
          }),
        }}
      />
    </div>
  )
}
