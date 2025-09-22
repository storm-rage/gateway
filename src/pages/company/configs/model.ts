/*
 * @Author: chenmeifeng
 * @Date: 2023-10-30 10:16:16
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-06-13 14:32:20
 * @Description:
 */

import { ISearchFormProps } from "@/components/custom-form/types"
import CustonInput from "@/components/custom-input"
import SelectOrdinary from "@/components/select-ordinary"

// 新增
export const FORM_ITEMS: ISearchFormProps["itemOptions"] = [
  {
    type: CustonInput,
    name: "fullName",
    label: "全称",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [{ required: true, message: "请输入全称" }],
    },
    props: {},
  },
  {
    type: CustonInput,
    name: "shortName",
    label: "简称",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [{ required: true, message: "请输入简称" }],
    },
    props: {},
  },
  {
    type: SelectOrdinary,
    name: "reserve",
    label: "标段",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [{ required: false, message: "请输入保留字段" }],
    },
    props: {
      options: [
        { value: "1", name: "1" },
        { value: "2", name: "2" },
        { value: "3", name: "3" },
      ],
    },
  },
]
