import { type Static } from "elysia";
import {
  chatCannedMessageCreatePayload,
  chatCannedMessageResponseDto,
  chatCannedMessageUpdatePayload,
} from "./dtos";

export type ChatCannedMessageResponse = Static<typeof chatCannedMessageResponseDto>;
export type ChatCannedMessageCreatePayload = Static<typeof chatCannedMessageCreatePayload>;
export type ChatCannedMessageUpdatePayload = Static<typeof chatCannedMessageUpdatePayload>;
