import { ITbColAction } from "@/components/action-buttons/types"
import EditableSelectCell from "@/components/select-ordinary/table-edit-select"
import { ColumnsType } from "antd/es/table"
import { stateInfo, TStTbActInfo } from "../types"
import { getTableActColumn } from "@/utils/table-funs"
export function TEMPLATE_ADD_COLUMNS(setDataSource, pointOptions): ColumnsType<any> {
  const options = pointOptions.map((i) => ({
    label: i.pointName + " " + i.pointDesc,
    value: i.pointName,
  }))
  return [
    { dataIndex: "index", title: "序号", width: 60, align: "center" },
    { dataIndex: "originKey", title: "模板测点编码" },
    {
      dataIndex: "exist",
      title: "测点是否存在",
      render: (text) => <span style={{ color: !text ? "red" : "" }}>{text ? "存在" : "不存在"}</span>,
    },
    { dataIndex: "desc", title: "测点名称" },
    {
      dataIndex: "actualKey",
      title: "状态配置测点",
      render: (text, record) => (
        <EditableSelectCell
          value={record.actualKey}
          record={record}
          valkey="actualKey"
          setDataSource={setDataSource}
          option={options}
        />
      ),
    },
  ]
}
const TABLE_ACTION = [
  // { key: "see", label: "查看" },
  { key: "edit", label: "编辑" },
]
export function TEMPLATE_RESULT_COLUMNS(config: ITbColAction<TStTbActInfo, stateInfo>): ColumnsType<stateInfo> {
  const { onClick } = config
  return [
    { dataIndex: "index", title: "序号", width: 60, align: "center" },
    { dataIndex: "mainStateName", title: "大状态名称" },
    { dataIndex: "mainStateCode", title: "大状态编码" },
    { dataIndex: "subStateName", title: "小状态名称" },
    { dataIndex: "subStateCode", title: "小状态编码" },
    { dataIndex: "priority", title: "判定优先级" },
    { dataIndex: "duration", title: "持续时长（s）" },
    { dataIndex: "rule", title: "测点规则" },
    { dataIndex: "ruleBefore", title: "挂牌规则" },
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
