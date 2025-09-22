/*
 * @Author: chenmeifeng
 * @Date: 2024-12-03 11:02:34
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2024-12-03 16:56:42
 * @Description:
 */
import { BoxLoading } from "@/components/box-loading";
import { ITreeMenuItem } from "@/router/interface";
import { Suspense, createElement } from "react";
import { RouteObject } from "react-router-dom";

// 用原始树形菜单数据生成路由对象数据
export function createRouteObject(treeData: ITreeMenuItem[]): RouteObject[] {
  return treeData.reduce((prev, next) => {
    const { title, path, key, element, children } = next;
    if (element) {
      const elementComp = (
        <Suspense fallback={<BoxLoading />}>
          {element ? (
            createElement(element, { key })
          ) : (
            <div children={`${title}`} />
          )}
        </Suspense>
      );
      prev.push({ path, element: elementComp });
    }
    if (children?.length) {
      prev.push(...createRouteObject(children));
    }
    return prev;
  }, [] as RouteObject[]);
}
// 处理菜单的图标
export function dealMenuIcon(icon?: ITreeMenuItem["icon"]) {
  return typeof icon === "string" && icon ? (
    <i className={`icon-item iconfont ${icon}`} />
  ) : (
    icon || undefined
  );
}
// 将 ITreeMenuItem 类型数据处理成菜单组件所需数据
export function dealPathOftreeMenuData(
  treeMenuData: ITreeMenuItem[],
  currentRolePermission: string[] | null,
  position: number,
  parentKey?: string
): ITreeMenuItem[] {
  let path: string;
  const roleMenu = currentRolePermission?.map((i) => i.split(":")[position]);
  return treeMenuData
    .filter((tree) => roleMenu?.includes(tree.key))
    ?.reduce((prev, next) => {
      path = parentKey ? `${parentKey}/${next.key}` : `${next.key}`;
      // 去掉 ITreeMenuItem 中的 selectable，避免menu 组件报警
      const newMenu: ITreeMenuItem = {
        ...next,
        path, // 父子菜单路径拼接，用于路由跳转
        label: next.title,
        icon: dealMenuIcon(next.icon), // 设置的图标
      };
      if (next.children?.length) {
        newMenu.children = dealPathOftreeMenuData(
          next.children,
          currentRolePermission,
          1,
          path
        );
      }
      prev.push(newMenu);
      return prev;
    }, [] as ITreeMenuItem[]);
}
