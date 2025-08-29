import prisma from "@onlyjs/db";
import { NotFoundError } from "elysia";
import {
  type ChatVisitorStaffNoteCreatePayload,
  type ChatVisitorStaffNoteUpdatePayload,
} from "./types";

export abstract class ChatVisitorStaffNoteService {
  static async index() {
    const chatVisitorStaffNotes = await prisma.chatVisitorStaffNote.findMany({
      where: { deletedAt: null },
    });

    return chatVisitorStaffNotes;
  }

  static async show(uuid: string) {
    const chatVisitorStaffNote = await prisma.chatVisitorStaffNote.findUnique({
      where: { uuid: uuid, deletedAt: null },
    });

    if (!chatVisitorStaffNote) {
      throw new NotFoundError("Chat Visitor Staff Note bulunamadı");
    }

    return chatVisitorStaffNote;
  }

  static async store(data: ChatVisitorStaffNoteCreatePayload) {
    const chatVisitorStaffNote = await prisma.chatVisitorStaffNote.create({
      data: {
        ...data,
      },
    });

    return chatVisitorStaffNote;
  }

  static async update(uuid: string, data: ChatVisitorStaffNoteUpdatePayload) {
    const chatVisitorStaffNote = await prisma.chatVisitorStaffNote.update({
      where: { uuid: uuid, deletedAt: null },
      data: {
        ...data,
      },
    });

    return chatVisitorStaffNote;
  }

  static async destroy(uuid: string) {
    const chatVisitorStaffNote = await prisma.chatVisitorStaffNote.update({
      where: { uuid: uuid, deletedAt: null },
      data: {
        deletedAt: new Date(),
      },
    });

    if (!chatVisitorStaffNote) {
      throw new NotFoundError("Chat Visitor Staff Note bulunamadı");
    }

    return chatVisitorStaffNote;
  }
}
