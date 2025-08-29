import { useEffect, useState } from "react";
import { type ChatUser, type Convo } from "../../../data/chat-types";

interface UseMessageHandlerProps {
  selectedUser: ChatUser;
  onSendMessage: (message: string) => void;
}

export function useMessageHandler({ selectedUser, onSendMessage }: UseMessageHandlerProps) {
  const [messages, setMessages] = useState<Convo[]>(selectedUser.messages);

  useEffect(() => {
    setMessages(selectedUser.messages);
  }, [selectedUser.id]);

  const handleSendMessage = (message: string) => {
    const userMessage: Convo = {
      sender: "You",
      message: message,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);

    onSendMessage(message);

    setTimeout(() => {
      const botResponses = [
        "Thanks for your message! How can I help you?",
        "I understand your request. Let me assist you with that.",
        "That's interesting! Tell me more about it.",
        "I'm here to help. What would you like to know?",
        "Great question! Let me think about that.",
        "I appreciate you reaching out. How else can I assist?",
        "Thanks for contacting us! We'll get back to you soon.",
      ];

      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];

      const botMessage: Convo = {
        sender: "Casivera Bot",
        message: randomResponse,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  return {
    messages,
    handleSendMessage,
  };
}
