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
    name: "batchDelete",
    label: "删除",
    permission: "model:station:batchDelete",
  },
  
]
export const RP_DEVICE_SCH_FORM_ITEMS: ISearchFormProps["itemOptions"] = [
  
  {
    type: SelectOrdinary,
    name: "deviceCode",
    label: "设备编码",
    props: {
      disabled: false,
      options: [],
      allowClear: true,
      style: { minWidth: "15em" },
    },
  },
  {
    type: CustomInput,
    name: "pointName",
    label: "测点英文名",
    props: {
      disabled: false,
      allowClear: true,
      style: { minWidth: "10em" },
    },
  },
]
export const ADD_FORM_ITEMS: ISearchFormProps["itemOptions"] = [
  {
    type: SelectOrdinary,
    name: "deviceCode",
    label: "设备编码",
    formItemProps: {
      labelCol: { span: 7 },
      rules: [
        { required: true, message: "请选择" },
      ],
    },
    props: {
      disabled: false,
      options: [],
      allowClear: true,
      style: { minWidth: "14em" },
    },
  },
  {
    type: CustomInput,
    name: "pointName",
    label: "测点英文名",
    formItemProps: {
      labelCol: { span: 7 },
      rules: [{ required: true, message: "请输入" },{
        pattern: /^[a-zA-Z0-9_]*$/,
        message: "设备编码只能包含字母和数字和_",
      }],
    },
    props: {
      disabled: false,
      style: { minWidth: "10em" },
    },
  },
  {
    type: CustomInput,
    name: "pointDesc",
    label: "中文描述",
    formItemProps: {
      labelCol: { span: 7 },
      rules: [
        { required: true, message: "请输入" },
      ],
    },
    props: {
      disabled: false,
      style: { minWidth: "10em" },
    },
  },
  {
    type: CustomInput,
    name: "address",
    label: "地址码",
    formItemProps: {
      labelCol: { span: 7 },
      rules: [
        { required: true, message: "请选择" },
      ],
    },
    props: {
      options: [],
      disabled: false,
      style: { minWidth: "10em" },
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
    { dataIndex: "id", title: "ID", width: 60, sorter: (a, b) => Number(a?.id) - Number(b.id), },
    { dataIndex: "deviceCode", title: "设备", },
    { dataIndex: "pointName", title: "测点英文名", sorter: (a, b) => {
        const modelA = String(a.pointName ?? '').trim()
        const modelB = String(b.pointName ?? '').trim()
        return modelA.localeCompare(modelB, undefined, {
          numeric: true,   
          sensitivity: 'base',
          caseFirst: 'upper',
        })
      },
    },
    { dataIndex: "pointDesc", title: "中文描述"},
    { dataIndex: "address", title: "地址码" },
    // { dataIndex: "coefficient", title: "系数" },
    // { dataIndex: "unit", title: "单位" },
    // { dataIndex: "maximum", title: "最大值" },
    // { dataIndex: "minimum", title: "最小值" },
    // { dataIndex: "rawRatio", title: "数据入库系数", width: 120, },
    // { dataIndex: "funCode", title: "功能码/类型标识",width: 140, },
    // { dataIndex: "offsetNum", title: "偏移量" },
    // { dataIndex: "address", title: "地址码" },
    // { dataIndex: "decimalNum", title: "小数位数" },
    // { dataIndex: "orderNo", title: "排序", sorter: (a, b) => Number(a?.orderNo) - Number(b.orderNo) },
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
