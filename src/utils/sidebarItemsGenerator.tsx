/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink } from "react-router-dom";
import { TSidebarItem, TUserPath } from "../types/sidebarTypes";

export const sidebarItemsGenerator = (items: TUserPath[]) => {
  const sidebarItems = items.reduce((acc: TSidebarItem[], item) => {
    if (item.path && item.name) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/${item.path}`}>{item.name}</NavLink>,
      });
    }

    if (item.children) {
      acc.push({
        key: item.name,
        label: item.name,
        children: item.children.map((child: any) => {
          if (child.name) {
            return {
              key: child.name,
              label: <NavLink to={`/${child.path}`}>{child.name}</NavLink>,
            };
          }
        }),
      });
    }

    return acc;
  }, []);

  return sidebarItems;
};
