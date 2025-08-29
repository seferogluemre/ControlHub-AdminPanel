import { Elysia } from "elysia";
import {
  chatConversationCreateDto,
  chatConversationDestroyDto,
  chatConversationIndexDto,
  chatConversationShowDto,
  chatConversationUpdateDto,
} from "./dtos";
import { ChatConversationService } from "./service";

const app = new Elysia({
  prefix: "/chat-conversation",
  tags: ["Chat Conversation"],
})
  .get(
    "/",
    async () => {
      const chatConversations = await ChatConversationService.index();
      return chatConversations;
    },
    chatConversationIndexDto,
  )
  .get(
    "/:uuid",
    async ({ params }) => {
      const chatConversation = await ChatConversationService.show(params.uuid);
      return chatConversation;
    },
    chatConversationShowDto,
  )
  .post(
    "/",
    async ({ body }) => {
      const chatConversation = await ChatConversationService.store(body);
      return chatConversation;
    },
    chatConversationCreateDto,
  )
  .patch(
    "/:uuid",
    async ({ params, body }) => {
      const chatConversation = await ChatConversationService.update(params.uuid, body);
      return chatConversation;
    },
    chatConversationUpdateDto,
  )
  .delete(
    "/:uuid",
    async ({ params }) => {
      const chatConversation = await ChatConversationService.destroy(params.uuid);
      return chatConversation;
    },
    chatConversationDestroyDto,
  );

export default app;
