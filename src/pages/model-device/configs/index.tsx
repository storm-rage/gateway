/*
 * @Author: chenmeifeng
 * @Date: 2023-10-19 13:47:47
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-07-08 14:17:21
 * @Description:
 */
import { ColumnsType } from "antd/es/table"

import { SCH_BTN } from "@/components/custom-form/configs.ts"
import { ISearchFormProps } from "@/components/custom-form/types.ts"
import SelectWithAll from "@/components/select-with-all"
import StationTreeSelect from "@/components/station-tree-select"
import { StorageDeviceType } from "@/configs/storage-cfg"
import { getStorage, uDate } from "@/utils/util-funs"

import { IDeviceListData } from "../types/index"
import EditableCellDate from "../components/edit-date-picker"
import EditableCell from "../components/edit-input"
import EditableCellSelect from "../components/edit-select"
import EditableNumberCell from "@/components/custom-input/edit-table-input-number"

export const alldeviceTypes = getStorage(StorageDeviceType)

export const ST_MANAGE_SCH_FORM_BTNS: ISearchFormProps["buttons"] = [
  SCH_BTN,
  { name: "edit", label: "批量编辑", permission: "model:device:add" },
  { name: "add", label: "新增", permission: "model:device:add" },
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
export const NO_TAGS = ["name", "modelId", "operationDate", "deviceCode", "deviceName", "periodCode", "lineCode"]
export const ST_MANAGE_FORM_ITEMS: ISearchFormProps["itemOptions"] = [
  {
    type: StationTreeSelect,
    name: "stationId",
    label: "场站",
    // formItemProps: { labelCol: { span: 8 } },
    props: {
      needFirst: true,
      needId: true,
      disabled: false,
    },
  },
  {
    type: SelectWithAll,
    name: "deviceType",
    label: "设备类型",
    props: {
      needFirst: true,
      disabled: false,
      showAll: true,
      options: [],
      placeholder: "请选择设备类型",
      style: { minWidth: "10em" },
    },
  },
  // {
  //   type: SelectWithAll,
  //   name: "deviceIds",
  //   label: "设备",
  //   props: {
  //     // needFirst: true,
  //     disabled: false,
  //     showAll: true,
  //     options: [],
  //     placeholder: "请选择设备",
  //     style: { minWidth: "10em" },
  //     mode: "multiple",
  //   },
  // },
]

export const DEVICE_ATT_COLUMNS: ColumnsType<IDeviceListData> = [
  { dataIndex: "index", title: "序号", width: 60 },
  { dataIndex: "stationName", title: "场站", width: 120 },
  { dataIndex: "deviceTypeName", title: "设备类型", width: 120 },
  { dataIndex: "id", title: "设备ID", width: 120 },    
  { dataIndex: "deviceCode", title: "设备编码", width: 120 },
  { dataIndex: "name", title: "设备", width: 120 },
  { dataIndex: "model", title: "设备型号", width: 180 },
  { dataIndex: "periodName", title: "期次", width: 120 },
  { dataIndex: "lineName", title: "线路", width: 120 },
  { dataIndex: "operationDate", title: "运营时间", width: 120 },
]
export function DEVICE_DEFAULT_TEXT_COLUMN(deviceType): ColumnsType<IDeviceListData> {
  const arr =
    deviceType === "WT" || deviceType === "W"
      ? [
          {
            dataIndex: "rated_wspd",
            title: "额定风速",
            width: 120,
            render: (_, record) => record.tags?.rated_wspd || "",
          },
          {
            dataIndex: "cut_in_wspd",
            title: "切入风速",
            width: 120,
            render: (_, record) => record.tags?.cut_in_wspd || "",
          },
          {
            dataIndex: "cut_out_wspd",
            title: "切出风速",
            width: 120,
            render: (_, record) => record.tags?.cut_out_wspd || "",
          },
          {
            dataIndex: "rotor_diameter",
            title: "风轮直径",
            width: 120,
            render: (_, record) => record.tags?.rotor_diameter || "",
          },
          {
            dataIndex: "blade_length",
            title: "叶片长度",
            width: 120,
            render: (_, record) => record.tags?.blade_length || "",
          },
          {
            dataIndex: "hub_height",
            title: "轮毂高度",
            width: 120,
            render: (_, record) => record.tags?.hub_height || "",
          },
          { dataIndex: "type", title: "类型", width: 120, render: (_, record) => record.tags?.type || "" },
        ]
      : []
  const benchmark =
    deviceType === "WT" || deviceType === "PVINV" || deviceType === "ESPCS"
      ? [
          {
            dataIndex: "benchmark_flag",
            title: "标杆机组",
            width: 120,
            render: (_, record) => record.tags?.benchmark_flag || "",
          },
        ]
      : []
  const pvArr =
    deviceType === "PVINV" || deviceType === "S" || deviceType === "P"
      ? [
          {
            dataIndex: "array",
            title: "方阵",
            width: 120,
            render: (_, record) => record?.tags?.array || "",
          },
          {
            dataIndex: "pvcol",
            title: "关联数采id",
            width: 120,
            render: (_, record) => record.tags?.pvcol || "",
          },
        ]
      : []
  return [
    // {
    //   dataIndex: "operation_code",
    //   title: "运营编号",
    //   width: 120,
    //   render: (_, record) => record.tags?.operation_code || "",
    // },
    { dataIndex: "manufacturer", title: "厂家", width: 120 },
    { dataIndex: "priority", title: "顺序", width: 120, render: (_, record) => record.tags?.priority || "" },
    {
      dataIndex: "rated_power",
      title: "额定功率",
      width: 120,
      render: (_, record) => record.tags?.rated_power || "",
    },
    ...arr,
    ...pvArr,
    { dataIndex: "longitude", title: "经度", width: 120, render: (_, record) => record.tags?.longitude || "" },
    { dataIndex: "latitude", title: "纬度", width: 120, render: (_, record) => record.tags?.latitude || "" },
    { dataIndex: "altitude", title: "海拔高度", width: 120, render: (_, record) => record.tags?.altitude || "" },
    ...benchmark,
    {
      dataIndex: "install_date",
      title: "安装日期",
      width: 120,
      render: (_, record) => record.tags?.install_date || "",
    },
    {
      dataIndex: "grid_on_date",
      title: "并网日期",
      width: 120,
      render: (_, record) => record.tags?.grid_on_date || "",
    },
    // { dataIndex: "operationDate", title: "转运营日期", width: 120, render: (text) => uDate(text, "YYYY-MM-DD") },
    {
      dataIndex: "out_of_warranty_date",
      title: "出质保日期",
      width: 120,
      render: (_, record) => record.tags?.out_of_warranty_date || "",
    },
  ]
}
export function DEVICE_ATT_EDIT_COLUMNS(
  setDataSource,
  dvsTypeModels,
  dvsTypeLines,
  dvsTypePeriod,
): ColumnsType<IDeviceListData> {
  return [
    { dataIndex: "index", title: "序号", width: 60 },
    { dataIndex: "stationName", title: "场站", width: 120 },
    { dataIndex: "deviceTypeName", title: "设备类型", width: 120 },
  { dataIndex: "id", title: "设备ID", width: 120 },      
    {
      dataIndex: "deviceCode",
      title: "设备编码",
      width: 120,
      render: (text, record) => (
        <EditableCell value={record.deviceCode} record={record} dataIndex="deviceCode" setDataSource={setDataSource} />
      ),
    },
    {
      dataIndex: "name",
      title: "设备",
      width: 120,
      render: (text, record) => (
        <EditableCell value={record.name} record={record} dataIndex="name" setDataSource={setDataSource} />
      ),
    },
    {
      dataIndex: "modelId",
      title: "设备型号",
      width: 180,
      render: (text, record) => (
        <EditableCellSelect
          value={record.modelId}
          record={record}
          dataIndex="modelId"
          setDataSource={setDataSource}
          option={dvsTypeModels?.[record.deviceType] || []}
        />
      ),
    },
    {
      dataIndex: "periodCode",
      title: "期次",
      width: 120,
      render: (text, record) => (
        <EditableCellSelect
          value={record.periodCode}
          record={record}
          dataIndex="periodCode"
          setDataSource={setDataSource}
          option={dvsTypePeriod}
        />
      ),
    },
    {
      dataIndex: "lineCode",
      title: "线路",
      width: 120,
      render: (text, record) => (
        <EditableCellSelect
          value={record.lineCode}
          record={record}
          dataIndex="lineCode"
          setDataSource={setDataSource}
          option={dvsTypeLines}
        />
      ),
    },
    {
      dataIndex: "operationDate",
      title: "运营时间",
      width: 140,
      render: (text, record) => (
        <EditableCellDate
          value={record.operationDate}
          record={record}
          dataIndex="operationDate"
          setDataSource={setDataSource}
        />
      ),
    },
  ]
}
export const getDeviceColumns = (deviceType, setDataSource) => {
  const arr =
    deviceType === "WT" || deviceType === "W"
      ? [
          {
            dataIndex: "rated_wspd",
            title: "额定风速",
            width: 120,
            render: (text, record) => (
              <EditableNumberCell
                value={record.tags?.rated_wspd}
                record={record}
                dataIndex="rated_wspd"
                setDataSource={setDataSource}
              />
            ),
          },
          {
            dataIndex: "cut_in_wspd",
            title: "切入风速",
            width: 120,
            render: (text, record) => (
              <EditableNumberCell
                value={record.tags?.cut_in_wspd}
                record={record}
                dataIndex="cut_in_wspd"
                setDataSource={setDataSource}
              />
            ),
          },
          {
            dataIndex: "cut_out_wspd",
            title: "切出风速",
            width: 120,
            render: (text, record) => (
              <EditableNumberCell
                value={record.tags?.cut_out_wspd}
                record={record}
                dataIndex="cut_out_wspd"
                setDataSource={setDataSource}
              />
            ),
          },
          {
            dataIndex: "rotor_diameter",
            title: "风轮直径",
            width: 120,
            render: (text, record) => (
              <EditableNumberCell
                value={record.tags?.rotor_diameter}
                record={record}
                dataIndex="rotor_diameter"
                setDataSource={setDataSource}
              />
            ),
          },
          {
            dataIndex: "blade_length",
            title: "叶片长度",
            width: 120,
            render: (text, record) => (
              <EditableNumberCell
                value={record.tags?.blade_length}
                record={record}
                dataIndex="blade_length"
                setDataSource={setDataSource}
              />
            ),
          },
          {
            dataIndex: "hub_height",
            title: "轮毂高度",
            width: 120,
            render: (text, record) => (
              <EditableNumberCell
                value={record.tags?.hub_height}
                record={record}
                dataIndex="hub_height"
                setDataSource={setDataSource}
              />
            ),
          },
          {
            dataIndex: "type",
            title: "类型",
            width: 120,
            render: (text, record) => (
              <EditableCell value={record.tags?.type} record={record} dataIndex="type" setDataSource={setDataSource} />
            ),
          },
        ]
      : []
  const benchmark =
    deviceType === "WT" || deviceType === "PVINV" || deviceType === "ESPCS"
      ? [
          {
            dataIndex: "benchmark_flag",
            title: "标杆机组",
            width: 120,
            render: (text, record) => (
              <EditableCellSelect
                value={record.tags?.benchmark_flag}
                record={record}
                dataIndex="benchmark_flag"
                setDataSource={setDataSource}
                option={BENCHMARK_FLAG_OPTIONS}
              />
            ),
          },
        ]
      : []
  const pvEdit =
    deviceType === "PVINV" || deviceType === "S" || deviceType === "P"
      ? [
          {
            dataIndex: "array",
            title: "方阵",
            width: 75,
            render: (text, record) => (
              <EditableNumberCell
                value={record.tags?.array}
                record={record}
                dataIndex="array"
                setDataSource={setDataSource}
              />
            ),
          },
          {
            dataIndex: "pvcol",
            title: "关联数采id",
            width: 75,
            render: (text, record) => (
              <EditableNumberCell
                value={record.tags?.pvcol}
                record={record}
                dataIndex="array"
                setDataSource={setDataSource}
              />
            ),
          },
        ]
      : []
  return [
    // {
    //   dataIndex: "operation_code",
    //   title: "运营编号",
    //   width: 120,
    //   render: (text, record) => (
    //     <EditableCell
    //       value={record.tags?.operation_code}
    //       record={record}
    //       dataIndex="operation_code"
    //       setDataSource={setDataSource}
    //     />
    //   ),
    // },
    {
      dataIndex: "priority",
      title: "顺序",
      width: 120,
      render: (text, record) => (
        <EditableNumberCell
          value={record.tags?.priority}
          dataIndex="priority"
          record={record}
          setDataSource={setDataSource}
        />
      ),
    },
    {
      dataIndex: "rated_power",
      title: "额定功率",
      width: 120,
      render: (text, record) => (
        <EditableNumberCell
          value={record.tags?.rated_power}
          record={record}
          dataIndex="rated_power"
          setDataSource={setDataSource}
        />
      ),
    },
    ...arr,
    ...pvEdit,
    {
      dataIndex: "longitude",
      title: "经度",
      width: 120,
      render: (text, record) => (
        <EditableNumberCell
          value={record.tags?.longitude}
          record={record}
          dataIndex="longitude"
          setDataSource={setDataSource}
        />
      ),
    },
    {
      dataIndex: "latitude",
      title: "纬度",
      width: 120,
      render: (text, record) => (
        <EditableNumberCell
          value={record.tags?.latitude}
          record={record}
          dataIndex="latitude"
          setDataSource={setDataSource}
        />
      ),
    },
    {
      dataIndex: "altitude",
      title: "海拔高度",
      width: 120,
      render: (text, record) => (
        <EditableNumberCell
          value={record.tags?.altitude}
          record={record}
          dataIndex="altitude"
          setDataSource={setDataSource}
        />
      ),
    },
    ...benchmark,
    {
      dataIndex: "install_date",
      title: "安装日期",
      width: 140,
      render: (text, record) => (
        <EditableCellDate
          value={record.tags?.install_date}
          record={record}
          dataIndex="install_date"
          setDataSource={setDataSource}
        />
      ),
    },
    {
      dataIndex: "grid_on_date",
      title: "并网日期",
      width: 140,
      render: (text, record) => (
        <EditableCellDate
          value={record.tags?.grid_on_date}
          record={record}
          dataIndex="grid_on_date"
          setDataSource={setDataSource}
        />
      ),
    },
    {
      dataIndex: "operationDate",
      width: 140,
      title: "转运营日期",
      render: (_, record) => (
        <EditableCellDate
          value={record.tags?.operationDate}
          record={record}
          dataIndex="operationDate"
          setDataSource={setDataSource}
        />
      ),
    },
    {
      dataIndex: "out_of_warranty_date",
      title: "出质保日期",
      width: 140,
      render: (text, record) => (
        <EditableCellDate
          value={record.tags?.out_of_warranty_date}
          record={record}
          dataIndex="out_of_warranty_date"
          setDataSource={setDataSource}
        />
      ),
    },
  ]
}
export const BENCHMARK_FLAG_OPTIONS = [{ value: "是" }, { value: "否" }]
