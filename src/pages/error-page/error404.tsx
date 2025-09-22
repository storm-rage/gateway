/*
 * @Author: chenmeifeng
 * @Date: 2024-12-02 17:07:00
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2024-12-03 16:11:22
 * @Description:
 */
import { RollbackOutlined } from "@ant-design/icons";
import { AtomUserOfMenuMap } from "@store/atom-menu.ts";
import { Button, Result } from "antd";
import { useAtomValue } from "jotai";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

import { MENU_SPLIT_FLAG } from "@/router/variables.ts";
import LayoutApp from "@/components/layout";

export default function Error404() {
  const menuList = useAtomValue(AtomUserOfMenuMap);
  const navigate = useNavigate();
  const navRef = useRef(navigate);

  navRef.current = navigate;
  const backClkRef = useRef(() => {
    const firstMenuPath = menuList.find(({ path }) => path === MENU_SPLIT_FLAG)
      ?.children?.[0]?.path;
    if (!firstMenuPath) return;
    navRef.current?.(firstMenuPath);
  });
  return (
    <LayoutApp
      children={
        <Result
          status="404"
          title="404"
          subTitle="抱歉，您访问的页面不存在！"
          extra={
            <Button
              icon={<RollbackOutlined />}
              children="返回首页"
              onClick={backClkRef.current}
            />
          }
        />
      }
    />
  );
}
