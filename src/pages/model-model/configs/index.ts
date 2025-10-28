/*
 * @Author: chenmeifeng
 * @Date: 2023-10-19 13:47:47
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-06-27 17:15:11
 * @Description:
 */

import { ColumnsType } from "antd/es/table"

import { ITbColAction } from "@/components/action-buttons/types"
import { ISearchFormProps } from "@/components/custom-form/types.ts"
import { StorageStnDvsType } from "@/configs/storage-cfg"
import { getTableActColumn } from "@/utils/table-funs"
import { getStorage } from "@/utils/util-funs"

import { IUserList, TUserTbActInfo } from "../types/index"
import SelectWithAll from "@/components/select-with-all"
import { SCH_BTN } from "@/components/custom-form/configs"
import CustomInput from "@/components/custom-input"

export const deviceTypesOfSt = getStorage(StorageStnDvsType)

export const ST_MANAGE_SCH_FORM_BTNS: ISearchFormProps["buttons"] = [
  SCH_BTN,
  {
    name: "add",
    label: "新增",
    permission: "model:model:add",
  },
  {
    name: "batchDelete",
    label: "批量删除",
    permission: "model:model:batchDelete",
  },
  {
    name: "import",
    label: "导入",
    permission: "model:model:import",
  },
  {
    name: "export",
    label: "导出",
    permission: "model:model:export",
  },
  // {
  //   name: "template",
  //   label: "模板导出",
  //   permission: "model:model:export",
  // },
]
export const ST_MODEL_MODEL_FORM_ITEMS: ISearchFormProps["itemOptions"] = [
  {
    type: SelectWithAll,
    name: "deviceType",
    label: "设备类型",
    props: {
      disabled: false,
    },
  },
  // {
  //   type: CustomInput,
  //   name: "model",
  //   label: "型号",
  //   props: {},
  // },
]

const TABLE_ACTION = [
  { key: "edit", label: "编辑" },
  { key: "deleted", label: "删除" },
]

export function MODEL_COLUMNS(config: ITbColAction<TUserTbActInfo, IUserList>): ColumnsType<IUserList> {
  const { onClick } = config
  return [
    { dataIndex: "index", title: "序号", width: 60, align: "center" },
    { dataIndex: "id", title: "型号ID" },
    { dataIndex: "model", title: "型号编码" },
    { dataIndex: "deviceTypeName", title: "设备类型" },
    { dataIndex: "manufacturer", title: "厂商" },
    { dataIndex: "version", title: "版本" },
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
