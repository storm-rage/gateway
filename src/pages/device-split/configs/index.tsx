/*
 * @Description: 设备拆分页面配置
 */

import { ColumnsType } from "antd/es/table"
import { Switch } from "antd"

import { ITbColAction } from "@/components/action-buttons/types"
import { ISearchFormProps } from "@/components/custom-form/types.ts"
import { getTableActColumn } from "@/utils/table-funs"
import CustomInput from "@/components/custom-input"
import { IUserList, TUserTbActInfo } from "../types/index"
import SelectWithAll from "@/components/select-with-all"
interface DeviceAttColumnsConfig {
  onClick?: (record: IUserList, { key, label }) => void;
  onSwitchChange?: (checked: boolean, record: IUserList) => void;
}

export const ST_MANAGE_SCH_FORM_BTNS: ISearchFormProps["buttons"] = [
  {
    name: "search",
    label: "查询",
    permission: "model:deviceSplit:search",
  },
  {
    name: "add",
    label: "新增",
    permission: "model:deviceSplit:add",
  },
  {
    name: "batchDelete",
    label: "删除",
    permission: "model:deviceSplit:batchDelete",
  },
  {
    name: "template",
    label: "下载模板",
    permission: "model:deviceSplit:template",
  },
  {
    name: "import",
    label: "导入",
    permission: "model:deviceSplit:import",
  },
  {
    name: "export",
    label: "导出",
    permission: "model:deviceSplit:export",
  }
]

export const RP_DEVICE_SCH_FORM_ITEMS: ISearchFormProps["itemOptions"] = [
  {
    type: CustomInput,
    name: "sourceDeviceCode",
    label: "场站-源设备编码",
    props: {
      disabled: false,
      allowClear: true,
      placeholder: "",
      style: { minWidth: "15em" },
    },
  },
]

export const ADD_FORM_ITEMS: ISearchFormProps["itemOptions"] = [
  {
    type: CustomInput,
    name: "sourceDeviceCode",
    label: "场站-源设备编码",
    formItemProps: {
      labelCol: { span: 7 },
      rules: [
        { required: true, message: "请输入" },
      ],
    },
    props: {
      disabled: false,
      style: { minWidth: "14em" },
    },
  },
  {
    type: CustomInput,
    name: "targetDeviceCode",
    label: "集控-目标设备编码",
    formItemProps: {
      labelCol: { span: 7 },
      rules: [
        { required: true, message: "请输入" },
      ],
    },
    props: {
      disabled: false,
      style: { minWidth: "14em" },
    },
  },
  {
    type: CustomInput,
    name: "ioaRanges",
    label: "地址位",
    formItemProps: {
      labelCol: { span: 7 },
      rules: [
        { required: true, message: "请输入" },
      ],
    },
    props: {
      disabled: false,
      style: { minWidth: "14em" },
    },
  },
  {
    type: SelectWithAll,
    name: "state",
    label: "是否启用",
    formItemProps: {
      labelCol: { span: 7 },
      rules: [],
    },
    props: {
      disabled: false,
      placeholder: "1-启用 0-禁用",
      style: { minWidth: "14em" },
      options: [
        { label: "启用", value: "1" },
        { label: "禁用", value: "0" },
      ],
    },
  },
  {
    type: CustomInput,
    name: "remark",
    label: "备注",
    formItemProps: {
      labelCol: { span: 7 },
      rules: [],
    },
    props: {
      disabled: false,
      style: { minWidth: "14em" },
    },
  },
]

const TABLE_ACTION = [
  { key: "update", label: "编辑" },
  { key: "deleted", label: "删除" },
]

export function DEVICE_ATT_COLUMNS(config: DeviceAttColumnsConfig): ColumnsType<IUserList> {
  const { onClick, onSwitchChange } = config
  return [
    { dataIndex: "id", title: "ID", width: 80, sorter: (a, b) => Number(a?.id) - Number(b.id) },
    { dataIndex: "sourceDeviceCode", title: "场站-源设备编码", width: 200 },
    { dataIndex: "targetDeviceCode", title: "集控-目标设备编码", width: 180 },
    { dataIndex: "ioaRanges", title: "地址位", width: 160 },
    {
      dataIndex: "enabled",
      title: "是否启用",
      width: 100,
      render: (text: string, record: IUserList) => {
        if (text !== undefined && text !== '') {
          return (
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
          )
        }
        return null
      }
    },
    { dataIndex: "remark", title: "备注", width: 120 },
    { dataIndex: "updater", title: "更新人", width: 100 },
    { dataIndex: "updateTime", title: "更新时间", width: 180 },
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
