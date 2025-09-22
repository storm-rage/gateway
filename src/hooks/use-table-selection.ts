/*
 * @Author: chenmeifeng
 * @Date: 2024-12-05 15:20:35
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2024-12-05 17:00:37
 * @Description: 表格选择处理方法
 */

import type { TableProps } from "antd";
import React, { Key, useState } from "react";

export default function useTableSelection<TData = any>(
  props?: Omit<
    TableProps<TData>["rowSelection"],
    "selectedRowKeys" | "onChange"
  > & { needInfo?: boolean }
) {
  const { needInfo, ...others } = props || {};
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<TData[]>([]);

  const rowSelection: TableProps<TData>["rowSelection"] = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[], selectedAllRows: TData[]) => {
      if (needInfo) {
        setSelectedRows(selectedAllRows);
        return setSelectedRowKeys(selectedRowKeys);
      }
      setSelectedRowKeys(selectedRowKeys);
    },
    ...(others || {}),
  } as TableProps<TData>["rowSelection"];

  return {
    selectedRowKeys,
    rowSelection,
    setSelectedRowKeys,
    selectedRows,
    setSelectedRows,
  };
}
