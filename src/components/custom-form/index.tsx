/*
 * @Author: xiongman
 * @Date: 2022-11-09 09:43:50
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-05-13 09:51:53
 * @Description: 字封装表单组件
 */

import "./index.less"

import { Button, ButtonProps, Form } from "antd"
import React, { createElement, forwardRef, useImperativeHandle, useMemo } from "react"

import { ISearchFormProps } from "./types.ts"
import { useAtomValue } from "jotai"
import { AtomMenuBtnPermission } from "@/store/atom-menu.ts"

export function MapFormItem(items: ISearchFormProps["itemOptions"], config?: ISearchFormProps["itemOptionConfig"]) {
  if (!items?.length) return null
  return items.map(({ name, label, type, formItemProps, props }) => {
    if (props && config && config[name]) {
      Object.assign(props, config[name])
    }
    if (props?.mode === "multiple") {
      props.placeholder = props?.placeholder || "全选"
    }
    return (
      <Form.Item key={name} name={name} label={label} {...formItemProps}>
        {createElement(type, props)}
      </Form.Item>
    )
  })
}

function MapButtonItem(items: ISearchFormProps["buttons"], onAction?: (type?: any) => void) {
  if (!items?.length) return null
  return items.map(({ name, label, props }) => {
    if (!props) props = {} as ButtonProps
    if (!(props as ButtonProps)?.htmlType) Object.assign(props, { onClick: onAction?.bind(null, name) })
    return (
      <Form.Item key={name}>{createElement(Button, { ...props, disabled: props?.disabled || false }, label)}</Form.Item>
    )
  })
}

const CustomForm = forwardRef((props: ISearchFormProps, ref) => {
  const { onSearch, onAction, loading, formOptions, itemOptions, buttons, itemOptionConfig } = props
  const [form] = Form.useForm()
  const btnPermisson = useAtomValue(AtomMenuBtnPermission)
  const actualBtns = useMemo(() => {
    if (!btnPermisson?.length) return []
    const btns = buttons?.filter(
      (btn) => btn.name === "submit" || (btn.permission && btnPermisson.includes(btn.permission)),
    )
    return btns
  }, [btnPermisson, buttons])
  // 向外暴露的接口
  useImperativeHandle(ref, () => ({
    submit: () => form.submit(),
    getInst: () => form,
    getFormValues: () => form.getFieldsValue(),
  }))
  return (
    <Form
      form={form}
      layout="inline"
      disabled={loading}
      {...formOptions}
      onFinish={onSearch}
      className="search-form none-select"
    >
      {MapFormItem(itemOptions, itemOptionConfig)}
      {MapButtonItem(actualBtns, onAction)}
    </Form>
  )
})
CustomForm.displayName = "CustomForm"
export default CustomForm
