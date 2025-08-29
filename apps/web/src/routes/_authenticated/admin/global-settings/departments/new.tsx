import { createFileRoute } from "@tanstack/react-router";
import CreateDepartment from "#/features/admin/global-settings/departments/create";

export const Route = createFileRoute("/_authenticated/admin/global-settings/departments/new")({
  component: CreateDepartment,
});
