import { createFileRoute } from "@tanstack/react-router";
import CreateAgent from "#/features/admin/global-settings/agents/create";

export const Route = createFileRoute("/_authenticated/admin/global-settings/agents/new")({
  component: CreateAgent,
});
