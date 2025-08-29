import { createFileRoute } from "@tanstack/react-router";
import EditRole from "#/features/admin/global-settings/roles/edit";

export const Route = createFileRoute("/_authenticated/admin/global-settings/roles/edit/$id")({
  component: EditRole,
});
