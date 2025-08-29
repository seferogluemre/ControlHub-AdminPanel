import { Elysia } from "elysia";
import {
  chatCannedMessageCreateDto,
  chatCannedMessageDestroyDto,
  chatCannedMessageIndexDto,
  chatCannedMessageShowDto,
  chatCannedMessageUpdateDto,
} from "./dtos";
import { ChatCannedMessageService } from "./service";

const app = new Elysia({
  prefix: "/chat-canned-message",
  tags: ["Chat Canned Message"],
})
  .get(
    "/",
    async () => {
      const chatCannedMessages = await ChatCannedMessageService.index();
      return chatCannedMessages;
    },
    chatCannedMessageIndexDto,
  )
  .get(
    "/:uuid",
    async ({ params }) => {
      const chatCannedMessage = await ChatCannedMessageService.show(params.uuid);
      return chatCannedMessage;
    },
    chatCannedMessageShowDto,
  )
  .post(
    "/",
    async ({ body }) => {
      const chatCannedMessage = await ChatCannedMessageService.store(body);
      return chatCannedMessage;
    },
    chatCannedMessageCreateDto,
  )
  .patch(
    "/:uuid",
    async ({ params, body }) => {
      const chatCannedMessage = await ChatCannedMessageService.update(params.uuid, body);
      return chatCannedMessage;
    },
    chatCannedMessageUpdateDto,
  )
  .delete(
    "/:uuid",
    async ({ params }) => {
      const chatCannedMessage = await ChatCannedMessageService.destroy(params.uuid);
      return chatCannedMessage;
    },
    chatCannedMessageDestroyDto,
  );

export default app;
