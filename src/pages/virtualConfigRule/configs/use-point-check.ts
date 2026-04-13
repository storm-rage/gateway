/*
 * @Author: chenmeifeng
 * @Date: 2024-08-29 17:29:18
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2024-09-10 16:29:50
 * @Description:
 */
import { IDvsMeasurePointData } from "@/types/i-device"
import { createContext, Dispatch, SetStateAction } from "react"
import { ICursorInfo } from "../types/point"

export interface IAreaElecContext {
  curCheckPoint: IDvsMeasurePointData
  serCurCheckPoint: Dispatch<SetStateAction<IAreaElecContext["curCheckPoint"]>>
  exitPointList?: Array<IDvsMeasurePointData>
  setExitPointList?: Dispatch<SetStateAction<IAreaElecContext["exitPointList"]>>
  cursorInfo?: ICursorInfo
  setCursorInfo?: Dispatch<SetStateAction<IAreaElecContext["cursorInfo"]>>
}

const PiontContext = createContext<IAreaElecContext>({
  curCheckPoint: null,
  exitPointList: [],
  cursorInfo: null,
  setExitPointList: () => {},
  serCurCheckPoint: () => {},
  setCursorInfo: () => {},
})

export default PiontContext
