import { AppLayout } from "#components/layout/app-layout.tsx";
import { sidebarData } from "#components/layout/data/sidebar-data.ts";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/panel")({
  component: () => <AppLayout sidebarData={sidebarData} />,
});
