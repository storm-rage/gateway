/*
 * 
 * @Description:
 */

import { ColumnsType } from "antd/es/table"

import { ITbColAction } from "@/components/action-buttons/types"
import { ISearchFormProps } from "@/components/custom-form/types.ts"
import { StorageStnDvsType } from "@/configs/storage-cfg"
import { getTableActColumn } from "@/utils/table-funs"
import { getStorage } from "@/utils/util-funs"
import SelectOrdinary from "@/components/select-ordinary"
import { IUserList, TUserTbActInfo } from "../types/index"
import CustomInput from "@/components/custom-input"
export const deviceTypesOfSt = getStorage(StorageStnDvsType)

export const ST_MANAGE_SCH_FORM_BTNS: ISearchFormProps["buttons"] = [
  {
    name: "search",
    label: "查询",
    permission: "model:station:search",
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
  {
    name: "add",
    label: "新增",
    permission: "model:station:add",
  },
  {
    name: "delete",
    label: "删除",
    permission: "model:station:batchDelete",
  },
  
]
export const RP_DEVICE_SCH_FORM_ITEMS: ISearchFormProps["itemOptions"] = [
  
  {
    type: SelectOrdinary,
    name: "deviceType",
    label: "设备类型",
    props: {
      disabled: false,
      clearable: true,
      options: [],
      placeholder: "",
      style: { minWidth: "10em" },
    },
  },
  {
    type: CustomInput,
    name: "model",
    label: "设备型号",
    props: {
      disabled: false,
      allowClear: true,
      style: { minWidth: "10em" },
    },
  },
  {
    type: CustomInput,
    name: "version",
    label: "版本号",
    props: {
      disabled: false,
      allowClear: true,
      style: { minWidth: "10em" },
    },
  },
  {
    type: CustomInput,
    name: "manufacturer",
    label: "制造厂商",
    props: {
      disabled: false,
      allowClear: true,
      style: { minWidth: "10em" },
    },
  },
]
export const ADD_FORM_ITEMS: ISearchFormProps["itemOptions"] = [
  {
    type: CustomInput,
    name: "model",
    label: "设备型号",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [
        { required: true, message: "请输入设备型号" },
        // {
        //   pattern: /^[a-zA-Z0-9_.-]+$/,
        //   message: "设备型号只能包含字母、数字、下划线、点、连接线",
        // },
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
    name: "version",
    label: "版本号",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [{ required: true, message: "请输入" }],
    },
    props: {
      disabled: false,
      placeholder: "",
      style: { minWidth: "10em" },
    },
  },
  {
    type: CustomInput,
    name: "manufacturer",
    label: "制造厂商",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [
        { required: true, message: "请输入" },
        // {
        //   pattern: /^[\u4e00-\u9fa5]+$/,
        //   message: "只能包含中文",
        // },
      ],
    },
    props: {
      disabled: false,
      placeholder: "",
      style: { minWidth: "10em" },
    },
  },
  {
    type: SelectOrdinary,
    name: "deviceType",
    label: "设备类型",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [
        { required: true, message: "请选择" },
      ],
    },
    props: {
      disabled: false,
      placeholder: "",
      style: { minWidth: "10em" },
    },
  },
  {
    type: SelectOrdinary,
    name: "state",
    label: "状态",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [
        { required: false, message: "请选择" },
      ],
    },
    props: {
      disabled: false,
      placeholder: "",
      style: { minWidth: "10em" },
      options: [
        { value: "1", label: "启用" },
        { value: "0", label: "禁用" },
      ]
    },
  },
]

const TABLE_ACTION = [
  { key: "update", label: "编辑" },
  { key: "deleted", label: "删除" },
]

export function DEVICE_ATT_COLUMNS(config: ITbColAction<TUserTbActInfo, IUserList>): ColumnsType<IUserList> {
  const { onClick } = config
  return [
    { dataIndex: "id", title: "型号ID", width: 100, sorter: (a, b) => a.id - b.id },
    { dataIndex: "model", title: "设备型号", 
      sorter: (a, b) => {
        const modelA = String(a.model ?? '').trim();
        const modelB = String(b.model ?? '').trim();
        return modelA.localeCompare(modelB, undefined, {
          numeric: true,   
          sensitivity: 'base',
          caseFirst: 'upper',
        })
      }, 
    },
    { dataIndex: "version", title: "版本号" },
    { dataIndex: "manufacturer", title: "制造厂商" },
    { dataIndex: "deviceType", title: "设备类型" },
    { dataIndex: "deviceTypeName", title: "设备类型名称" },
    { dataIndex: "state", title: "状态", render: (text) => String(text) === "1" ? "启用" : String(text) === "0" ? "禁用" : "" },
    ...getTableActColumn<IUserList, TUserTbActInfo>(
      TABLE_ACTION,
      (record) => ({
        onClick: onClick?.bind(null, record),
      }),
      undefined,
      { width: 120 },
    ),
  ]
}
