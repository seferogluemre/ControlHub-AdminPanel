import { type ControllerHook, errorResponseDto, uuidValidation } from "#utils";
import {
  ChatWebsiteUIConfigInputCreate,
  ChatWebsiteUIConfigInputUpdate,
  ChatWebsiteUIConfigPlain,
} from "@devflow/db/prismabox/ChatWebsiteUIConfig";
import { t } from "elysia";

export const chatWebsiteUIConfigResponseDto = t.Composite([
  t.Omit(ChatWebsiteUIConfigPlain, ["id", "deletedAt", "data"]),
  t.Object({
    data: t.Object({
      logoFileId: t.Optional(t.String()),
    }),
  }),
]);

export const chatWebsiteUIConfigCreatePayload = t.Composite([
  t.Omit(ChatWebsiteUIConfigInputCreate, ["deletedAt"]),
]);

export const chatWebsiteUIConfigUpdatePayload = t.Composite([
  t.Omit(ChatWebsiteUIConfigInputUpdate, ["deletedAt"]),
]);

export const chatWebsiteUIConfigIndexDto = {
  response: { 200: t.Array(chatWebsiteUIConfigResponseDto) },
  detail: {
    summary: "Index",
  },
} satisfies ControllerHook;

export const chatWebsiteUIConfigShowDto = {
  params: t.Object({
    uuid: uuidValidation,
  }),
  response: { 200: chatWebsiteUIConfigResponseDto, 404: errorResponseDto[404] },
  detail: {
    summary: "Show",
  },
} satisfies ControllerHook;

export const chatWebsiteUIConfigCreateDto = {
  body: chatWebsiteUIConfigCreatePayload,
  response: {
    200: chatWebsiteUIConfigResponseDto,
    422: errorResponseDto[422],
  },
  detail: {
    summary: "Create",
  },
} satisfies ControllerHook;

export const chatWebsiteUIConfigUpdateDto = {
  params: t.Object({
    uuid: uuidValidation,
  }),
  body: chatWebsiteUIConfigUpdatePayload,
  response: {
    200: chatWebsiteUIConfigResponseDto,
    404: errorResponseDto[404],
    422: errorResponseDto[422],
  },
  detail: {
    summary: "Update",
  },
} satisfies ControllerHook;

export const chatWebsiteUIConfigDestroyDto = {
  params: t.Object({
    uuid: uuidValidation,
  }),
  response: {
    200: chatWebsiteUIConfigResponseDto,
    404: errorResponseDto[404],
  },
  detail: {
    summary: "Destroy",
  },
} satisfies ControllerHook;
