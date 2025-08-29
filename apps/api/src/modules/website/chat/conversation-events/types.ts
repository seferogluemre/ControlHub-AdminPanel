import { type Static } from "elysia";
import {
  chatConversationEventCreatePayload,
  chatConversationEventResponseDto,
  chatConversationEventUpdatePayload,
} from "./dtos";

export type ChatConversationEventResponse = Static<typeof chatConversationEventResponseDto>;
export type ChatConversationEventCreatePayload = Static<typeof chatConversationEventCreatePayload>;
export type ChatConversationEventUpdatePayload = Static<typeof chatConversationEventUpdatePayload>;
