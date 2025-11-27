/*
 * @Author: chenmeifeng
 * @Date: 2024-12-02 16:51:01
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-07-30 17:12:16
 * @Description: 菜单atom
 */
import { RouteObject } from "react-router"
import { atom } from "jotai"
import routesConfig from "@/router/config"
import { createRouteObject, dealPathOftreeMenuData } from "@/utils/menu-funs"
import { TREE_MENU_DATA } from "@/router/tree-menu-data"
import { ITreeMenuItem } from "@/router/interface"
import { LOGIN_INFO_FOR_FUNS } from "./atom-auth"
import { setStorage } from "@/utils/util-funs"
import { StorageRolePermission } from "@/configs/storage-cfg"
import { AtomStation } from "./atom-station"
const currentRolePermission = [
  "model:projectCompany:add",
  "model:projectCompany:export",
  "model:projectCompany:import",
  "model:projectCompany:batchDelete",
  "model:mainCompany:batchDelete",
  "model:mainCompany:add",
  "model:mainCompany:export",
  "model:mainCompany:import",
  "model:station:add",
  "model:station:edit",
  "model:station:batchDelete",
  "model:station:export",
  "model:station:import",
  "model:model:add",
  "model:model:batchDelete",
  "model:model:export",
  "model:model:import",
  "model:point:add",
  "model:point:edit",
  "model:point:batchDelete",
  "model:point:export",
  "model:point:import",
  "model:power:add",
  // "model:power:batchDelete",
  "model:power:edit",
  "model:power:export",
  "model:power:import",
  "model:power:batchApply",
  "model:power:batchDelete",
  "model:powerPlan:add",
  "model:powerPlan:batchDelete",
  "model:powerPlan:export",
  "model:powerPlan:import",
  "model:device:add",
  "model:device:batchDelete",
  "model:line:add",
  "model:line:edit",
  "model:line:export",
  "model:line:import",
  "model:line:batchDelete",
  "model:period:add",
  "model:period:edit",
  "model:period:export",
  "model:period:import",
  "model:period:batchDelete",
  "model:eam:add",
  "model:eam:edit",
  "model:eam:export",
  "model:eam:import",
  "model:eam:batchDelete",
  "rule:customize:batchDelete",
  "rule:alarm:batchDelete",
  "rule:alarm:add",
  "rule:alarm:edit",
  "rule:alarm:export",
  "rule:alarm:import",
  "rule:five:batchDelete",
  "rule:five:add",
  "rule:state:add",
  "rule:state:export",
  "rule:state:import",
  "rule:state:batchDelete",
  "rule:control:add",
  "rule:control:export",
  "rule:control:import",
  "rule:control:batchDelete",
  // "manage:role:add",
  // "manage:role:batchDelete",
  "manage:user:add",
  "manage:user:batchDelete",
  "manage:static:add",
  "manage:static:batchDelete",
]

// 菜单按钮权限
export const AtomMenuBtnPermission = atom<string[]>([])
// 菜单和路由数据已经准备好的标记
export const AtomRouteReady = atom(false)
const ATOM_ROUTER_CONFIG = atom<RouteObject[]>(routesConfig)
export const ATOM_ROUTER_ALL = atom<ITreeMenuItem[]>([])
export const AtomUserOfMenuMap = atom(
  (get) => get(ATOM_ROUTER_CONFIG),
  async (get, set) => {
    if (!LOGIN_INFO_FOR_FUNS.loginInfo?.token) return set(AtomRouteReady, true)
    await set(AtomStation)
    set(AtomMenuBtnPermission, currentRolePermission)
    setStorage(currentRolePermission, StorageRolePermission)
    // 处理 path 后的全量菜单数据，用于获取 Tabs 菜单列表，数据中的 key 用于匹配 Menu 选中的 key
    const menuItems = dealPathOftreeMenuData(TREE_MENU_DATA, currentRolePermission, 0)
    // 根据用户菜单数据创建路由数据
    const routesConfig = get(ATOM_ROUTER_CONFIG)
    routesConfig[0].children = createRouteObject(menuItems)
    set(ATOM_ROUTER_CONFIG, [...routesConfig])
    // console.log(routesConfig, "的风格和和关键环节", menuItems);
    set(ATOM_ROUTER_ALL, menuItems)
    // 权限数据准备好了
    window.setTimeout(() => {
      set(AtomRouteReady, true)
    }, 800)
  },
)

// AtomUserOfMenuMap 挂载时获取菜单数据的节流标记
let MENU_MAP_MOUNT_FLAG = false
// 加载时获取本地存储的映射数据，调用write方法生成菜单及路由数据
AtomUserOfMenuMap.onMount = (setAtom) => {
  ;(async function () {
    if (MENU_MAP_MOUNT_FLAG) return
    MENU_MAP_MOUNT_FLAG = true
    await setAtom()
    window.setTimeout(() => (MENU_MAP_MOUNT_FLAG = false), 1000)
  })()
}
