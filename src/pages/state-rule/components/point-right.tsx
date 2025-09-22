/*
 * @Author: chenmeifeng
 * @Date: 2024-09-06 16:21:45
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-08-01 15:21:20
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
      {/* <Input ref={inputRef} onBlur={getCursorPosition} value={inputVal} onChange={changeValue}></Input> */}
    </div>
  )
}
