import { type Static } from "elysia";
import {
  chatVisitorStaffNoteCreatePayload,
  chatVisitorStaffNoteResponseDto,
  chatVisitorStaffNoteUpdatePayload,
} from "./dtos";

export type ChatVisitorStaffNoteResponse = Static<typeof chatVisitorStaffNoteResponseDto>;
export type ChatVisitorStaffNoteCreatePayload = Static<typeof chatVisitorStaffNoteCreatePayload>;
export type ChatVisitorStaffNoteUpdatePayload = Static<typeof chatVisitorStaffNoteUpdatePayload>;
