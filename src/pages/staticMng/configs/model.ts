/*
 * @Author: chenmeifeng
 * @Date: 2023-10-30 10:16:16
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-06-25 14:35:28
 * @Description:
 */

import { ISearchFormProps } from "@/components/custom-form/types"
import CustonInput from "@/components/custom-input"
import CustomTextInput from "@/components/custom-input/textarea"

// 新增
export function FORM_ITEMS(disabled): ISearchFormProps["itemOptions"] {
  return [
    {
      type: CustonInput,
      name: "key",
      label: "key",
      formItemProps: {
        labelCol: { span: 6 },
        rules: [{ required: true, message: "请输入key" }],
      },
      props: {
        disabled: disabled,
      },
    },
    {
      type: CustomTextInput,
      name: "data",
      label: "内容",
      formItemProps: {
        labelCol: { span: 6 },
        rules: [{ required: false, message: "请输入内容" }],
      },
      props: {
        rows: 4,
      },
    },
  ]
}
