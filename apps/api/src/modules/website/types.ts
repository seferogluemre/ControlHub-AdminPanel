import { type Static } from "elysia";
import { websiteCreatePayload, websiteResponseDto, websiteUpdatePayload } from "./dtos";

export type WebsiteResponse = Static<typeof websiteResponseDto>;
export type WebsiteCreatePayload = Static<typeof websiteCreatePayload>;
export type WebsiteUpdatePayload = Static<typeof websiteUpdatePayload>;
