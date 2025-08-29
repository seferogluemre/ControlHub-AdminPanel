import { Elysia } from "elysia";
import {
  chatVisitorCreateDto,
  chatVisitorDestroyDto,
  chatVisitorIndexDto,
  chatVisitorShowDto,
  chatVisitorUpdateDto,
} from "./dtos";
import { ChatVisitorService } from "./service";

const app = new Elysia({
  prefix: "/chat-visitor",
  tags: ["Chat Visitor"],
})
  .get(
    "/",
    async () => {
      const chatVisitors = await ChatVisitorService.index();
      return chatVisitors;
    },
    chatVisitorIndexDto,
  )
  .get(
    "/:uuid",
    async ({ params }) => {
      const chatVisitor = await ChatVisitorService.show(params.uuid);
      return chatVisitor;
    },
    chatVisitorShowDto,
  )
  .post(
    "/",
    async ({ body }) => {
      const chatVisitor = await ChatVisitorService.store(body);
      return chatVisitor;
    },
    chatVisitorCreateDto,
  )
  .patch(
    "/:uuid",
    async ({ params, body }) => {
      const chatVisitor = await ChatVisitorService.update(params.uuid, body);
      return chatVisitor;
    },
    chatVisitorUpdateDto,
  )
  .delete(
    "/:uuid",
    async ({ params }) => {
      const chatVisitor = await ChatVisitorService.destroy(params.uuid);
      return chatVisitor;
    },
    chatVisitorDestroyDto,
  );

export default app;
