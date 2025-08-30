import { NavGroup } from "#/components/layout/nav-group";
import { Sidebar, SidebarContent, SidebarRail } from "#/components/ui/sidebar";
import { SidebarData } from "./types";
import { useCommonTranslation } from "#/lib/i18n/hooks";
import { sidebarData } from "./data/sidebar-data";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {}

export function AppSidebar({ ...props }: AppSidebarProps) {
  const { t } = useCommonTranslation();

  // Translate sidebar data
  const translatedSidebarData: SidebarData = {
    navGroups: [
      {
        title: "Overview",
        items: [
          {
            title: t("navigation.dashboard"),
            url: "/panel/dashboard",
            icon: sidebarData.navGroups[0].items[0].icon,
          },
          {
            title: t("navigation.projects"),
            url: "/panel/projects",
            icon: sidebarData.navGroups[0].items[1].icon,
          },
          {
            title: t("navigation.tasks"),
            url: "/panel/tasks",
            icon: sidebarData.navGroups[0].items[2].icon,
          },
          {
            title: t("navigation.analytics"),
            url: "/panel/analytics",
            icon: sidebarData.navGroups[0].items[3].icon,
          },
        ],
      },
      {
        title: "Management",
        items: [
          {
            title: t("navigation.team"),
            url: "/panel/team",
            icon: sidebarData.navGroups[1].items[0].icon,
          },
          {
            title: t("navigation.settings"),
            url: "/panel/settings",
            icon: sidebarData.navGroups[1].items[1].icon,
          },
        ],
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      {/* <SidebarHeader>
        <TeamSwitcher teams={sidebarData.teams} />
      </SidebarHeader> */}
      <SidebarContent>
        {translatedSidebarData.navGroups.map((navGroup) => (
          <NavGroup key={navGroup.title} {...navGroup} />
        ))}
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser user={sidebarData.user} />
      </SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  );
}
