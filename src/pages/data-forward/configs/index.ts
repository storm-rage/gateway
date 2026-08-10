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
import CustomInput from "@/components/custom-input"
import { IUserList, TUserTbActInfo } from "../types/index"
import SelectOrdinary from "@/components/select-ordinary"

export const deviceTypesOfSt = getStorage(StorageStnDvsType)

export const ST_MANAGE_SCH_FORM_BTNS: ISearchFormProps["buttons"] = [
  {
    name: "add",
    label: "新增",
    permission: "model:station:add",
  },
  {
    name: "batchDelete",
    label: "删除",
    permission: "model:station:batchDelete",
  },
]

const TABLE_ACTION = [
  { key: "update", label: "编辑" },
  { key: "deleted", label: "删除" },
]
export const ADD_FORM_ITEMS: ISearchFormProps["itemOptions"] = [
  {
    type: CustomInput,
    name: "ipAddress",
    label: "服务地址",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [
        { required: false, message: "请输入" },
        {
          pattern: /^[a-zA-Z0-9._-]*$/,
          message: "只能包含字母、数字、点、中划线或下划线",
        },
      ],
    },
    props: {
      disabled: false,
      placeholder: "",
      style: { minWidth: "10em" },
    },
  },
  {
    type: CustomInput,
    name: "port",
    label: "端口号",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [
        { required: false, message: "请输入" },
        {
          pattern: /^[0-9]*$/,
          message: "场站编码只能包含数字",
        },
      ],
    },
    props: {
      disabled: false,
      style: { minWidth: "10em" },
    },
  },
  {
    type: SelectOrdinary,
    name: "protocolType",
    label: "协议类型",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [
        { required: true, message: "请选择" },
      ],
    },
    props: {
      disabled: false,
      options: [
        { value: "MODBUS_TCP", label: "MODBUS_TCP" },
        { value: "MODBUS_UDP", label: "MODBUS_UDP" },
        { value: "IEC104", label: "IEC104" },
        { value: "IEC103", label: "IEC103" },
      ],
      style: { minWidth: "10em" },
    },
  },
]

export function DEVICE_ATT_COLUMNS(config: ITbColAction<TUserTbActInfo, IUserList>): ColumnsType<IUserList> {
  const { onClick } = config
  return [
    { dataIndex: "ipAddress", title: "服务地址", align: "center" },
    { dataIndex: "port", title: "端口号" },
    { dataIndex: "protocolType", title: "协议类型" },
    ...getTableActColumn<IUserList, TUserTbActInfo>(
      TABLE_ACTION,
      (record) => ({
        onClick: onClick?.bind(null, record),
      }),
      undefined,
      { width: 140 },
    ),
  ]
}
