import { FileType } from "@onlyjs/db/client";
import { FilePlain, FilePlainInputUpdate } from "@onlyjs/db/prismabox/File";
import { t } from "elysia";
import { type ControllerHook, errorResponseDto, prepareFilters, uuidValidation } from "../../utils";
import { paginationQueryDto, paginationResponseDto } from "../../utils/pagination";

export const fileResponseDto = t.Composite([
  t.Omit(FilePlain, ["size"]),
  t.Object({
    size: t.String(),
  }),
]);

export const [fileFiltersDto, getFileFilters] = prepareFilters(FilePlain, {
  simple: ["name"],
  multipleOptions: ["mimeType"],
  date: ["createdAt", "updatedAt", "deletedAt"],
  search: ["name"],
});

export const fileIndexDto = {
  query: t.Partial(t.Composite([fileFiltersDto, paginationQueryDto])),
  response: {
    200: paginationResponseDto(fileResponseDto),
  },
  detail: {
    summary: "Index",
    description: "Dosyaların listesini döndürür",
  },
} satisfies ControllerHook;

export const fileShowDto = {
  params: t.Object({
    uuid: uuidValidation,
  }),
  response: { 200: fileResponseDto, 404: errorResponseDto[404] },
  detail: {
    summary: "Show",
    description: "Dosya detaylarını döndürür",
  },
} satisfies ControllerHook;

export const fileCreateInputDto = t.Object({
  file: t.File(),
  type: t.Enum(FileType),
});

export const fileCreateDto = {
  body: fileCreateInputDto,
  response: { 200: fileResponseDto, 422: errorResponseDto[422] },
  detail: {
    summary: "Create",
    description: "Yeni dosya oluşturur",
  },
} satisfies ControllerHook;

export const fileUpdateInputDto = FilePlainInputUpdate;

export const fileUpdateDto = {
  params: t.Object({
    uuid: uuidValidation,
  }),
  body: fileUpdateInputDto,
  response: {
    200: fileResponseDto,
    404: errorResponseDto[404],
    422: errorResponseDto[422],
  },
  detail: {
    summary: "Update",
    description: "Dosyayı günceller",
  },
} satisfies ControllerHook;

export const fileDestroyDto = {
  ...fileShowDto,
  response: {
    200: t.Object({ message: t.String() }),
    404: errorResponseDto[404],
  },
  detail: {
    summary: "Destroy",
    description: "Dosyayı siler",
  },
} satisfies ControllerHook;
