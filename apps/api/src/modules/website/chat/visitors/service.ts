import prisma from "@devflow/db";
import { NotFoundError } from "elysia";
import { type ChatVisitorCreatePayload, type ChatVisitorUpdatePayload } from "./types";

export abstract class ChatVisitorService {
  static async index() {
    const chatVisitors = await prisma.chatVisitor.findMany({
      where: { deletedAt: null },
    });

    return chatVisitors;
  }

  static async show(uuid: string) {
    const chatVisitor = await prisma.chatVisitor.findUnique({
      where: { uuid: uuid, deletedAt: null },
    });

    if (!chatVisitor) {
      throw new NotFoundError("Chat Visitor bulunamadı");
    }

    return chatVisitor;
  }

  static async store(data: ChatVisitorCreatePayload) {
    const chatVisitor = await prisma.chatVisitor.create({
      data: {
        ...data,
      },
    });

    return chatVisitor;
  }

  static async update(uuid: string, data: ChatVisitorUpdatePayload) {
    const chatVisitor = await prisma.chatVisitor.update({
      where: { uuid: uuid, deletedAt: null },
      data: {
        ...data,
      },
    });

    return chatVisitor;
  }

  static async destroy(uuid: string) {
    const chatVisitor = await prisma.chatVisitor.update({
      where: { uuid: uuid, deletedAt: null },
      data: {
        deletedAt: new Date(),
      },
    });

    if (!chatVisitor) {
      throw new NotFoundError("Chat Visitor bulunamadı");
    }

    return chatVisitor;
  }
}
