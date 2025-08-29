import { Fragment, useEffect } from "react";
import { ScrollArea } from "#/components/ui/scroll-area";
import { cn } from "#/lib/utils";
import { type ChatUser } from "../../data/chat-types";
import { ChatHeader } from "../chat-header";
import { MessageInput } from "../message-input";
import { DateSeparator } from "./date-separator";
import { ChatEndedMessage, EmptyState } from "./empty-state";
import { useChatScroll } from "./hooks/use-chat-scroll";
import { useMessageHandler } from "./hooks/use-message-handler";
import { MessageBubble } from "./message-bubble";
import { formatMessagesByDate } from "./utils";

interface ChatAreaProps {
  selectedUser: ChatUser;
  onSendMessage: (message: string) => void;
  onBackClick?: () => void;
  showBackButton?: boolean;
  onCloseChat?: () => void;
  onScrollToDate?: (scrollFn: (date: string) => void) => void;
}

export function ChatArea({
  selectedUser,
  onSendMessage,
  onBackClick,
  showBackButton = false,
  onCloseChat,
  onScrollToDate,
}: ChatAreaProps) {
  // Custom hooks
  const { scrollAreaRef, highlightedDate, scrollToBottom, scrollToDate } = useChatScroll();
  const { messages, handleSendMessage } = useMessageHandler({ selectedUser, onSendMessage });

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Expose scrollToDate to parent
  useEffect(() => {
    if (onScrollToDate) {
      onScrollToDate(scrollToDate);
    }
  }, [onScrollToDate, scrollToDate]);

  // Format messages by date
  const sortedMessagesByDate = formatMessagesByDate(messages);

  return (
    <div
      className="flex flex-1 flex-col h-[840px] overflow-hidden bg-background rounded-xl"
      style={{
        background: "color-mix(in oklab, var(--muted) 10%, transparent)",
      }}
    >
      {/* Header */}
      <div className="flex-shrink-0 rounded-t-xl overflow-hidden">
        <ChatHeader
          selectedUser={selectedUser}
          onBackClick={onBackClick}
          showBackButton={showBackButton}
          onCloseChat={onCloseChat}
        />
      </div>

      {/* Messages Area */}
      <div className="flex-1 flex flex-col h-[750px] overflow-hidden px-2">
        <ScrollArea ref={scrollAreaRef} className="flex-1 h-0">
          <div className="space-y-4 p-4 pb-6">
            {sortedMessagesByDate.map(([date, messages]) => (
              <Fragment key={date}>
                {/* Date Separator */}
                <DateSeparator date={date} highlightedDate={highlightedDate} />

                {/* Messages for this date */}
                <div className="space-y-3">
                  {messages.map((message, index) => {
                    const isBot = message.sender === "Casivera Bot";
                    return (
                      <div
                        key={`${message.timestamp}-${index}`}
                        className={cn("flex", isBot ? "justify-start" : "justify-end")}
                      >
                        <MessageBubble
                          message={message}
                          isBot={isBot}
                          selectedUser={selectedUser}
                        />
                      </div>
                    );
                  })}
                </div>
              </Fragment>
            ))}

            {/* Empty State */}
            {sortedMessagesByDate.length === 0 && <EmptyState selectedUser={selectedUser} />}

            {/* Chat Ended Message */}
            <ChatEndedMessage selectedUser={selectedUser} />
          </div>
        </ScrollArea>
      </div>

      {/* Message Input */}
      <div className="flex-shrink-0 sticky bottom-0 bg-background border-t rounded-b-xl overflow-hidden">
        <MessageInput
          onSendMessage={handleSendMessage}
          placeholder={`${selectedUser.fullName} kişisine mesaj yazın...`}
        />
      </div>
    </div>
  );
}
