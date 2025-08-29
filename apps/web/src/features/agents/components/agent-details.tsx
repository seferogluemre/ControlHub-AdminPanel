import { Send } from "lucide-react";
import { KeyboardEvent, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";
import { Button } from "#/components/ui/button";
import { ScrollArea } from "#/components/ui/scroll-area";
import { Textarea } from "#/components/ui/textarea";
import { Agent } from "../data/agents";

interface AgentDetailsProps {
  agents: Agent[];
  selectedAgent?: Agent;
  selectedGroup?: string;
}

// Mock chat data (financial/investment related)
const mockChatData = {
  Müsait: [
    {
      id: 1,
      sender: "Hazal",
      message: "Yatırımcı danışmanlığı tamamlandı",
      time: "14:30",
      type: "agent",
    },
    {
      id: 2,
      sender: "System",
      message: "Yeni yatırımcı bağlantısı",
      time: "14:32",
      type: "system",
    },
    {
      id: 3,
      sender: "Tuğçe",
      message: "Portföy analizi talebi alındı",
      time: "14:35",
      type: "agent",
    },
  ],
  "Yatırım Danışmanlığı": [
    {
      id: 1,
      sender: "Mehmet",
      message: "ASELS hisse analizi değerlendiriliyor",
      time: "13:45",
      type: "agent",
    },
    {
      id: 2,
      sender: "System",
      message: "Teknik analiz tamamlandı",
      time: "13:50",
      type: "system",
    },
  ],
  "Piyasa Analizi": [
    {
      id: 1,
      sender: "Ali",
      message: "BIST 100 analiz raporu hazırlandı",
      time: "12:20",
      type: "agent",
    },
    {
      id: 2,
      sender: "System",
      message: "Günlük piyasa özeti aktif",
      time: "12:25",
      type: "system",
    },
  ],
  "Portföy Yönetimi": [
    {
      id: 1,
      sender: "Can",
      message: "Diversifiye portföy önerisi hazırlandı",
      time: "11:15",
      type: "agent",
    },
  ],
  "Teknik Destek": [
    {
      id: 1,
      sender: "Zeynep",
      message: "Platform kullanımı hakkında yardım sağlandı",
      time: "10:30",
      type: "agent",
    },
  ],
};

const agentChatData = {
  Hazal: [
    {
      id: 1,
      sender: "Hazal",
      message: "Merhaba, yatırım konusunda nasıl yardımcı olabilirim?",
      time: "14:30",
      type: "agent",
    },
    {
      id: 2,
      sender: "Customer",
      message: "BIST 100 endeksi hakkında bilgi almak istiyorum",
      time: "14:31",
      type: "customer",
    },
    {
      id: 3,
      sender: "Hazal",
      message: "BIST 100 bugün %2.5 yükselişte, detaylı analiz için rapor gönderebilirim",
      time: "14:32",
      type: "agent",
    },
  ],
  Tuğçe: [
    {
      id: 1,
      sender: "Tuğçe",
      message: "İyi günler, portföyünüzle ilgili nasıl yardımcı olabilirim?",
      time: "13:15",
      type: "agent",
    },
    {
      id: 2,
      sender: "Customer",
      message: "ASELS hissem nasıl gidiyor?",
      time: "13:16",
      type: "customer",
    },
  ],
  // Diğer agentlar için de benzer data eklenebilir
};

export function AgentDetails({ agents, selectedGroup, selectedAgent }: AgentDetailsProps) {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Determine what to show based on selection
  let title = "";
  let chatMessages: any[] = [];

  if (selectedAgent) {
    title = selectedAgent.name;
    chatMessages = agentChatData[selectedAgent.name as keyof typeof agentChatData] || [];
  } else if (selectedGroup) {
    title = selectedGroup;
    chatMessages = mockChatData[selectedGroup as keyof typeof mockChatData] || [];
  }

  return (
    <div
      className="flex-1 flex flex-col bg-background h-full"
      style={{
        background: "color-mix(in oklab, var(--muted) 10%, transparent)",
      }}
    >
      {/* Header */}
      <div className="border-b flex-shrink-0 p-3">
        {selectedAgent ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedAgent.avatar} />
                  <AvatarFallback className="text-sm font-semibold">
                    {selectedAgent.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {selectedAgent.status === "online" && (
                  <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-base">{selectedAgent.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  {selectedAgent.status === "online"
                    ? "Aktif"
                    : `Uzakta: ${selectedAgent.awayTime}`}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            {selectedAgent.actionButtons &&
              (selectedAgent.actionButtons.kickOff || selectedAgent.actionButtons.setAway) && (
                <div className="flex items-center gap-2">
                  {selectedAgent.actionButtons.setAway && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 px-2.5 flex items-center gap-1.5 bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100 text-xs"
                      onClick={() => console.log("Set Away clicked for", selectedAgent.name)}
                    >
                      Uzakta Ayarla
                    </Button>
                  )}
                  {selectedAgent.actionButtons.kickOff && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 px-2.5 flex items-center gap-1.5 bg-red-50 border-red-200 text-red-700 hover:bg-red-100 text-xs"
                      onClick={() => console.log("Kick Off clicked for", selectedAgent.name)}
                    >
                      Çıkart
                    </Button>
                  )}
                </div>
              )}
          </div>
        ) : (
          <div>
            <h3 className="font-semibold text-base">{title || "Grup veya Agent Seçiniz"}</h3>
            <p className="text-sm text-muted-foreground">
              {title ? "Grup Sohbeti" : "Grup veya Agent Seçiniz"}
            </p>
          </div>
        )}
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 flex flex-col h-[750px] overflow-hidden px-2">
        <ScrollArea className="flex-1 h-0">
          <div className="space-y-4 p-4 pb-6">
            {chatMessages.length > 0 ? (
              chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${
                    msg.type === "system"
                      ? "justify-center"
                      : msg.type === "customer"
                        ? "justify-end"
                        : "justify-start"
                  }`}
                >
                  {msg.type === "agent" && (
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarFallback className="text-xs">
                        {msg.sender.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div
                    className={`${
                      msg.type === "system"
                        ? "bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                        : msg.type === "customer"
                          ? "bg-primary text-primary-foreground rounded-lg p-3 max-w-[70%]"
                          : "bg-secondary text-secondary-foreground rounded-lg p-3 max-w-[70%]"
                    }`}
                  >
                    {msg.type !== "system" && (
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm">{msg.sender}</span>
                        <span className="text-xs opacity-70">{msg.time}</span>
                      </div>
                    )}
                    <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                  </div>

                  {msg.type === "customer" && (
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarFallback className="text-xs">CU</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-secondary rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-primary rounded-lg opacity-50"></div>
                  </div>
                  <p className="text-muted-foreground font-medium">
                    {title ? "Henüz mesaj yok" : "Grup veya Agent Seçiniz"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {title ? "Sohbete başlayın" : "Sol panelden sohbetleri görüntüleyin"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Message Input Area - Fixed at bottom */}
      <div className="border-t bg-background flex-shrink-0 sticky bottom-0 rounded-b-xl overflow-hidden">
        <div className="p-4">
          <div className="flex gap-3">
            <Textarea
              placeholder="Mesajınızı yazınız..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 min-h-[60px] max-h-[120px] resize-none"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              size="icon"
              className="h-[60px] w-[60px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5" />
              <span className="sr-only">Mesaj Gönder</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
