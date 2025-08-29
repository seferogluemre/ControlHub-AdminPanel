import { createFileRoute } from "@tanstack/react-router";
import Agents from "#/features/admin/global-settings/agents";

export const Route = createFileRoute("/_authenticated/admin/global-settings/agents/")({
  component: Agents,
});
