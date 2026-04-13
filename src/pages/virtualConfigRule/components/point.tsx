/*
 * @Author: chenmeifeng
 * @Date: 2024-08-28 16:38:00
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-08-04 16:06:08
 * @Description: 编辑告警规则详情
 */
import "./point.less"
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import EditRulePoint from "./point-left"
import { getDvsMeasurePointsData } from "@/utils/device-funs"
import PiontContext from "../configs/use-point-check"
import RuleQuotaInput from "./point-right"
import { ICursorInfo } from "../types/point"
import BatchDevice from "../../alarm-rule/components/batch-device"


export interface IPerateRef {}
export interface IOperateProps {
  info: string
  modelId?: number
  buttonClick?: (type: "ok" | "reset" | "close") => void
  loading?: boolean
  onChange?: (val: any) => void
  calcType?: number
  selectRowInfo: any
}
const EditRuleModel = forwardRef<IPerateRef, IOperateProps>((props, ref) => {
  const { onChange, buttonClick, modelId, info, calcType, selectRowInfo } = props
  const [curCheckPoint, serCurCheckPoint] = useState(null)
  const [cursorInfo, setCursorInfo] = useState<ICursorInfo>(null)
  const [exitPointList, setExitPointList] = useState([])
  const [deviceType, setDeviceType] = useState("WT")
  const [devices, setDevices] = useState<[]>([])
  const [modelIdEx, setmodelIdEx] = useState('')

  const getPoints = async () => {
    const res = await getDvsMeasurePointsData({ modelId: modelIdEx || modelId, pointTypes: "1,2" })
    setExitPointList(res)
  }
  const handleValueChange = (info) => {
    console.log(info,'===info===')
    onChange?.(info)
  }
 
  const handleDeviceSelect = (e) => {
    setDevices(e)
    setmodelIdEx(e[0].modelId)
  }
  useEffect(() => {
    if (modelId || modelIdEx) {
      getPoints()
    }
  }, [modelId, modelIdEx])
  useEffect(() => {
    if (info) {
      setCursorInfo({ currentInfo: info, position: 0 })
    }
  }, [info])
  // 向外暴露的接口
  useImperativeHandle(ref, () => ({
    pointRule: cursorInfo?.currentInfo,
  }))
  return (
    <div className="state-point-form">
      <PiontContext.Provider
        value={{
          curCheckPoint,
          serCurCheckPoint,
          cursorInfo,
          setCursorInfo,
          exitPointList,
          setExitPointList,
        }}
      >
        <div className="ar-edit-left">
          {
          calcType == 0 ? <EditRulePoint /> 
          : calcType == 1 ?
          <BatchDevice deviceType={deviceType} isModelId={true} onSelect={(e) => handleDeviceSelect(e as any)} /> : null
          }
        </div>
        <div className="ar-edit-right">
          {calcType == 1 ? <EditRulePoint /> : null}
          <RuleQuotaInput 
            info={selectRowInfo.inputPoints || info} 
            selectRowInfo={selectRowInfo}
            onChange={handleValueChange}
            />
        </div>
      </PiontContext.Provider>
    </div>
  )
})

export default EditRuleModel
