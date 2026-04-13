/*
 * 
 * @Description: 虚拟点规则配置
 */
import { useEffect, useRef, useState } from "react"
import CustomForm from "@/components/custom-form"
import { IFormInst, TFormItemConfig } from "@/components/custom-form/types"
import CustomTable from "@/components/custom-table"
import usePageSearch from "@/hooks/use-page-search"
import { showMsg } from "@/utils/util-funs"
import CustomModal from "@/components/custom-modal"
import AddCom from "./components/addCom"
import RemoveContent from "@/components/custom-modal/components/remove-content"
import FileImport from "@/components/custom-upload/upload"

import {
  ST_POINT_SCH_FORM_BTNS,
  ST_STATION_FORM_ITEMS,
  ST_STATION_SYS_COLUMNS,
  ST_STATION_SYS_COLUMNS_SHOW,
} from "./configs"
import {
  addRuleMethods,
  changeRefleshFlag,
  delRuleSingle,
  delRuleMethods,
  handleBatchEnable,
  handleBatchDisable,
  exportData,
  exportTemplate,
  getCtlRuleSchData,
  importFile,
  onSetPointSysSchFormChg,
  saveRuleData,
  getControlType,
} from "./methods"
import { getStAllDeviceModel } from "@/utils/device-funs"
import { IPointSysInfo, IStPiontSysListParam, TStationIdxSchFormField } from "./types"

import { useAtomValue } from "jotai"
import useTableSelection from "@/hooks/use-table-selection"
import { TFormType } from "@/types/i-config"
import { userInfoAtom } from "@/store/atom-auth"

const rowSelectProps = { needInfo: true }
export default function TimeLibrary() {
  const formRef = useRef<IFormInst | null>(null)
  //搜索组件数据集合
  const [formList, setFormItemConfig] = useState<TFormItemConfig<TStationIdxSchFormField>>({})
  const [dataSourceList, setDataSourceList] = useState([])
  const isEditState = useRef(false)
  const isFirst = useRef(true)
  const onTbAction = async (record, { key }) => {
      setIsModalOpen(key)
      setSelectRowInfo(record)
      if (key === "edit") {
        setModelId(record.modelId)
        setIsEditOrAdd(key)
        console.log(record, '==record')
      }
      if(key =="deleted") {
        setSelectRowInfo(record)
        setDelModal(key)
      }
    }
  const [column, setColumn] = useState(ST_STATION_SYS_COLUMNS_SHOW({ onClick: onTbAction }))
  const modeRef = useRef<any>(null)

  const [isModalOpen, setIsModalOpen] = useState('')
  const [delModal, setDelModal] = useState('')
  const [importModal, setImportModal] = useState(false)

  const [btnCombination, setBtnCombination] = useState([...ST_POINT_SCH_FORM_BTNS])
  const [controlTypeList, setControlTypeList] = useState([])
  const deviceTypeRef = useRef("")

  const userInfo = useAtomValue(userInfoAtom)
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
  const handleDelete = async () => {
    if (!selectedRowKeys.length) {
      return showMsg("请至少选择一条！")
    }
    const res = await delRuleMethods(selectedRows)
    if (res) {
      setDelModal('')
      setSelectedRowKeys([])
      setSelectedRows([])
      onSearch()
    }
  }

  const init = async () => {
    const res = await getControlType()
    console.log(res,'=getControlType')
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
      // setColumn(ST_STATION_SYS_COLUMNS_SHOW(deviceTypeRef.current))
    }
  }, [dataSource])
  const [selectRowInfo, setSelectRowInfo] = useState<any>({})
  const [isEditOrAdd, setIsEditOrAdd] = useState<'edit' | 'add' | 'see' | ''>('');
  const [modelId, setModelId] = useState<number | null>(null);
  

  useEffect(() => {
    if (isEditState.current) {
      setColumn(ST_STATION_SYS_COLUMNS(setDataSource, controlTypeList))
    }
  }, [dataSourceList])

  async function onFormAction(type: TFormType) {
    if (type === "add") {
      setIsModalOpen(type)
      setIsEditOrAdd(type)
    } else if (type === "batchDelete") {
      if (!selectedRowKeys.length) {
        return showMsg("请至少选择一条！")
      }
      console.log("del==",selectedRows)
      setDelModal('deleted')
      setIsModalOpen('deleted')
    } else if (type == "batchEnable") {
      if (!selectedRowKeys.length) {
        return showMsg("请至少选择一条！")
      }
      const res = await handleBatchEnable(selectedRows)
      if (res) {
        setSelectedRowKeys([])
        setSelectedRows([])
        onSearch()
      }
    } else if (type == "batchDisable") { 
      if (!selectedRowKeys.length) {
        return showMsg("请至少选择一条！")
      }
      const res = await handleBatchDisable(selectedRows)
      if (res) {
        setSelectedRowKeys([])
        setSelectedRows([])
        onSearch()
      }
    } else if (type === "import") {
      setImportModal(true)
    } else if (type === "export") {
      const params = {
        "pageNum": pagination.current || 1,
        "pageSize": pagination.pageSize || 10,
        "deviceCode": "",
        "deviceType": "",
        "pointName": "",
        "pointType": "",
        "enabled": "",
        "modelId": ""
      }
      exportData(params)
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
      
    if (changeVal?.stationId) {
      const modelList = await getStAllDeviceModel(changeVal.stationId);
      const chgOptions = {
        modelId: {
        options: modelList,
        ...(modelList?.length ? { value: modelList[0].value } : {})
      }
    }
      setFormConfigs((prevState) => ({ ...prevState, ...chgOptions }));
    }
  })
  // 新增和编辑
  const btnClkRef = async (type: "ok" | "close", data?) => {
        console.log(type,'操作',data)
    // 执行
    if (type === "ok") {
      // const res = await addRuleMethods(data, userInfo.loginName)
      // if (!res) return
      // setIsModalOpen(type)
      setIsModalOpen('close')
      return onSearch()
    }
    if (type === "close") return setIsModalOpen(type)
  }
  const delBtnClkRef = async (type: "ok" | "close" | "delete_ok", info) => {
    // 执行
    if (type === "delete_ok") {
      let res = null
      if(selectedRows.length) {
        res = await delRuleMethods(selectedRows)
      } else {
        res = await delRuleSingle({id: selectRowInfo.id})
      }
      if (!res) return
      setDelModal('')
      setSelectedRowKeys([])
      setSelectedRows([])
      return onSearch()
    }
    if (type === "close") return setDelModal('')
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
      {/* <CustomModal<IOperateProps, IPerateRef> */}
      <CustomModal
        ref={modeRef}
        title={isEditOrAdd == 'add' ? '新增': isEditOrAdd == 'edit' ? '编辑' : '查看'}
        width="80%"
        destroyOnClose
        open={isModalOpen === "add" || isModalOpen === "edit"}
        footer={null}
        onCancel={() => setIsModalOpen('close')}
        Component={AddCom as any}
        componentProps={{
          buttonClick: btnClkRef,
          editType: isEditOrAdd,
          selectRowInfo: isEditOrAdd == 'edit' ? selectRowInfo : {},
          formSelectChange: formSelectChange.current,
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
        open={delModal === "deleted"}
        footer={null}
        onCancel={() => setDelModal("")}
        Component={RemoveContent}
        componentProps={{ buttonClick: delBtnClkRef }}
      />
    </div>
  )
}
