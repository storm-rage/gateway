/*
 * @Author: chenmeifeng
 * @Date: 2024-12-02 17:05:55
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-06-17 14:06:52
 * @Description: 设备模型
 */
import { lazy } from "react"
import { ITreeMenuItem } from "./interface"
import {
  MODEL_COMPANY,
  PROJECT_COMPANY,
  MODEL_STATION,
  MODEL_PERIOD,
  MODEL_LINE,
  MODEL_MODEL,
  MODEL_POWER,
  MODEL_POINT,
  MODEL_DEVICE,
  MODEL_POWER_PLAN,
  MODEL_EAM,
} from "./variables"
const MenuArea: ITreeMenuItem[] = [
  {
    key: MODEL_COMPANY,
    title: "区域公司",
    element: lazy(() => import("@pages/company")),
  },
  {
    key: PROJECT_COMPANY,
    title: "项目公司",
    element: lazy(() => import("@pages/main-project")),
  },
  {
    key: MODEL_STATION,
    title: "场站",
    element: lazy(() => import("@pages/setting-station")),
  },
  {
    key: MODEL_MODEL,
    title: "型号",
    element: lazy(() => import("@pages/model-model")),
  },
  {
    key: MODEL_PERIOD,
    title: "期次",
    element: lazy(() => import("@pages/model-period")),
  },
  {
    key: MODEL_LINE,
    title: "线路",
    element: lazy(() => import("@pages/model-line")),
  },
  {
    key: MODEL_DEVICE,
    title: "设备",
    element: lazy(() => import("@pages/model-device")),
  },
  {
    key: MODEL_POINT,
    title: "测点",
    element: lazy(() => import("@pages/setting-point-sys")),
  },
  {
    key: MODEL_POWER_PLAN,
    title: "电量计划",
    element: lazy(() => import("@pages/plan-quantity")),
  },

  {
    key: MODEL_POWER,
    title: "功率曲线",
    element: lazy(() => import("@pages/setting-power-line")),
  },
  {
    key: MODEL_EAM,
    title: "平台信息映射管理",
    element: lazy(() => import("@pages/eam-device")),
  },
]
export default MenuArea
