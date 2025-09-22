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
    if (!currentChoosePathParent) return []
    const menu = allMenu
      ?.filter((menu) => menu.key === currentChoosePathParent)?.[0]
      ?.children?.map((i) => {
        return {
          key: `${currentChoosePathParent}/${i.key}`,
          label: i.label,
          title: i.label,
        }
      })
    return menu || []
  }, [allMenu, currentChoosePathParent])

  const handleSelectRef = useRef(({ keyPath }: { keyPath: string[] }) => {
    navigateRef.current(`/${keyPath}`)
    setSelectedKeys(keyPath)
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
