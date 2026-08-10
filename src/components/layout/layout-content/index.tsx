/*
 * @Author: chenmeifeng
 * @Date: 2024-12-02 17:47:29
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-06-13 11:08:35
 * @Description:
 */
import "./index.less"
import LargeScreenContext from "@/contexts/menu-context"
import { ATOM_ROUTER_ALL } from "@/store/atom-menu"
import { Layout, Menu } from "antd"
import { ItemType } from "antd/es/menu/interface"
import { useAtomValue } from "jotai"
import { useContext, useEffect, useMemo, useRef, useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"

export default function LayoutContent() {
  const [collapsed, setCollapsed] = useState(false)
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])

  const { pathname } = useLocation()
  const navigate = useNavigate()
  const allMenu = useAtomValue(ATOM_ROUTER_ALL)
  const { currentChoosePathParent } = useContext(LargeScreenContext)
  const navigateRef = useRef(navigate)
  navigateRef.current = navigate

  const menuItems = useMemo(() => {
    // if (!currentChoosePathParent) return []
    // const menu = allMenu
    //   ?.filter((menu) => menu.key === currentChoosePathParent)?.[0]
    //   ?.children?.map((i) => {
    //     return {
    //       key: `${currentChoosePathParent}/${i.key}`,
    //       label: i.label,
    //       title: i.label,
    //     }
    //   })
    // return menu || []
    if (!currentChoosePathParent || !allMenu?.length) return []

    // 找到当前选中的父级菜单
    const parentMenu = allMenu.find(menu => menu.key === currentChoosePathParent)
    if (!parentMenu?.children?.length) return []

    // 递归转换函数：将原始菜单结构转为 AntD Menu 所需的 ItemType 结构
    const transformToAntdMenu = (items: typeof parentMenu.children, parentKey: string): ItemType[] => {
      return items.map(item => {
        const fullKey = `${parentKey}/${item.key}`
        const labelStr = typeof item.label === 'string' ? item.label : String(item.label)
        const baseItem: ItemType = {
          key: fullKey,
          label: item.label,
          title: labelStr,
        }

        // 如果当前项还有 children，则递归处理
        if (item.children && item.children.length > 0) {
          return {
            ...baseItem,
            children: transformToAntdMenu(item.children, fullKey), // 继续拼接完整路径
          }
        }

        return baseItem
      })
    }

    return transformToAntdMenu(parentMenu.children, currentChoosePathParent);
  }, [allMenu, currentChoosePathParent])

  const handleSelectRef = useRef(({ keyPath }: { keyPath: string[] }) => {
    console.log(keyPath,'==keypath')
    navigateRef.current(`/${keyPath[0]}`)
    setSelectedKeys([keyPath[0]])
  })
  useEffect(() => {
    // console.log(pathname, "pathname");
  }, [pathname])
  useEffect(() => {
    if (!pathname && menuItems?.length) return
    const menuSplit = pathname.split("/")
    if (menuSplit.length >= 2) {
      const newMenu = menuSplit.slice(1)?.join("/")
      setSelectedKeys([newMenu])
    }
  }, [pathname, menuItems])

  return (
    <Layout className="l-full layout-content">
      <Layout.Sider
        collapsible
        width={170}
        collapsedWidth={50}
        collapsed={collapsed}
        trigger={null}
        className="layout-sider"
      >
        <Menu
          mode="inline"
          style={{ height: "100%", borderRight: 0 }}
          className="child-menu"
          selectedKeys={selectedKeys}
          onSelect={handleSelectRef.current}
          items={menuItems as ItemType[]}
        />
      </Layout.Sider>
      <Layout.Content className="layout-content-inner" children={<Outlet />} />
    </Layout>
  )
}
