import { createFileRoute } from "@tanstack/react-router";
import EditAgent from "#/features/admin/global-settings/agents/edit";

export const Route = createFileRoute("/_authenticated/admin/global-settings/agents/edit/$id")({
  component: EditAgent,
});
