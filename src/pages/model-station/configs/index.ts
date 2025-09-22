/*
 * @Author: chenmeifeng
 * @Date: 2023-10-19 13:47:47
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-04-29 10:52:43
 * @Description:
 */

import { ColumnsType } from "antd/es/table"

import { ITbColAction } from "@/components/action-buttons/types"
import { ISearchFormProps } from "@/components/custom-form/types.ts"
import { StorageStnDvsType } from "@/configs/storage-cfg"
import { getTableActColumn } from "@/utils/table-funs"
import { getStorage } from "@/utils/util-funs"

import { IUserList, TUserTbActInfo } from "../types/index"

export const deviceTypesOfSt = getStorage(StorageStnDvsType)

export const ST_MANAGE_SCH_FORM_BTNS: ISearchFormProps["buttons"] = [
  {
    name: "add",
    label: "新增场站",
    permission: "model:station:add",
  },
  {
    name: "batchDelete",
    label: "批量删除",
    permission: "model:station:batchDelete",
  },
  {
    name: "import",
    label: "导入",
    permission: "model:station:import",
  },
  {
    name: "export",
    label: "导出",
    permission: "model:station:export",
  },
]

const TABLE_ACTION = [
  { key: "update", label: "编辑" },
  { key: "deleted", label: "删除" },
]

export function DEVICE_ATT_COLUMNS(config: ITbColAction<TUserTbActInfo, IUserList>): ColumnsType<IUserList> {
  const { onClick } = config
  return [
    { dataIndex: "index", title: "序号", width: 60, align: "center" },
    { dataIndex: "maintenanceComShortName", title: "上级公司" },
    { dataIndex: "fullName", title: "场站全称" },
    { dataIndex: "shortName", title: "场站简称" },
    ...getTableActColumn<IUserList, TUserTbActInfo>(
      TABLE_ACTION,
      (record) => ({
        onClick: onClick?.bind(null, record),
      }),
      undefined,
      { width: 500 },
    ),
  ]
}
