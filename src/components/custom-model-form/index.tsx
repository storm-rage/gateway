/*
 * @Author: chenmeifeng
 * @Date: 2025-5-05 17:03:19
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-05-20 14:04:37
 * @Description: 新增修改公用弹框
 */

import "./index.less"
import { Button } from "antd"
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"

import CustomForm from "@/components/custom-form"
import { IFormInst, ISearchFormProps } from "@/components/custom-form/types"

// import { ST_USER_MODEL_FORM_ITEMS } from "../configs/model";
// import { IUserList, TModelFrAndTbInfo } from "../types";
import { TModalType } from "@/types/i-config"

export interface IPerateRef {}
export interface IOperateProps {
  data?: any
  buttonClick?: (type: "ok" | "close", data?: any) => void
  editType?: TModalType
  loading?: boolean
  selectRowInfo?: any
  layout?: "horizontal" | "vertical" | "inline"
  FORM_ITEMS: ISearchFormProps["itemOptions"]
  formSelectChange?: (changeVals, setFormConfigs) => void
}

const CustomAddModal = forwardRef<IPerateRef, IOperateProps>((props, ref) => {
  const { buttonClick, editType, layout = "horizontal", selectRowInfo, FORM_ITEMS, formSelectChange } = props
  const formRef = useRef<IFormInst | null>(null)
  //组件数据集合
  const [formList, setFormItemConfig] = useState({})
  const currentId = useRef<number>()

  useImperativeHandle(ref, () => ({}))

  useEffect(() => {
    if (editType !== "add") {
      const formInsts = formRef.current?.getInst?.()
      const { id, ...other } = selectRowInfo || {}
      currentId.current = id
      formInsts?.setFieldsValue({ ...other })
    }
    allAsyncPromise().then((r) => r)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const allAsyncPromise = async () => {}

  const onFinish = (formValue) => {
    buttonClick?.("ok", { ...formValue, id: currentId.current })
  }
  const btnClkRef = useRef((type: "ok" | "close") => {
    if (type === "ok") {
      formRef.current?.submit?.()
      return
    }
    buttonClick?.("close")
  })
  const onSchValueChgRef = useRef((changedValue) => {
    formSelectChange?.(changedValue, setFormItemConfig)
  })
  // 向外暴露的接口
  useImperativeHandle(ref, () => ({
    getInst: () => formRef.current?.getInst?.(),
    getFormValues: () => formRef.current?.getFieldsValue?.(),
    setFormItemConfig: (prev) => setFormItemConfig(prev),
  }))
  return (
    <div className="user-model">
      <CustomForm
        ref={formRef}
        formOptions={{ layout, onValuesChange: onSchValueChgRef.current }}
        itemOptionConfig={formList}
        itemOptions={FORM_ITEMS}
        onSearch={onFinish}
      />
      <div className="confirm-btn">
        <Button onClick={btnClkRef.current.bind(null, "ok")}>保存</Button>
        <Button onClick={btnClkRef.current.bind(null, "close")}>取消</Button>
      </div>
    </div>
  )
})

export default CustomAddModal
