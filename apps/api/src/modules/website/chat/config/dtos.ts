import { type ControllerHook, errorResponseDto, uuidValidation } from "#utils";
import {
  ChatWebsiteConfigInputCreate,
  ChatWebsiteConfigInputUpdate,
  ChatWebsiteConfigPlain,
} from "@onlyjs/db/prismabox/ChatWebsiteConfig";
import { t } from "elysia";

export const chatWebsiteConfigResponseDto = t.Composite([
  t.Omit(ChatWebsiteConfigPlain, ["id", "deletedAt"]),
]);

export const chatWebsiteConfigCreatePayload = t.Composite([
  t.Omit(ChatWebsiteConfigInputCreate, ["deletedAt"]),
]);

export const chatWebsiteConfigUpdatePayload = t.Composite([
  t.Omit(ChatWebsiteConfigInputUpdate, ["deletedAt"]),
]);

export const chatWebsiteConfigIndexDto = {
  response: { 200: t.Array(chatWebsiteConfigResponseDto) },
  detail: {
    summary: "Index",
  },
} satisfies ControllerHook;

export const chatWebsiteConfigShowDto = {
  params: t.Object({
    uuid: uuidValidation,
  }),
  response: { 200: chatWebsiteConfigResponseDto, 404: errorResponseDto[404] },
  detail: {
    summary: "Show",
  },
} satisfies ControllerHook;

export const chatWebsiteConfigCreateDto = {
  body: chatWebsiteConfigCreatePayload,
  response: {
    200: chatWebsiteConfigResponseDto,
    422: errorResponseDto[422],
  },
  detail: {
    summary: "Create",
  },
} satisfies ControllerHook;

export const chatWebsiteConfigUpdateDto = {
  params: t.Object({
    uuid: uuidValidation,
  }),
  body: chatWebsiteConfigUpdatePayload,
  response: {
    200: chatWebsiteConfigResponseDto,
    404: errorResponseDto[404],
    422: errorResponseDto[422],
  },
  detail: {
    summary: "Update",
  },
} satisfies ControllerHook;

export const chatWebsiteConfigDestroyDto = {
  params: t.Object({
    uuid: uuidValidation,
  }),
  response: {
    200: chatWebsiteConfigResponseDto,
    404: errorResponseDto[404],
  },
  detail: {
    summary: "Destroy",
  },
} satisfies ControllerHook;
