/*
 * @Author: chenmeifeng
 * @Date: 2023-10-19 13:47:47
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-05-07 10:49:22
 * @Description:
 */

import { ColumnsType } from "antd/es/table"

import { ITbColAction } from "@/components/action-buttons/types"
import { ISearchFormProps } from "@/components/custom-form/types.ts"
import { getTableActColumn } from "@/utils/table-funs"

import { IUserList, TUserTbActInfo } from "../types/index"

export const ST_MANAGE_SCH_FORM_BTNS: ISearchFormProps["buttons"] = [
  {
    name: "add",
    label: "新增用户",
    permission: "manage:user:add",
  },
  {
    name: "batchDelete",
    label: "批量删除",
    permission: "manage:user:batchDelete",
  },
  {
    name: "import",
    label: "导入",
    permission: "manage:user:import",
  },
  {
    name: "export",
    label: "导出",
    permission: "manage:user:export",
  },
]

const TABLE_ACTION = [
  { key: "edit", label: "编辑" },
  { key: "deleted", label: "删除" },
]

export function DEVICE_ATT_COLUMNS(config: ITbColAction<TUserTbActInfo, IUserList>): ColumnsType<IUserList> {
  const { onClick } = config
  return [
    { dataIndex: "index", title: "序号", width: 60, align: "center" },
    { dataIndex: "loginName", title: "登录名" },
    { dataIndex: "realName", title: "姓名" },
    { dataIndex: "roleDescription", title: "角色" },
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
