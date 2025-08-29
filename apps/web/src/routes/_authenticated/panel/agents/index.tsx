import { createFileRoute } from "@tanstack/react-router";
import Agents from "#/features/agents";

export const Route = createFileRoute("/_authenticated/panel/agents/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Agents />;
}
