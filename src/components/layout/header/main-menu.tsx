/*
 * @Author: chenmeifeng
 * @Date: 2024-12-03 10:51:33
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2024-12-04 14:46:59
 * @Description:
 */
import LargeScreenContext from "@/contexts/menu-context";
import { ATOM_ROUTER_ALL } from "@/store/atom-menu";
import { Menu } from "antd";
import { ItemType } from "antd/es/menu/interface";
import { useAtomValue } from "jotai";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function MainMenu() {
  const [checkedMenu, setCheckedMenu] = useState<string[]>([]);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const navigateRef = useRef(navigate);
  navigateRef.current = navigate;
  const { setCurrentChoosePathParent } = useContext(LargeScreenContext);
  const allMenu = useAtomValue(ATOM_ROUTER_ALL);
  const menuItems = useMemo(() => {
    const menu = allMenu.map((i) => {
      return {
        key: i.key,
        label: i.label,
        title: i.label,
      };
    });
    return menu;
  }, [allMenu]);
  const handleSelectRef = useCallback(
    ({ keyPath, key }: { keyPath: string[]; key: any }) => {
      setCurrentChoosePathParent(key);
      const toPath = allMenu?.find((menu) => menu.key === key)?.children?.[0]
        .path;
      navigateRef.current(`/${toPath}`);
    },
    [allMenu]
  );
  useEffect(() => {
    if (!allMenu?.length) return;
    let currentPath = "";
    if (pathname === "/") {
      currentPath = allMenu?.[0].key;
    } else {
      currentPath = pathname?.split("/")?.[1];
    }
    setCurrentChoosePathParent(currentPath);
    setCheckedMenu([currentPath]);
  }, [allMenu, pathname]);
  return (
    <Menu
      mode="horizontal"
      items={menuItems as ItemType[]}
      selectedKeys={checkedMenu}
      onSelect={handleSelectRef}
      className="sider-menu"
    />
  );
}
