import { createFileRoute } from "@tanstack/react-router";
import Departments from "#/features/admin/global-settings/departments";

export const Route = createFileRoute("/_authenticated/admin/global-settings/departments/")({
  component: Departments,
});
