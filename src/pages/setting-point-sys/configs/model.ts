/*
 * @Author: chenmeifeng
 * @Date: 2023-10-30 10:16:16
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-06-16 15:09:39
 * @Description:
 */

import { ISearchFormProps } from "@/components/custom-form/types"
import CustonInput from "@/components/custom-input"
import SelectWithAll from "@/components/select-with-all"
import { BREKE_OPTIONS, FUNCTION_TYPE, GATEWAY_TYPE, POINT_TYPE, YOPTIONS } from "."

// 新增
export function formItemFuc({ systems, deviceTypes, currentDvsType }): ISearchFormProps["itemOptions"] {
  return [
    {
      type: SelectWithAll,
      name: "deviceType",
      label: "设备类型",
      formItemProps: {
        labelCol: { span: 6 },
        rules: [{ required: true, message: "请选择设备类型" }],
      },
      props: {
        options: deviceTypes,
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
        options: [],
      },
    },
    {
      type: CustonInput,
      name: "pointName",
      label: "测点编码",
      formItemProps: {
        labelCol: { span: 6 },
        rules: [{ required: true, message: "请输入测点编码" }],
      },
      props: {},
    },
    {
      type: CustonInput,
      name: "pointDesc",
      label: "测点描述",
      formItemProps: {
        labelCol: { span: 6 },
        rules: [{ required: true, message: "请输入测点描述" }],
      },
      props: {},
    },
    {
      type: SelectWithAll,
      name: "pointType",
      label: "类型",
      formItemProps: {
        labelCol: { span: 6 },
        rules: [{ required: true, message: "请选择类型" }],
      },
      props: {
        options: POINT_TYPE,
      },
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
      type: CustonInput,
      name: "unit",
      label: "单位",
      formItemProps: {
        labelCol: { span: 6 },
        rules: [{ required: false, message: "请输入单位" }],
      },
    },
    {
      type: CustonInput,
      name: "minimum",
      label: "最小值",
      formItemProps: {
        labelCol: { span: 6 },
        rules: [{ required: false, message: "请输入最小值" }],
      },
    },
    {
      type: CustonInput,
      name: "maximum",
      label: "最大值",
      formItemProps: {
        labelCol: { span: 6 },
        rules: [{ required: false, message: "请输入最大值" }],
      },
    },
    //
    {
      type: SelectWithAll,
      name: "temp_flag",
      label: "温度测点",
      formItemProps: {
        labelCol: { span: 6 },
        rules: [{ required: false, message: "请选择温度测点" }],
        hidden: currentDvsType === "WT" || currentDvsType === "ESPCS" || currentDvsType === "PVINV" ? false : true,
      },
      props: {
        options: YOPTIONS,
      },
    },
    {
      type: SelectWithAll,
      name: "breaker_flag",
      label: "标志",
      formItemProps: {
        labelCol: { span: 6 },
        rules: [{ required: false, message: "请选择标志" }],
        hidden: currentDvsType === "SYZZZ" ? false : true,
      },
      props: {
        options: BREKE_OPTIONS,
      },
    },
    {
      type: CustonInput,
      name: "breaker_id",
      label: "手车关联断路器ID",
      formItemProps: {
        labelCol: { span: 6 },
        rules: [{ required: false, message: "请输入" }],
        hidden: currentDvsType === "SYZZZ" ? false : true,
      },
    },
    {
      type: CustonInput,
      name: "meter_name",
      label: "电表名称",
      formItemProps: {
        labelCol: { span: 6 },
        rules: [{ required: false, message: "请输入电表名称" }],
        hidden: currentDvsType === "DNJL" ? false : true,
      },
    },
    {
      type: SelectWithAll,
      name: "gateway_type",
      label: "电表类型",
      formItemProps: {
        labelCol: { span: 6 },
        rules: [{ required: false, message: "请选择电表类型" }],
        hidden: currentDvsType === "DNJL" ? false : true,
      },
      props: {
        options: GATEWAY_TYPE,
      },
    },
    {
      type: SelectWithAll,
      name: "function_type",
      label: "集电线路电表类型",
      formItemProps: {
        labelCol: { span: 6 },
        rules: [{ required: false, message: "请选择集电线路电表类型" }],
        hidden: currentDvsType === "DNJL" ? false : true,
      },
      props: {
        options: FUNCTION_TYPE,
      },
    },
  ]
}
