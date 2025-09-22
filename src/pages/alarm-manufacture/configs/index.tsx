/*
 * @Author: chenmeifeng
 * @Date: 2024-01-08 13:50:48
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-06-16 17:02:18
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
  { name: "save", label: "批量编辑", permission: "rule:alarm:edit" },
  { name: "add", label: "新增", permission: "rule:alarm:add" },
  {
    name: "batchDelete",
    label: "批量删除",
    permission: "rule:alarm:batchDelete",
  },
  {
    name: "import",
    label: "导入",
    permission: "rule:alarm:import",
  },
  {
    name: "export",
    label: "导出",
    permission: "rule:alarm:export",
  },
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
      style: { minWidth: "10em" },
    },
  },
  {
    type: SelectWithAll,
    name: "modelId",
    label: "设备型号",
    props: {
      options: [],
      needFirst: true,
      disabled: false,
      allowClear: true,
      placeholder: "全部",
    },
  },
]
//变位配置
export const TRANS_TYPE = [
  { label: "合位", value: 1 },
  { label: "分位", value: 2 },
]
// 复位等级
export const RESET_LEVEL = [
  { label: "禁止复位", value: 1 },
  { label: "远程复位", value: 2 },
  { label: "就地复位", value: 3 },
]
// 告警二级分类
export const ALARM_SORT = [
  { label: "重要告警", value: 1 },
  { label: "非重要告警", value: 2 },
]
export const ST_STATION_SYS_COLUMNS_SHOW: ColumnsType = [
  { dataIndex: "index", title: "序号", width: 60 },
  { dataIndex: "model", title: "设备型号" },
  { dataIndex: "alarmId", title: "故障码" },
  { dataIndex: "alarmDesc", title: "故障描述" },
  { dataIndex: "systemName", title: "归属系统" },
  { dataIndex: "alarmName", title: "告警等级" },
  { dataIndex: "brakeName", title: "停机等级" },
  {
    dataIndex: "transType",
    title: "变位类型",
    render: (text, record) => TRANS_TYPE?.find((i) => i.value === record.tags?.transType)?.label,
  },
  {
    dataIndex: "resetLevel",
    title: "复位等级",
    render: (text, record) => RESET_LEVEL?.find((i) => i.value === record.tags?.resetLevel)?.label,
  },
  { dataIndex: "resetNum", title: "最大复位次数", render: (text, record) => record.tags?.resetNum },
  {
    dataIndex: "sort",
    title: "告警二级分类",
    render: (text, record) => ALARM_SORT?.find((i) => i.value === record.tags?.sort)?.label,
  },
  { dataIndex: "condition", title: "告警条件", render: (text, record) => record.tags?.condition },
]

export const ST_STATION_SYS_COLUMNS = (setDataSource, belongList, alarmIdLs, brakeLs) => {
  return [
    { dataIndex: "row_idx", title: "序号", width: 60 },
    { dataIndex: "model", title: "设备型号", width: 150 },
    { dataIndex: "alarmId", title: "故障码", width: 120 },
    {
      dataIndex: "alarmDesc",
      title: "故障描述",
      width: 170,
      render: (text, record) => (
        <EditableInputCell value={text} record={record} valkey="alarmDesc" setDataSource={setDataSource} />
      ),
    },
    {
      dataIndex: "systemId",
      title: "归属系统",
      width: 120,
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
      dataIndex: "alarmLevelId",
      title: "告警等级",
      width: 120,
      render: (text, record) => (
        <EditableSelectCell
          value={text}
          record={record}
          valkey="alarmLevelId"
          setDataSource={setDataSource}
          option={alarmIdLs}
        />
      ),
    },
    {
      dataIndex: "brakeLevelId",
      title: "停机等级",
      width: 120,
      render: (text, record) => (
        <EditableSelectCell
          value={text}
          record={record}
          valkey="brakeLevelId"
          setDataSource={setDataSource}
          option={brakeLs}
        />
      ),
    },
    {
      dataIndex: "transType",
      title: "变位类型",
      width: 120,
      render: (text, record) => (
        <EditableSelectCell
          value={record?.tags?.transType}
          record={record}
          valkey="transType"
          setDataSource={setDataSource}
          option={TRANS_TYPE}
        />
      ),
    },
    {
      dataIndex: "resetLevel",
      title: "复位等级",
      width: 120,
      render: (text, record) => (
        <EditableSelectCell
          value={record?.tags?.resetLevel}
          record={record}
          valkey="resetLevel"
          setDataSource={setDataSource}
          option={RESET_LEVEL}
        />
      ),
    },
    {
      dataIndex: "resetNum",
      title: "最大复位次数",
      width: 120,
      render: (text, record) => (
        <EditableInputCell
          value={record?.tags?.resetNum}
          record={record}
          valkey="resetNum"
          setDataSource={setDataSource}
        />
      ),
    },
    {
      dataIndex: "sort",
      title: "告警二级分类",
      width: 150,
      render: (text, record) => (
        <EditableSelectCell
          value={record?.tags?.sort}
          record={record}
          valkey="sort"
          setDataSource={setDataSource}
          option={ALARM_SORT}
        />
      ),
    },
    {
      dataIndex: "condition",
      title: "告警条件",
      width: 120,
      render: (text, record) => (
        <EditableInputCell
          value={record?.tags?.condition}
          record={record}
          valkey="condition"
          setDataSource={setDataSource}
        />
      ),
    },
  ]
}
// { dataIndex: "transType", title: "变位类型", render: (text) => TRANS_TYPE?.find((i) => i.value === text)?.label },
//   { dataIndex: "resetLevel", title: "复位等级", render: (text) => RESET_LEVEL?.find((i) => i.value === text)?.label },
//   { dataIndex: "resetNum", title: "最大复位次数" },
//   { dataIndex: "sort", title: "告警二级分类", render: (text) => ALARM_SORT?.find((i) => i.value === text)?.label },
//   { dataIndex: "condition", title: "告警条件" },
export const NO_TAGS = ["systemId", "brakeLevelId", "alarmLevelId", "alarmDesc"]
