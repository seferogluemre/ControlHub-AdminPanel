import { type ControllerHook, errorResponseDto, uuidValidation } from "#utils";
import {
  ChatCannedMessageInputCreate,
  ChatCannedMessageInputUpdate,
  ChatCannedMessagePlain,
} from "@devflow/db/prismabox/ChatCannedMessage";
import { t } from "elysia";

export const chatCannedMessageResponseDto = t.Composite([
  t.Omit(ChatCannedMessagePlain, ["id", "deletedAt"]),
]);

export const chatCannedMessageCreatePayload = t.Composite([
  t.Omit(ChatCannedMessageInputCreate, ["deletedAt"]),
]);

export const chatCannedMessageUpdatePayload = t.Composite([
  t.Omit(ChatCannedMessageInputUpdate, ["deletedAt"]),
]);

export const chatCannedMessageIndexDto = {
  response: { 200: t.Array(chatCannedMessageResponseDto) },
  detail: {
    summary: "Index",
  },
} satisfies ControllerHook;

export const chatCannedMessageShowDto = {
  params: t.Object({
    uuid: uuidValidation,
  }),
  response: { 200: chatCannedMessageResponseDto, 404: errorResponseDto[404] },
  detail: {
    summary: "Show",
  },
} satisfies ControllerHook;

export const chatCannedMessageCreateDto = {
  body: chatCannedMessageCreatePayload,
  response: {
    200: chatCannedMessageResponseDto,
    422: errorResponseDto[422],
  },
  detail: {
    summary: "Create",
  },
} satisfies ControllerHook;

export const chatCannedMessageUpdateDto = {
  params: t.Object({
    uuid: uuidValidation,
  }),
  body: chatCannedMessageUpdatePayload,
  response: {
    200: chatCannedMessageResponseDto,
    404: errorResponseDto[404],
    422: errorResponseDto[422],
  },
  detail: {
    summary: "Update",
  },
} satisfies ControllerHook;

export const chatCannedMessageDestroyDto = {
  params: t.Object({
    uuid: uuidValidation,
  }),
  response: {
    200: chatCannedMessageResponseDto,
    404: errorResponseDto[404],
  },
  detail: {
    summary: "Destroy",
  },
} satisfies ControllerHook;
