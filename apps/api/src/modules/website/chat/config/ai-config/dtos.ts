import { type ControllerHook, errorResponseDto, uuidValidation } from "#utils";
import {
  ChatWebsiteAIConfigInputCreate,
  ChatWebsiteAIConfigInputUpdate,
  ChatWebsiteAIConfigPlain,
} from "@devflow/db/prismabox/ChatWebsiteAIConfig";
import { t } from "elysia";

export const chatWebsiteAIConfigResponseDto = t.Composite([
  t.Omit(ChatWebsiteAIConfigPlain, ["id", "deletedAt"]),
]);

export const chatWebsiteAIConfigCreatePayload = t.Composite([
  t.Omit(ChatWebsiteAIConfigInputCreate, ["deletedAt"]),
]);

export const chatWebsiteAIConfigUpdatePayload = t.Composite([
  t.Omit(ChatWebsiteAIConfigInputUpdate, ["deletedAt"]),
]);

export const chatWebsiteAIConfigIndexDto = {
  response: { 200: t.Array(chatWebsiteAIConfigResponseDto) },
  detail: {
    summary: "Index",
  },
} satisfies ControllerHook;

export const chatWebsiteAIConfigShowDto = {
  params: t.Object({
    uuid: uuidValidation,
  }),
  response: { 200: chatWebsiteAIConfigResponseDto, 404: errorResponseDto[404] },
  detail: {
    summary: "Show",
  },
} satisfies ControllerHook;

export const chatWebsiteAIConfigCreateDto = {
  body: chatWebsiteAIConfigCreatePayload,
  response: {
    200: chatWebsiteAIConfigResponseDto,
    422: errorResponseDto[422],
  },
  detail: {
    summary: "Create",
  },
} satisfies ControllerHook;

export const chatWebsiteAIConfigUpdateDto = {
  params: t.Object({
    uuid: uuidValidation,
  }),
  body: chatWebsiteAIConfigUpdatePayload,
  response: {
    200: chatWebsiteAIConfigResponseDto,
    404: errorResponseDto[404],
    422: errorResponseDto[422],
  },
  detail: {
    summary: "Update",
  },
} satisfies ControllerHook;

export const chatWebsiteAIConfigDestroyDto = {
  params: t.Object({
    uuid: uuidValidation,
  }),
  response: {
    200: chatWebsiteAIConfigResponseDto,
    404: errorResponseDto[404],
  },
  detail: {
    summary: "Destroy",
  },
} satisfies ControllerHook;
