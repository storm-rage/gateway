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
  REALTIME_DATA,
  CONFIG_MANAGE,
  CONFIG_STATION,
  CONFIG_DEVICE_MODEL,
  CONFIG_DEVICE_ATTR,
  CONFIG_DEVICE_AGREEMENT,
  CONFIG_DEVICE_POINT,
  CONFIG_DEVICE_POINT_ADDRESS,
  CONFIG_SERVE_DEVICE_POINT,
  CONFIG_DEVICE_SPLIT,
  DATA_FORWARD,
  SYSTEM_MANAGE,
  BUSINESS_CONSTANT
} from "./variables"
const MenuArea: ITreeMenuItem[] = [
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
      {
        key: CONFIG_DEVICE_SPLIT,
        title: "设备拆分",
        element: lazy(() => import("@pages/device-split")),
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
