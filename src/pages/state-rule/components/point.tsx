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

export interface IPerateRef {}
export interface IOperateProps {
  info: string
  modelId?: number
  buttonClick?: (type: "ok" | "reset" | "close") => void
  loading?: boolean
}
const EditRuleModel = forwardRef<IPerateRef, IOperateProps>((props, ref) => {
  const { buttonClick, modelId, info } = props
  const [curCheckPoint, serCurCheckPoint] = useState(null)
  const [cursorInfo, setCursorInfo] = useState<ICursorInfo>(null)
  const [exitPointList, setExitPointList] = useState([])

  const getPoints = async () => {
    const res = await getDvsMeasurePointsData({ modelId: modelId, pointTypes: "1,2" })
    setExitPointList(res)
  }
  useEffect(() => {
    if (modelId) {
      getPoints()
    }
  }, [modelId])
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
          <EditRulePoint />
        </div>
        <div className="ar-edit-right">
          <RuleQuotaInput info={info} />
          {/* <EditRuleForm device={data} buttonClick={buttonClick} editType={editType} /> */}
        </div>
      </PiontContext.Provider>
    </div>
  )
})

export default EditRuleModel
