/*
 * @Author: chenmeifeng
 * @Date: 2023-10-19 13:47:47
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-04-29 10:52:43
 * @Description:
 */

import { ColumnsType } from "antd/es/table"
import { InputNumber, Switch } from "antd"

import { ISearchFormProps } from "@/components/custom-form/types.ts"
import { StorageStnDvsType } from "@/configs/storage-cfg"
import { getTableActColumn } from "@/utils/table-funs"
import { getStorage } from "@/utils/util-funs"
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

const protocolTypeOptions = [
  { value: "MODBUS_TCP", label: "MODBUS_TCP" },
  { value: "MODBUS_UDP", label: "MODBUS_UDP" },
  { value: "IEC104", label: "IEC104" },
  { value: "IEC103", label: "IEC103" },
]

export const RP_DEVICE_SCH_FORM_ITEMS: ISearchFormProps["itemOptions"] = [
  {
    type: SelectOrdinary,
    name: "stationId",
    label: "场站",
    props: {
      disabled: false,
      placeholder: "",
      style: { minWidth: "10em" },
      allowClear: true,
    },
    formItemProps: {
      labelCol: { span: 6 },
      rules: [{ required: true, message: "请选择" }],
    },
  },
  {
    type: CustomInput,
    name: "deviceCode",
    label: "设备编码",
    props: {
      disabled: false,
      placeholder: "",
      allowClear: true,
      style: { minWidth: "10em" },
    },
  },
  {
    type: SelectOrdinary,
    name: "modelId",
    label: "设备型号",
    props: {
      disabled: false,
      allowClear: true,
      style: { minWidth: "10em" },
    },
  },
  {
    type: SelectOrdinary,
    name: "protocolType",
    label: "协议类型",
    props: {
      disabled: false,
      options: protocolTypeOptions,
      allowClear: true,
      style: { minWidth: "10em" },
    },
  },
  {
    type: SelectOrdinary,
    name: "state",
    label: "状态",
    props: {
      disabled: false,
      options: [
        { value: "1", label: "启用" },
        { value: "0", label: "禁用" },
      ],
      allowClear: true,
      style: { minWidth: "10em" },
    },
  },
]
export const ADD_FORM_ITEMS: ISearchFormProps["itemOptions"] = [
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
    type: SelectOrdinary,
    name: "deviceCode",
    label: "设备编码",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [
        { required: true, message: "请选择" },
        {
          pattern: /^[a-zA-Z0-9]+$/,
          message: "只能包含字母和数字",
        },
      ],
    },
    props: {
      disabled: false,
      options: [],
      style: { minWidth: "10em" },
    },
  },
  {
    type: SelectOrdinary,
    name: "protocolType",
    label: "协议类型",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [{ required: true, message: "请选择" }],
    },
    props: {
      options: protocolTypeOptions,
      disabled: false,
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
      options: [
        { value: "1", label: "启用" },
        { value: "0", label: "禁用" },
      ],
      style: { minWidth: "10em" },
    },
  },
  {
    type: CustomInput,
    name: "ipAddress",
    label: "服务地址",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [
        { required: false, message: "请输入" },
        { pattern: /^[a-zA-Z0-9.-_]+$/,
          message: "只能包含字母、数字、点、下划线、横线",
        },
      ],
    },
    props: {
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
        { pattern: /^[0-9]+$/,
          message: "只能包含数字",
        },
      ],
    },
    props: {
      style: { minWidth: "10em" },
    },
  },
  {
    type: CustomInput,
    name: "retryCount",
    label: "重复次数",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [
        { required: false, message: "请输入" },
        { pattern: /^[0-9]+$/,
          message: "只能包含数字",
        },
      ],
    },
    props: {
      style: { minWidth: "10em" },
    },
  },
  {
    type: InputNumber,
    name: "pollIntervalMs",
    label: "轮询间隔（毫秒）",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [
        { required: false, message: "请输入" },
        { pattern: /^[0-9]+$/,
          message: "只能包含数字",
        },
      ],
    },
    props: {
      style: { minWidth: "10em", width: "100%" },
      min: 0,
    },
  },
  {
    type: CustomInput,
    name: "slaveId",
    label: "设备号",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [
        { required: true, message: "请输入" },
        { pattern: /^[0-9]+$/,
          message: "只能包含数字",
        },
      ],
    },
    props: {
      style: { minWidth: "10em" },
    },
  },
  {
    type: CustomInput,
    name: "offsetNum",
    label: "偏移量",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [
        { required: true, message: "请输入" },
        { pattern: /^[0-9]+$/,
          message: "只能包含数字",
        },
      ],
    },
    props: {
      style: { minWidth: "10em" },
    },
  }
]

export const ADD_FORM_ITEMS_BATCH: ISearchFormProps["itemOptions"] = [
  {
    type: SelectOrdinary,
    name: "protocolType",
    label: "协议类型",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [{ required: true, message: "请选择" }],
    },
    props: {
      options: protocolTypeOptions,
      disabled: false,
      style: { minWidth: "10em" },
    },
  },
  
  {
    type: CustomInput,
    name: "ipAddress",
    label: "服务地址",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [
        { required: false, message: "请输入" },
        { pattern: /^[a-zA-Z0-9.-_]+$/,
          message: "只能包含字母、数字、点、下划线、横线",
        },
      ],
    },
    props: {
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
        { pattern: /^[0-9]+$/,
          message: "只能包含数字",
        },
      ],
    },
    props: {
      style: { minWidth: "10em" },
    },
  },
  {
    type: CustomInput,
    name: "retryCount",
    label: "重复次数",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [
        { required: false, message: "请输入" },
        { pattern: /^[0-9]+$/,
          message: "只能包含数字",
        },
      ],
    },
    props: {
      style: { minWidth: "10em" },
    },
  },
  {
    type: InputNumber,
    name: "pollIntervalMs",
    label: "轮询间隔（毫秒）",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [
        { required: false, message: "请输入" },
        { pattern: /^[0-9]+$/,
          message: "只能包含数字",
        },
      ],
    },
    props: {
      style: { minWidth: "10em", width: "100%" },
      min: 0,
    },
  },
  {
    type: CustomInput,
    name: "slaveId",
    label: "设备号",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [
        { required: false, message: "请输入" },
        { pattern: /^[0-9]+$/, message: "只能包含数字",
        },
      ],
    },
    props: {
      style: { minWidth: "10em" },
    },
  },
  {
    type: CustomInput,
    name: "offsetNum",
    label: "偏移量",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [
        { required: false, message: "请输入" },
        { pattern: /^[0-9]+$/, message: "只能包含数字",
        },
      ],
    },
    props: {
      style: { minWidth: "10em" },
    },
  }
]

const TABLE_ACTION = [
  { key: "update", label: "编辑" },
  { key: "deleted", label: "删除" },
]

export function DEVICE_ATT_COLUMNS(config: DeviceAttColumnsConfig): ColumnsType<IUserList> {
  const { onClick, onSwitchChange } = config
  return [
    { dataIndex: "modelId", title: "设备型号ID", sorter: (a, b) => Number(a?.stationId) - Number(b.stationId),  },
    { dataIndex: "deviceCode", title: "设备编码", width: 260 },
    { dataIndex: "protocolType", title: "设备协议" },
    { dataIndex: "state", title: "状态", 
      render: (text: string, record) => {
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
    { dataIndex: "ipAddress", title: "服务地址" },
    { dataIndex: "port", title: "端口号" },
    { dataIndex: "retryCount", title: "重复次数" },
    { dataIndex: "pollIntervalMs", title: "轮询间隔（毫秒）", width: 160 },
    { dataIndex: "slaveId", title: "设备号" },
    { dataIndex: "offsetNum", title: "偏移量" },
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
