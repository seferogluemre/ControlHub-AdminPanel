import { createFileRoute } from "@tanstack/react-router";
import Roles from "#/features/admin/global-settings/roles";

export const Route = createFileRoute("/_authenticated/admin/global-settings/roles/")({
  component: Roles,
});
