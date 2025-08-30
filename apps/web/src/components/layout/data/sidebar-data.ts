import {
  IconChecklist,
  IconLayoutDashboard,
  IconUsers,
  IconSettings,
  IconChartBar,
  IconFolders,
} from "@tabler/icons-react";
import { type SidebarData } from "../types";

export const sidebarData: SidebarData = {
  navGroups: [
    {
      title: "Overview",
      items: [
        {
          title: "Dashboard",
          url: "/panel/dashboard",
          icon: IconLayoutDashboard,
        },
        {
          title: "Projects",
          url: "/panel/projects",
          icon: IconFolders,
        },
        {
          title: "Tasks",
          url: "/panel/tasks",
          icon: IconChecklist,
        },
        {
          title: "Analytics",
          url: "/panel/analytics",
          icon: IconChartBar,
        },
      ],
    },
    {
      title: "Management",
      items: [
        {
          title: "Team Members",
          url: "/panel/team",
          icon: IconUsers,
        },
        {
          title: "Settings",
          icon: IconSettings,
          url: "/panel/settings",
        },
      ],
    },
  ],
};
