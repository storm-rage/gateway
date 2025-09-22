/*
 * @Author: chenmeifeng
 * @Date: 2023-10-30 10:16:16
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-04-29 11:19:27
 * @Description:
 */

import { ISearchFormProps } from "@/components/custom-form/types"
import CustonInput from "@/components/custom-input"
import SelectWithAll from "@/components/select-with-all"
import StationTreeSelect from "@/components/station-tree-select"

// 新增用户弹框
export const EAM_DVS_FORM_ITEMS: ISearchFormProps["itemOptions"] = [
  {
    type: StationTreeSelect,
    name: "stationCode",
    label: "场站",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [{ required: true, message: "请选择场站" }],
    },
    props: {},
  },
  // {
  //   type: SelectWithAll,
  //   name: "deviceType",
  //   label: "设备类型",
  //   formItemProps: {
  //     labelCol: { span: 6 },
  //     rules: [{ required: true, message: "请选择设备类型" }],
  //   },
  //   props: {},
  // },
  {
    type: SelectWithAll,
    name: "deviceCode",
    label: "设备",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [{ required: true, message: "请选择设备" }],
    },
    props: {},
  },
  {
    type: CustonInput,
    name: "eamStation",
    label: "EAM场站编码",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [{ required: true, message: "请输入EAM场站编码" }],
    },
    props: {},
  },
  {
    type: CustonInput,
    name: "eamDevice",
    label: "EAM设备编码",
    formItemProps: {
      labelCol: { span: 6 },
      rules: [{ required: true, message: "请输入EAM设备编码" }],
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
