/*
 * @Author: chenmeifeng
 * @Date: 2025-07-30 17:36:55
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-08-11 14:54:15
 * @Description:
 */
import { ISearchFormProps } from "@/components/custom-form/types"
import CustonInput from "@/components/custom-input"
import SelectWithAll from "@/components/select-with-all"

export const st_rule_model_form = (disabled): ISearchFormProps["itemOptions"] => {
  return [
    {
      type: SelectWithAll,
      name: "mainStateCode",
      label: "大状态",
      formItemProps: {
        labelCol: { span: 8 },
        rules: [{ required: true, message: "请选择大状态" }],
      },
      props: {
        style: { minWidth: "8em" },
        disabled,
      },
    },
    // {
    //   type: CustonInput,
    //   name: "mainStateCode",
    //   label: "大状态编码",
    //   formItemProps: {
    //     labelCol: { span: 8 },
    //     rules: [{ required: true, message: "请输入大状态编码" }],
    //   },
    //   props: {
    //     style: { minWidth: "8em" },
    //     disabled: true,
    //   },
    // },
    {
      type: SelectWithAll,
      name: "subStateCode",
      label: "小状态",
      formItemProps: {
        labelCol: { span: 8 },
        rules: [{ required: true, message: "请选择小状态" }],
      },
      props: {
        style: { minWidth: "8em" },
        disabled,
      },
    },
    // {
    //   type: CustonInput,
    //   name: "subStateCode",
    //   label: "小状态编码",
    //   formItemProps: {
    //     labelCol: { span: 8 },
    //     rules: [{ required: true, message: "请输入小状态编码" }],
    //   },
    //   props: {
    //     style: { minWidth: "8em" },
    //     disabled: true,
    //   },
    // },
    {
      type: CustonInput,
      name: "priority",
      label: "判定优先级",
      formItemProps: {
        labelCol: { span: 8 },
        rules: [{ required: true, message: "请输入判定优先级" }],
      },
      props: {
        style: { minWidth: "8em" },
        // disabled,
      },
    },
    {
      type: CustonInput,
      name: "duration",
      label: "持续时长",
      formItemProps: {
        labelCol: { span: 8 },
        rules: [{ required: true, message: "请输入持续时长" }],
      },
      props: {
        style: { minWidth: "8em" },
        // disabled,
      },
    },
  ]
}

// 公式各符号
export const SYMBOL_LIST = {
  number: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."],
  symbol: ["+", "-", "*", "/", ">", "<", "=", "(", ")", "||", "&", "@"],
  time: ["s", "m", "h", "null"],
  special: ["MIN", "MAX", "FIRST", "LAST", "COUNT", "SUM", "MEAN", "STD", "ABS"],
}
