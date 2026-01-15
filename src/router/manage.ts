/*
 * @Author: chenmeifeng
 * @Date: 2024-12-05 13:46:33
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2024-12-18 17:21:50
 * @Description:
 */
import { lazy } from "react"
import { ITreeMenuItem } from "./interface"
import { MANAGE_ROLE, MANAGE_STATIC, MANAGE_USER, MANAGE_ELEDIAGRAM, MANAGE_AUDIO } from "./variables"

const MenuManage: ITreeMenuItem[] = [
  {
    key: MANAGE_USER,
    title: "用户管理",
    element: lazy(() => import("@pages/manage-user")),
  },
  {
    key: MANAGE_ROLE,
    title: "角色管理",
    element: lazy(() => import("@pages/manage-role")),
  },
  {
    key: MANAGE_STATIC,
    title: "静态数据管理",
    element: lazy(() => import("@pages/staticMng")),
  },
  {
    key: MANAGE_ELEDIAGRAM,
    title: "电气图管理",
    element: lazy(() => import("@pages/eleDiagramMng")),
  },
  {
    key: MANAGE_AUDIO,
    title: "音频管理",
    element: lazy(() => import("@pages/audioMng")),
  },
]
export default MenuManage
