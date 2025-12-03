/*
 * @Author: chenmeifeng
 * @Date: 2025-07-29 15:40:06
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-08-04 17:11:01
 * @Description:
 */
import { ISearchFormProps } from "@/components/custom-form/types"
import SelectWithAll from "@/components/select-with-all"
import StationTreeSelect from "@/components/station-tree-select"
import { IStateRuleList, TStTbActInfo, stateInfo } from "../types"
import { ITbColAction } from "@/components/action-buttons/types"
import { ColumnsType } from "antd/es/table"
import { getTableActColumn } from "@/utils/table-funs"
import { SCH_BTN } from "@/components/custom-form/configs"

export const STATE_RULE_FORM_ITEMS: ISearchFormProps["itemOptions"] = [
  {
    type: StationTreeSelect,
    name: "stationId",
    label: "场站",
    props: {
      disabled: false,
      needId: true,
      needFirst: true,
      options: [],
      allowClear: false,
      placeholder: "全部",
      style: { minWidth: "10em" },
    },
  },
  {
    type: SelectWithAll,
    name: "deviceType",
    label: "类型",
    props: {
      options: [],
      needFirst: true,
      disabled: false,
      allowClear: false,
    },
  },
  {
    type: SelectWithAll,
    name: "modelId",
    label: "设备型号",
    props: {
      disabled: false,
      needFirst: true,
      allowClear: false,
      options: [],
      placeholder: "请选择设备型号",
      style: { minWidth: "10em" },
    },
  },
]
export const STATE_RULE_SCH_FORM_BTNS: ISearchFormProps["buttons"] = [
  SCH_BTN,
  { name: "add", label: "新增", permission: "model:power:add" },
  {
    name: "batchApply",
    label: "批量应用",
    permission: "model:power:batchApply",
  },
  {
    name: "batchDel",
    label: "批量删除",
    permission: "model:power:batchDelete",
  },
  {
    name: "import",
    label: "导入",
    permission: "model:power:import",
  },
  {
    name: "export",
    label: "导出",
    permission: "model:power:export",
  },
]
const TABLE_ACTION = [
  // { key: "see", label: "查看" },
  { key: "edit", label: "编辑" },
  { key: "deleted", label: "删除" },
]

export function STATE_ATT_COLUMNS(
  config: ITbColAction<TStTbActInfo, stateInfo>,
  dvsType: string,
): ColumnsType<stateInfo> {
  const { onClick } = config
  return [
    { dataIndex: "index", title: "序号", width: 60, align: "center" },
    { dataIndex: "mainStateName", title: "大状态名称" },
    { dataIndex: "mainStateCode", title: "大状态编码" },
    { dataIndex: "subStateName", title: "小状态名称" },
    { dataIndex: "subStateCode", title: "小状态编码" },
    { dataIndex: "priority", title: "判定优先级" },
    { dataIndex: "duration", title: "持续时长（s）" },
    ...getTableActColumn<stateInfo, TStTbActInfo>(
      TABLE_ACTION,
      (record) => ({
        onClick: onClick?.bind(null, record),
      }),
      undefined,
      { width: 200 },
    ),
  ]
}
export function formItemFuc({ systems, deviceTypes, currentDvsType }): ISearchFormProps["itemOptions"] {
  const validModelOptions = (currentDvsType.modelId || []).filter(option => 
    option && 
    ((typeof option === 'object' && option.value !== undefined && option.value !== null) || 
     (typeof option !== 'object'))
  );
  return [
    {
      type: SelectWithAll,
      name: "deviceType",
      label: "设备类型",
      formItemProps: {
        labelCol: { span: 6 },
        rules: [{ required: true, message: "请选择设备类型" }],
      },
      props: {
        options: deviceTypes,
      },
    },
    {
      type: SelectWithAll,
      name: "modelId",
      label: "设备型号",
      formItemProps: {
        labelCol: { span: 6 },
        rules: [{ required: true, message: "请选择设备型号" }],
      },
      props: {
        options: validModelOptions,
        // mode: "multiple",
        // maxTagCount: 1,
        // allowClear: false,
      },
    },
  ]
}
