export type ChatStatus = "chatting" | "chat_ended" | "chatting_with_bot" | "no_chat";

export interface Visitor {
  id: string;
  name: string;
  email?: string;
  isOnline: boolean;
  location?: string;
  country: string;
  countryCode: string;
  agent?: string;
  currentPage: string;
  referredFrom?: string;
  visits: number;
  chats: number;
  lastActivity: string;
  ip?: string;
  chatId?: string; // Chat sayfasına bağlantı için
  hasActiveChat: boolean;
  chatStatus: ChatStatus;
}
