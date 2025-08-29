import { t } from "elysia";

// Chat Visitor Record Schema
export const chatVisitorRecordSchema = t.Object({
  visitsCount: t.Number(),
  conversationsCount: t.Number(),
});

// Chat Visitor Current Visit Schema
export const chatVisitorCurrentVisitSchema = t.Object({
  url: t.String(),
  pageTitle: t.String(),
  createdAt: t.Date(),
});

// Chat Conversation Participation Schema
export const chatConversationParticipationSchema = t.Object({
  joinedAt: t.Date(),
  leftAt: t.Date(),
});

// Chat Conversation Participations Schema (Array)
export const chatConversationParticipationsSchema = t.Array(chatConversationParticipationSchema);

// Chat Conversation Participant Schema
export const chatConversationParticipantSchema = t.Object({
  participantUuid: t.String(),
  participantType: t.Union([t.Literal("VISITOR"), t.Literal("STAFF")]),
  participation: t.Array(chatConversationParticipationSchema),
});

// Chat Conversation Participants Schema (Array)
export const chatConversationParticipantsSchema = t.Array(chatConversationParticipantSchema);

// Chat Conversation State Schema
export const chatConversationStateSchema = t.Object({
  key: t.String(),
  value: t.String(),
  createdAt: t.Date(),
  updatedAt: t.Date(),
  deletedAt: t.Date(),
  pastStates: t.Optional(t.Array(t.Object({
    value: t.String(),
    createdAt: t.Date(),
  }))),
});

// Chat Conversation States Schema (Array)
export const chatConversationStatesSchema = t.Array(chatConversationStateSchema);

// Chat Visitor Staff Note Schema
export const chatVisitorStaffNoteSchema = t.Object({
  uuid: t.String(),
  conversationUuid: t.String(),
  content: t.String(),
  createdBy: t.Object({
    name: t.String(),
    uuid: t.String(),
  }),
  createdAt: t.Date(),
});

// Chat Visitor Staff Notes Schema (Array)
export const chatVisitorStaffNotesSchema = t.Array(chatVisitorStaffNoteSchema);

// Chat Conversation Attachment Schema
export const chatConversationAttachmentSchema = t.Object({
  fileUuid: t.String(),
  fileMimeType: t.String(),
  fileSrc: t.String(),
});

// Chat Conversation Message Event Schema
export const chatConversationMessageEventSchema = t.Object({
  text: t.String(),
  replyToUuid: t.Optional(t.String()),
  attachments: t.Optional(t.Array(chatConversationAttachmentSchema)),
  pastStates: t.Optional(t.Array(t.Object({
    text: t.String(),
    attachments: t.Array(chatConversationAttachmentSchema),
    createdAt: t.Date(),
  }))),
});

// Chat Conversation Message Edit Event Schema
export const chatConversationMessageEditEventSchema = t.Object({
  targetUuid: t.String(),
  text: t.String(),
  attachments: t.Optional(t.Array(chatConversationAttachmentSchema)),
});

// Chat Conversation Message Delete Event Schema
export const chatConversationMessageDeleteEventSchema = t.Object({
  targetUuid: t.String(),
});

// Chat Conversation Conversation Transfer Event Schema
export const chatConversationConversationTransferEventSchema = t.Object({
  targetStaffUuid: t.String(),
});

// Chat Conversation Event Data Union Schema
export const chatConversationEventDataSchema = t.Union([
  chatConversationMessageEventSchema,
  chatConversationMessageEditEventSchema,
  chatConversationMessageDeleteEventSchema,
  chatConversationConversationTransferEventSchema,
]);

// Chat Website UI Chat Button Type Schema
export const chatWebsiteUIChatButtonTypeSchema = t.Union([
  t.Literal("ICON"),
  t.Literal("IMAGE"),
]);

// Chat Website UI Chat Window Config Schema
export const chatWebsiteUIChatWindowConfigSchema = t.Object({
  color: t.String(),
  header: t.String(),
  body: t.String(),
  visitorOptions: t.String(),
});

// Chat Website UI Chat Button Config Schema
export const chatWebsiteUIChatButtonConfigSchema = t.Object({
  type: chatWebsiteUIChatButtonTypeSchema,
  color: t.String(),
  offset: t.Number(),
});

// Chat Website UI Pre Chat Config Schema
export const chatWebsiteUIPreChatConfigSchema = t.Object({
  isEnabled: t.Boolean(),
  header: t.String(),
  greetingMessage: t.String(),
});

// Chat Website UI Post Chat Config Schema
export const chatWebsiteUIPostChatConfigSchema = t.Object({
  isEnabled: t.Boolean(),
  fields: t.String(),
  message: t.String(),
});

// Chat Website UI Config Data Schema
export const chatWebsiteUIConfigDataSchema = t.Object({
  chatWindow: chatWebsiteUIChatWindowConfigSchema,
  chatButton: chatWebsiteUIChatButtonConfigSchema,
  preChat: chatWebsiteUIPreChatConfigSchema,
  postChat: chatWebsiteUIPostChatConfigSchema,
});

// Chat Website AI Config Data Schema
export const chatWebsiteAIConfigDataSchema = t.Object({
  name: t.String(),
  prompt: t.String(),
});
