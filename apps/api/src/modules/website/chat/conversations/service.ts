import prisma from "@devflow/db";
import { NotFoundError } from "elysia";
import { type ChatConversationCreatePayload, type ChatConversationUpdatePayload } from "./types";

export abstract class ChatConversationService {
  static async index() {
    const chatConversations = await prisma.chatConversation.findMany({
      where: { deletedAt: null },
    });

    return chatConversations;
  }

  static async show(uuid: string) {
    const chatConversation = await prisma.chatConversation.findUnique({
      where: { uuid: uuid, deletedAt: null },
    });

    if (!chatConversation) {
      throw new NotFoundError("Chat Conversation bulunamadı");
    }

    return chatConversation;
  }

  static async store(data: ChatConversationCreatePayload) {
    const chatConversation = await prisma.chatConversation.create({
      data: {
        ...data,
      },
    });

    return chatConversation;
  }

  static async update(uuid: string, data: ChatConversationUpdatePayload) {
    const chatConversation = await prisma.chatConversation.update({
      where: { uuid: uuid, deletedAt: null },
      data: {
        ...data,
      },
    });

    return chatConversation;
  }

  static async destroy(uuid: string) {
    const chatConversation = await prisma.chatConversation.update({
      where: { uuid: uuid, deletedAt: null },
      data: {
        deletedAt: new Date(),
      },
    });

    if (!chatConversation) {
      throw new NotFoundError("Chat Conversation bulunamadı");
    }

    return chatConversation;
  }
}
