/*
 * @Author: chenmeifeng
 * @Date: 2024-01-05 15:14:42
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-07-08 09:57:43
 * @Description:
 */
import { ColumnsType } from "antd/es/table"

import { SCH_BTN } from "@/components/custom-form/configs"
import { ISearchFormProps } from "@/components/custom-form/types"
import StationTreeSelect from "@/components/station-tree-select"

import { IStationIndexInfo } from "../types"
import EditableSelectCell from "@/components/select-ordinary/table-edit-select"
import EditableCell from "@/components/custom-input/edit-table-input"

export const ST_STATION_SCH_FORM_BTNS: ISearchFormProps["buttons"] = [
  SCH_BTN,
  {
    name: "edit",
    label: "批量编辑",
    permission: "model:station:edit",
  },
  {
    name: "add",
    label: "新增",
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
  // {
  //   name: "template",
  //   label: "模板导出",
  //   permission: "model:station:export",
  // },
]

export const ST_STATION_FORM_ITEMS: ISearchFormProps["itemOptions"] = [
  {
    type: StationTreeSelect,
    name: "stationCode",
    label: "场站",
    props: {
      options: [],
      needFirst: false,
      disabled: false,
      placeholder: "全部",
    },
  },
]
export const NO_TAGS = ["fullName", "shortName", "stationCode", "stationType", "maintenanceComId", "parentComId"]
export const ST_STATION_SYS_COLUMNS: ColumnsType<IStationIndexInfo> = [
  { dataIndex: "row_idx", title: "序号", width: 60 },
  { dataIndex: "fullName", title: "全称" },
  { dataIndex: "shortName", title: "简称" },
  { dataIndex: "stationCode", title: "场站编码" },
  { dataIndex: "stationTypeName", title: "场站类型" },
  { dataIndex: "parentComName", title: "项目公司" },
  { dataIndex: "maintenanceComName", title: "检修基地" },
  {
    dataIndex: "priority",
    title: "顺序",
    width: 80,
    render: (text, record) => record.tags?.priority,
  },
  { dataIndex: "longitude", title: "经度", render: (_, record) => record.tags?.longitude },
  { dataIndex: "latitude", title: "纬度", render: (_, record) => record.tags?.latitude },
  { dataIndex: "ip", title: "IP", render: (_, record) => record.tags?.ip },
  { dataIndex: "port", title: "端口", render: (_, record) => record.tags?.port },
  { dataIndex: "net", title: "网络", render: (_, record) => record.tags?.net },
]
export const getStnEditColumns = (setDataSource, stationTypes = [], cpnyList = [], pjctList = []) => {
  return [
    { dataIndex: "row_idx", title: "序号", width: 60 },
    {
      dataIndex: "fullName",
      title: "全称",
      render: (text, record) => (
        <EditableCell value={text} record={record} valkey="fullName" setDataSource={setDataSource} />
      ),
    },
    {
      dataIndex: "shortName",
      title: "简称",
      render: (text, record) => (
        <EditableCell value={text} record={record} valkey="shortName" setDataSource={setDataSource} />
      ),
    },
    {
      dataIndex: "stationCode",
      title: "场站编码",
      render: (text, record) => (
        <EditableCell value={text} record={record} valkey="stationCode" setDataSource={setDataSource} />
      ),
    },
    {
      dataIndex: "stationType",
      title: "场站类型",
      render: (text, record) => (
        <EditableSelectCell
          value={text}
          record={record}
          valkey="stationType"
          setDataSource={setDataSource}
          option={stationTypes}
        />
      ),
    },
    {
      dataIndex: "parentComId",
      title: "项目公司",
      render: (text, record) => (
        <EditableSelectCell
          value={text}
          record={record}
          valkey="parentComId"
          setDataSource={setDataSource}
          option={pjctList}
        />
      ),
    },
    {
      dataIndex: "maintenanceComId",
      title: "检修基地",
      render: (text, record) => (
        <EditableSelectCell
          value={text}
          record={record}
          valkey="maintenanceComId"
          setDataSource={setDataSource}
          option={cpnyList}
        />
      ),
    },
    {
      dataIndex: "priority",
      title: "顺序",
      width: 80,
      render: (_, record) => (
        <EditableCell value={record.tags?.priority} valkey="priority" record={record} setDataSource={setDataSource} />
      ),
    },
    {
      dataIndex: "longitude",
      title: "经度",
      render: (_, record) => (
        <EditableCell value={record.tags?.longitude} valkey="longitude" record={record} setDataSource={setDataSource} />
      ),
    },
    {
      dataIndex: "latitude",
      title: "纬度",
      render: (_, record) => (
        <EditableCell value={record.tags?.latitude} valkey="latitude" record={record} setDataSource={setDataSource} />
      ),
    },
    {
      dataIndex: "ip",
      title: "IP",
      render: (_, record) => (
        <EditableCell value={record.tags?.ip} valkey="ip" record={record} setDataSource={setDataSource} />
      ),
    },
    {
      dataIndex: "port",
      title: "端口",
      render: (_, record) => (
        <EditableCell value={record.tags?.port} valkey="port" record={record} setDataSource={setDataSource} />
      ),
    },
    {
      dataIndex: "net",
      title: "网络",
      render: (_, record) => (
        <EditableCell value={record.tags?.net} valkey="net" record={record} setDataSource={setDataSource} />
      ),
    },
  ]
}
