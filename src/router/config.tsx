/*
 * @Author: chenmeifeng
 * @Date: 2024-12-02 17:40:56
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2024-12-03 16:10:09
 * @Description:
 */
import { RouteObject } from "react-router-dom";

import LoginPage from "@pages/login/index";
import LayoutApp from "@/components/layout";
import Error404 from "@/pages/error-page/error404";
import Error403 from "@/pages/error-page/error403";
/**
 * 路由配置
 */
const routesConfig: RouteObject[] = [
  {
    path: "/",
    element: <LayoutApp />,
    children: [],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/error403",
    element: <Error403 />,
  },
  {
    path: "*",
    element: <Error404 />,
  },
];
export default routesConfig;
