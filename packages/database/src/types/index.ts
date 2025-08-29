import {
  ChatConversationAttachment as ChatConversationAttachmentJsonSchema,
  ChatConversationConversationTransferEvent as ChatConversationConversationTransferEventJsonSchema,
  ChatConversationEventData as ChatConversationEventDataJsonSchema,
  ChatConversationMessageDeleteEvent as ChatConversationMessageDeleteEventJsonSchema,
  ChatConversationMessageEditEvent as ChatConversationMessageEditEventJsonSchema,
  ChatConversationMessageEvent as ChatConversationMessageEventJsonSchema,
  ChatConversationParticipant as ChatConversationParticipantJsonSchema,
  ChatConversationParticipants as ChatConversationParticipantsJsonSchema,
  ChatConversationParticipation as ChatConversationParticipationJsonSchema,
  ChatConversationParticipations as ChatConversationParticipationsJsonSchema,
  ChatConversationState as ChatConversationStateJsonSchema,
  ChatConversationStates as ChatConversationStatesJsonSchema,
  ChatVisitorCurrentVisit as ChatVisitorCurrentVisitJsonSchema,
  ChatVisitorRecord as ChatVisitorRecordJsonSchema,
  ChatVisitorStaffNote as ChatVisitorStaffNoteJsonSchema,
  ChatVisitorStaffNotes as ChatVisitorStaffNotesJsonSchema,
  ChatWebsiteAIConfigData as ChatWebsiteAIConfigDataJsonSchema,
  ChatWebsiteUIChatButtonConfig as ChatWebsiteUIChatButtonConfigJsonSchema,
  ChatWebsiteUIChatButtonType as ChatWebsiteUIChatButtonTypeJsonSchema,
  ChatWebsiteUIChatWindowConfig as ChatWebsiteUIChatWindowConfigJsonSchema,
  ChatWebsiteUIConfigData as ChatWebsiteUIConfigDataJsonSchema,
  ChatWebsiteUIPostChatConfig as ChatWebsiteUIPostChatConfigJsonSchema,
  ChatWebsiteUIPreChatConfig as ChatWebsiteUIPreChatConfigJsonSchema,
} from "./json-schemas";

export * from "./internal";
export * from "./json-schemas";

declare global {
  namespace PrismaJson {
    type ChatVisitorRecord = ChatVisitorRecordJsonSchema;
    type ChatVisitorCurrentVisit = ChatVisitorCurrentVisitJsonSchema;
    type ChatConversationParticipation = ChatConversationParticipationJsonSchema;
    type ChatConversationParticipations = ChatConversationParticipationsJsonSchema;
    type ChatConversationParticipant = ChatConversationParticipantJsonSchema;
    type ChatConversationParticipants = ChatConversationParticipantsJsonSchema;
    type ChatConversationState = ChatConversationStateJsonSchema;
    type ChatConversationStates = ChatConversationStatesJsonSchema;
    type ChatVisitorStaffNote = ChatVisitorStaffNoteJsonSchema;
    type ChatVisitorStaffNotes = ChatVisitorStaffNotesJsonSchema;
    type ChatConversationAttachment = ChatConversationAttachmentJsonSchema;
    type ChatConversationMessageEvent = ChatConversationMessageEventJsonSchema;
    type ChatConversationMessageEditEvent = ChatConversationMessageEditEventJsonSchema;
    type ChatConversationMessageDeleteEvent = ChatConversationMessageDeleteEventJsonSchema;
    type ChatConversationConversationTransferEvent =
      ChatConversationConversationTransferEventJsonSchema;
    type ChatConversationEventData = ChatConversationEventDataJsonSchema;
    type ChatWebsiteUIChatButtonType = ChatWebsiteUIChatButtonTypeJsonSchema;
    type ChatWebsiteUIChatWindowConfig = ChatWebsiteUIChatWindowConfigJsonSchema;
    type ChatWebsiteUIChatButtonConfig = ChatWebsiteUIChatButtonConfigJsonSchema;
    type ChatWebsiteUIPreChatConfig = ChatWebsiteUIPreChatConfigJsonSchema;
    type ChatWebsiteUIPostChatConfig = ChatWebsiteUIPostChatConfigJsonSchema;
    type ChatWebsiteUIConfigData = ChatWebsiteUIConfigDataJsonSchema;
    type ChatWebsiteAIConfigData = ChatWebsiteAIConfigDataJsonSchema;
  }
}
