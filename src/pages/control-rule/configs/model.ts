/*
 * @Author: chenmeifeng
 * @Date: 2023-10-30 10:16:16
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-10-29 17:31:30
 * @Description:
 */

import { ISearchFormProps } from "@/components/custom-form/types"
import CustonInput from "@/components/custom-input"
import CustomInputNumber from "@/components/custom-input-number"
import SelectWithAll from "@/components/select-with-all"
import StationTreeSelect from "@/components/station-tree-select"

// 新增
export function formItemFuc({ controlType }): ISearchFormProps["itemOptions"] {
  return [
    {
      type: StationTreeSelect,
      name: "stationCode",
      label: "场站",
      formItemProps: {
        labelCol: { span: 6 },
        rules: [{ required: true, message: "请选择场站" }],
      },
      props: {
        style: { width: "100%" },
      },
    },
    {
      type: SelectWithAll,
      name: "deviceId",
      label: "设备",
      formItemProps: {
        labelCol: { span: 6 },
        rules: [{ required: true, message: "请选择设备" }],
      },
      props: {
        options: [],
        // mode: "multiple",
      },
    },
    {
      type: SelectWithAll,
      name: "controlType",
      label: "控制类型",
      formItemProps: {
        labelCol: { span: 6 },
        rules: [{ required: true, message: "请选择控制类型" }],
      },
      props: {
        options: controlType,
      },
    },
    {
      type: CustomInputNumber,
      name: "targetValue",
      label: "旧控制值",
      formItemProps: {
        labelCol: { span: 6 },
        rules: [{ required: true, message: "请输入旧控制值" }],
      },
      props: {
        style: { width: "100%" },
      },
    },
    {
      type: CustomInputNumber,
      name: "newTargetValue",
      label: "新控制值",
      formItemProps: {
        labelCol: { span: 6 },
        rules: [{ required: true, message: "请输入新控制值" }],
      },
      props: {
        style: { width: "100%" },
      },
    },
  ]
}
