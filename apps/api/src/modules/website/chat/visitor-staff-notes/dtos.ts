import { type ControllerHook, errorResponseDto, uuidValidation } from "#utils";
import {
  ChatVisitorStaffNoteInputCreate,
  ChatVisitorStaffNoteInputUpdate,
  ChatVisitorStaffNotePlain,
} from "@onlyjs/db/prismabox/ChatVisitorStaffNote";
import { t } from "elysia";

export const chatVisitorStaffNoteResponseDto = t.Composite([
  t.Omit(ChatVisitorStaffNotePlain, ["id", "deletedAt"]),
]);

export const chatVisitorStaffNoteCreatePayload = t.Composite([
  t.Omit(ChatVisitorStaffNoteInputCreate, ["deletedAt"]),
]);

export const chatVisitorStaffNoteUpdatePayload = t.Composite([
  t.Omit(ChatVisitorStaffNoteInputUpdate, ["deletedAt"]),
]);

export const chatVisitorStaffNoteIndexDto = {
  response: { 200: t.Array(chatVisitorStaffNoteResponseDto) },
  detail: {
    summary: "Index",
  },
} satisfies ControllerHook;

export const chatVisitorStaffNoteShowDto = {
  params: t.Object({
    uuid: uuidValidation,
  }),
  response: { 200: chatVisitorStaffNoteResponseDto, 404: errorResponseDto[404] },
  detail: {
    summary: "Show",
  },
} satisfies ControllerHook;

export const chatVisitorStaffNoteCreateDto = {
  body: chatVisitorStaffNoteCreatePayload,
  response: {
    200: chatVisitorStaffNoteResponseDto,
    422: errorResponseDto[422],
  },
  detail: {
    summary: "Create",
  },
} satisfies ControllerHook;

export const chatVisitorStaffNoteUpdateDto = {
  params: t.Object({
    uuid: uuidValidation,
  }),
  body: chatVisitorStaffNoteUpdatePayload,
  response: {
    200: chatVisitorStaffNoteResponseDto,
    404: errorResponseDto[404],
    422: errorResponseDto[422],
  },
  detail: {
    summary: "Update",
  },
} satisfies ControllerHook;

export const chatVisitorStaffNoteDestroyDto = {
  params: t.Object({
    uuid: uuidValidation,
  }),
  response: {
    200: chatVisitorStaffNoteResponseDto,
    404: errorResponseDto[404],
  },
  detail: {
    summary: "Destroy",
  },
} satisfies ControllerHook;
