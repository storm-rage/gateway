/*
 * @Author: chenmeifeng
 * @Date: 2024-12-04 13:46:33
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-05-16 15:24:19
 * @Description:
 */
import { lazy } from "react"
import { ITreeMenuItem } from "./interface"
import { CONTROL_RULE, RULE_ALARM, RULE_CUSTOMIZE, RULE_FIVE, STATE_RULE } from "./variables"

const MenuRuleSetting: ITreeMenuItem[] = [
  {
    key: RULE_ALARM,
    title: "厂家告警",
    element: lazy(() => import("@pages/alarm-manufacture")),
  },
  {
    key: RULE_CUSTOMIZE,
    title: "自定义告警",
    element: lazy(() => import("@pages/alarm-rule")),
  },
  {
    key: RULE_FIVE,
    title: "五防规则",
    element: lazy(() => import("@pages/alarm-five-rule")),
  },
  {
    key: STATE_RULE,
    title: "状态规则",
    element: lazy(() => import("@pages/state-rule")),
  },
  {
    key: CONTROL_RULE,
    title: "控制规则",
    element: lazy(() => import("@pages/control-rule")),
  },
]
export default MenuRuleSetting
