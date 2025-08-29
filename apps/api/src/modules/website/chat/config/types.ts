import { type Static } from "elysia";
import {
  chatWebsiteConfigCreatePayload,
  chatWebsiteConfigResponseDto,
  chatWebsiteConfigUpdatePayload,
} from "./dtos";

export type ChatWebsiteConfigResponse = Static<typeof chatWebsiteConfigResponseDto>;
export type ChatWebsiteConfigCreatePayload = Static<typeof chatWebsiteConfigCreatePayload>;
export type ChatWebsiteConfigUpdatePayload = Static<typeof chatWebsiteConfigUpdatePayload>;
