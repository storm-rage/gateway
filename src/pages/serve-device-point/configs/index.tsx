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
import StationTreeSelect from "@/components/station-tree-select"
import CommonTreeSelect from "@/components/common-tree-select"
import SelectOrdinary from "@/components/select-ordinary"
import { IUserList, TUserTbActInfo } from "../types/index"
import CustomInput from "@/components/custom-input"

export const deviceTypesOfSt = getStorage(StorageStnDvsType)

export const ST_MANAGE_SCH_FORM_BTNS: ISearchFormProps["buttons"] = [
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
    name: "batchDelete",
    label: "删除",
    permission: "model:station:batchDelete",
  },
  
]
export const RP_DEVICE_SCH_FORM_ITEMS: ISearchFormProps["itemOptions"] = [
  {
    type: SelectOrdinary,
    name: "relayId",
    label: "目标服务",
    formItemProps: {
      labelCol: { span: 10 },
      rules: [
        { required: true, message: "请选择" },
      ],
    },
    props: {
      disabled: false,
      options: [],
      placeholder: "请选择目标服务",
      // style: { minWidth: "10em" },
    },
  },
  
]
export const ADD_FORM_ITEMS: ISearchFormProps["itemOptions"] = [
  {
    type: SelectOrdinary,
    name: "templateId",
    label: "测点模板",
    formItemProps: {
      labelCol: { span: 7 },
      rules: [
        { required: true, message: "请选择" },
      ],
    },
    props: {
      disabled: false,
      style: { minWidth: "10em" },
    },
  },
  // {
  //   type: SelectOrdinary,
  //   name: "modelId",
  //   label: "设备型号",
  //   formItemProps: {
  //     labelCol: { span: 7 },
  //     rules: [
  //       { required: true, message: "请选择" },
  //     ],
  //   },
  //   props: {
  //     disabled: false,
  //     style: { minWidth: "10em" },
  //   },
  // },
  // {
  //   type: CustomInput,
  //   name: "pointName",
  //   label: "测点英文名",
  //   formItemProps: {
  //     labelCol: { span: 7 },
  //     rules: [{ required: true, message: "请输入" },{
  //       pattern: /^[a-zA-Z]*$/,
  //       message: "设备编码只能包含字母",
  //     }],
  //   },
  //   props: {
  //     disabled: false,
  //     style: { minWidth: "10em" },
  //   },
  // },
  // {
  //   type: CustomInput,
  //   name: "pointDesc",
  //   label: "中文描述",
  //   formItemProps: {
  //     labelCol: { span: 7 },
  //     rules: [
  //       { required: true, message: "请输入" },
  //     ],
  //   },
  //   props: {
  //     disabled: false,
  //     style: { minWidth: "10em" },
  //   },
  // },
  // {
  //   type: SelectOrdinary,
  //   name: "pointType",
  //   label: "数据类型",
  //   formItemProps: {
  //     labelCol: { span: 7 },
  //     rules: [
  //       { required: true, message: "请选择" },
  //     ],
  //   },
  //   props: {
  //     options: [],
  //     disabled: false,
  //     style: { minWidth: "10em" },
  //   },
  // },
  // {
  //   type: CustomInput,
  //   name: "coefficient",
  //   label: "系数",
  //   formItemProps: {
  //     labelCol: { span: 7 },
  //     rules: [
  //       { required: false, message: "请选择" },
  //     ],
  //   },
  //   props: {
  //     disabled: false,
  //     style: { minWidth: "10em" },
  //   },
  // },
  // {
  //   type: CustomInput,
  //   name: "maximum",
  //   label: "最大值",
  //   formItemProps: {
  //     labelCol: { span: 7 },
  //     rules: [
  //       { required: false, message: "请选择" },
  //     ],
  //   },
  //   props: {
  //     disabled: false,
  //     style: { minWidth: "10em" },
  //   },
  // },
  // {
  //   type: CustomInput,
  //   name: "minimum",
  //   label: "最小值",
  //   formItemProps: {
  //     labelCol: { span: 7 },
  //     rules: [
  //       { required: false, message: "请选择" },
  //     ],
  //   },
  //   props: {
  //     disabled: false,
  //     style: { minWidth: "10em" },
  //   },
  // },
  // {
  //   type: CustomInput,
  //   name: "rawRatio",
  //   label: "数据入库系数",
  //   formItemProps: {
  //     labelCol: { span: 7 },
  //     rules: [
  //       { required: false, message: "请选择" },
  //     ],
  //   },
  //   props: {
  //     disabled: false,
  //     style: { minWidth: "10em" },
  //   },
  // },
  // {
  //   type: CustomInput,
  //   name: "funCode",
  //   label: "功能码/类型标识",
  //   formItemProps: {
  //     labelCol: { span: 7 },
  //     rules: [
  //       { required: false, message: "请选择" },
  //     ],
  //   },
  //   props: {
  //     disabled: false,
  //     style: { minWidth: "10em" },
  //   },
  // },
  // {
  //   type: CustomInput,
  //   name: "offsetNum",
  //   label: "地址码",
  //   formItemProps: {
  //     labelCol: { span: 7 },
  //     rules: [
  //       { required: false, message: "请选择" },
  //     ],
  //   },
  //   props: {
  //     disabled: false,
  //     style: { minWidth: "10em" },
  //   },
  // },
  // {
  //   type: CustomInput,
  //   name: "decimalNum",
  //   label: "小数位数",
  //   formItemProps: {
  //     labelCol: { span: 7 },
  //     rules: [
  //       { required: false, message: "请选择" },
  //     ],
  //   },
  //   props: {
  //     disabled: false,
  //     style: { minWidth: "10em" },
  //   },
  // },
]

const TABLE_ACTION = [
  { key: "update", label: "编辑" },
  { key: "deleted", label: "删除" },
]

export function DEVICE_ATT_COLUMNS(config: ITbColAction<TUserTbActInfo, IUserList>): ColumnsType<IUserList> {
  const { onClick } = config
  return [
    { title: "目标服务", render: (record) => (<>{record.ipAddress+":"+record.port+"-"+record.protocolType}</>) },
    { dataIndex: "modelId", title: "设备型号ID" },
    // { dataIndex: "pointCode", title: "测点编码" },
    { dataIndex: "pointName", title: "测点英文名" },
    { dataIndex: "pointDesc", title: "中文描述" },
    // { dataIndex: "pointType", title: "数据类型" },
    // { dataIndex: "coefficient", title: "系数" },
    // { dataIndex: "unit", title: "单位" },
    // { dataIndex: "maximum", title: "最大值" },
    // { dataIndex: "minimum", title: "最小值" },
    // { dataIndex: "rawRatio", title: "数据入库系数" },
    // { dataIndex: "funCode", title: "功能码/类型标识" },
    // { dataIndex: "offsetNum", title: "地址码" },
    // { dataIndex: "decimalNum", title: "小数位数" },
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
