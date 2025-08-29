import { IconClock, IconHistory } from "@tabler/icons-react";
import { differenceInMinutes, format, parseISO } from "date-fns";
import { Badge } from "#/components/ui/badge";
import { Card } from "#/components/ui/card";
import { ScrollArea } from "#/components/ui/scroll-area";
import { TabsContent } from "#/components/ui/tabs";
import { type ChatUser } from "../data/chat-types";
import { UI_TEXTS } from "../data/constants";

interface HistoryTabContentProps {
  selectedUser: ChatUser | null;
  onChatHistoryClick?: (date: string) => void;
}

export function HistoryTabContent({ selectedUser, onChatHistoryClick }: HistoryTabContentProps) {
  const generateChatHistory = () => {
    if (!selectedUser || !selectedUser.messages.length) {
      return [];
    }

    // Mesajları tarihe göre grupla
    const messagesByDate = selectedUser.messages.reduce((acc: Record<string, any>, message) => {
      const dateKey = format(parseISO(message.timestamp), "yyyy-MM-dd");
      const displayDate = format(parseISO(message.timestamp), "d MMM, yyyy");

      if (!acc[dateKey]) {
        acc[dateKey] = {
          date: displayDate,
          messages: [],
          dateKey,
        };
      }
      acc[dateKey].messages.push(message);
      return acc;
    }, {});

    // Her gün için chat history oluştur
    return Object.values(messagesByDate)
      .map((dayData: any) => {
        const messages = dayData.messages;
        const firstMessage = messages[0];
        const lastMessage = messages[messages.length - 1];

        // Süre hesaplaması
        const startTime = parseISO(firstMessage.timestamp);
        const endTime = parseISO(lastMessage.timestamp);
        const durationMinutes = differenceInMinutes(endTime, startTime);

        // Süre formatını saat ve dakika olarak düzenle
        const formatDuration = (minutes: number): string => {
          if (minutes < 1) return "< 1 dakika";
          if (minutes < 60) return `${minutes} dakika`;

          const hours = Math.floor(minutes / 60);
          const remainingMinutes = minutes % 60;

          if (remainingMinutes === 0) return `${hours} saat`;
          return `${hours} saat ${remainingMinutes} dakika`;
        };

        // Tarih formatı için bugün/dün kontrolü
        const today = new Date();
        const messageDate = parseISO(firstMessage.timestamp);
        const daysDiff = Math.floor(
          (today.getTime() - messageDate.getTime()) / (1000 * 60 * 60 * 24),
        );

        let displayDate = dayData.date;
        if (daysDiff === 0) displayDate = "Bugün";
        else if (daysDiff === 1) displayDate = "Dün";
        else if (daysDiff <= 7) displayDate = `${daysDiff} gün önce`;
        else displayDate = dayData.date; // Uzun tarihler için tam tarih

        return {
          id: dayData.dateKey,
          date: displayDate,
          chats: [
            {
              time:
                format(startTime, "HH:mm") +
                (durationMinutes > 0 ? `-${format(endTime, "HH:mm")}` : ""),
              topic:
                firstMessage.message.length > 50
                  ? firstMessage.message.substring(0, 50) + "..."
                  : firstMessage.message,
              duration: formatDuration(durationMinutes),
              status: selectedUser.isOngoing ? "ongoing" : "completed",
              messageCount: messages.length,
            },
          ],
        };
      })
      .sort((a, b) => {
        const dateA = new Date(a.id);
        const dateB = new Date(b.id);
        return dateB.getTime() - dateA.getTime();
      });
  };

  const chatHistory = generateChatHistory();

  return (
    <TabsContent value="history" className="mt-0 h-full overflow-hidden">
      <ScrollArea className="h-full px-2" style={{ maxHeight: "calc(100vh - 280px)" }}>
        <div className="space-y-4 p-3">
          <div className="flex items-center gap-2 mb-4">
            <IconHistory className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">{UI_TEXTS.chatHistory}</h3>
          </div>

          {chatHistory.map((dayGroup) => (
            <div key={dayGroup.id} className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground border-b pb-1">
                {dayGroup.date}
              </div>

              <div className="space-y-2">
                {dayGroup.chats.map((chat, index) => (
                  <Card
                    key={index}
                    className="p-3 hover:bg-secondary/50 cursor-pointer transition-colors"
                    onClick={() => onChatHistoryClick?.(dayGroup.id)}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{chat.time}</span>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {chat.messageCount} mesaj
                          </Badge>
                          <Badge
                            variant={chat.status === "ongoing" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {chat.status === "ongoing" ? "devam ediyor" : "tamamlandı"}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{chat.topic}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <IconClock className="h-3 w-3" />
                        <span>Süre: {chat.duration}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}

          {chatHistory.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <IconHistory className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-sm">{UI_TEXTS.chatHistoryEmpty}</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </TabsContent>
  );
}
