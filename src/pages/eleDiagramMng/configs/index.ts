/*
 * @Author: chenmeifeng
 * @Date: 2023-10-19 13:47:47
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-05-23 11:02:35
 * @Description:
 */

import { ColumnsType } from "antd/es/table"

import { ITbColAction } from "@/components/action-buttons/types"
import { ISearchFormProps } from "@/components/custom-form/types.ts"
import { StorageStnDvsType } from "@/configs/storage-cfg"
import { getTableActColumn } from "@/utils/table-funs"
import { getStorage } from "@/utils/util-funs"

import { IRuleInfo, TUserTbActInfo } from "../types/index"
import SelectWithAll from "@/components/select-with-all"
import { SCH_BTN } from "@/components/custom-form/configs"
import StationTreeSelect from "@/components/station-tree-select"

export const deviceTypesOfSt = getStorage(StorageStnDvsType)

export const ST_MANAGE_SCH_FORM_BTNS: ISearchFormProps["buttons"] = [
  SCH_BTN,
  // {
  //   name: "add",
  //   label: "新增",
  //   permission: "model:projectCompany:add",
  // },
  // {
  //   name: "delete",
  //   label: "删除",
  //   permission: "model:projectCompany:add",
  // },
  {
    name: "batchDelete",
    label: "批量删除",
    permission: "model:projectCompany:batchDelete",
  },
  {
    name: "import",
    label: "导入",
    permission: "model:projectCompany:add",
  },
  {
    name: "export",
    label: "导出",
    permission: "model:projectCompany:export",
  },
  {
    name: "batchExport",
    label: "批量导出",
    permission: "model:projectCompany:batchExport",
  },
]

const TABLE_ACTION = [
  // { key: "edit", label: "编辑" },
  { key: "deleted", label: "删除" },
  { key: "export", label: "导出" },
]
export const PJCT_SEARCH_FORM_ITEMS: ISearchFormProps["itemOptions"] = [
  {
    type: StationTreeSelect,
    name: "stationCode",
    label: "场站",
    props: {
      options: [],
      disabled: false,
      // mutiltiple: true,

    },
  },
]
export function DEVICE_ATT_COLUMNS(config: ITbColAction<TUserTbActInfo, IRuleInfo>): ColumnsType<IRuleInfo> {
  const { onClick } = config
  return [
    { dataIndex: "index", title: "序号", width: 60, align: "center" },
    { dataIndex: "stationName", title: "场站" , width: 260,},
    { dataIndex: "stationCode", title: "场站代码", width: 160,},
    { dataIndex: "fileName", title: "文件名", width: 160, },
    { dataIndex: "filePath", title: "文件路径", },
    ...getTableActColumn<IRuleInfo, TUserTbActInfo>(
      TABLE_ACTION,
      (record) => ({
        onClick: onClick?.bind(null, record),
      }),
      undefined,
      { width: 150 },
    ),
  ]
}
