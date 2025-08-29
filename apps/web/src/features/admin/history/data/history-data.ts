import historyData from "../history.json";

export interface ChatMessage {
  time: string;
  sender: string;
  message: string;
  isBot: boolean;
}

export interface ChatTranscript {
  visitorName: string;
  chatId: string;
  endTime: string;
  messages: ChatMessage[];
}

export interface Chat {
  id: number;
  time: string;
  visitor: string;
  department: string;
  agent: string;
  summary: string;
  category: string;
  duration: string;
  campaign: string;
  transcript: ChatTranscript;
}

export interface AgentChatSummary {
  time: string;
  message: string;
}

export interface AgentChat {
  id: number;
  agent1: {
    name: string;
    avatar: string;
  };
  agent2: {
    name: string;
    avatar: string;
  };
  date: string;
  summary: AgentChatSummary[];
}

export interface HistoryData {
  chats: Chat[];
  agentChats: AgentChat[];
}

// Export typed data
export const chatsData: Chat[] = historyData.chats;
export const agentChatsData: AgentChat[] = historyData.agentChats;
