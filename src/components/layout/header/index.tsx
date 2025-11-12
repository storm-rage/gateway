/*
 * @Author: chenmeifeng
 * @Date: 2024-12-02 17:43:07
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-05-15 17:05:37
 * @Description:
 */
import { loginOutAtom, userInfoAtom, AtomCheckToken } from "@/store/atom-auth"
import { useEffect } from "react"
import { useRefresh } from "@hooks/use-refresh.ts"
import { MS_MINU } from "@configs/time-constant.ts"

import "./index.less"
import MainMenu from "./main-menu"
import { useAtomValue, useSetAtom } from "jotai"
import { Dropdown, MenuProps } from "antd"
const items: MenuProps["items"] = [
  {
    key: "1",
    label: "退出登录",
  },
]
export default function Header() {
  const userInfo = useAtomValue(userInfoAtom)
  const logout = useSetAtom(loginOutAtom)
  const setCheckToken = useSetAtom(AtomCheckToken)
    const [reload, setReload] = useRefresh(MS_MINU)

  useEffect(() => {
    if (!reload) return
    // 跳过登录就注释
    setCheckToken().then(() => setReload(false))
  }, [reload, setCheckToken])

  const onClick = ({ key }) => {
    if (key === "1") {
      logout()
    }
  }
  return (
    <div className="app-header">
      <div className="app-header-left"></div>
      <div className="app-header-right">
        <MainMenu />
        <div className="header-user">
          <Dropdown menu={{ items, onClick }} placement="bottomLeft">
            <span className="user-name" children={userInfo?.loginName || userInfo?.realName || "访客"} />
          </Dropdown>
        </div>
      </div>
    </div>
  )
}
