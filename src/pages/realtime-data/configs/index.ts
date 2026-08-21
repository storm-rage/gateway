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
export const RP_DEVICE_SCH_FORM_ITEMS: ISearchFormProps["itemOptions"] = [
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
  
]

const TABLE_ACTION = [
  { key: "update", label: "编辑" },
  // { key: "deleted", label: "删除" },
]

export function DEVICE_ATT_COLUMNS(config: ITbColAction<TUserTbActInfo, IUserList>): ColumnsType<IUserList> {
  const { onClick } = config
  return [
    { dataIndex: "pointName", title: "测点英文名", },
    { dataIndex: "pointDesc", title: "中文描述" },
    { dataIndex: "funCode", title: "功能码", width: 80 },
    { dataIndex: "address", title: "地址" },
    { dataIndex: "offsetNum", title: "偏移地址" },
    { dataIndex: "pointType", title: "测点类型", width: 100 },
    { dataIndex: "dataType", title: "数据类型", width: 120 },
    { dataIndex: "value", title: "当前值" , width: 120},
    { dataIndex: "coefficient", title: "系数", width: 80 },
    { dataIndex: "decimalNum", title: "小数位数", width: 80 },
    ...getTableActColumn<IUserList, TUserTbActInfo>(
          TABLE_ACTION,
          (record) => ({
            onClick: onClick?.bind(null, record),
          }),
          undefined,
          { width: 100 },
        ),
  ]
}

export const ADD_FORM_ITEMS: ISearchFormProps["itemOptions"] = [
  {
    type: CustomInput,
    name: "pointName",
    label: "测点英文名",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [
        { required: true, message: "请输入" },
        // {
        //   pattern: /^[a-zA-Z]*$/, message: "测点英文名只能包含字母",
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
    name: "pointDesc",
    label: "测点中文名",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [
        { required: true, message: "请输入" },
        // {
        //   pattern: /^[\u4e00-\u9fa5]*$/, message: "测点中文名只能包含中文",
        // },
      ]
    }
  }
]
