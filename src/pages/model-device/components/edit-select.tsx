/*
 * @Author: chenmeifeng
 * @Date: 2024-01-05 17:05:03
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-05-19 17:55:23
 * @Description:
 */
import "./edit-select.less"
import { CaretRightOutlined } from "@ant-design/icons"
import { Select } from "antd"
import { useEffect, useRef, useState } from "react"

const EditableCell = ({ value: initialValue, setDataSource, record, option, dataIndex }) => {
  const [value, setValue] = useState(initialValue)
  const [show, setShow] = useState(false)
  const selectRef = useRef(null)
  const onChange = (e) => {
    setValue(e)
    setDataSource({ record, value: e, dataIndex })
    setShow(false)
  }
  const showSelect = useRef(() => {
    setShow((prev) => !prev)
  })
  const chang = () => {
    setShow(false)
  }
  useEffect(() => {
    if (show) {
      selectRef.current?.focus()
    }
  }, [show])
  return (
    <div className="custom-table-select">
      {show ? (
        <Select
          ref={selectRef}
          showSearch
          allowClear={true}
          className="manage-select-with"
          optionFilterProp="children"
          popupMatchSelectWidth={false}
          maxTagCount={1}
          value={value}
          suffixIcon={<CaretRightOutlined />}
          options={option}
          open={show}
          onBlur={chang}
          onChange={onChange}
        />
      ) : (
        <div className="select-span" onClick={showSelect.current}>
          {option?.find((i) => i.value === value)?.label || value}
        </div>
      )}
    </div>
  )
}
export default EditableCell
