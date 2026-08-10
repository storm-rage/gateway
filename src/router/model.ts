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
  PAGE_INDEX,
  REALTIME_DATA,
  CONFIG_MANAGE,
  CONFIG_STATION,
  CONFIG_DEVICE_MODEL,
  CONFIG_DEVICE_ATTR,
  CONFIG_DEVICE_AGREEMENT,
  CONFIG_DEVICE_POINT,
  CONFIG_DEVICE_POINT_ADDRESS,
  CONFIG_SERVE_DEVICE_POINT,
  DATA_FORWARD,
  SYSTEM_MANAGE,
  BUSINESS_CONSTANT
} from "./variables"
const MenuArea: ITreeMenuItem[] = [
  // {
  //   key: MODEL_COMPANY,
  //   title: "区域公司",
  //   element: lazy(() => import("@pages/company")),
  // },
  // {
  //   key: PROJECT_COMPANY,
  //   title: "项目公司",
  //   element: lazy(() => import("@pages/main-project")),
  // },
  // {
  //   key: MODEL_STATION,
  //   title: "场站",
  //   element: lazy(() => import("@pages/setting-station")),
  // },
  // {
  //   key: MODEL_MODEL,
  //   title: "型号",
  //   element: lazy(() => import("@pages/model-model")),
  // },
  // {
  //   key: MODEL_PERIOD,
  //   title: "期次",
  //   element: lazy(() => import("@pages/model-period")),
  // },
  // {
  //   key: MODEL_LINE,
  //   title: "线路",
  //   element: lazy(() => import("@pages/model-line")),
  // },
  // {
  //   key: MODEL_DEVICE,
  //   title: "设备",
  //   element: lazy(() => import("@pages/model-device")),
  // },
  // {
  //   key: MODEL_POINT,
  //   title: "测点",
  //   element: lazy(() => import("@pages/setting-point-sys")),
  // },
  // {
  //   key: MODEL_POWER_PLAN,
  //   title: "电量计划",
  //   element: lazy(() => import("@pages/plan-quantity")),
  // },

  // {
  //   key: MODEL_POWER,
  //   title: "功率曲线",
  //   element: lazy(() => import("@pages/setting-power-line")),
  // },
  // {
  //   key: MODEL_EAM,
  //   title: "平台信息映射管理",
  //   element: lazy(() => import("@pages/eam-device")),
  // },
  // {
  //   key: PAGE_INDEX,
  //   title: "首页",
  //   element: lazy(() => import("@pages/page-index")),
  // },
  {
    key: REALTIME_DATA,
    title: "实时数据",
    element: lazy(() => import("@pages/realtime-data")),
  },
  {
    key: CONFIG_MANAGE,
    title: "配置管理",
    children: [
      {
        key: CONFIG_STATION,
        title: "场站配置",
        element: lazy(() => import("@pages/config-manage")),
      },
      {
        key: CONFIG_DEVICE_MODEL,
        title: "设备型号",
        element: lazy(() => import("@pages/device-model")),
      },
      {
        key: CONFIG_DEVICE_ATTR,
        title: "设备属性",
        element: lazy(() => import("@pages/device-attr")),
      },
      {
        key: CONFIG_DEVICE_AGREEMENT,
        title: "设备协议",
        element: lazy(() => import("@pages/device-agreement")),
      },
      {
        key: CONFIG_DEVICE_POINT,
        title: "设备测点",
        element: lazy(() => import("@pages/device-point")),
      },
      {
        key: CONFIG_DEVICE_POINT_ADDRESS,
        title: "测点地址",
        element: lazy(() => import("@pages/device-point-address")),
      },
    ]
  },
  {
    key: DATA_FORWARD,
    title: "数据转发",
    children: [
      {
        key: CONFIG_STATION,
        title: "目标服务器",
        element: lazy(() => import("@pages/data-forward")),
      },
      {
        key: CONFIG_DEVICE_POINT,
        title: "设备测点",
        element: lazy(() => import("@pages/serve-device-point")),
      },
    ]
  },
  {
    key: SYSTEM_MANAGE,
    title: "系统管理",
    children: [
      {
        key: BUSINESS_CONSTANT,
        title: "业务常量",
        element: lazy(() => import("@pages/system-manage")),
      },
    ]
  },
]
export default MenuArea
