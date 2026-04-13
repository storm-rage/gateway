/*
 * @Author: chenmeifeng
 * @Date: 2023-10-26 14:12:56
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2023-10-26 14:13:37
 * @Description:
 */

import { InputNumber, Input, Select } from "antd"
import type { InputNumberProps } from "antd/es/input-number"
import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from "react"

export interface ICustomIptNumRef {
  getValue: () => number | string | null
}
interface IProps extends InputNumberProps {
  value?: number
  defaultValue?: number
  options?: any
}

const CustomInputNumber = forwardRef<ICustomIptNumRef, IProps>((props, ref) => {
  const { value, defaultValue, options, ...otherProps } = props
  const iptRef = useRef<HTMLInputElement>()
  const [internalNum, setInternalNum] = useState<string>('')
  const [internalUnit, setInternalUnit] = useState<string>('h')

  useImperativeHandle(ref, () => ({
    // getValue: () => iptRef.current?.value ?? value,
    getValue: () => {
      if (options?.length) {
      return internalNum + internalUnit
      }
      return iptRef.current?.value ?? value
    },
  }))

  const handleChange = (num: string, unit: string) => {
    setInternalNum(num)
    setInternalUnit(unit)

    // 如果需要通知父组件（比如表单），应该调用 props.onChange
    const combined = num === '' ? '' : `${num}${unit}`
    props.onChange?.(combined)
  }
  useEffect(() => {
    const match = String(value || '').match(/^(\d+)([smhd])?$/)
    const num = match ? match[1] : ''
    const unit = match ? match[2] || 'h' : 'h'
    setInternalNum(num)
    setInternalUnit(unit)
  }, [value])

  return (
    <div className="limit-power-interval">
      {
        options.length ? 
        <Input.Group compact>
          <Input
            value={internalNum}
            onChange={(e) => handleChange(e.target.value, internalUnit)}
            type="number"
            min={0}
            placeholder="请输入"
            style={{ width: '120px' }}
          />
          <Select
            value={internalUnit}
            onChange={(unit) => handleChange(internalNum, unit)}
            style={{ width: '80px' }}
            options={options}
          >
          </Select>
        </Input.Group>
        : <InputNumber ref={iptRef} value={value} defaultValue={defaultValue} {...otherProps} />
      }
    </div>
  )
})

export default CustomInputNumber
