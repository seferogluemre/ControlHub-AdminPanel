import prisma from "@devflow/db";
import { NotFoundError } from "elysia";
import { type ChatCannedMessageCreatePayload, type ChatCannedMessageUpdatePayload } from "./types";

export abstract class ChatCannedMessageService {
  static async index() {
    const chatCannedMessages = await prisma.chatCannedMessage.findMany({
      where: { deletedAt: null },
    });

    return chatCannedMessages;
  }

  static async show(uuid: string) {
    const chatCannedMessage = await prisma.chatCannedMessage.findUnique({
      where: { uuid: uuid, deletedAt: null },
    });

    if (!chatCannedMessage) {
      throw new NotFoundError("Chat Canned Message bulunamadı");
    }

    return chatCannedMessage;
  }

  static async store(data: ChatCannedMessageCreatePayload) {
    const chatCannedMessage = await prisma.chatCannedMessage.create({
      data: {
        ...data,
      },
    });

    return chatCannedMessage;
  }

  static async update(uuid: string, data: ChatCannedMessageUpdatePayload) {
    const chatCannedMessage = await prisma.chatCannedMessage.update({
      where: { uuid: uuid, deletedAt: null },
      data: {
        ...data,
      },
    });

    return chatCannedMessage;
  }

  static async destroy(uuid: string) {
    const chatCannedMessage = await prisma.chatCannedMessage.update({
      where: { uuid: uuid, deletedAt: null },
      data: {
        deletedAt: new Date(),
      },
    });

    if (!chatCannedMessage) {
      throw new NotFoundError("Chat Canned Message bulunamadı");
    }

    return chatCannedMessage;
  }
}
