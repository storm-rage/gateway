/*
 * @Author: chenmeifeng
 * @Date: 2023-12-12 16:43:40
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2024-03-06 10:03:20
 * @Description: 普通下拉选择框
 */
import { CaretRightOutlined } from "@ant-design/icons"
import { Select } from "antd"
import { DefaultOptionType } from "antd/es/select"
import { useEffect } from "react"
function filterFun(inputValue: string, option?: DefaultOptionType) {
  if (option?.value === "-all-" || typeof option?.label !== "string") return false
  return option?.label?.includes(inputValue.trim())
}
export default function SelectOrdinary(props) {
  const { value, allowClear = true, mode, onChange, options, labelInValue, style, ...selectProps } = props || {}
  const handleSelect = (chooseValue) => {
    // console.log(chooseValue, "chooseValue")
    onChange(chooseValue)
  }
  useEffect(() => {
    handleSelect(value)
  }, [value])
  return (
    <Select
      showSearch
      allowClear={allowClear}
      className="select-with"
      optionFilterProp="children"
      popupMatchSelectWidth={false}
      filterOption={filterFun}
      maxTagCount={1}
      value={value}
      mode={mode}
      suffixIcon={<CaretRightOutlined />}
      style={{ minWidth: "8em", ...(style || {}) }}
      {...selectProps}
      options={options}
      onSelect={handleSelect}
      onChange={onChange}
    />
  )
}
