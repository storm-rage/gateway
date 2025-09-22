/*
 * @Author: chenmeifeng
 * @Date: 2023-10-19 13:47:47
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-05-19 14:16:24
 * @Description:
 */

import { ColumnsType } from "antd/es/table"

import { ITbColAction } from "@/components/action-buttons/types"
import { ISearchFormProps } from "@/components/custom-form/types.ts"
import { StorageStnDvsType } from "@/configs/storage-cfg"
import { getTableActColumn } from "@/utils/table-funs"
import { getStorage } from "@/utils/util-funs"

import { ILineData, TUserTbActInfo } from "../types/index"
import { SCH_BTN } from "@/components/custom-form/configs"
import StationTreeSelect from "@/components/station-tree-select"
import EditableCell from "@/components/custom-input/edit-table-input"

export const deviceTypesOfSt = getStorage(StorageStnDvsType)

export const ST_MANAGE_SCH_FORM_BTNS: ISearchFormProps["buttons"] = [
  SCH_BTN,
  { name: "edit", label: "批量编辑", permission: "model:line:edit" },
  {
    name: "add",
    label: "新增",
    permission: "model:line:add",
  },
  {
    name: "batchDelete",
    label: "批量删除",
    permission: "model:line:batchDelete",
  },
  {
    name: "import",
    label: "导入",
    permission: "model:line:import",
  },
  {
    name: "export",
    label: "导出",
    permission: "model:line:export",
  },
  // {
  //   name: "template",
  //   label: "模板导出",
  //   permission: "model:line:import",
  // },
]

const TABLE_ACTION = [
  // { key: "edit", label: "编辑" },
  { key: "deleted", label: "删除" },
]
export const LINE_MANAGE_FORM_ITEMS: ISearchFormProps["itemOptions"] = [
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
export function DEVICE_ATT_COLUMNS(config: ITbColAction<TUserTbActInfo, ILineData>): ColumnsType<ILineData> {
  const { onClick } = config
  return [
    { dataIndex: "index", title: "序号", width: 60, align: "center" },
    { dataIndex: "stationName", title: "场站" },
    { dataIndex: "lineCode", title: "线路编码" },
    { dataIndex: "lineName", title: "线路名称" },
    ...getTableActColumn<ILineData, TUserTbActInfo>(
      TABLE_ACTION,
      (record) => ({
        onClick: onClick?.bind(null, record),
      }),
      undefined,
      { width: 150 },
    ),
  ]
}
export function LINE_EDIT_COLUMNS(setDataSource): ColumnsType<ILineData> {
  return [
    { dataIndex: "index", title: "序号", width: 60, align: "center" },
    { dataIndex: "stationName", title: "场站" },
    { dataIndex: "lineCode", title: "编码" },
    {
      dataIndex: "lineName",
      title: "名称",
      render: (text, record) => (
        <EditableCell value={record.lineName} record={record} valkey="lineName" setDataSource={setDataSource} />
      ),
    },
  ]
}
