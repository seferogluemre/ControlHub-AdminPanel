import { type Static } from "elysia";
import {
  chatWebsiteUIConfigCreatePayload,
  chatWebsiteUIConfigResponseDto,
  chatWebsiteUIConfigUpdatePayload,
} from "./dtos";

export type ChatWebsiteUIConfigResponse = Static<typeof chatWebsiteUIConfigResponseDto>;
export type ChatWebsiteUIConfigCreatePayload = Static<typeof chatWebsiteUIConfigCreatePayload>;
export type ChatWebsiteUIConfigUpdatePayload = Static<typeof chatWebsiteUIConfigUpdatePayload>;
