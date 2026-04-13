/*
 * @Author: chenmeifeng
 * @Date: 2024-01-08 13:50:48
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-10-30 10:10:19
 * @Description:
 */
import { ColumnsType } from "antd/es/table"

import { SCH_BTN } from "@/components/custom-form/configs"
import { ISearchFormProps } from "@/components/custom-form/types"
import SelectWithAll from "@/components/select-with-all"
import StationTreeSelect from "@/components/station-tree-select"
import EditableSelectCell from "@/components/select-ordinary/table-edit-select"
import EditableNumberCell from "@/components/custom-input/edit-table-input-number"
import EditableInputCell from "@/pages/setting-station/components/edit-input"
import RangeDatePicker from "@/components/range-date-picker"
import customInput from "@/components/custom-input"
import CommonTreeSelect from "@/components/common-tree-select"
import { getTableActColumn } from "@/utils/table-funs"
import { TStTbActInfo, stateInfo } from "../types"
import { ITbColAction } from "@/components/action-buttons/types"
import CustonInputNumber from "@/components/custom-input-number"



// import { IStationIndexInfo } from "../types"

export const ST_POINT_SCH_FORM_BTNS: ISearchFormProps["buttons"] = [
  SCH_BTN,
  // { name: "edit", label: "批量编辑", permission: "model:point:edit" },
  { name: "add", label: "新增", permission: "rule:virtual:add" },
  {
    name: "batchDelete",
    label: "批量删除",
    permission: "rule:virtual:batchDelete",
  },
  {
    name: "batchEnable",
    label: "批量启用",
    permission: "rule:virtual:batchEnable",
  },
  {
    name: "batchDisable",
    label: "批量禁用",
    permission: "rule:virtual:batchDisable",
  },{
    name: "import",
    label: "导入",
    permission: "rule:virtual:import",
  },
  {
    name: "export",
    label: "导出",
    permission: "rule:virtual:export",
  },
  // {
  //   name: "template",
  //   label: "模板导出",
  //   permission: "model:point:import",
  // },
]
export const COMPUTED_OPTIONS = [
  { value: 0, label: "设备自身计算" },
  { value: 1, label: "跨设备计算" },
]
export const BREKE_OPTIONS = [
  { value: 1, label: "断路器标志" },
  { value: 2, label: "手车标志" },
]
export const POINT_TYPE = [
  { label: "遥信", value: "1" },
  { label: "遥测", value: "2" },
  { label: "遥控", value: "3" },
  { label: "遥调", value: "4" },
]
export const ST_STATION_FORM_ITEMS: ISearchFormProps["itemOptions"] = [
  {
    type: StationTreeSelect,
    name: "stationId",
    label: "场站",
    props: {
      needFirst: true,
      disabled: false,
      needId: true,
      placeholder: "全部",
      style: { minWidth: "8em" },
    },
  },
  {
    type: SelectWithAll,
    name: "deviceType",
    label: "类型",
    props: {
      options: [],
      needFirst: true,
      disabled: false,
      allowClear: false,
    },
  },
  // {
  //   type: SelectWithAll,
  //   name: "modelIds",
  //   label: "型号",
  //   props: {
  //     // needFirst: true,
  //     options: [],
  //     disabled: false,
  //     mode: "multiple",
  //     allowClear: false,
  //     placeholder: "全部",
  //   },
  // },
  {
    type: CommonTreeSelect,
    name: "deviceIds",
    label: "设备",
    props: {
      options: [],
      disabled: false,
      mode: "multiple",
      allowClear: false,
      placeholder: "全部",
    },
  },
  // {
  //   type: SelectWithAll,
  //   name: "controlType",
  //   label: "控制类型",
  //   props: {
  //     placeholder: "全部",
  //   },
  // },
]
export const ST_STATION_ADD_FORM_ITEMS: ISearchFormProps["itemOptions"] = [
  {
    type: StationTreeSelect,
    name: "stationId",
    label: "场站",
    props: {
      needFirst: false,
      disabled: false,
      needId: true,
      placeholder: "全部",
      style: { minWidth: "8em" },
    },
  },
  // {
  //   type: SelectWithAll,
  //   name: "deviceType",
  //   label: "类型",
  //   props: {
  //     options: [],
  //     needFirst: false,
  //     disabled: false,
  //     allowClear: false,
  //   },
  // },
  {
    type: CommonTreeSelect,
    name: "deviceIds",
    label: "设备",
    props: {
      // needFirst: true,
      // options: [],
      // disabled: false,
      // mode: "single",
      // allowClear: false,
      multiple: false,
      placeholder: "全部",
      treeCheckable: true,
      style: { minWidth: "13em" },
    },
  },
  // {
  //   type: customInput,
  //   name: "sourceDevicePointCode",
  //   label: "迁移来源测点编码",
  //   props: {
  //     placeholder: "请输入",
  //     isArea: true,
  //     rows: 1,
  //   },
  // },
]
const FREQUENCY_UNITS = [
  { value: 's', label: '秒' },
  { value: 'm', label: '分' },
  { value: 'h', label: '小时' },
  { value: 'd', label: '天' },
]
export const ST_STATION_ADD_TARGET_FORM_ITEMS: ISearchFormProps["itemOptions"] = [
  {
    type: customInput,
    name: "pointName",
    label: "新测点编码",
    props: {
      placeholder: "请输入",
    },
  },
  {
    type: customInput,
    name: "pointDesc",
    label: "新测点描述",
    props: {
      placeholder: "请输入",
    },
  },
  {
    type: SelectWithAll,
    name: "pointType",
    label: "测点类型",
    props: {
      options: [{ label: "遥测", value: "1"}, { label: "遥信", value: "0"}],
      disabled: false,
      mode: "single",
      allowClear: false,
      placeholder: "请选择",
      style: { width: "200px" },
    },
  },
  {
    // type: SelectWithAll,
    type: CustonInputNumber,
    name: "frequency",
    label: "计算频率",
    props: {
      options:  FREQUENCY_UNITS || [],
      disabled: false,
      allowClear: false,
      placeholder: "请选择",
      style: { width: "200px" },
    },
    

  },
  {
    type: SelectWithAll,
    name: "enabled",
    label: "是否启用",
    props: {
      options: [{ label: "是", value: "1" }, { label: "否", value: "0" }],
      disabled: false,
      mode: "single",
      allowClear: false,
      placeholder: "请选择",
      style: { width: "200px" },
    },
  },
]
export function ST_DEVICE_COLUMNS(deviceType): ColumnsType {
  return [
    { dataIndex: "index", title: "序号", width: 60 },
    { dataIndex: "stationName", title: "场站",  },
    { dataIndex: "stationCode", title: "场站代码",  },
    { dataIndex: "deviceType", title: "设备类型",  },
    { dataIndex: "deviceName", title: "设备",  },
    { dataIndex: "devicePath", title: "设备来源",  },
    { dataIndex: "deviceCode", title: "设备代码",  },
  ]
}
const TABLE_ACTION = [
  // { key: "see", label: "查看" },
  { key: "edit", label: "编辑" },
  { key: "deleted", label: "删除" },
]
export function ST_STATION_SYS_COLUMNS_SHOW(config: ITbColAction<TStTbActInfo, stateInfo>,): ColumnsType {
  const { onClick } = config
  return [
    { dataIndex: "index", title: "序号", width: 60 },
    { dataIndex: "stationName", title: "场站",  },
    { dataIndex: "deviceType", title: "设备类型",  },
    { dataIndex: "deviceName", title: "(输出)设备",  },
    { dataIndex: "modelId", title: "设备型号",  },
    { dataIndex: "calcType", title: "类型(0、1)",  render: (text) => COMPUTED_OPTIONS.find(i=>i.value==text).label },
    { dataIndex: "inputPoints", title: "规则", width: 200 },
    { dataIndex: "pointName", title: "新测点编码",  },
    { dataIndex: "pointType", title: "测点类型", render: (text) => text == "0" ? "遥信" : "遥测" },
    { dataIndex: "frequency", title: "计算频率", },
    { dataIndex: "enabled", title: "是否启用", render: (text) => text==true ? "是" : "否" },
    ...getTableActColumn<any,any>(
          TABLE_ACTION,
          (record) => ({
            onClick: onClick?.bind(null, record),
          }),
          undefined,
          { width: 200 },
        ),
  ]
}

export const ST_STATION_SYS_COLUMNS = (setDataSource, controlType) => {
  return [
    { dataIndex: "index", title: "序号", width: 60 },
    { dataIndex: "modelName", title: "型号", width: 100 },
    {
      dataIndex: "controlType",
      title: "控制类型",
      width: 150,
      render: (text, record) => (
        <EditableSelectCell
          value={text}
          record={record}
          valkey="controlType"
          setDataSource={setDataSource}
          option={controlType}
        />
      ),
    },
    {
      dataIndex: "targetValue",
      title: "旧控制值",
      width: 150,
      render: (text, record) => (
        <EditableNumberCell value={text} record={record} dataIndex="targetValue" setDataSource={setDataSource} />
      ),
    },
    {
      dataIndex: "newTargetValue",
      title: "新控制值",
      width: 150,
      render: (text, record) => (
        <EditableNumberCell value={text} record={record} dataIndex="newTargetValue" setDataSource={setDataSource} />
      ),
    },
    {
      dataIndex: "newIo",
      title: "新测点编码",
      width: 150,
      render: (text, record) => (
        <EditableInputCell value={text} record={record} valkey="newIo" setDataSource={setDataSource} />
      ),
    },    
  ]
}
export const GATEWAY_TYPE = [
  { label: "关口表", value: 1 },
  { label: "非关口表", value: 2 },
]
export const FUNCTION_TYPE = [
  { label: "正向有功电表", value: 1 },
  { label: "反向有功电表", value: 2 },
]
export const NO_TAGS = [
  "coefficient",
  "rawRatio",
  "rawPointName",
  "pointDesc",
  "systemId",
  "pointType",
  "pointName",
  "deviceType",
  "modelId",
  "unit",
  "maximum",
  "minimum",
]
