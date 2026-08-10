/*
 * @Author: chenmeifeng
 * @Date: 2023-10-30 10:16:16
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-04-29 11:19:27
 * @Description:
 */

import { ISearchFormProps } from "@/components/custom-form/types"
import CustonInput from "@/components/custom-input"

// 新增用户弹框
export const ST_USER_MODEL_FORM_ITEMS: ISearchFormProps["itemOptions"] = [
  {
    type: CustonInput,
    name: "fullName",
    label: "场站全称",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [{ required: true, message: "请输入场站全称" }],
    },
    props: {},
  },
  {
    type: CustonInput,
    name: "shortName",
    label: "场站简称",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [{ required: true, message: "请输入场站简称" }],
    },
    props: {},
  },
  {
    type: CustonInput,
    name: "maintenanceComShortName",
    label: "上级公司",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [{ required: true, message: "请输入上级公司" }],
    },
    props: {},
  },
]

// 编辑用户弹框
export const ST_USER_EDIT_MODEL_FORM_ITEMS: ISearchFormProps["itemOptions"] = [
  {
    type: CustonInput,
    name: "fullName",
    label: "场站全称",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [{ required: true, message: "请输入场站全称" }],
    },
    props: {},
  },
  {
    type: CustonInput,
    name: "shortName",
    label: "场站简称",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [{ required: true, message: "请输入场站简称" }],
    },
    props: {},
  },
  {
    type: CustonInput,
    name: "maintenanceComShortName",
    label: "上级公司",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [{ required: true, message: "请输入上级公司" }],
    },
    props: {},
  },
]
