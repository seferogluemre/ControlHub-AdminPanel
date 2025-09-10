import { WebsiteInputCreate, WebsiteInputUpdate, WebsitePlain } from "@devflow/db/prismabox/Website";
import { t } from "elysia";
import { type ControllerHook, errorResponseDto, uuidValidation } from "../../utils";

export const websiteResponseDto = t.Composite([t.Omit(WebsitePlain, ["id", "deletedAt"])]);

export const websiteCreatePayload = t.Composite([
  t.Omit(WebsiteInputCreate, ["deletedAt", "logoFileSrc"]),
  t.Object({
    logoFileId: t.Optional(t.String()),
  }),
]);

export const websiteUpdatePayload = t.Composite([
  t.Omit(WebsiteInputUpdate, ["deletedAt", "logoFileSrc"]),
  t.Object({
    logoFileId: t.Optional(t.String()),
  }),
]);

export const websiteIndexDto = {
  response: { 200: t.Array(websiteResponseDto) },
  detail: {
    summary: "Index",
  },
} satisfies ControllerHook;

export const websiteShowDto = {
  params: t.Object({
    uuid: uuidValidation,
  }),
  response: { 200: websiteResponseDto, 404: errorResponseDto[404] },
  detail: {
    summary: "Show",
  },
} satisfies ControllerHook;

export const websiteCreateDto = {
  body: websiteCreatePayload,
  response: {
    200: websiteResponseDto,
    422: errorResponseDto[422],
  },
  detail: {
    summary: "Create",
  },
} satisfies ControllerHook;

export const websiteUpdateDto = {
  params: t.Object({
    uuid: uuidValidation,
  }),
  body: websiteUpdatePayload,
  response: {
    200: websiteResponseDto,
    404: errorResponseDto[404],
    422: errorResponseDto[422],
  },
  detail: {
    summary: "Update",
  },
} satisfies ControllerHook;

export const websiteDestroyDto = {
  params: t.Object({
    uuid: uuidValidation,
  }),
  response: {
    200: websiteResponseDto,
    404: errorResponseDto[404],
  },
  detail: {
    summary: "Destroy",
  },
} satisfies ControllerHook;
