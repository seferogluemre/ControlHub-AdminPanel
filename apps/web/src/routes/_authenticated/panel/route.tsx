import { AppLayout } from "#components/layout/app-layout.tsx";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/panel")({
  component: () => <AppLayout />,
});
