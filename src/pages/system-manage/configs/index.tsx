/*
 * @Author: chenmeifeng
 * @Date: 2023-10-19 13:47:47
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-04-29 10:52:43
 * @Description:
 */

import { ColumnsType } from "antd/es/table"
import { Switch } from 'antd'

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

interface DeviceAttColumnsConfig {
  onClick?: (record: IUserList, { key, label }) => void;
  onSwitchChange?: (checked: boolean, record: IUserList) => void;
}

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
    type: CustomInput,
    name: "businessType",
    label: "业务类型",
    props: {
      disabled: false,
      style: { minWidth: "13em" },
      allowClear: true,
    },
  },
  
]

export const ADD_FORM_ITEMS: ISearchFormProps["itemOptions"] = [
  {
    type: CustomInput,
    name: "businessType",
    label: "业务类型",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [
        { required: true, message: "请输入" },
        // {
        //   pattern: /^[a-zA-Z0-9]*$/,
        //   message: "场站编码只能包含数字",
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
    name: "configKey",
    label: "配置键",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [
        { required: true, message: "请输入" },
        // {
        //   pattern: /^[a-zA-Z0-9]*$/,
        //   message: "场站编码只能包含数字",
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
    name: "configValue",
    label: "配置值",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [
        { required: true, message: "请输入" },
        // {
        //   pattern: /^[a-zA-Z0-9]*$/,
        //   message: "场站编码只能包含数字",
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
    name: "state",
    label: "状态",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [
        { required: true, message: "请输入" },
        // {
        //   pattern: /^[a-zA-Z0-9]*$/,
        //   message: "场站编码只能包含数字",
        // },
      ],
    },
    props: {
      options: [
        {
          label: "启用",
          value: "1",
        },
        {
          label: "禁用",
          value: "0",
        },
      ],
      disabled: false,
      placeholder: "",
      style: { minWidth: "10em" },
    },
  },
  {
    type: CustomInput,
    name: "remark",
    label: "描述",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [
        { required: false, message: "请输入" },
      ]
    }
  }
]

const TABLE_ACTION = [
  { key: "update", label: "编辑" },
  { key: "deleted", label: "删除" },
]

export function DEVICE_ATT_COLUMNS(config: DeviceAttColumnsConfig): ColumnsType<IUserList> {
  const { onClick, onSwitchChange } = config
  return [
    { dataIndex: "businessType", title: "业务类型"},
    { dataIndex: "configKey", title: "值" },
    { dataIndex: "configValue", title: "扩展值" },
    { dataIndex: "state", title: "状态" , 
      render: (text: string, record) => (
        <Switch
          checked={text == '1'}
          checkedChildren="启用"
          unCheckedChildren="禁用"
          onChange={(checked) => {
            onSwitchChange?.(checked as any, record as any)
          }}
          style={{
            backgroundColor: text == '1' ? "var(--success-color)" : undefined,
          }}
        />
      ),
    },
    { dataIndex: "remark", title: "描述" },
    { dataIndex: "createTime", title: "创建时间" },
    { dataIndex: "updateTime", title: "修改时间" },
    ...getTableActColumn<IUserList, TUserTbActInfo>(
      TABLE_ACTION,
      (record) => ({
        onClick: onClick?.bind(null, record),
      }),
      undefined,
      { width: 160 },
    ),
  ]
}
