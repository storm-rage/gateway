/*
 * @Author: chenmeifeng
 * @Date: 2025-04-29 10:16:16
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-05-07 10:04:38
 * @Description:
 */

import { ISearchFormProps } from "@/components/custom-form/types"
import CustonInput from "@/components/custom-input"
import SelectWithAll from "@/components/select-with-all"

// 新增用户弹框
export const ST_USER_MODEL_FORM_ITEMS: ISearchFormProps["itemOptions"] = [
  {
    type: CustonInput,
    name: "model",
    label: "型号编码",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [{ required: true, message: "请输入型号编码" }],
    },
    props: {},
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
      // disabled: true,
    },
  },
  {
    type: CustonInput,
    name: "version",
    label: "版本",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [{ required: true, message: "请输入版本" }],
    },
    props: {},
  },
  {
    type: CustonInput,
    name: "manufacturer",
    label: "厂商",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [{ required: true, message: "请输入厂商" }],
    },
    props: {},
  },
]

// 编辑用户弹框
export const ST_USER_EDIT_MODEL_FORM_ITEMS: ISearchFormProps["itemOptions"] = [
  {
    type: CustonInput,
    name: "model",
    label: "型号编码",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [{ required: true, message: "请输入型号编码" }],
    },
    props: {},
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
      // disabled: true,
    },
  },
  {
    type: CustonInput,
    name: "version",
    label: "版本",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [{ required: true, message: "请输入版本" }],
    },
    props: {},
  },
  {
    type: CustonInput,
    name: "manufacturer",
    label: "厂商",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [{ required: true, message: "请输入厂商" }],
    },
    props: {},
  },
]
