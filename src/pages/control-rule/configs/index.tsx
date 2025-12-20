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

// import { IStationIndexInfo } from "../types"

export const ST_POINT_SCH_FORM_BTNS: ISearchFormProps["buttons"] = [
  SCH_BTN,
  { name: "edit", label: "批量编辑", permission: "model:point:edit" },
  { name: "add", label: "新增", permission: "model:point:add" },
  {
    name: "batchDelete",
    label: "批量删除",
    permission: "model:point:batchDelete",
  },
  {
    name: "import",
    label: "导入",
    permission: "model:point:import",
  },
  {
    name: "export",
    label: "导出",
    permission: "model:point:export",
  },
  // {
  //   name: "template",
  //   label: "模板导出",
  //   permission: "model:point:import",
  // },
]
export const YOPTIONS = [
  { value: 1, label: "是" },
  { value: 0, label: "否" },
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
    name: "modelIds",
    label: "型号",
    props: {
      // needFirst: true,
      options: [],
      disabled: false,
      mode: "multiple",
      allowClear: false,
      placeholder: "全部",
    },
  },
  {
    type: SelectWithAll,
    name: "controlType",
    label: "控制类型",
    props: {
      placeholder: "全部",
    },
  },
]
export function ST_STATION_SYS_COLUMNS_SHOW(deviceType): ColumnsType {
  return [
    { dataIndex: "index", title: "序号", width: 60 },
    { dataIndex: "stationName", title: "场站", width: 150 },
    { dataIndex: "modelName", title: "型号编码", width: 150 },
    { dataIndex: "modelId", title: "型号ID", width: 120 },
    { dataIndex: "controlTypeName", title: "控制类型", width: 150 },
    { dataIndex: "targetValue", title: "旧控制值", width: 120 },
    { dataIndex: "newTargetValue", title: "新控制值", width: 120 },
    { dataIndex: "newIo", title: "新测点编码", width: 120 },    
    { dataIndex: "operatorBy", title: "操作人", width: 120 },
    { dataIndex: "operatorTime", title: "操作时间", width: 120 },
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
