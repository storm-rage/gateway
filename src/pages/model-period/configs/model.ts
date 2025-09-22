/*
 * @Author: chenmeifeng
 * @Date: 2023-10-30 10:16:16
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-06-27 17:18:47
 * @Description:
 */

import { ISearchFormProps } from "@/components/custom-form/types"
import CustonInput from "@/components/custom-input"
import StationTreeSelect from "@/components/station-tree-select"

// 新增
export const FORM_ITEMS: ISearchFormProps["itemOptions"] = [
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
    },
  },
  {
    type: CustonInput,
    name: "periodName",
    label: "期次名称",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [{ required: true, message: "请输入名称" }],
    },
    props: {},
  },
  {
    type: CustonInput,
    name: "periodCode",
    label: "期次编码",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [{ required: true, message: "请输入编码" }],
    },
    props: {},
  },
]
