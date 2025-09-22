/*
 * @Author: xiongman
 * @Date: 2022-12-09 11:42:43
 * @LastEditors: xiongman
 * @LastEditTime: 2022-12-09 11:42:43
 * @Description: 表格操作-按钮组件
 */

import "./index.less";

import { Button, ButtonProps, Popconfirm } from "antd";

import { DELETE_DATA } from "@/configs/text-constant.ts";

import { IActBtnProps, IActInfo } from "./types.ts";

function renderBtn<TAct extends IActInfo>(
  onClick: IActBtnProps<TAct>["onClick"],
  info: IActInfo,
  buttonProps?: IActBtnProps<TAct>["buttonProps"],
  extra?: { confirmProps: IActBtnProps<TAct>["confirmProps"] }
) {
  const { confirmProps } = extra || {};
  const { key, label } = info || {};
  const bProps = buttonProps ? (buttonProps as any)[key] : undefined;
  const btnProps: ButtonProps = {
    size: "small",
    title: `${label}`,
    children: `${label}`,
    ...bProps,
    className: `op-btn ${bProps?.className || ""}`,
  };
  if (key !== "delete" && key !== "report") {
    return (
      <Button key={key} {...btnProps} onClick={onClick?.bind(null, info)} />
    );
  }
  const { title } = confirmProps
    ? (confirmProps as any)[key] || confirmProps
    : { title: DELETE_DATA };
  return (
    <Popconfirm
      key={`pop_${key}`}
      placement="left"
      title={title}
      disabled={btnProps?.disabled}
      onConfirm={onClick?.bind(null, info)}
      children={<Button key={key} danger {...btnProps} />}
    />
  );
}

export default function ActionButtons<TAct extends IActInfo>(
  props: IActBtnProps<TAct>
) {
  const { items, onClick, confirmProps, buttonProps } = props;
  return (
    <div className="table-operate-btns">
      {items?.map((info) =>
        renderBtn<TAct>(onClick, info, buttonProps, { confirmProps })
      )}
    </div>
  );
}
