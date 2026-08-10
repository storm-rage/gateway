/*
 * @Author: chenmeifeng
 * @Date: 2024-12-05 17:03:19
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-04-30 11:01:04
 * @Description:
 */

import "./edit.less"
import { Button } from "antd"
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"

import CustomForm from "@/components/custom-form"
import { IFormInst, ISearchFormProps } from "@/components/custom-form/types"
import { TModalType } from "@/types/i-config"

export interface IPerateRef {}
export interface IOperateProps {
  data?: any
  buttonClick?: (type: "ok" | "close", data?: any, editType?) => void
  editType: TModalType
  FORM_ITEMS: ISearchFormProps["itemOptions"]
  loading?: boolean
  selectRowInfo?: any
  deviceModel?: any
  formSelectChange?: (changeVals, setFormConfigs) => void
}

const AddModal = forwardRef<IPerateRef, IOperateProps>((props, ref) => {
  const { buttonClick, editType, selectRowInfo, FORM_ITEMS, deviceModel } = props
  const formRef = useRef<IFormInst | null>(null)
  //组件数据集合
  const [formList, setFormItemConfig] = useState({})
  const currentId = useRef<number>()

  useImperativeHandle(ref, () => ({}))

  useEffect(() => {
    const formInsts = formRef.current?.getInst?.()
    if (editType !== "add") {
      const { id, state, ...other } = selectRowInfo || {}
      currentId.current = id

      formInsts?.setFieldsValue({
        ...other,
        state: String(state), // 设置转换后的值
      })
    }
    setFormItemConfig((pre) => {
      return { ...pre, options: deviceModel }
    })
  }, [])

  const onFinish = (formValue) => {
    buttonClick?.("ok", { ...formValue, id: currentId.current }, editType)
  }
  const btnClkRef = useRef((type: "ok" | "close") => {
    if (type === "ok") {
      formRef.current?.submit?.()
      return
    }
    buttonClick?.("close")
  })
  // 向外暴露的接口
  useImperativeHandle(ref, () => ({
    getInst: () => formRef.current?.getInst?.(),
    getFormValues: () => formRef.current?.getFieldsValue?.(),
  }))
  
  return (
    <div className="user-model">
      <CustomForm
        ref={formRef}
        itemOptionConfig={formList}
        itemOptions={FORM_ITEMS}
        formOptions={{ 
          layout: "horizontal",
         }}
        onSearch={onFinish}
      />
      <div className="confirm-btn">
        <Button onClick={btnClkRef.current.bind(null, "ok")}>保存</Button>
        <Button onClick={btnClkRef.current.bind(null, "close")}>取消</Button>
      </div>
    </div>
  )
})

export default AddModal
