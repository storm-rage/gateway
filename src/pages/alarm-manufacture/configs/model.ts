/*
 * @Author: chenmeifeng
 * @Date: 2025-05-20 10:16:16
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-05-20 15:35:27
 * @Description:
 */

import { ISearchFormProps } from "@/components/custom-form/types"
import CustonInput from "@/components/custom-input"
import SelectWithAll from "@/components/select-with-all"
import StationTreeSelect from "@/components/station-tree-select"

// 新增
export function formItemFuc(
  disabled,
  { models = [], systems = [], alarmlevels = [], brakeLevels = [] },
): ISearchFormProps["itemOptions"] {
  return [
    {
      type: StationTreeSelect,
      name: "stationId",
      label: "场站",
      formItemProps: {
        labelCol: { span: 6 },
        rules: [{ required: true, message: "请选择场站" }],
      },
      props: {
        needFirst: true,
        disabled: disabled,
        needId: true,
        placeholder: "",
        style: { minWidth: "10em" },
      },
    },
    {
      type: SelectWithAll,
      name: "modelId",
      label: "设备型号",
      formItemProps: {
        labelCol: { span: 6 },
        rules: [{ required: true, message: "请选择设备型号" }],
      },
      props: {
        options: models,
        needFirst: true,
        disabled: disabled,
        allowClear: false,
        placeholder: "",
      },
    },
    {
      type: CustonInput,
      name: "alarmId",
      label: "故障码",
      formItemProps: {
        labelCol: { span: 6 },
        rules: [{ required: true, message: "请输入简称" }],
      },
      props: {
        disabled: disabled,
      },
    },
    {
      type: CustonInput,
      name: "alarmDesc",
      label: "故障描述",
      formItemProps: {
        labelCol: { span: 6 },
        rules: [{ required: true, message: "请输入保留字段" }],
      },
      props: {},
    },
    {
      type: SelectWithAll,
      name: "systemId",
      label: "归属系统",
      formItemProps: {
        labelCol: { span: 6 },
        rules: [{ required: true, message: "请选择归属系统" }],
      },
      props: {
        options: systems,
      },
    },
    {
      type: SelectWithAll,
      name: "alarmLevelId",
      label: "告警等级",
      formItemProps: {
        labelCol: { span: 6 },
        rules: [{ required: true, message: "请选择告警等级" }],
      },
      props: {
        options: alarmlevels,
      },
    },
    {
      type: SelectWithAll,
      name: "brakeLevelId",
      label: "停机等级",
      formItemProps: {
        labelCol: { span: 6 },
        rules: [{ required: true, message: "请选择停机等级" }],
      },
      props: {
        options: brakeLevels,
      },
    },
  ]
}
