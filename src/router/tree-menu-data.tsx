/*
 * @Author: chenmeifeng
 * @Date: 2024-12-02 17:21:37
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2024-12-05 16:44:07
 * @Description:
 */
import Model from "@/router/model";

import { ITreeMenuItem } from "./interface";
import { MANAGE, MODEL, RULE } from "./variables";
import MenuRuleSetting from "./setting";
import MenuManage from "./manage";

export const TREE_MENU_DATA: ITreeMenuItem[] = [
  {
    title: "网关机配置",
    key: MODEL,
    // icon: <img alt="" src="/images/menu/area_center.png" style={{ width: "1.2em", height: "1.2em" }} />,
    children: Model,
  },
  // {
  //   title: "规则配置",
  //   key: RULE,
  //   // icon: <img alt="" src="/images/menu/area_center.png" style={{ width: "1.2em", height: "1.2em" }} />,
  //   children: MenuRuleSetting,
  // },
  // {
  //   title: "权限配置",
  //   key: MANAGE,
  //   // icon: <img alt="" src="/images/menu/area_center.png" style={{ width: "1.2em", height: "1.2em" }} />,
  //   children: MenuManage,
  // },
];
