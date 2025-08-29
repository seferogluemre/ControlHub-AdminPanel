import { type Static } from "elysia";
import {
  chatWebsiteAIConfigCreatePayload,
  chatWebsiteAIConfigResponseDto,
  chatWebsiteAIConfigUpdatePayload,
} from "./dtos";

export type ChatWebsiteAIConfigResponse = Static<typeof chatWebsiteAIConfigResponseDto>;
export type ChatWebsiteAIConfigCreatePayload = Static<typeof chatWebsiteAIConfigCreatePayload>;
export type ChatWebsiteAIConfigUpdatePayload = Static<typeof chatWebsiteAIConfigUpdatePayload>;
