/*
 * 
 * @Description: 时序库迁移
 */
import { useEffect, useRef, useState } from "react"

import CustomForm from "@/components/custom-form"
import { IFormInst, TFormItemConfig } from "@/components/custom-form/types"
import CustomTable from "@/components/custom-table"
import usePageSearch from "@/hooks/use-page-search"
import { getStorage, showMsg } from "@/utils/util-funs"
import CustomModal from "@/components/custom-modal"

import AddCom  from "./components/add"
import {
  NO_TAGS,
  ST_POINT_SCH_FORM_BTNS,
  ST_STATION_FORM_ITEMS,
  ST_STATION_SYS_COLUMNS,
  ST_STATION_SYS_COLUMNS_SHOW,
} from "./configs"
import {
  changeRefleshFlag,
  exportData,
  getCtlRuleSchData,
  onSetPointSysSchFormChgInit,
} from "./methods"
import { IPointSysInfo, IStPiontSysListParam, TStationIdxSchFormField } from "./types"

import { TFormType } from "@/types/i-config"

export default function TimeLibrary() {
  const formRef = useRef<IFormInst | null>(null)
  //搜索组件数据集合
  const [formList, setFormItemConfig] = useState<TFormItemConfig<TStationIdxSchFormField>>({})
  const [dataSourceList, setDataSourceList] = useState([])
  const isEditState = useRef(false)
  const [column, setColumn] = useState(ST_STATION_SYS_COLUMNS_SHOW(""))
  const modeRef = useRef<any>(null)

  const [formField, setFormField] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const [btnCombination, setBtnCombination] = useState([...ST_POINT_SCH_FORM_BTNS])
  const [controlTypeList, setControlTypeList] = useState([])
  const deviceTypeRef = useRef("")

  const { dataSource, loading, pagination, onSearch } = usePageSearch<IStPiontSysListParam, IPointSysInfo>(
    // { serveFun: getCtlRuleSchData },
    {
      serveFun: async (pageInfo, formData) => {
        const res = await getCtlRuleSchData(pageInfo, formData);
        let records: IPointSysInfo[] = []
        if (Array.isArray(res.records)) {
          records = res.records as IPointSysInfo[]
        } else if (res.records && typeof res.records === 'object' && Array.isArray(res.records)) {
          records = res.records as IPointSysInfo[]
        }
        return {
          records,
          total: res.total ?? 0,
        }
      },
    },
    { formRef, needFirstSch: false },
  )

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
  useEffect(() => {
    onSearch()
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
    if (type === "add") {
      setIsModalOpen(true)
    } else if (type === "export") {
      const formData = formRef.current?.getFormValues()
      const obj = {
        pageNum: pagination.current,
        pageSize: pagination.pageSize,
        oldDevicePath: '',
        newDevicePath: '',
        status: formData.status,
      }
      exportData(obj)
    }
  }
 
  const onSchValueChgRef = async (changedValue) => {
    const chgOptions = await onSetPointSysSchFormChgInit(changedValue, formRef.current)

    setFormItemConfig((prevState) => ({ ...prevState, ...chgOptions }))
  }
  
  // 新增和编辑
  const btnClkRef = async (type: "ok" | "close", data?) => {
    // 执行
    if (type === "ok") {
      setIsModalOpen(false)
      return onSearch()
    }
    if (type === "close") return setIsModalOpen(false)
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
        rowKey="deviceCode"
        loading={loading}
        limitHeight
        columns={column}
        dataSource={dataSourceList}
        pagination={pagination}
      />
      <CustomModal
        ref={modeRef}
        title="新增"
        width={1340}
        destroyOnClose
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        Component={AddCom as any}
        componentProps={{
          buttonClick: btnClkRef,
          formField: formField,
        }}
      />
    </div>
  )
}
