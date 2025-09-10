import { type ControllerHook, errorResponseDto, uuidValidation } from "#utils";
import {
  ChatVisitorInputCreate,
  ChatVisitorInputUpdate,
  ChatVisitorPlain,
} from "@devflow/db/prismabox/ChatVisitor";
import { t } from "elysia";

export const chatVisitorResponseDto = t.Composite([t.Omit(ChatVisitorPlain, ["id", "deletedAt"])]);

export const chatVisitorCreatePayload = t.Composite([
  t.Omit(ChatVisitorInputCreate, ["deletedAt"]),
]);

export const chatVisitorUpdatePayload = t.Composite([
  t.Omit(ChatVisitorInputUpdate, ["deletedAt"]),
]);

export const chatVisitorIndexDto = {
  response: { 200: t.Array(chatVisitorResponseDto) },
  detail: {
    summary: "Index",
  },
} satisfies ControllerHook;

export const chatVisitorShowDto = {
  params: t.Object({
    uuid: uuidValidation,
  }),
  response: { 200: chatVisitorResponseDto, 404: errorResponseDto[404] },
  detail: {
    summary: "Show",
  },
} satisfies ControllerHook;

export const chatVisitorCreateDto = {
  body: chatVisitorCreatePayload,
  response: {
    200: chatVisitorResponseDto,
    422: errorResponseDto[422],
  },
  detail: {
    summary: "Create",
  },
} satisfies ControllerHook;

export const chatVisitorUpdateDto = {
  params: t.Object({
    uuid: uuidValidation,
  }),
  body: chatVisitorUpdatePayload,
  response: {
    200: chatVisitorResponseDto,
    404: errorResponseDto[404],
    422: errorResponseDto[422],
  },
  detail: {
    summary: "Update",
  },
} satisfies ControllerHook;

export const chatVisitorDestroyDto = {
  params: t.Object({
    uuid: uuidValidation,
  }),
  response: {
    200: chatVisitorResponseDto,
    404: errorResponseDto[404],
  },
  detail: {
    summary: "Destroy",
  },
} satisfies ControllerHook;
