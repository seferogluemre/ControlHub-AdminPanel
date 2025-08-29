import { BarChart3, Settings, Settings2, User, Users, FolderKanban, Activity } from "lucide-react";
import { SidebarData } from "../types";

export const adminPanelsData: SidebarData = {
  navGroups: [
    {
      title: "Project Management",
      items: [
        { title: "Project Settings", url: "/admin/projects/settings", icon: Settings },
        { title: "Workflow Config", url: "/admin/projects/config", icon: Settings2 },
        { title: "Templates", url: "/admin/projects/templates", icon: FolderKanban },
      ],
    },
    {
      title: "System Administration",
      items: [
        { title: "Team Members", url: "/admin/global-settings/team", icon: User },
        { title: "Departments", url: "/admin/global-settings/departments", icon: Users },
        { title: "Roles & Permissions", url: "/admin/global-settings/roles", icon: User },
      ],
    },
    {
      title: "Analytics & Reports",
      items: [
        { title: "Project Reports", url: "/admin/analytics/projects", icon: BarChart3 },
        { title: "Team Performance", url: "/admin/analytics/team", icon: Activity },
      ],
    },
  ],
};
