import { AppLayout } from "#components/layout/app-layout.tsx";
import { adminPanelsData } from "#components/layout/data/admin-panels-data.ts";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin")({
  component: () => <AppLayout sidebarData={adminPanelsData} />,
});
