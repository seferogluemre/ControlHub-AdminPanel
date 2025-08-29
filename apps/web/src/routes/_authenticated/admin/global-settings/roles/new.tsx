import { createFileRoute } from "@tanstack/react-router";
import CreateRole from "#/features/admin/global-settings/roles/create";

export const Route = createFileRoute("/_authenticated/admin/global-settings/roles/new")({
  component: CreateRole,
});
