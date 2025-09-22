/*
 * @Author: chenmeifeng
 * @Date: 2023-10-19 13:47:47
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-06-30 11:17:55
 * @Description:
 */

import { ColumnsType } from "antd/es/table"

import { ITbColAction } from "@/components/action-buttons/types"
import { ISearchFormProps } from "@/components/custom-form/types.ts"
import { getTableActColumn } from "@/utils/table-funs"

import { IUserList, TUserTbActInfo } from "../types/index"
import SelectWithAll from "@/components/select-with-all"
import { SCH_BTN } from "@/components/custom-form/configs"

export const ST_MANAGE_SCH_FORM_BTNS: ISearchFormProps["buttons"] = [
  SCH_BTN,
  {
    name: "add",
    label: "新增",
    permission: "model:projectCompany:add",
  },
  {
    name: "batchDelete",
    label: "批量删除",
    permission: "model:projectCompany:batchDelete",
  },
  {
    name: "import",
    label: "导入",
    permission: "model:projectCompany:import",
  },
  {
    name: "export",
    label: "导出",
    permission: "model:projectCompany:export",
  },
  // {
  //   name: "template",
  //   label: "模板导出",
  //   permission: "model:projectCompany:export",
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
    type: SelectWithAll,
    name: "RegionComId",
    label: "区域公司",
    props: {
      options: [],
      // needFirst: true,
      disabled: false,
      // allowClear: false,
    },
  },
]
export function DEVICE_ATT_COLUMNS(config: ITbColAction<TUserTbActInfo, IUserList>): ColumnsType<IUserList> {
  const { onClick } = config
  return [
    { dataIndex: "index", title: "序号", width: 60, align: "center" },
    { dataIndex: "fullName", title: "全称" },
    { dataIndex: "shortName", title: "简称" },
    { dataIndex: "parentComName", title: "所属区域公司" },
    { dataIndex: "type", title: "类型", render: (text) => TYPE_OPTIONS.find((i) => i.value === text)?.label || text },
    ...getTableActColumn<IUserList, TUserTbActInfo>(
      TABLE_ACTION,
      (record) => ({
        onClick: onClick?.bind(null, record),
      }),
      undefined,
      { width: 150 },
    ),
  ]
}
