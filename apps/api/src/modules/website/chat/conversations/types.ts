import { type Static } from "elysia";
import {
  chatConversationCreatePayload,
  chatConversationResponseDto,
  chatConversationUpdatePayload,
} from "./dtos";

export type ChatConversationResponse = Static<typeof chatConversationResponseDto>;
export type ChatConversationCreatePayload = Static<typeof chatConversationCreatePayload>;
export type ChatConversationUpdatePayload = Static<typeof chatConversationUpdatePayload>;
