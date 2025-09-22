/*
 * @Author: chenmeifeng
 * @Date: 2024-12-05 15:20:35
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2024-12-05 16:31:42
 * @Description: 页面查询的钩子方法
 */

import { TablePaginationConfig } from "antd";
import { Dispatch, SetStateAction, useRef, useState } from "react";

import { IPageInfo } from "@/types/i-table";

export interface IPageInfoInit {
  pageSize?: number;
  showTotal?: boolean;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  onChangeBack?: () => void;
  pageSizeOptions?: number[];
}
type TUseReturn = [
  IPageInfo,
  Dispatch<SetStateAction<number>>,
  TablePaginationConfig,
  Dispatch<SetStateAction<IPageInfo>>,
];

export default function usePagination(params?: IPageInfoInit): TUseReturn {
  const {
    pageSize = 50,
    showTotal = true,
    showSizeChanger = true,
    showQuickJumper = true,
    onChangeBack,
    pageSizeOptions = [50, 100, 500, 1000],
  } = params || {};
  const [pageInfo, setPageInfo] = useState<IPageInfo>({ current: 1, pageSize });
  const [total, setTotal] = useState<number>(0);
  const onSizeChgRef = useRef((current: number, pageSize: number) => {
    setPageInfo((prevState) => {
      onChangeBack && onChangeBack();
      if (pageSize !== prevState.pageSize) return { current: 1, pageSize };
      return { current, pageSize };
    });
  });
  const totalRef = useRef((total: number) => `共 ${total} 条`);

  return [
    pageInfo,
    setTotal,
    {
      ...pageInfo,
      total,
      showSizeChanger,
      showQuickJumper,
      onChange: onSizeChgRef.current,
      showTotal: showTotal ? totalRef.current : undefined,
      position: ["bottomCenter"],
      pageSizeOptions,
    },
    setPageInfo,
  ];
}
