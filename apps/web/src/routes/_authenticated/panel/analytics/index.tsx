import { createFileRoute } from "@tanstack/react-router";
import Analytics from "#features/project-analytics/index.tsx";

export const Route = createFileRoute("/_authenticated/panel/analytics/")({
  component: Analytics,
});