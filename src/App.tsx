/*
 * @Author: chenmeifeng
 * @Date: 2023-10-25 18:16:53
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-06-13 10:46:20
 * @Description:
 */

import "./App.less"

import { AtomUserOfMenuMap } from "@store/atom-menu.ts"
import { App as AntdApp, ConfigProvider } from "antd"
import { useAtomValue } from "jotai"
import { useEffect, useRef, useState } from "react"

// import { ILoginInfo } from "@/types/i-auth.ts";

import Routes from "./router"
import { StorageRolePermission, StorageUserInfo } from "./configs/storage-cfg"
import { getStorage, removeStorage, setStorage } from "./utils/util-funs"
import { ILoginInfo } from "./types/i-auth"
import usePageResize from "./hooks/use-page-resize"
function calcRootFontSize(baseSize = 16, uiWidth = 1920) {
  const screenWidth = window.screen.width
  const rootFontSize = (screenWidth / uiWidth) * baseSize
  return Math.max(rootFontSize, 12)
}
function App() {
  const [appFontSize, setAppFontSize] = useState(16)
  useAtomValue(AtomUserOfMenuMap)
  useEffect(() => {
    // 刷新时在此清除保存的数据
    const userInfoLocal = getStorage<ILoginInfo>(StorageUserInfo)
    const currentRolePermission = getStorage(StorageRolePermission)
    removeStorage()
    setStorage(userInfoLocal, StorageUserInfo)
    setStorage(currentRolePermission, StorageRolePermission)
  }, [])
  const resizeRef = useRef(() => {
    const fontSize = calcRootFontSize()
    setAppFontSize(fontSize)
    document.documentElement.style.fontSize = `${fontSize}px`
  })
  usePageResize(resizeRef.current, 0)
  return (
    <ConfigProvider theme={{ token: { fontSize: 16 } }} children={<AntdApp className="App" children={<Routes />} />} />
  )
}

export default App
