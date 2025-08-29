import { createFileRoute } from "@tanstack/react-router";
import Chats from "#/features/chats";

export const Route = createFileRoute("/_authenticated/panel/chats/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Chats />;
}
