import { createFileRoute } from "@tanstack/react-router";
import EditDepartment from "#/features/admin/global-settings/departments/edit";

export const Route = createFileRoute("/_authenticated/admin/global-settings/departments/edit/$id")({
  component: EditDepartment,
});
