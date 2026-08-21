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
import SelectOrdinary from "@/components/select-ordinary"
import { IUserList, TUserTbActInfo } from "../types/index"
import CustomInput from "@/components/custom-input"

export const deviceTypesOfSt = getStorage(StorageStnDvsType)

export const ST_MANAGE_SCH_FORM_BTNS: ISearchFormProps["buttons"] = [
  {
    name: "add",
    label: "新增场站",
    permission: "model:station:add",
  },
  // {
  //   name: "delete",
  //   label: "删除",
  //   permission: "model:station:delete",
  // },
  {
    name: "batchDelete",
    label: "批量删除",
    permission: "model:station:batchDelete",
  },
]
export const RP_DEVICE_SCH_FORM_ITEMS: ISearchFormProps["itemOptions"] = [
  {
    type: CustomInput,
    name: "searchVal",
    label: "设备",
    props: {
      disabled: false,
      placeholder: "请输入关键词搜索",
      style: { minWidth: "10em" },
    },
  },
  // {
  //   type: StationTreeSelect,
  //   name: "stationId",
  //   label: "场站",
  //   props: {
  //     needId: true,
  //     disabled: false,
  //     multiple: false,
  //     placeholder: "",
  //     style: { minWidth: "13em" },
  //     // allowClear: false,
  //   },
  // },
  // {
  //   type: SelectOrdinary,
  //   name: "deviceType",
  //   label: "设备类型",
  //   props: {
  //     disabled: false,
  //     options: [],
  //     placeholder: "",
  //     style: { minWidth: "10em" },
  //   },
  // },
  // {
  //   type: CommonTreeSelect,
  //   name: "deviceCode",
  //   label: "设备",
  //   props: {
  //     needFirst: true,
  //     disabled: false,
  //     placeholder: "",
  //     style: { minWidth: "10em" },
  //     multiple: true,
  //     treeCheckable: true,
  //   },
  // },
]
const STN_TYPES = [
  // W(风电),S(光伏/光热),F(风储),G(光储),H(风光储),P(分布式光伏),E(独立储能),T(独立变电站)
  {
    label: "风电",
    value: "W",
  },
  {
    label: "光伏/光热",
    value: "S",
  },
  {
    label: "风储",
    value: "F",
  },
  {
    label: "光储",
    value: "G",
  },
  {
    label: "风光储",
    value: "H",
  },
  {
    label: "分布式光伏",
    value: "P",
  },
  {
    label: "独立储能",
    value: "E",
  },
  {
    label: "独立变电站",
    value: "T",
  },
]
export const ADD_FORM_ITEMS: ISearchFormProps["itemOptions"] = [
  {
    type: CustomInput,
    name: "stationCode",
    label: "场站编码",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [
        { required: true, message: "请选择场站" },
        {
          pattern: /^[a-zA-Z0-9]*$/,
          message: "场站编码只能包含字母和数字",
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
    name: "fullName",
    label: "场站中文描述",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [{ required: false, message: "请输入中文描述" }],
    },
    props: {
      disabled: false,
      placeholder: "",
      style: { minWidth: "10em" },
    },
  },
  {
    type: CustomInput,
    name: "shortName",
    label: "简称",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [
        { required: true, message: "请输入简称" },
        // {
        //   pattern: /^[\u4e00-\u9fa5]+$/,
        //   message: "简称只能包含中文",
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
    name: "stationType",
    label: "场站类型",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [{ required: true, message: "请选择场站类型" }],
    },
    props: {
      disabled: false,
      placeholder: "",
      options: STN_TYPES,
      style: { minWidth: "10em" },
    },
  },
  // {
  //   type: CustomInput,
  //   name: "parentComId",
  //   label: "项目公司",
  //   formItemProps: {
  //     labelCol: { span: 6 },
  //     rules: [{ required: false, message: "请输入" },
  //       {
  //         pattern: /^[0-9]*$/,
  //         message: "场站编码只能包含数字",
  //       },
  //     ],
  //   },
  //   props: {
  //     disabled: false,
  //     placeholder: "",
  //     style: { minWidth: "10em" },
  //   },
  // },
  // {
  //   type: CustomInput,
  //   name: "maintenanceComId",
  //   label: "检修公司",
  //   formItemProps: {
  //     labelCol: { span: 6 },
  //     rules: [{ required: false, message: "请输入中文描述" },
  //       {
  //         pattern: /^[0-9]*$/,
  //         message: "场站编码只能包含数字",
  //       },
  //     ],
  //   },
  //   props: {
  //     disabled: false,
  //     placeholder: "",
  //     style: { minWidth: "10em" },
  //   },
  // },
  // {
  //   type: CustomInput,
  //   name: "state",
  //   label: "状态",
  //   formItemProps: {
  //     labelCol: { span: 6 },
  //     rules: [{ required: false, message: "请输入中文描述" },
  //       {
  //         pattern: /^[0-9]*$/,
  //         message: "场站编码只能包含数字",
  //       },
  //     ],
  //   },
  //   props: {
  //     disabled: false,
  //     placeholder: "",
  //     style: { minWidth: "10em" },
  //   },
  // },
  // {
  //   type: SelectOrdinary,
  //   name: "tags",
  //   label: "标签",
  //   formItemProps: {
  //     labelCol: { span: 6 },
  //   },
  //   props: {
  //     mode: "tags",
  //     options: [],
  //     disabled: false,
  //     placeholder: "请输入标签，按回车或逗号分隔",
  //     tokenSeparators: [",", "，", " "],
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
    { dataIndex: "stationCode", title: "场站编码", align: "center"},
    { dataIndex: "fullName", title: "场站中文描述" },
    { dataIndex: "shortName", title: "简称" },
    { dataIndex: "stationType", title: "类型", width: 100 },
    { dataIndex: "stationTypeName", title: "类型名称" },
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
