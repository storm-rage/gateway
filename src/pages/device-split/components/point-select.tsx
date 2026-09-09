/*
 * @Description: 设备拆分 选择测点弹窗组件（图2样式）
 */
import { useEffect, useMemo, useState } from "react"
import { Button, Input, Radio, Table } from "antd"
import type { ColumnsType } from "antd/es/table"
import { doBaseServer } from "@/api/serve-funs"
import { getPointListByDeviceCode } from "../methods/"


interface PointItem {
  id: number | string
  ioa: number
  pointName: string
  pointDesc: string
  pointType: string // "遥测" | "遥信" | 其他
  [key: string]: any
}

interface Props {
  sourceDeviceCode: string
  currentIOA?: string
  onConfirm: (ioas: number[]) => void
  onCancel: () => void
}

type PointTypeFilter = "all" | "遥测" | "遥信"

// 格式化已选点位：相邻连续数字合并为区间
function formatSelected(ioas: number[]): string {
  if (!ioas.length) return ""
  const sorted = [...ioas].sort((a, b) => a - b)
  const parts: string[] = []
  let i = 0
  while (i < sorted.length) {
    let j = i
    while (j + 1 < sorted.length && sorted[j + 1] === sorted[j] + 1) j++
    if (j > i) {
      parts.push(`${sorted[i]}-${sorted[j]}`)
    } else {
      parts.push(String(sorted[i]))
    }
    i = j + 1
  }
  return parts.join(", ")
}

export default function PointSelectModal(props: Props) {
  const { sourceDeviceCode, currentIOA, onConfirm, onCancel } = props
  const [loading, setLoading] = useState(false)
  const [pointList, setPointList] = useState<PointItem[]>([])
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [typeFilter, setTypeFilter] = useState<PointTypeFilter>("all")
  const [searchText, setSearchText] = useState("")
  const [pageSize, setPageSize] = useState(50)
  const [pageNum, setPageNum] = useState(1)

  // 解析 currentIOA 字符串得到已选 IOA 集合
  const currentIOASet = useMemo(() => {
    if (!currentIOA) return new Set<number>()
    const parts = currentIOA.split(",").map((s) => s.trim()).filter(Boolean)
    const points: number[] = []
    for (const part of parts) {
      if (part.includes("-")) {
        const [start, end] = part.split("-").map((s) => parseInt(s.trim(), 10))
        if (!isNaN(start) && !isNaN(end) && start <= end) {
          for (let i = start; i <= end; i++) points.push(i)
        }
      } else {
        const num = parseInt(part, 10)
        if (!isNaN(num)) points.push(num)
      }
    }
    return new Set(points)
  }, [currentIOA])


  // 加载测点列表并回显选中
  useEffect(() => {
    const fetchData = async () => { 
      const res = await getPointListByDeviceCode({ deviceCode: sourceDeviceCode })
      if (res) {
        console.log(res,'==res')
        const records: PointItem[] = res?.records || []
        setPointList(records)
        // 根据当前已配置的 IOA 回显选中
        if (currentIOASet.size > 0 && records.length) {
          const matchedKeys: React.Key[] = records
            .filter((p: PointItem) => {
              const ioa = Number(p.ioa ?? p.address ?? p.id)
              return !isNaN(ioa) && currentIOASet.has(ioa)
            })
            .map((p: PointItem) => p.id)
          if (matchedKeys.length) {
            setSelectedRowKeys(matchedKeys)
          }
        }
      }
    }
    if (!sourceDeviceCode) return
    setLoading(true)
    fetchData()
    setLoading(false)
  }, [sourceDeviceCode, currentIOASet])

  // 过滤后的列表
  const filteredList = useMemo(() => {
    return pointList.filter((p) => {
      // 类型过滤
      if (typeFilter !== "all") {
        const type = String(p.pointType || "")
        const typeName = type.includes("遥测") || type === "YC" || type === "1" ? "遥测"
          : type.includes("遥信") || type === "YX" || type === "2" ? "遥信"
          : ""
        if (typeFilter !== typeName) return false
      }
      // 搜索过滤
      if (searchText) {
        const text = searchText.toLowerCase()
        const ioa = String(p.ioa ?? p.address ?? "")
        const name = String(p.pointName ?? p.pointDesc ?? "")
        if (!ioa.includes(text) && !name.toLowerCase().includes(text)) return false
      }
      return true
    })
  }, [pointList, typeFilter, searchText])

  // 全选可见（当前过滤后的）
  const handleSelectAllVisible = () => {
    const visibleKeys = filteredList.map((p) => p.id)
    const merged = Array.from(new Set([...selectedRowKeys, ...visibleKeys]))
    setSelectedRowKeys(merged)
  }

  const handleClear = () => {
    setSelectedRowKeys([])
  }

  const handleConfirm = () => {
    const ioas = selectedRowKeys.map((key) => {
      const p = pointList.find((item) => item.id === key)
      return Number(p?.ioa ?? p?.address ?? key)
    }).filter((n) => !isNaN(n))
    onConfirm(ioas)
  }

  const columns: ColumnsType<PointItem> = [
    {
      title: "IOA",
      dataIndex: "ioa",
      width: 100,
      render: (val: any, record: PointItem) => val ?? record.address ?? "-",
    },
    {
      title: "测点名称",
      dataIndex: "pointDesc",
      render: (val: any, record: PointItem) => val ?? record.pointName ?? "-",
    },
    {
      title: "类型",
      dataIndex: "pointType",
      width: 100,
      render: (val: any) => {
        const type = String(val || "")
        if (type.includes("遥测") || type === "YC" || type === "1") return "遥测"
        if (type.includes("遥信") || type === "YX" || type === "2") return "遥信"
        return type || "-"
      },
    },
  ]

  // 已选 IOA 值（用于底部显示）
  const selectedIOAs = useMemo(() => {
    return selectedRowKeys.map((key) => {
      const p = pointList.find((item) => item.id === key)
      return Number(p?.ioa ?? p?.address ?? key)
    }).filter((n) => !isNaN(n))
  }, [selectedRowKeys, pointList])

  return (
    <div className="point-select-modal">
      <div className="point-select-header">
        <span className="point-select-title">选择测点</span>
        <span className="point-select-source">源设备：{sourceDeviceCode}</span>
      </div>

      <div className="point-select-search">
        <Input.Search
          placeholder="按 IOA / 名称搜索"
          allowClear
          onSearch={(val) => setSearchText(val)}
          onChange={(e) => !e.target.value && setSearchText("")}
          style={{ width: 260 }}
        />
      </div>

      <div className="point-select-filter">
        <Radio.Group value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <Radio.Button value="all">全部</Radio.Button>
          <Radio.Button value="遥测">遥测</Radio.Button>
          <Radio.Button value="遥信">遥信</Radio.Button>
        </Radio.Group>
        <div className="filter-actions">
          <a onClick={handleSelectAllVisible}>全选可见</a>
          <span style={{ margin: "0 8px", color: "#d9d9d9" }}>·</span>
          <a onClick={handleClear}>清除</a>
        </div>
      </div>

      <Table<PointItem>
        rowKey="id"
        size="middle"
        loading={loading}
        columns={columns}
        dataSource={filteredList}
        pagination={{
          current: pageNum,
          pageSize,
          size: "small",
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: [50, 100, 500, 1000, 5000, 10000],
          onChange: (page, size) => {
            setPageNum(page)
            if (size !== pageSize) setPageSize(size)
          },
          onShowSizeChange: (_current, size) => {
            setPageSize(size)
            setPageNum(1)
          },
        }}
        rowSelection={{
          selectedRowKeys,
          onChange: (keys) => setSelectedRowKeys(keys),
        }}
        scroll={{ y: 360 }}
      />

      <div className="point-select-footer">
        <div className="selected-info">
          <span className="selected-count">已选 {selectedRowKeys.length} 点</span>
          {selectedIOAs.length > 0 && (
            <span className="selected-summary">{formatSelected(selectedIOAs)}</span>
          )}
        </div>
        <div className="footer-btns">
          <Button onClick={onCancel}>取消</Button>
          <Button onClick={handleConfirm}>确定</Button>
        </div>
      </div>
    </div>
  )
}
