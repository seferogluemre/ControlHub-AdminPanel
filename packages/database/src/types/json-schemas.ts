import type { Static } from "elysia";
import {
    chatConversationAttachmentSchema,
    chatConversationConversationTransferEventSchema,
    chatConversationEventDataSchema,
    chatConversationMessageDeleteEventSchema,
    chatConversationMessageEditEventSchema,
    chatConversationMessageEventSchema,
    chatConversationParticipantSchema,
    chatConversationParticipantsSchema,
    chatConversationParticipationSchema,
    chatConversationParticipationsSchema,
    chatConversationStateSchema,
    chatConversationStatesSchema,
    chatVisitorCurrentVisitSchema,
    chatVisitorRecordSchema,
    chatVisitorStaffNoteSchema,
    chatVisitorStaffNotesSchema,
    chatWebsiteAIConfigDataSchema,
    chatWebsiteUIChatButtonConfigSchema,
    chatWebsiteUIChatButtonTypeSchema,
    chatWebsiteUIChatWindowConfigSchema,
    chatWebsiteUIConfigDataSchema,
    chatWebsiteUIPostChatConfigSchema,
    chatWebsiteUIPreChatConfigSchema,
} from "../schemas/json.schema";

export type ChatVisitorRecord = Static<typeof chatVisitorRecordSchema>;

export type ChatVisitorCurrentVisit = Static<typeof chatVisitorCurrentVisitSchema>;

export type ChatConversationParticipation = Static<typeof chatConversationParticipationSchema>;

export type ChatConversationParticipations = Static<typeof chatConversationParticipationsSchema>;

export type ChatConversationParticipant = Static<typeof chatConversationParticipantSchema>;

export type ChatConversationParticipants = Static<typeof chatConversationParticipantsSchema>;

export type ChatConversationState = Static<typeof chatConversationStateSchema>;

export type ChatConversationStates = Static<typeof chatConversationStatesSchema>;

export type ChatVisitorStaffNote = Static<typeof chatVisitorStaffNoteSchema>;

export type ChatVisitorStaffNotes = Static<typeof chatVisitorStaffNotesSchema>;

export type ChatConversationAttachment = Static<typeof chatConversationAttachmentSchema>;

export type ChatConversationMessageEvent = Static<typeof chatConversationMessageEventSchema>;

export type ChatConversationMessageEditEvent = Static<
  typeof chatConversationMessageEditEventSchema
>;

export type ChatConversationMessageDeleteEvent = Static<
  typeof chatConversationMessageDeleteEventSchema
>;

export type ChatConversationConversationTransferEvent = Static<
  typeof chatConversationConversationTransferEventSchema
>;

export type ChatConversationEventData = Static<typeof chatConversationEventDataSchema>;

export type ChatWebsiteUIChatButtonType = Static<typeof chatWebsiteUIChatButtonTypeSchema>;

export type ChatWebsiteUIChatWindowConfig = Static<typeof chatWebsiteUIChatWindowConfigSchema>;

export type ChatWebsiteUIChatButtonConfig = Static<typeof chatWebsiteUIChatButtonConfigSchema>;

export type ChatWebsiteUIPreChatConfig = Static<typeof chatWebsiteUIPreChatConfigSchema>;

export type ChatWebsiteUIPostChatConfig = Static<typeof chatWebsiteUIPostChatConfigSchema>;

export type ChatWebsiteUIConfigData = Static<typeof chatWebsiteUIConfigDataSchema>;

export type ChatWebsiteAIConfigData = Static<typeof chatWebsiteAIConfigDataSchema>;
