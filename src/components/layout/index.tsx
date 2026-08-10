/*
 * @Author: chenmeifeng
 * @Date: 2024-12-02 17:42:30
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2024-12-05 14:33:49
 * @Description:
 */
import "./index.less";
import { Layout } from "antd";
import Header from "./header";
import { BoxLoading } from "../box-loading";
import { ReactNode, useEffect, useMemo, useState } from "react";
import LayoutContent from "./layout-content";
import { AtomRouteReady, AtomUserOfMenuMap } from "@/store/atom-menu";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useLocation, useNavigate } from "react-router-dom";
import { MENU_SPLIT_FLAG } from "@/router/variables";
import LargeScreenContext from "@/contexts/menu-context";
import { userInfoAtom } from "@/store/atom-auth";
import { showMsg } from "@/utils/util-funs";
interface IProps {
  children?: ReactNode;
}
export default function LayoutApp(props: IProps) {
  const { children } = props;
  const menuList = useAtomValue(AtomUserOfMenuMap);
  const [routeReady, setRouteReady] = useAtom(AtomRouteReady);
  const userInfo = useAtomValue(userInfoAtom);
  const [currentChoosePathParent, setCurrentChoosePathParent] = useState("");
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // 根路由、没登录、路由数据没处理好
    if (pathname !== "/" || !routeReady || !userInfo?.token) return;
    const firstMenuPath = menuList.find(({ path }) => path === MENU_SPLIT_FLAG)
      ?.children?.[0]?.path;
    if (!firstMenuPath) return;
    navigate(firstMenuPath);
  }, [menuList, navigate, routeReady, pathname]);
  // useEffect(() => {
  //   if (!userInfo?.token) {
  //     showMsg("请先登录");
  //     navigate("/login");
  //   }
  // }, [userInfo]);
  return (
    <LargeScreenContext.Provider
      value={{ currentChoosePathParent, setCurrentChoosePathParent }}
    >
      <Layout className="l-full app-layout none-select">
        <Layout.Header children={<Header />} />
        {routeReady ? children ?? <LayoutContent /> : <BoxLoading />}
      </Layout>
    </LargeScreenContext.Provider>
  );
}
