import { Elysia } from "elysia";
import {
  chatVisitorStaffNoteCreateDto,
  chatVisitorStaffNoteDestroyDto,
  chatVisitorStaffNoteIndexDto,
  chatVisitorStaffNoteShowDto,
  chatVisitorStaffNoteUpdateDto,
} from "./dtos";
import { ChatVisitorStaffNoteService } from "./service";

const app = new Elysia({
  prefix: "/chat-visitor-staff-note",
  tags: ["Chat Visitor Staff Note"],
})
  .get(
    "/",
    async () => {
      const chatVisitorStaffNotes = await ChatVisitorStaffNoteService.index();
      return chatVisitorStaffNotes;
    },
    chatVisitorStaffNoteIndexDto,
  )
  .get(
    "/:uuid",
    async ({ params }) => {
      const chatVisitorStaffNote = await ChatVisitorStaffNoteService.show(params.uuid);
      return chatVisitorStaffNote;
    },
    chatVisitorStaffNoteShowDto,
  )
  .post(
    "/",
    async ({ body }) => {
      const chatVisitorStaffNote = await ChatVisitorStaffNoteService.store(body);
      return chatVisitorStaffNote;
    },
    chatVisitorStaffNoteCreateDto,
  )
  .patch(
    "/:uuid",
    async ({ params, body }) => {
      const chatVisitorStaffNote = await ChatVisitorStaffNoteService.update(params.uuid, body);
      return chatVisitorStaffNote;
    },
    chatVisitorStaffNoteUpdateDto,
  )
  .delete(
    "/:uuid",
    async ({ params }) => {
      const chatVisitorStaffNote = await ChatVisitorStaffNoteService.destroy(params.uuid);
      return chatVisitorStaffNote;
    },
    chatVisitorStaffNoteDestroyDto,
  );

export default app;
