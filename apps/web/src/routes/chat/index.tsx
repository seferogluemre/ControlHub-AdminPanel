import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { createFileRoute } from "@tanstack/react-router";
import { Thread } from "#components/assistant-ui/thread.tsx";
import { ThreadList } from "#components/assistant-ui/thread-list.tsx";

export const Route = createFileRoute("/chat/")({
  component: RouteComponent,
});

function RouteComponent() {
  const runtime = useChatRuntime({
    api: "http://localhost:3000/ai",
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="grid h-dvh grid-cols-[200px_1fr] gap-x-2 px-4 py-4">
        <ThreadList />
        <Thread />
      </div>
    </AssistantRuntimeProvider>
  );
}
