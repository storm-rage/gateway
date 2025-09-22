/*
 * @Author: chenmeifeng
 * @Date: 2024-12-02 16:32:02
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2024-12-03 16:02:03
 * @Description:
 */
import { AtomUserOfMenuMap } from "@store/atom-menu.ts";
import { useAtomValue } from "jotai";
import { RouterProvider, createHashRouter } from "react-router-dom";

export default function Routes() {
  const menuOfUser = useAtomValue(AtomUserOfMenuMap);
  const routerList = createHashRouter(menuOfUser);

  return <RouterProvider router={routerList} />;
}
