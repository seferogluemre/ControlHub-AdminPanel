import { Elysia } from "elysia";
import {
  chatConversationEventCreateDto,
  chatConversationEventDestroyDto,
  chatConversationEventIndexDto,
  chatConversationEventShowDto,
  chatConversationEventUpdateDto,
} from "./dtos";
import { ChatConversationEventService } from "./service";

const app = new Elysia({
  prefix: "/chat-conversation-event",
  tags: ["Chat Conversation Event"],
})
  .get(
    "/",
    async () => {
      const chatConversationEvents = await ChatConversationEventService.index();
      return chatConversationEvents;
    },
    chatConversationEventIndexDto,
  )
  .get(
    "/:uuid",
    async ({ params }) => {
      const chatConversationEvent = await ChatConversationEventService.show(params.uuid);
      return chatConversationEvent;
    },
    chatConversationEventShowDto,
  )
  .post(
    "/",
    async ({ body }) => {
      const chatConversationEvent = await ChatConversationEventService.store(body);
      return chatConversationEvent;
    },
    chatConversationEventCreateDto,
  )
  .patch(
    "/:uuid",
    async ({ params, body }) => {
      const chatConversationEvent = await ChatConversationEventService.update(params.uuid, body);
      return chatConversationEvent;
    },
    chatConversationEventUpdateDto,
  )
  .delete(
    "/:uuid",
    async ({ params }) => {
      const chatConversationEvent = await ChatConversationEventService.destroy(params.uuid);
      return chatConversationEvent;
    },
    chatConversationEventDestroyDto,
  );

export default app;
