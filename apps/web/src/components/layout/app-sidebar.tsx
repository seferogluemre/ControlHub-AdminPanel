import { NavGroup } from "#/components/layout/nav-group";
import { Sidebar, SidebarContent, SidebarRail } from "#/components/ui/sidebar";
import { SidebarData } from "./types";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  sidebarData: SidebarData;
}

export function AppSidebar({ sidebarData, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      {/* <SidebarHeader>
        <TeamSwitcher teams={sidebarData.teams} />
      </SidebarHeader> */}
      <SidebarContent>
        {sidebarData.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser user={sidebarData.user} />
      </SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  );
}
