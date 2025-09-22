/*
 * @Author: chenmeifeng
 * @Date: 2023-10-19 13:47:47
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-05-19 14:26:34
 * @Description:
 */

import { ColumnsType } from "antd/es/table"

import { ITbColAction } from "@/components/action-buttons/types"
import { ISearchFormProps } from "@/components/custom-form/types.ts"
import { StorageStnDvsType } from "@/configs/storage-cfg"
import { getTableActColumn } from "@/utils/table-funs"
import { getStorage } from "@/utils/util-funs"

import { IPeriodData, TUserTbActInfo } from "../types/index"
import { SCH_BTN } from "@/components/custom-form/configs"
import StationTreeSelect from "@/components/station-tree-select"
import EditableCell from "@/components/custom-input/edit-table-input"

export const deviceTypesOfSt = getStorage(StorageStnDvsType)

export const ST_MANAGE_SCH_FORM_BTNS: ISearchFormProps["buttons"] = [
  SCH_BTN,
  { name: "edit", label: "批量编辑", permission: "model:period:edit" },
  {
    name: "add",
    label: "新增",
    permission: "model:period:add",
  },
  {
    name: "batchDelete",
    label: "批量删除",
    permission: "model:period:batchDelete",
  },
  {
    name: "import",
    label: "导入",
    permission: "model:period:import",
  },
  {
    name: "export",
    label: "导出",
    permission: "model:period:export",
  },
  // {
  //   name: "template",
  //   label: "模板导出",
  //   permission: "model:period:import",
  // },
]

const TABLE_ACTION = [
  // { key: "edit", label: "编辑" },
  { key: "deleted", label: "删除" },
]
export const PERIOD_MANAGE_FORM_ITEMS: ISearchFormProps["itemOptions"] = [
  {
    type: StationTreeSelect,
    name: "stationId",
    label: "场站",
    // formItemProps: { labelCol: { span: 8 } },
    props: {
      needFirst: true,
      needId: true,
      disabled: false,
    },
  },
]
export function DEVICE_ATT_COLUMNS(config: ITbColAction<TUserTbActInfo, IPeriodData>): ColumnsType<IPeriodData> {
  const { onClick } = config
  return [
    { dataIndex: "index", title: "序号", width: 60, align: "center" },
    { dataIndex: "stationName", title: "场站" },
    { dataIndex: "periodName", title: "期次名称" },
    { dataIndex: "periodCode", title: "期次编码" },
    ...getTableActColumn<IPeriodData, TUserTbActInfo>(
      TABLE_ACTION,
      (record) => ({
        onClick: onClick?.bind(null, record),
      }),
      undefined,
      { width: 150 },
    ),
  ]
}
export function PERIOD_EDIT_COLUMNS(setDataSource): ColumnsType<IPeriodData> {
  return [
    { dataIndex: "index", title: "序号", width: 60, align: "center" },
    { dataIndex: "stationName", title: "场站" },
    { dataIndex: "periodCode", title: "期次编码" },
    {
      dataIndex: "periodName",
      title: "期次名称",
      render: (text, record) => (
        <EditableCell value={record.periodName} record={record} valkey="periodName" setDataSource={setDataSource} />
      ),
    },
  ]
}
