import { AppSidebar } from "#/components/layout/app-sidebar";
import SkipToMain from "#/components/skip-to-main";
import { SidebarProvider } from "#/components/ui/sidebar";
import { cn } from "#/lib/utils";
import { ProfileDropdown } from "#components/profile-dropdown.tsx";
import { ThemeSwitch } from "#components/theme-switch.tsx";
import { LanguageSwitcher } from "#components/language-switcher.tsx";
import { Outlet } from "@tanstack/react-router";
import Cookies from "js-cookie";
import { Header } from "./header";
import { Main } from "./main";
import { SidebarData } from "./types";

interface Props {
  children?: React.ReactNode;
}

export function AppLayout({ children }: Props) {
  const defaultOpen = Cookies.get("sidebar_state") !== "false";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <SkipToMain />
      <AppSidebar />
      <div
        id="content"
        className={cn(
          "ml-auto w-full max-w-full",
          "peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]",
          "peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]",
          "sm:transition-[width] sm:duration-200 sm:ease-linear",
          "flex h-svh flex-col",
          "group-data-[scroll-locked=1]/body:h-full",
          "has-[main.fixed-main]:group-data-[scroll-locked=1]/body:h-svh",
        )}
      >
        <Header fixed>
          <div className="ml-auto flex items-center gap-2">
            <LanguageSwitcher variant="compact" />
            <ThemeSwitch />
            <ProfileDropdown />
          </div>
        </Header>
        <Main>{children ? children : <Outlet />}</Main>
      </div>
    </SidebarProvider>
  );
}
