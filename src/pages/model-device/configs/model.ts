/*
 * @Author: chenmeifeng
 * @Date: 2023-10-30 10:16:16
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-06-13 15:15:21
 * @Description:
 */

import { ISearchFormProps } from "@/components/custom-form/types"
import CustonInput from "@/components/custom-input"
import SelectWithAll from "@/components/select-with-all"
import StationTreeSelect from "@/components/station-tree-select"

// 新增
export function formItemFuc(): ISearchFormProps["itemOptions"] {
  return [
    {
      type: StationTreeSelect,
      name: "stationId",
      label: "场站",
      formItemProps: {
        labelCol: { span: 6 },
        rules: [{ required: true, message: "请选择设备类型" }],
      },
      props: {
        needId: true,
        disabled: false,
        allowClear: false,
      },
    },
    {
      type: SelectWithAll,
      name: "deviceType",
      label: "设备类型",
      formItemProps: {
        labelCol: { span: 6 },
        rules: [{ required: true, message: "请选择设备类型" }],
      },
      props: {
        allowClear: false,
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
      name: "name",
      label: "设备名称",
      formItemProps: {
        labelCol: { span: 6 },
        rules: [{ required: true, message: "请输入设备名称" }],
      },
      props: {},
    },
    {
      type: CustonInput,
      name: "deviceCode",
      label: "设备编码",
      formItemProps: {
        labelCol: { span: 6 },
        rules: [{ required: true, message: "请输入设备编码" }],
      },
      props: {},
    },
    {
      type: SelectWithAll,
      name: "periodCode",
      label: "期次",
      formItemProps: {
        labelCol: { span: 6 },
        rules: [{ required: false, message: "请选择期次" }],
      },
      props: {
        options: [],
      },
    },
    {
      type: SelectWithAll,
      name: "lineCode",
      label: "线路",
      formItemProps: {
        labelCol: { span: 6 },
        rules: [{ required: false, message: "请选择线路" }],
      },
      props: {
        options: [],
      },
    },
  ]
}
