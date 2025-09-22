/*
 * @Author: chenmeifeng
 * @Date: 2023-10-30 10:16:16
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-07-08 09:50:52
 * @Description:
 */

import { ISearchFormProps } from "@/components/custom-form/types"
import CustonInput from "@/components/custom-input"
import SelectWithAll from "@/components/select-with-all"

// 新增
export function formItemFuc(stationTypes = [], cpnyList = [], pjctList = []): ISearchFormProps["itemOptions"] {
  return [
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
      type: CustonInput,
      name: "stationCode",
      label: "场站编码",
      formItemProps: {
        labelCol: { span: 6 },
        rules: [{ required: true, message: "请输入保留字段" }],
      },
      props: {},
    },
    {
      type: SelectWithAll,
      name: "stationType",
      label: "场站类型",
      formItemProps: {
        labelCol: { span: 6 },
        rules: [{ required: true, message: "请输入场站类型" }],
      },
      props: {
        options: stationTypes,
      },
    },
    {
      type: SelectWithAll,
      name: "maintenanceComId",
      label: "检修基地",
      formItemProps: {
        labelCol: { span: 6 },
        rules: [{ required: true, message: "请选择检修基地" }],
      },
      props: {
        options: cpnyList,
      },
    },
    {
      type: SelectWithAll,
      name: "parentComId",
      label: "项目公司",
      formItemProps: {
        labelCol: { span: 6 },
        rules: [{ required: true, message: "请输入项目公司" }],
      },
      props: {
        options: pjctList,
      },
    },
    {
      type: CustonInput,
      name: "priority",
      label: "顺序",
      formItemProps: {
        labelCol: { span: 6 },
        rules: [{ required: true, message: "请输入顺序" }],
      },
      props: {},
    },
    {
      type: CustonInput,
      name: "ip",
      label: "IP",
      formItemProps: {
        labelCol: { span: 6 },
        rules: [{ required: false, message: "请输入IP" }],
      },
      props: {},
    },
    {
      type: CustonInput,
      name: "port",
      label: "端口",
      formItemProps: {
        labelCol: { span: 6 },
        rules: [{ required: false, message: "请输入端口" }],
      },
      props: {},
    },
  ]
}
