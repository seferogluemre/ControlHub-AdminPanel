import type { Static } from "elysia";

import {
  fileCreateInputDto,
  fileIndexDto,
  fileResponseDto,
  fileShowDto,
  fileUpdateInputDto,
} from "./dtos";

export type FileShowParams = Static<(typeof fileShowDto)["params"]>;
export type FileShowResponse = Static<typeof fileResponseDto>;
export type FileDestroyParams = FileShowParams;

export type FileCreateInput = Static<typeof fileCreateInputDto>;
export type FileUpdateInput = Static<typeof fileUpdateInputDto>;

export type FileIndexQuery = Static<typeof fileIndexDto.query>;
