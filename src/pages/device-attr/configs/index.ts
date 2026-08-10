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
import { TreeNode } from "antd/es/tree-select"
import SelectWithAll from "@/components/select-with-all"

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
    name: "stationId",
    label: "场站",
    props: {
      disabled: false,
      placeholder: "",
      style: { minWidth: "13em" },
      allowClear: true,
    },
  },
  {
    type: SelectOrdinary,
    name: "deviceType",
    label: "设备类型",
    props: {
      disabled: false,
      options: [],
      placeholder: "",
      style: { minWidth: "10em" },
    },
  },
  {
    type: SelectOrdinary,
    name: "modelId",
    label: "设备型号",
    props: {
      disabled: false,
      style: { minWidth: "10em" },
    },
  },
]
export const ADD_FORM_ITEMS: ISearchFormProps["itemOptions"] = [
  {
    type: SelectOrdinary,
    name: "stationId",
    label: "场站",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [
        { required: true, message: "请选择" },
      ],
    },
    props: {
      options: [],
      disabled: false,
      placeholder: "请选择",
      style: { minWidth: "10em" },
    },
  },
  {
    type: SelectOrdinary,
    name: "modelId",
    label: "设备型号",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [{ required: true, message: "请选择" }],
    },
    props: {
      options: [],
      disabled: false,
      placeholder: "",
      style: { minWidth: "10em" },
    },
  },
  {
    type: CustomInput,
    name: "deviceCode",
    label: "设备编码",
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
    type: CustomInput,
    name: "name",
    label: "设备中文名称",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [
        { required: false, message: "请输入" },
      ],
    },
    props: {
      style: { minWidth: "10em" },
    },
  },
  {
    type: CustomInput,
    name: "periodCode",
    label: "期次编号",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [
        { required: false, message: "请输入" },
      ],
    },
    props: {
      style: { minWidth: "10em" },
    },
  },
  {
    type: CustomInput,
    name: "lineCode",
    label: "集电线路编号",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [
        { required: false, message: "请输入" },
      ],
    },
    props: {
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
    { dataIndex: "stationId", title: "场站ID", sorter: (a, b) => Number(a?.stationId) - Number(b.stationId), },
    { dataIndex: "stationName", title: "场站" },
    { dataIndex: "modelId", title: "设备型号ID" },
    { dataIndex: "modelName", title: "设备型号" },
    { dataIndex: "deviceCode", title: "设备编码" },
    { dataIndex: "name", title: "设备中文名称" },
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
