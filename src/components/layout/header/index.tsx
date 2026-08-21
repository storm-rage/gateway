/*
 * @Author: chenmeifeng
 * @Date: 2024-12-02 17:43:07
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-05-15 17:05:37
 * @Description:
 */
import { loginOutAtom, userInfoAtom, AtomCheckToken } from "@/store/atom-auth"
import { useEffect, useState } from "react"
import { useRefresh } from "@hooks/use-refresh.ts"
import { MS_MINU } from "@configs/time-constant.ts"

import "./index.less"
import MainMenu from "./main-menu"
import { useAtomValue, useSetAtom } from "jotai"
import { Dropdown, MenuProps } from "antd"
import CustomModal from "@/components/custom-modal"
import UpPassword from "@/pages/manage-role/components/ud-password"
const items: MenuProps["items"] = [
  {
    key: "0",
    label: "修改密码",
  },
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
    const [editPassword, setEditPassword] = useState(false)

  // useEffect(() => {
  //   if (!reload) return
  //   // 跳过登录就注释
  //   setCheckToken().then(() => setReload(false))
  // }, [reload, setCheckToken])

  const onClick = ({ key }) => {
    if (key === "0") {
      setEditPassword(true)
    }
    if (key === "1") {
      logout()
    }
  }
  const updatePassword = (type) => { 
    if (type === "close") {
      setEditPassword(false)
    }
  }
  return (
    <div className="app-header">
      <div className="app-header-left"></div>
      <div className="app-header-right">
        <MainMenu />
        {/* <div className="header-user">
          <Dropdown menu={{ items, onClick }} placement="bottomLeft">
            <span className="user-name" children={userInfo?.loginName || userInfo?.realName || "访客"} />
          </Dropdown>
        </div>
        <CustomModal
          title="修改密码"
          destroyOnClose
          open={editPassword}
          footer={null}
          onCancel={() => setEditPassword(false)}
          Component={UpPassword}
          componentProps={{ buttonClick: updatePassword, selectRowInfo: userInfo }}
        /> */}
      </div>
    </div>
  )
}
