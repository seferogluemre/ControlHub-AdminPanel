import { type ControllerHook, errorResponseDto, uuidValidation } from "#utils";
import {
  ChatConversationEventInputCreate,
  ChatConversationEventInputUpdate,
  ChatConversationEventPlain,
} from "@devflow/db/prismabox/ChatConversationEvent";
import { t } from "elysia";

export const chatConversationEventResponseDto = t.Composite([
  t.Omit(ChatConversationEventPlain, ["id", "deletedAt"]),
]);

export const chatConversationEventCreatePayload = t.Composite([
  t.Omit(ChatConversationEventInputCreate, ["deletedAt"]),
]);

export const chatConversationEventUpdatePayload = t.Composite([
  t.Omit(ChatConversationEventInputUpdate, ["deletedAt"]),
]);

export const chatConversationEventIndexDto = {
  response: { 200: t.Array(chatConversationEventResponseDto) },
  detail: {
    summary: "Index",
  },
} satisfies ControllerHook;

export const chatConversationEventShowDto = {
  params: t.Object({
    uuid: uuidValidation,
  }),
  response: { 200: chatConversationEventResponseDto, 404: errorResponseDto[404] },
  detail: {
    summary: "Show",
  },
} satisfies ControllerHook;

export const chatConversationEventCreateDto = {
  body: chatConversationEventCreatePayload,
  response: {
    200: chatConversationEventResponseDto,
    422: errorResponseDto[422],
  },
  detail: {
    summary: "Create",
  },
} satisfies ControllerHook;

export const chatConversationEventUpdateDto = {
  params: t.Object({
    uuid: uuidValidation,
  }),
  body: chatConversationEventUpdatePayload,
  response: {
    200: chatConversationEventResponseDto,
    404: errorResponseDto[404],
    422: errorResponseDto[422],
  },
  detail: {
    summary: "Update",
  },
} satisfies ControllerHook;

export const chatConversationEventDestroyDto = {
  params: t.Object({
    uuid: uuidValidation,
  }),
  response: {
    200: chatConversationEventResponseDto,
    404: errorResponseDto[404],
  },
  detail: {
    summary: "Destroy",
  },
} satisfies ControllerHook;
