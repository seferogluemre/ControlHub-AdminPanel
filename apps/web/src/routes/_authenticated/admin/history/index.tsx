import { createFileRoute } from "@tanstack/react-router";
import History from "#/features/admin/history";

export const Route = createFileRoute("/_authenticated/admin/history/")({
  component: History,
});
