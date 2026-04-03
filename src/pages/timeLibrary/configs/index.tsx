/*
 * 
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
import AutoComplete from "antd/es/auto-complete"


// import { IStationIndexInfo } from "../types"

export const ST_POINT_SCH_FORM_BTNS: ISearchFormProps["buttons"] = [
  SCH_BTN,
  // { name: "edit", label: "批量编辑", permission: "model:point:edit" },
  { name: "add", label: "新增", permission: "model:point:add" },
  // {
  //   name: "batchDelete",
  //   label: "批量删除",
  //   permission: "model:point:batchDelete",
  // },
  // {
  //   name: "import",
  //   label: "导入",
  //   permission: "model:point:import",
  // },
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
    label: "类型",
    props: {
      options: [],
      needFirst: true,
      disabled: false,
      allowClear: true,
    },
  },
  {
    type: CommonTreeSelect,
    name: "modelIds",
    label: "设备",
    props: {
      // options: [],
      // disabled: false,
      // allowClear: true,
      // placeholder: "全部",
        // showSearch: true,
        optionFilterProp: "children",
        allowClear: false,
        placeholder: "全部",
        style: { width: "200px" },
    },
  },
  {
    type: SelectWithAll,
    name: "status",
    label: "状态",
    props: {
      options: [
        { value: 0, label: "待开始" },
        { value: 1, label: "迁移中" },
        { value: 2, label: "完成" },
        { value: 3, label: "失败" },
      ],
    },
  },
  // {
  //   type: RangeDatePicker,
  //   name: "dateRange",
  //   label: "时间",
  //   props: {
  //     showTime: true,
  //     presets: false,
  //     style: { width: "32.2em" },
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
  {
    type: SelectWithAll,
    name: "deviceType",
    label: "类型",
    props: {
      options: [],
      needFirst: false,
      disabled: false,
      allowClear: false,
    },
  },
  {
    
    type: SelectWithAll,
    // type: AutoComplete,
    name: "modelIds",
    label: "设备",
    props: {
      // needFirst: true,
      // options: [],
      // disabled: false,
      optionFilterProp: "children",
      // mode: "single",
      allowClear: true,
      showSearch: true,
      placeholder: "全部",
      style: { width: "600px" },
    },
  },
]
export const ST_STATION_ADD_TARGET_FORM_ITEMS: ISearchFormProps["itemOptions"] = [
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
    {
      type: SelectWithAll,
      name: "deviceType",
      label: "类型",
      props: {
        options: [],
        needFirst: false,
        disabled: false,
        allowClear: false,
      },
    },
    {
      // type: SelectWithAll,
      type: AutoComplete,
      name: "modelIds",
      label: "设备",
      props: {
        showSearch: true,
        optionFilterProp: "children",
        allowClear: true,
        placeholder: "全部",
        style: { width: "600px" },
        // multiple: true,
        // placeholder: "全部",
        // treeCheckable: true,
        // style: { minWidth: "13em" },
      },
    },
    // {
    //     type: CommonTreeSelect,
    //     name: "deviceIds",
    //     label: "设备",
    //     props: {
    //       // needFirst: true,
    //       // options: [],
    //       // disabled: false,
    //       // mode: "single",
    //       // allowClear: false,
    //       // placeholder: "全部",
    //       // style: { width: "200px" },
    //       multiple: true,
    //       placeholder: "全部",
    //       treeCheckable: true,
    //       style: { minWidth: "13em" },
    //     },
    //   },
  
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
const STATUS_MAP = {
  0: '待开始',
  1: '迁移中',
  2: '完成',
  3: '失败',
};
export function ST_STATION_SYS_COLUMNS_SHOW(deviceType): ColumnsType {
  return [
    { dataIndex: "index", title: "序号", width: 60 },
    { dataIndex: "stationName", title: "场站",  },
    { dataIndex: "deviceType", title: "设备类型",  },
    { dataIndex: "deviceName", title: "设备",  },
    { dataIndex: "newDevicePath", title: "迁移目标设备", width: 300,
      ellipsis: true, // 超出隐藏
      render: (text) => (
          <div 
            style={{ whiteSpace: 'wrap',}}
          >
            {text}
          </div>
      )
    },
    { dataIndex: "newMeasurement", title: "迁移目标测点",  },
    { dataIndex: "oldDevicePath", title: "迁移来源设备", width: 300,
      ellipsis: true, // 超出隐藏
      render: (text) => (
          <div 
            style={{ whiteSpace: 'wrap',}}
          >
            {text}
          </div>
      )
    },
    { dataIndex: "oldMeasurement", title: "迁移来源测点",  },
    { dataIndex: "startTime", title: "迁移开始时间",  },
    { dataIndex: "endTime", title: "迁移结束时间",  },
    { dataIndex: "operatorTime", title: "任务创建时间", },
    { dataIndex: "status", title: "任务状态", render: (status) => STATUS_MAP[status] || '未知状态' },
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
