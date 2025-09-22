/*
 * @Author: chenmeifeng
 * @Date: 2024-01-05 14:57:58
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-05-20 14:33:32
 * @Description:
 */
import { useEffect, useRef, useState } from "react"

import CustomForm from "@/components/custom-form"
import { IFormInst, TFormItemConfig } from "@/components/custom-form/types"
import CustomTable from "@/components/custom-table"
import usePageSearch from "@/hooks/use-page-search"
import {
  NO_TAGS,
  ST_POINT_SCH_FORM_BTNS,
  ST_STATION_FORM_ITEMS,
  ST_STATION_SYS_COLUMNS,
  ST_STATION_SYS_COLUMNS_SHOW,
} from "./configs"
import {
  addAlarmMethods,
  delUserMethods,
  exportData,
  exportTemplate,
  getSettingStIdexSchData,
  importFile,
  onSetPointSysSchFormChg,
  saveMftRuleData,
} from "./methods"
import { IModelRuleInfo, IMdRuleParam, TStationIdxSchFormField } from "./types"
import CustomModal from "@/components/custom-modal"
import { TModalType } from "@/types/i-config"
import RemoveContent from "@/components/custom-modal/components/remove-content"
import FileImport from "@/components/custom-upload/upload"
import useTableSelection from "@/hooks/use-table-selection"
import { AtomConfigMap } from "@/store/atom-config"
import { useAtomValue } from "jotai"
import CustomAddModal, { IOperateProps, IPerateRef } from "@/components/custom-model-form"
import { formItemFuc } from "./configs/model"
import { showMsg } from "@/utils/util-funs"
import { getStAllDeviceModel } from "@/utils/device-funs"
const options = [
  { value: 1, label: "是" },
  { value: 0, label: "否" },
]

const rowSelectProps = { needInfo: true }
export default function AlarmManuft() {
  const formRef = useRef<IFormInst | null>(null)
  //搜索组件数据集合
  const [formList, setFormItemConfig] = useState<TFormItemConfig<TStationIdxSchFormField>>({})
  const [dataSourceList, setDataSourceList] = useState([])
  const isEditState = useRef(false)
  const isFirst = useRef(true)
  const [column, setColumn] = useState(ST_STATION_SYS_COLUMNS_SHOW)
  const modeRef = useRef<any>(null)

  const [isModalOpen, setIsModalOpen] = useState("")
  const [importModal, setImportModal] = useState(false)
  const [isEditOrAdd, setIsEditOrAdd] = useState<TModalType>("add")

  const [btnCombination, setBtnCombination] = useState([...ST_POINT_SCH_FORM_BTNS])
  const [belongList, setBelongList] = useState([])

  const { brakelevelLsMap, alarmlevelLsMap, deviceSystemMap } = useAtomValue(AtomConfigMap).map

  // 设置选中的一条数据
  const [selectRowInfo, setSelectRowInfo] = useState(null)

  // 选择框
  const { rowSelection, setSelectedRowKeys, selectedRowKeys, selectedRows, setSelectedRows } =
    useTableSelection(rowSelectProps)
  const { dataSource, loading, pagination, onSearch } = usePageSearch<IMdRuleParam, IModelRuleInfo>(
    { serveFun: getSettingStIdexSchData },
    { formRef, needFirstSch: false },
  )
  const setDataSource = async ({ record, value, dataIndex }) => {
    const newData = [...dataSourceList]
    const index = newData.findIndex((item) => record.id === item.id)
    const item = newData[index]
    // const belongSys = await getAllBelongSystem();
    const isSys = NO_TAGS.includes(dataIndex)
      ? {
          [dataIndex]: value,
        }
      : {
          tags: {
            ...(item?.tags || {}),
            [dataIndex]: value,
          },
        }
    newData.splice(index, 1, {
      ...item,
      ...isSys,
      edit: true,
    })
    setDataSourceList(newData)
  }

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false
      const formInst = formRef.current?.getInst()
      formInst?.submit()
    }
    // console.log(brakelevelLsMap, "brakelevelLsMap", alarmlevelLsMap, deviceSystemMap)
  }, [])
  useEffect(() => {
    setDataSourceList(dataSource)
  }, [dataSource])

  useEffect(() => {
    if (isEditState.current) {
      setColumn(ST_STATION_SYS_COLUMNS(setDataSource, deviceSystemMap, alarmlevelLsMap, brakelevelLsMap))
    }
  }, [dataSourceList])

  async function onFormAction(type: string) {
    if (type === "save") {
      if (!isEditState.current && dataSource?.length > 100) {
        return showMsg("编辑条数过多,请选择100条以下的页码")
      }
      isEditState.current = !isEditState.current
      const groud = JSON.parse(JSON.stringify(ST_POINT_SCH_FORM_BTNS))
      groud.forEach((i) => {
        if (i.name === "save") {
          i.label = isEditState.current ? "保存" : "批量编辑"
        }
      })
      setBtnCombination(groud)
      isEditState.current
        ? setColumn(ST_STATION_SYS_COLUMNS(setDataSource, deviceSystemMap, alarmlevelLsMap, brakelevelLsMap))
        : ""
      !isEditState.current
        ? saveMftRuleData(dataSourceList)
            .then((res) => {
              if (!res) return
              onSearch()
            })
            .finally(() => {
              setColumn(ST_STATION_SYS_COLUMNS_SHOW)
            })
        : ""
    } else if (type === "add") {
      setIsModalOpen(type)
    } else if (type === "batchDelete") {
      if (!selectedRowKeys.length) {
        return showMsg("请至少选择一条！")
      }
      setIsModalOpen(type)
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

  const onSchValueChgRef = async (changedValue) => {
    const chgOptions = await onSetPointSysSchFormChg(changedValue, formRef.current)
    setFormItemConfig((prevState) => ({ ...prevState, ...chgOptions }))
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
  // 新增和编辑
  const btnClkRef = async (type: "ok" | "close", data?) => {
    setSelectRowInfo(null)
    // 执行
    if (type === "ok") {
      const res = await addAlarmMethods(data)
      if (!res) return
      setIsModalOpen("")
      return onSearch()
    }
    if (type === "close") return setIsModalOpen("")
  }
  const formSelectChange = useRef(async (changeVal, setFormConfigs) => {
    if (changeVal?.stationId) {
      const models = await getStAllDeviceModel(changeVal?.stationId)
      const chgOptions = { modelId: { options: models } }
      setFormConfigs((prevState) => ({ ...prevState, ...chgOptions }))
    }
  })
  return (
    <div className="page-wrap">
      <CustomForm
        ref={formRef}
        loading={loading}
        itemOptionConfig={formList}
        itemOptions={ST_STATION_FORM_ITEMS}
        buttons={btnCombination}
        onSearch={() => {
          onSearch()
        }}
        formOptions={{
          onValuesChange: onSchValueChgRef,
        }}
        onAction={onFormAction}
      />
      <CustomTable
        rowKey="id"
        loading={loading}
        limitHeight
        columns={column}
        rowSelection={rowSelection}
        dataSource={dataSourceList}
        pagination={pagination}
      />
      <CustomModal<IOperateProps, IPerateRef>
        ref={modeRef}
        title="新增"
        destroyOnClose
        open={isModalOpen === "add"}
        footer={null}
        onCancel={() => setIsModalOpen("")}
        Component={CustomAddModal}
        componentProps={{
          buttonClick: btnClkRef,
          editType: isEditOrAdd,
          formSelectChange: formSelectChange.current,
          FORM_ITEMS: formItemFuc(false, {
            systems: deviceSystemMap,
            alarmlevels: alarmlevelLsMap,
            brakeLevels: brakelevelLsMap,
          }),
        }}
      />
      <CustomModal
        title="删除"
        destroyOnClose
        open={isModalOpen === "batchDelete"}
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
