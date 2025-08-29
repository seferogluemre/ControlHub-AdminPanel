import { LinkProps } from "@tanstack/react-router";

interface BaseNavItem {
  title: string;
  badge?: string;
  icon?: React.ElementType;
}

type NavLink = BaseNavItem & {
  url: LinkProps["to"];
  items?: never;
};

type NavCollapsible = BaseNavItem & {
  items: (BaseNavItem & { url: LinkProps["to"] })[];
  url?: never;
};

type NavItem = NavCollapsible | NavLink;

interface NavGroupType {
  title: string;
  items: NavItem[];
}

interface SidebarData {
  navGroups: NavGroupType[];
}

export type { NavCollapsible, NavGroupType, NavItem, NavLink, SidebarData };
