/*
 * @Author: chenmeifeng
 * @Date: 2024-01-08 13:50:48
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-09-22 10:34:54
 * @Description:
 */
import { ColumnsType } from "antd/es/table"

import { SCH_BTN } from "@/components/custom-form/configs"
import { ISearchFormProps } from "@/components/custom-form/types"
import SelectWithAll from "@/components/select-with-all"
import StationTreeSelect from "@/components/station-tree-select"
import EditableInputCell from "@/pages/setting-station/components/edit-input"
import EditableSelectCell from "@/components/select-ordinary/table-edit-select"

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
    name: "deviceType",
    label: "设备类型",
    props: {
      options: [],
      disabled: false,
      // mode: "multiple",
      allowClear: true,
      placeholder: "全部",
    },
  },
  {
    type: SelectWithAll,
    name: "modelId",
    label: "型号",
    props: {
      options: [],
      needFirst: true,
      disabled: false,
      // allowClear: false,
      placeholder: "全部",
    },
  },
  {
    type: SelectWithAll,
    name: "pointTypes",
    label: "测点类型",
    props: {
      options: POINT_TYPE,
      needFirst: false,
      disabled: false,
      mode: "multiple",
      style: { minWidth: "6em" },      
    },
  },
  {
    type: SelectWithAll,
    name: "systemId",
    label: "归属系统",
    props: {
      options: [],
      needFirst: false,
      disabled: false,
      placeholder: "全部",
    },
  },
]
export function ST_STATION_SYS_COLUMNS_SHOW(deviceType): ColumnsType {
  return [
    { dataIndex: "row_idx", title: "序号", width: 60 },
    { dataIndex: "modelName", title: "设备型号", width: 170 },
    { dataIndex: "pointDesc", title: "测点描述", width: 170 },
    { dataIndex: "pointName", title: "测点编码", width: 120 },
    {
      dataIndex: "pointType",
      title: "测点类型",
      width: 120,
      render: (text) => POINT_TYPE.find((i) => i.value === text)?.label || text,
    },
    { dataIndex: "systemName", title: "归属系统", width: 120 },
    { dataIndex: "unit", title: "单位", width: 80 },
    { dataIndex: "minimum", title: "最小值", width: 80 },
    { dataIndex: "maximum", title: "最大值", width: 80 },
    { dataIndex: "coefficient", title: "倍率", width: 80 },
    { dataIndex: "rawPointName", title: "原始测点编码", width: 80 },
    { dataIndex: "rawRatio", title: "原始倍率", width: 80 },
    {
      dataIndex: "display",
      title: "展示",
      width: 80,
      render: (text) => (text === 1 ? "是" : "否"),
    },
    { dataIndex: "priority", title: "顺序", width: 80 },
    ...getDvsTypeTableColumns(deviceType),
  ]
}

export const ST_STATION_SYS_COLUMNS = (setDataSource, belongList, options, deviceType) => {
  return [
    { dataIndex: "row_idx", title: "序号", width: 60 },

    { dataIndex: "modelName", title: "设备型号", width: 100 },
    {
      dataIndex: "pointDesc",
      title: "测点描述",
      width: 150,
      render: (text, record) => (
        <EditableInputCell value={text} record={record} valkey="pointDesc" setDataSource={setDataSource} />
      ),
    },
    {
      dataIndex: "pointName",
      title: "测点编码",
      width: 150,
      render: (text, record) => (
        <EditableInputCell value={text} record={record} valkey="pointName" setDataSource={setDataSource} />
      ),
    },
    {
      dataIndex: "pointType",
      title: "测点类型",
      width: 150,
      render: (text, record) => (
        <EditableSelectCell
          value={text}
          record={record}
          valkey="pointType"
          setDataSource={setDataSource}
          option={POINT_TYPE}
        />
      ),
    },
    {
      dataIndex: "systemId",
      title: "归属系统",
      width: 150,
      render: (text, record) => (
        <EditableSelectCell
          value={text}
          record={record}
          valkey="systemId"
          setDataSource={setDataSource}
          option={belongList}
        />
      ),
    },
    {
      dataIndex: "unit",
      title: "单位",
      width: 80,
      render: (text, record) => (
        <EditableInputCell value={text} record={record} valkey="unit" setDataSource={setDataSource} />
      ),
    },
    {
      dataIndex: "maximum",
      title: "最大值",
      width: 150,
      render: (text, record) => (
        <EditableInputCell value={text} record={record} valkey="maximum" setDataSource={setDataSource} />
      ),
    },
    {
      dataIndex: "minimum",
      title: "最小值",
      width: 150,
      render: (text, record) => (
        <EditableInputCell value={text} record={record} valkey="minimum" setDataSource={setDataSource} />
      ),
    },
    {
      dataIndex: "coefficient",
      title: "倍率",
      width: 80,
      render: (text, record) => (
        <EditableInputCell value={text} record={record} valkey="coefficient" setDataSource={setDataSource} />
      ),
    },
    {
      dataIndex: "rawPointName",
      title: "原始测点编码",
      width: 150,
      render: (text, record) => (
        <EditableInputCell value={text} record={record} valkey="rawPointName" setDataSource={setDataSource} />
      ),
    },
    {
      dataIndex: "rawRatio",
      title: "原始倍率",
      width: 150,
      render: (text, record) => (
        <EditableInputCell value={text} record={record} valkey="rawRatio" setDataSource={setDataSource} />
      ),
    },
    {
      dataIndex: "display",
      title: "展示",
      width: 80,
      render: (text, record) => (
        <EditableSelectCell
          value={text}
          record={record}
          valkey="display"
          setDataSource={setDataSource}
          option={options}
        />
      ),
    },
    {
      dataIndex: "priority",
      title: "顺序",
      width: 80,
      render: (text, record) => (
        <EditableInputCell value={text} record={record} valkey="priority" setDataSource={setDataSource} />
      ),
    },
    ...getDvsTypeColumns(deviceType, options, setDataSource),
  ]
}
const getDvsTypeColumns = (deviceType, options, setDataSource) => {
  let result = []
  if (deviceType === "WT" || deviceType === "ESPCS" || deviceType === "PVINV") {
    result = [
      {
        dataIndex: "temp_flag",
        title: "温度测点",
        width: 80,
        render: (text, record) => (
          <EditableSelectCell
            value={record.tags?.temp_flag}
            record={record}
            valkey="temp_flag"
            setDataSource={setDataSource}
            option={options}
          />
        ),
      },
    ]
  } else if (deviceType === "SYZZZ") {
    result = [
      // {
      //   dataIndex: "breaker_flag",
      //   title: "断路器标志",
      //   width: 80,
      //   render: (text, record) => (
      //     <EditableSelectCell
      //       value={record.tags?.breaker_flag}
      //       record={record}
      //       valkey="breaker_flag"
      //       setDataSource={setDataSource}
      //       option={options}
      //     />
      //   ),
      // },
      {
        dataIndex: "breaker_flag",
        title: "标志",
        width: 120,
        render: (text, record) => (
          <EditableSelectCell
            value={record.tags?.breaker_flag}
            record={record}
            valkey="breaker_flag"
            setDataSource={setDataSource}
            option={BREKE_OPTIONS}
          />
        ),
      },
      {
        dataIndex: "breaker_id",
        title: "手车关联断路器ID",
        width: 150,
        render: (text, record) => (
          <EditableInputCell
            value={record.tags?.breaker_id}
            record={record}
            valkey="breaker_id"
            setDataSource={setDataSource}
          />
        ),
      },
    ]
  } else if (deviceType === "DNJL") {
    result = [
      {
        dataIndex: "meter_name",
        title: "电表名称",
        width: 120,
        render: (text, record) => (
          <EditableInputCell
            value={record.tags?.meter_name}
            record={record}
            valkey="meter_name"
            setDataSource={setDataSource}
          />
        ),
      },
      {
        dataIndex: "gateway_type",
        title: "电表类型",
        width: 120,
        render: (text, record) => (
          <EditableSelectCell
            value={record.tags?.gateway_type}
            record={record}
            valkey="gateway_type"
            setDataSource={setDataSource}
            option={GATEWAY_TYPE}
          />
        ),
      },
      {
        dataIndex: "function_type",
        title: "集电线路电表类型",
        width: 150,
        render: (text, record) => (
          <EditableSelectCell
            value={record.tags?.function_type}
            record={record}
            valkey="function_type"
            setDataSource={setDataSource}
            option={FUNCTION_TYPE}
          />
        ),
      },
    ]
  }
  return result
}
const getDvsTypeTableColumns = (deviceType) => {
  let result = []
  if (deviceType === "WT" || deviceType === "ESPCS" || deviceType === "PVINV") {
    result = [
      {
        dataIndex: "temp_flag",
        title: "温度测点",
        width: 80,
        render: (text, record) => (record.tags?.temp_flag ? "是" : "否"),
      },
    ]
  } else if (deviceType === "SYZZZ") {
    result = [
      {
        dataIndex: "breaker_flag",
        title: "标志",
        width: 120,
        render: (text, record) => BREKE_OPTIONS.find((i) => i.value === record.tags?.breaker_flag)?.label,
      },
      // {
      //   dataIndex: "breaker_flag",
      //   title: "手车标志",
      //   width: 80,
      //   render: (text, record) => (record.tags?.breaker_flag === 2 ? "是" : "否"),
      // },
      {
        dataIndex: "breaker_id",
        title: "手车关联断路器ID",
        width: 150,
        render: (text, record) => record.tags?.breaker_id,
      },
    ]
  } else if (deviceType === "DNJL") {
    result = [
      {
        dataIndex: "meter_name",
        title: "电表名称",
        width: 120,
        render: (text, record) => record.tags?.meter_name,
      },
      {
        dataIndex: "gateway_type",
        title: "电表类型",
        width: 120,
        render: (text, record) => (record.tags?.gateway_type === 1 ? "关口表" : "非关口表"),
      },
      {
        dataIndex: "function_type",
        title: "集电线路电表类型",
        width: 150,
        render: (text, record) => (record.tags?.gateway_type === 1 ? "正向有功电表" : "反向有功电表"),
      },
    ]
  }
  return result
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
