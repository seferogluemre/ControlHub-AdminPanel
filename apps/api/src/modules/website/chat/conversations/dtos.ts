import { type ControllerHook, errorResponseDto, uuidValidation } from "#utils";
import {
  ChatConversationInputCreate,
  ChatConversationInputUpdate,
  ChatConversationPlain,
} from "@onlyjs/db/prismabox/ChatConversation";
import { t } from "elysia";

export const chatConversationResponseDto = t.Composite([
  t.Omit(ChatConversationPlain, ["id", "deletedAt"]),
]);

export const chatConversationCreatePayload = t.Composite([
  t.Omit(ChatConversationInputCreate, ["deletedAt"]),
]);

export const chatConversationUpdatePayload = t.Composite([
  t.Omit(ChatConversationInputUpdate, ["deletedAt"]),
]);

export const chatConversationIndexDto = {
  response: { 200: t.Array(chatConversationResponseDto) },
  detail: {
    summary: "Index",
  },
} satisfies ControllerHook;

export const chatConversationShowDto = {
  params: t.Object({
    uuid: uuidValidation,
  }),
  response: { 200: chatConversationResponseDto, 404: errorResponseDto[404] },
  detail: {
    summary: "Show",
  },
} satisfies ControllerHook;

export const chatConversationCreateDto = {
  body: chatConversationCreatePayload,
  response: {
    200: chatConversationResponseDto,
    422: errorResponseDto[422],
  },
  detail: {
    summary: "Create",
  },
} satisfies ControllerHook;

export const chatConversationUpdateDto = {
  params: t.Object({
    uuid: uuidValidation,
  }),
  body: chatConversationUpdatePayload,
  response: {
    200: chatConversationResponseDto,
    404: errorResponseDto[404],
    422: errorResponseDto[422],
  },
  detail: {
    summary: "Update",
  },
} satisfies ControllerHook;

export const chatConversationDestroyDto = {
  params: t.Object({
    uuid: uuidValidation,
  }),
  response: {
    200: chatConversationResponseDto,
    404: errorResponseDto[404],
  },
  detail: {
    summary: "Destroy",
  },
} satisfies ControllerHook;
