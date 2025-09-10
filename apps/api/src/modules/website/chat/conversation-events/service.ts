import prisma from "@devflow/db";
import { NotFoundError } from "elysia";
import {
  type ChatConversationEventCreatePayload,
  type ChatConversationEventUpdatePayload,
} from "./types";

export abstract class ChatConversationEventService {
  static async index() {
    const chatConversationEvents = await prisma.chatConversationEvent.findMany({
      where: { deletedAt: null },
    });

    return chatConversationEvents;
  }

  static async show(uuid: string) {
    const chatConversationEvent = await prisma.chatConversationEvent.findUnique({
      where: { uuid: uuid, deletedAt: null },
    });

    if (!chatConversationEvent) {
      throw new NotFoundError("Chat Conversation Event bulunamadı");
    }

    return chatConversationEvent;
  }

  static async store(data: ChatConversationEventCreatePayload) {
    const chatConversationEvent = await prisma.chatConversationEvent.create({
      data: {
        ...data,
      },
    });

    return chatConversationEvent;
  }

  static async update(uuid: string, data: ChatConversationEventUpdatePayload) {
    const chatConversationEvent = await prisma.chatConversationEvent.update({
      where: { uuid: uuid, deletedAt: null },
      data: {
        ...data,
      },
    });

    return chatConversationEvent;
  }

  static async destroy(uuid: string) {
    const chatConversationEvent = await prisma.chatConversationEvent.update({
      where: { uuid: uuid, deletedAt: null },
      data: {
        deletedAt: new Date(),
      },
    });

    if (!chatConversationEvent) {
      throw new NotFoundError("Chat Conversation Event bulunamadı");
    }

    return chatConversationEvent;
  }
}
