/*
 * @Author: xiongman
 * @Date: 2023-10-20 20:42:21
 * @LastEditors: xiongman
 * @LastEditTime: 2023-10-20 20:42:21
 * @Description:
 */

import "./limit-power-button.less"

import { Input, InputProps } from "antd"
const { TextArea } = Input

interface CustomInputProps extends InputProps {
  isArea?: boolean;
  rows?: number;
}
export default function CustomInput(props: CustomInputProps) {
  const { value, ...otherProps } = props

  return (
    <div className="w-100 limit-power-button-wrap">
      {props.isArea?
        <TextArea value={value} rows={props.rows}/>
        :<Input value={value} {...otherProps} />}
      
    </div>
  )
}
