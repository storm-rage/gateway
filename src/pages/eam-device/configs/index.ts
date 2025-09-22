/*
 * @Author: chenmeifeng
 * @Date: 2023-10-19 13:47:47
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-06-27 17:16:09
 * @Description:
 */

import { ColumnsType } from "antd/es/table"

import { ITbColAction } from "@/components/action-buttons/types"
import { ISearchFormProps } from "@/components/custom-form/types.ts"
import { getTableActColumn } from "@/utils/table-funs"

import { IEamDvs, TUserTbActInfo } from "../types/index"
import SelectWithAll from "@/components/select-with-all"
import { SCH_BTN } from "@/components/custom-form/configs"
import StationTreeSelect from "@/components/station-tree-select"

export const ST_MANAGE_SCH_FORM_BTNS: ISearchFormProps["buttons"] = [
  SCH_BTN,
  {
    name: "add",
    label: "新增",
    permission: "model:eam:add",
  },
  {
    name: "batchDelete",
    label: "批量删除",
    permission: "model:eam:batchDelete",
  },
  {
    name: "import",
    label: "导入",
    permission: "model:eam:import",
  },
  {
    name: "export",
    label: "导出",
    permission: "model:eam:export",
  },
  // {
  //   name: "template",
  //   label: "模板导出",
  //   permission: "model:eam:export",
  // },
]
export const TYPE_OPTIONS = [
  { value: "MAINTENANCE", label: "检修基地" },
  { value: "PROJECT", label: "项目公司" },
  { value: "BOTH", label: "全责" },
]
const TABLE_ACTION = [
  { key: "edit", label: "编辑" },
  { key: "deleted", label: "删除" },
]
export const PJCT_SEARCH_FORM_ITEMS: ISearchFormProps["itemOptions"] = [
  {
    type: StationTreeSelect,
    name: "stationCode",
    label: "场站",
    props: {
      needId: false,
    },
  },
  // {
  //   type: SelectWithAll,
  //   name: "deviceType",
  //   label: "设备类型",
  //   props: {},
  // },
  {
    type: SelectWithAll,
    name: "deviceCode",
    label: "设备",
    props: {},
  },
]
export function DEVICE_ATT_COLUMNS(config: ITbColAction<TUserTbActInfo, IEamDvs>): ColumnsType<IEamDvs> {
  const { onClick } = config
  return [
    { dataIndex: "index", title: "序号", width: 60, align: "center" },
    { dataIndex: "stationName", title: "场站名称" },
    { dataIndex: "deviceName", title: "设备名称" },
    { dataIndex: "eamStation", title: "EAM场站编码" },
    {
      dataIndex: "eamDevice",
      title: "EAM设备编码",
      render: (text) => TYPE_OPTIONS.find((i) => i.value === text)?.label || text,
    },
    ...getTableActColumn<IEamDvs, TUserTbActInfo>(
      TABLE_ACTION,
      (record) => ({
        onClick: onClick?.bind(null, record),
      }),
      undefined,
      { width: 150 },
    ),
  ]
}
