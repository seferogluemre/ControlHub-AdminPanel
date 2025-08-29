import { createFileRoute } from "@tanstack/react-router";
import AgentChats from "#/features/admin/history/agent-chats";

export const Route = createFileRoute("/_authenticated/admin/history/agent-chats")({
  component: AgentChats,
});
