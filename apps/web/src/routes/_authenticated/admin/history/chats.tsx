import { createFileRoute } from "@tanstack/react-router";
import Chats from "#/features/admin/history/chats";

export const Route = createFileRoute("/_authenticated/admin/history/chats")({
  component: Chats,
});
