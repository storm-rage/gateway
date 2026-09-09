/*
 * @Description: 设备拆分 新增/修改弹窗组件（图1样式）
 */
import "./edit.less"
import { Button, Switch, Input, Select, Radio, Tag } from "antd"
import { forwardRef, useEffect, useImperativeHandle, useRef, useState, useCallback } from "react"
import { doBaseServer } from "@/api/serve-funs"
import { showMsg } from "@/utils/util-funs"

const { TextArea } = Input

interface DeviceOption {
  label: string
  value: string | number
  // ...rest: any
}

interface PointItem {
  ioa: number
  pointName: string
  pointDesc: string
  pointType: string
}

export interface IPerateRef {}
export interface IOperateProps {
  buttonClick?: (type: "ok" | "close", data?: any) => void
  editType: "add" | "edit" | "update"
  selectRowInfo?: any
  onOpenPointSelect?: (sourceDeviceCode: string, currentIOA: string) => void
}

// 解析 IOA 字符串（区间/单点，逗号分隔），返回解析后的数组和统计
function parseIOA(str: string): { points: number[]; display: string; count: number } {
  if (!str) return { points: [], display: "", count: 0 }
  const parts = str.split(",").map((s) => s.trim()).filter(Boolean)
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
  const unique = Array.from(new Set(points)).sort((a, b) => a - b)
  // 生成简要显示
  const displayPoints = unique.slice(0, 10).join(", ")
  const display = unique.length > 10 ? `${displayPoints} ...` : displayPoints
  return { points: unique, display, count: unique.length }
}

const AddModal = forwardRef<IPerateRef, IOperateProps>((props, ref) => {
  const { buttonClick, editType, selectRowInfo, onOpenPointSelect } = props

  // 源设备相关
  const [sourceDeviceType, setSourceDeviceType] = useState<"station" | "sourcePoint">("station")
  const [sourceDeviceOptions, setSourceDeviceOptions] = useState<DeviceOption[]>([])
  const [sourceDeviceCode, setSourceDeviceCode] = useState<string>("")

  // 目标设备相关
  const [targetDeviceType, setTargetDeviceType] = useState<"agvc" | "relay">("agvc")
  const [targetDeviceOptions, setTargetDeviceOptions] = useState<DeviceOption[]>([])
  const [targetDeviceCode, setTargetDeviceCode] = useState<string>("")

  // IOA 地址位配置
  const [ioaText, setIoaText] = useState<string>("")
  const [parsedIOA, setParsedIOA] = useState<{ points: number[]; display: string; count: number }>({ points: [], display: "", count: 0 })

  // 启用状态
  const [enabled, setEnabled] = useState<boolean>(true)

  // 更新人/时间（展示）
  const [updaterInfo, setUpdaterInfo] = useState<string>("")

  // 备注
  const [remark, setRemark] = useState<string>("")

  const currentId = useRef<number>()

  // 加载设备列表
  const loadDeviceList = useCallback(async () => {
    try {
      const res = await doBaseServer<any>("deviceSelectByPage", { pageNum: 1, pageSize: 1000 })
      const records = res?.records || []
      const options = records.map((d: any) => ({
        label: d.deviceCode || d.code || d.name || String(d.id),
        value: d.deviceCode || d.code || d.id,
        ...d,
      }))
      setSourceDeviceOptions(options)
      setTargetDeviceOptions(options)
    } catch (e) {
      console.warn("加载设备列表失败", e)
    }
  }, [])

  useImperativeHandle(ref, () => ({
    getInst: () => null,
    getFormValues: () => ({
      sourceDeviceCode,
      targetDeviceCode,
      ioaRanges: ioaText,
      enabled: enabled ? "1" : "0",
      remark,
      id: currentId.current,
    }),
  }))

  useEffect(() => {
    loadDeviceList()
  }, [loadDeviceList])

  useEffect(() => {
    if (editType !== "add" && selectRowInfo) {
      currentId.current = selectRowInfo.id
      setSourceDeviceCode(selectRowInfo.sourceDeviceCode || "")
      setTargetDeviceCode(selectRowInfo.targetDeviceCode || "")
      setIoaText(selectRowInfo.ioaRanges.replace(/^\[|\]$/g, '') || "")
      setEnabled(selectRowInfo.enabled === 1 ? true : false)
      setRemark(selectRowInfo.remark || "")
      setUpdaterInfo(selectRowInfo.updateTime ? `${selectRowInfo.updater || "admin"} · ${selectRowInfo.updateTime}` : "")
    }
  }, [editType, selectRowInfo])

  // 解析 IOA
  useEffect(() => {
    setParsedIOA(parseIOA(ioaText))
  }, [ioaText])

  const handleOpenPointSelect = () => {
    onOpenPointSelect?.(sourceDeviceCode, ioaText)
  }

  const handleConfirmPoints = (ioas: number[]) => {
    // 用窗口返回的最终选择直接覆盖（窗口打开时已按 ioaText 预选，取消勾选的会被排除）
    const merged = Array.from(new Set(ioas)).sort((a, b) => a - b)
    const parts: string[] = []
    let i = 0
    while (i < merged.length) {
      let j = i
      while (j + 1 < merged.length && merged[j + 1] === merged[j] + 1) j++
      if (j > i) {
        parts.push(`${merged[i]}-${merged[j]}`)
      } else {
        parts.push(String(merged[i]))
      }
      i = j + 1
    }
    setIoaText(parts.join(","))
  }

  // 暴露给父组件
  useEffect(() => {
    ;(window as any).__deviceSplitConfirmPoints = handleConfirmPoints
    return () => { delete (window as any).__deviceSplitConfirmPoints }
  }, [ioaText])

  const handleSave = () => {
    if (!sourceDeviceCode) {
      showMsg("请选择源设备", "warning")
      return
    }
    if (!targetDeviceCode) {
      showMsg("请选择目标设备", "warning")
      return
    }
    if (!ioaText) {
      showMsg("请配置 IOA 地址位", "warning")
      return
    }
    const data = {
      sourceDeviceCode,
      targetDeviceCode,
      ioaRanges: `[${ioaText}]`,
      enabled: enabled ? "1" : "0",
      remark,
      id: currentId.current,
    }
    buttonClick?.("ok", data)
  }

  const handleCancel = () => {
    buttonClick?.("close")
  }

  return (
    <div className="device-split-edit">
      <div className="split-form">
        {/* 源设备 */}
        <div className="form-row">
          <div className="form-item form-item-half">
            <label className="form-label"><span className="required">*</span>源设备</label>
            <div className="form-content">
              <Select
                placeholder="请选择升压站设备"
                style={{ width: "100%" }}
                value={sourceDeviceCode || undefined}
                onChange={(val) => setSourceDeviceCode(val)}
                showSearch
                optionFilterProp="label"
                options={sourceDeviceOptions}
              />
              {/* <div className="select-tip"><Tag color="blue">升压站设备</Tag>来源测点</div> */}
            </div>
          </div>
          {/* 目标设备 */}
          <div className="form-item form-item-half">
            <label className="form-label"><span className="required">*</span>目标设备</label>
            <div className="form-content">
              <Select
                placeholder="请选择 AGVC / 测风塔设备"
                style={{ width: "100%" }}
                value={targetDeviceCode || undefined}
                onChange={(val) => setTargetDeviceCode(val)}
                showSearch
                optionFilterProp="label"
                options={targetDeviceOptions}
              />
              {/* <div className="select-tip"><Tag color="blue">AGVC/测风塔</Tag>转发目标</div> */}
            </div>
          </div>
        </div>

        {/* IOA地址位配置 */}
        <div className="form-item">
          <label className="form-label"><span className="required">*</span>IOA地址位配置</label>
          <div className="form-content">
            <Input
              placeholder="点击右侧按钮选择测点"
              value={ioaText}
              readOnly
              style={{ width: "100%" }}
              addonAfter={
                <span style={{ cursor: "pointer", color: "#1890ff" }} onClick={handleOpenPointSelect}>
                  选择测点
                </span>
              }
            />
            <div className="ioa-format-tip">
              格式：<Tag color="blue">16385-16495</Tag> 区间 · <Tag color="blue">16589</Tag> 单点 · 逗号分隔
            </div>
            {parsedIOA.count > 0 && (
              <div className="ioa-parse-tip">
                <span className="parse-count">解析 {parsedIOA.count} 点</span>
                <span className="parse-points">点位：{parsedIOA.display}{parsedIOA.count > 10 ? ` … 共 ${parsedIOA.count} 点` : ""}</span>
              </div>
            )}
          </div>
        </div>

        {/* 启用状态 + 更新人/时间 */}
        <div className="form-row">
          <div className="form-item form-item-half">
            <label className="form-label">启用状态</label>
            <div className="form-content">
              <div className="switch-wrap">
                <Switch
                  checked={enabled}
                  onChange={setEnabled}
                  checkedChildren="启用"
                  unCheckedChildren="禁用"
                  style={{
                    backgroundColor: enabled ? "var(--success-color)" : undefined,
                  }}
                />
              </div>
              <div className="content-tip">停用后该拆分规则不再转发</div>
            </div>
          </div>
          <div className="form-item form-item-half">
            <label className="form-label">更新人 / 更新时间</label>
            <div className="form-content">
              <div className="updater">{updaterInfo || '-'}</div>
              <div className="content-tip">系统自动填充，无需录入</div>
            </div>
          </div>
        </div>

        {/* 备注 */}
        <div className="form-item">
          <label className="form-label">备注</label>
          <div className="form-content">
            <TextArea
              rows={3}
              placeholder="选填，如：升压站 I 段测点转发至 AGVC-A"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </div>

      {/* 底部按钮 */}
      <div className="split-footer">
        <Button onClick={handleCancel}>取消</Button>
        <Button onClick={handleSave}>保存</Button>
      </div>
    </div>
  )
})

export default AddModal
