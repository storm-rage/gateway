/*
 * @Author: chenmeifeng
 * @Date: 2024-09-06 16:21:45
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-10-30 10:43:47
 * @Description:
 */
import "./point-right.less"
import { Input } from "antd"
import { useContext, useEffect, useRef, useState } from "react"
import PiontContext from "../configs/use-point-check"
import { SYMBOL_LIST } from "../configs/form"
const { TextArea } = Input

interface IProps {
  info: string
  defaultValue?: Array<number>
  onChange?: (val: any) => void
}
const ruleExample = [
  { name: "(风机理论功率 - 实际有功)绝对值＞30%理论功率", value: "(Theorypower-GridsideActivePower)>0.3*Theorypower" },
  { name: "5min内设备风速无变化（极差为0）", value: "WindSpeed1@5m@MAX-WindSpeed1@5m@MIN==0" },
  { name: "5min内设备风速无数据", value: "WindSpeed1@5m@COUNT==0" },
  { name: "瞬时设备风速无数据", value: "WindSpeed1==null" },
  { name: "5min内风速大于3", value: "WindSpeed1@5m@MIN > 3" },
  { name: "状态等于0，或（状态等于9，且偏航状态等于6）", value: "(Turstatus == 0 || (Turstatus == 9 && yawStatus == 6))" },
    { name: "状态等于1，或状态等于2，或状态等于3", value: "Turstatus in (1,2,3)" },
]
export default function RuleQuotaInput(props: IProps) {
  const { info } = props
  const inputRef = useRef(null)
  const [inputVal, setInputVal] = useState("")
  const timeoutRef = useRef(null)
  const { curCheckPoint, cursorInfo, setCursorInfo } = useContext(PiontContext)
  const changeValue = (e) => {
    setInputVal(e?.target?.value)
  }

  const getCursorPosition = (e) => {
    if (inputRef.current) {
      const selectionEnd = inputRef.current.resizableTextArea?.textArea?.selectionEnd
      setCursorInfo({ position: selectionEnd, currentInfo: inputVal })
    }
  }
  const chooseSymbol = (key) => {
    const { position } = cursorInfo
    setValAndCursor(position, key)
  }
  const setValAndCursor = (position, pointName) => {
    clearTimeout(timeoutRef.current)
    const length = position + pointName?.length

    const text = inputVal.substring(0, position) + pointName + inputVal.substring(position)
    //回显值到输入框
    setInputVal(text)

    setCursorInfo((prev) => {
      prev.nextCursorPistion = length
      prev.position = length
      return {
        ...prev,
      }
    })
    timeoutRef.current = setTimeout(() => {
      inputRef.current.focus()
      inputRef.current.resizableTextArea?.textArea?.setSelectionRange(length, length)
      setCursorInfo(null)
    }, 0)
  }

  useEffect(() => {
    if (info) {
      setInputVal(info)
    }
  }, [info])
  useEffect(() => {
    if (curCheckPoint && cursorInfo) {
      const { position } = cursorInfo
      const { pointName } = curCheckPoint
      setValAndCursor(position, pointName)
    }
  }, [curCheckPoint])
  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [])
  return (
    <div className="st-point-right">
      <div className="symbol-area">
        {Object.values(SYMBOL_LIST)?.map((item, idx) => {
          return (
            <div className="symbol-area-item" key={idx}>
              {item.map((i) => {
                return (
                  <span key={i} onClick={() => chooseSymbol(i)} className="symbol-area-item-symbol">
                    {i}
                  </span>
                )
              })}
            </div>
          )
        })}
      </div>
      <TextArea rows={4} ref={inputRef} onBlur={getCursorPosition} value={inputVal} onChange={changeValue}></TextArea>
      <div>
        <span>规则示例，如下：</span>
        {ruleExample.map((item, idx) => {
          return (
            <div key={item.name}>
              <span>
                ({idx + 1}){item.name}：
              </span>
              <span>{item.value}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
