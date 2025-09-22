/*
 * @Author: chenmeifeng
 * @Date: 2023-10-30 10:16:16
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2024-12-16 11:35:51
 * @Description:
 */

import { ISearchFormProps } from "@/components/custom-form/types"
import CustonInput from "@/components/custom-input"
import SelectWithAll from "@/components/select-with-all"
import { validPword } from "@/utils/form-funs"

// 新增用户弹框
export const ST_USER_MODEL_FORM_ITEMS: ISearchFormProps["itemOptions"] = [
  {
    type: SelectWithAll,
    name: "roleId",
    label: "角色",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [{ required: true, message: "请选择角色" }],
    },
    props: {
      options: [],
    },
  },
  {
    type: CustonInput,
    name: "loginName",
    label: "登录名",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [{ required: true, message: "请输入登录名" }],
    },
    props: {},
  },
  {
    type: CustonInput,
    name: "realName",
    label: "真实姓名",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [{ required: true, message: "请输入真实姓名" }],
    },
    props: {},
  },
  {
    type: CustonInput,
    name: "password",
    label: "登陆密码",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [{ required: true, validator: validPword }],
    },
    props: {},
  },
]

// 编辑用户弹框
export const ST_USER_EDIT_MODEL_FORM_ITEMS: ISearchFormProps["itemOptions"] = [
  {
    type: SelectWithAll,
    name: "roleId",
    label: "角色",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [{ required: true, message: "请选择角色" }],
    },
    props: {
      options: [{ value: 1, label: "集控管理员" }],
    },
  },
  {
    type: CustonInput,
    name: "loginName",
    label: "登录名",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [{ required: true, message: "请输入登录名" }],
    },
    props: {
      disabled: true,
    },
  },
  {
    type: CustonInput,
    name: "realName",
    label: "真实姓名",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [{ required: true, message: "请输入真实姓名" }],
    },
    props: {},
  },
]
