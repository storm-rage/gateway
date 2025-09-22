/*
 * @Author: chenmeifeng
 * @Date: 2024-01-05 14:57:58
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-06-27 17:03:32
 * @Description:
 */
import { useSetAtom } from "jotai"
import { useEffect, useRef, useState } from "react"

import CustomForm from "@/components/custom-form"
import { IFormInst, ISearchFormProps, TFormItemConfig } from "@/components/custom-form/types"
import CustomTable from "@/components/custom-table"
import usePageSearch from "@/hooks/use-page-search"
import usePagination from "@/hooks/use-pagination"
import { AtomStation } from "@/store/atom-station"

import EditableCell from "./components/edit-input"
import {
  NO_TAGS,
  ST_STATION_FORM_ITEMS,
  ST_STATION_SCH_FORM_BTNS,
  ST_STATION_SYS_COLUMNS,
  getStnEditColumns,
} from "./configs"
import {
  addStnMethods,
  changeRefleshFlag,
  delStnMethods,
  exportData,
  exportTemplate,
  getSettingStIdexSchData,
  importFile,
  saveStnIdxData,
} from "./methods"
import { IStationIdxListParam, IStationIndexInfo, TStationIdxSchFormField } from "./types"
import { getStorage, showMsg } from "@/utils/util-funs"
import { StorageStationType } from "@/configs/storage-cfg"
import CustomAddModal, { IOperateProps, IPerateRef } from "@/components/custom-model-form"
import CustomModal from "@/components/custom-modal"
import { TFormType, TModalType } from "@/types/i-config"
import useTableSelection from "@/hooks/use-table-selection"
import RemoveContent from "@/components/custom-modal/components/remove-content"
import FileImport from "@/components/custom-upload/upload"
import { formItemFuc } from "./configs/model"
import { getCpnySchData } from "../company/methods"
import { getPjctSchData } from "../main-project/methods"
const rowSelectProps = { needInfo: true }
export default function SettingStation() {
  const formRef = useRef<IFormInst | null>(null)
  //搜索组件数据集合
  const [formList] = useState<TFormItemConfig<TStationIdxSchFormField>>({})
  const [dataSourceList, setDataSourceList] = useState<Array<IStationIndexInfo>>([])
  const modeRef = useRef<any>(null)
  const [isModalOpen, setIsModalOpen] = useState("")
  const [importModal, setImportModal] = useState(false)
  const [isEditOrAdd, setIsEditOrAdd] = useState<TModalType>("add")
  const isEditState = useRef(false)
  const isFirst = useRef(true)
  const stationTypes = useRef([])
  const [column, setColumn] = useState(ST_STATION_SYS_COLUMNS)
  // 设置选中的一条数据
  const [selectRowInfo, setSelectRowInfo] = useState<any>(null)
  const companyList = useRef([])
  const pjctCompanyList = useRef([])
  const addFormItem = useRef<ISearchFormProps["itemOptions"]>([])

  // 选择框
  const { rowSelection, setSelectedRowKeys, selectedRowKeys, setSelectedRows } = useTableSelection(rowSelectProps)

  const setStationValue = useSetAtom(AtomStation)

  const [btnCombination, setBtnCombination] = useState(ST_STATION_SCH_FORM_BTNS)
  const [, setTotal, pagination] = usePagination({
    pageSizeOptions: [10, 20, 50, 100, 500],
  })
  const { dataSource, loading, onSearch } = usePageSearch<IStationIdxListParam, IStationIndexInfo>(
    { serveFun: getSettingStIdexSchData },
    { formRef, needFirstSch: false },
  )
  const setDataSource = ({ record, value, dataIndex }) => {
    const newData = [...dataSourceList]
    const index = newData.findIndex((item) => record.id === item.id)
    const item = newData[index]
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

  async function onFormAction(type: TFormType) {
    if (type === "edit") {
      isEditState.current = !isEditState.current
      const groud = JSON.parse(JSON.stringify(ST_STATION_SCH_FORM_BTNS))
      groud.forEach((i) => {
        if (i.name === "edit") {
          i.label = isEditState.current ? "保存" : "编辑"
        }
      })
      setBtnCombination(groud)
      isEditState.current
        ? setColumn(
            getStnEditColumns(setDataSource, stationTypes.current, companyList.current, pjctCompanyList.current),
          )
        : setColumn(ST_STATION_SYS_COLUMNS)
      !isEditState.current
        ? saveStnIdxData(dataSourceList).then((res) => {
            setStationValue(true)
            onSearch()
          })
        : ""
    } else if (type === "add") {
      setIsModalOpen("add")
      setIsEditOrAdd("add")
    } else if (type === "batchDelete") {
      if (!selectedRowKeys.length) {
        return showMsg("请至少选择一条！")
      }
      setIsModalOpen("deleted")
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
  // 新增和编辑
  const btnClkRef = async (type: "ok" | "close", data) => {
    setSelectRowInfo(null)
    // 执行
    if (type === "ok") {
      const res = await addStnMethods(data, isEditOrAdd)
      if (!res) return
      setIsModalOpen("")
      return onSearch()
    }
    if (type === "close") return setIsModalOpen("")
  }

  const delBtnClkRef = async (type: "ok" | "close" | "delete_ok", info) => {
    // 执行
    if (type === "delete_ok") {
      const res = await delStnMethods({
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
  const initData = async () => {
    const formInst = formRef.current?.getInst()
    formInst?.submit()
    const list = getStorage(StorageStationType)?.map((i) => {
      return {
        label: i.name,
        value: i.code,
      }
    })
    stationTypes.current = list || []
    // const company = await getCpnySchData()

    const project = await getPjctSchData(null, null)
    pjctCompanyList.current =
      project?.records
        .filter((i) => i.type === "PROJECT")
        ?.map((i) => {
          return {
            label: i.shortName,
            value: i.id,
          }
        }) || []
    companyList.current = project?.records
      .filter((i) => i.type === "MAINTENANCE")
      ?.map((i) => {
        return {
          label: i.fullName,
          value: i.id,
        }
      })
    addFormItem.current = formItemFuc(stationTypes.current, companyList.current, pjctCompanyList.current)
  }
  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false
      initData()
    }
  }, [])

  useEffect(() => {
    setDataSourceList(dataSource)
    setTotal(dataSource?.length)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSource])
  useEffect(() => {
    if (isEditState.current) {
      setColumn(getStnEditColumns(setDataSource, stationTypes.current, companyList.current, pjctCompanyList.current))
    }
  }, [dataSourceList])
  return (
    <div className="page-wrap">
      <CustomForm
        ref={formRef}
        loading={loading}
        itemOptionConfig={formList}
        itemOptions={ST_STATION_FORM_ITEMS}
        buttons={btnCombination}
        onSearch={() => {
          changeRefleshFlag(true)
          onSearch()
        }}
        onAction={onFormAction}
      />
      <CustomTable
        rowKey="id"
        limitHeight
        loading={loading}
        columns={column}
        dataSource={dataSourceList}
        rowSelection={rowSelection}
        pagination={pagination}
      />
      <CustomModal<IOperateProps, IPerateRef>
        ref={modeRef}
        title={isEditOrAdd === "add" ? "新增" : "修改"}
        destroyOnClose
        open={isModalOpen === "add" || isModalOpen === "edit"}
        footer={null}
        onCancel={() => setIsModalOpen("")}
        Component={CustomAddModal}
        componentProps={{
          buttonClick: btnClkRef,
          editType: isEditOrAdd,
          selectRowInfo,
          FORM_ITEMS: addFormItem.current,
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
    </div>
  )
}
