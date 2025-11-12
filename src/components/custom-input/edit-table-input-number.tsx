/*
 * @Author: chenmeifeng
 * @Date: 2024-01-05 17:05:03
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-10-30 10:11:27
 * @Description: 表格输入数字框
 */
import "./edit-table-input-number.less"
import { InputNumber } from "antd"
import { useEffect, useRef, useState } from "react"

const EditableNumberCell = (props) => {
  const { value: initialValue, setDataSource, record, dataIndex } = props
  const [value, setValue] = useState(initialValue)
  const [show, setShow] = useState(false)
  const inputRef = useRef(null)

  const onChange = (e) => {
    setValue(e)
  }

  const onBlur = () => {
    setShow(false)
    setDataSource({ record, value, dataIndex })
  }
  const showInput = useRef(() => {
    setShow((prev) => !prev)
  })
  useEffect(() => {
    if (show) {
      inputRef.current?.focus()
    }
  }, [show])

  return (
    <div className="custom-table-input">
      {show ? (
        <InputNumber style={{ width: "100%" }} ref={inputRef} value={value} onChange={onChange} onBlur={onBlur} />
      ) : (
        <div className="input-span" onClick={showInput.current}>
          {value}
        </div>
      )}
    </div>
  )
}
export default EditableNumberCell
