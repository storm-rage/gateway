/*
 * @Author: chenmeifeng
 * @Date: 2023-10-30 10:16:16
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-05-19 10:40:03
 * @Description:
 */

import { ISearchFormProps } from "@/components/custom-form/types"
import CustonInput from "@/components/custom-input"
import StationTreeSelect from "@/components/station-tree-select"

// 新增
export function lineFormItem(disabled): ISearchFormProps["itemOptions"] {
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
        needId: true,
        disabled: disabled,
      },
    },
    {
      type: CustonInput,
      name: "lineCode",
      label: "编码",
      formItemProps: {
        labelCol: { span: 6 },
        rules: [{ required: true, message: "请输入编码" }],
      },
      props: { disabled: disabled },
    },
    {
      type: CustonInput,
      name: "lineName",
      label: "名称",
      formItemProps: {
        labelCol: { span: 6 },
        rules: [{ required: true, message: "请输入名称" }],
      },
      props: { disabled: disabled },
    },
  ]
}
