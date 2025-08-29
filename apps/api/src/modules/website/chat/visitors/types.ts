import { type Static } from "elysia";
import { chatVisitorCreatePayload, chatVisitorResponseDto, chatVisitorUpdatePayload } from "./dtos";

export type ChatVisitorResponse = Static<typeof chatVisitorResponseDto>;
export type ChatVisitorCreatePayload = Static<typeof chatVisitorCreatePayload>;
export type ChatVisitorUpdatePayload = Static<typeof chatVisitorUpdatePayload>;
