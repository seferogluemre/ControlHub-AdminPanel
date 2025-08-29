import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";
import { cn } from "#/lib/utils";
import { type ChatUser, type Convo } from "../../data/chat-types";
import { AUTO_RESPONSE_SHORTCUTS } from "../../data/constants";

interface MessageBubbleProps {
  message: Convo;
  isBot: boolean;
  selectedUser: ChatUser;
}

// Message Auto response control
const isAutoResponse = (content: string) => {
  return Object.values(AUTO_RESPONSE_SHORTCUTS).some((code) => code === content);
};

export function MessageBubble({ message, isBot, selectedUser }: MessageBubbleProps) {
  return (
    <div
      className={cn(
        "max-w-[80%] rounded-xl px-4 py-3 shadow-sm",
        isBot
          ? "bg-secondary text-secondary-foreground"
          : `bg-primary text-primary-foreground ${
              isAutoResponse(message.message)
                ? "ring-2 ring-green-400/50 bg-gradient-to-r from-blue-600 to-green-600"
                : ""
            }`,
      )}
    >
      <div className="flex items-start gap-2">
        {isBot && (
          <Avatar className="h-6 w-6 flex-shrink-0">
            <AvatarFallback className="text-xs bg-blue-500 text-white">CB</AvatarFallback>
          </Avatar>
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium opacity-70">
              {isBot ? "Casivera Bot" : message.sender}
            </span>
            <span className="text-xs opacity-50">
              {format(new Date(message.timestamp), "HH:mm")}
            </span>
          </div>
          <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
            {message.message}
          </p>
        </div>
        {!isBot && (
          <Avatar className="h-6 w-6 flex-shrink-0">
            <AvatarImage src={selectedUser.profile} alt={selectedUser.username} />
            <AvatarFallback className="text-xs">
              {selectedUser.fullName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    </div>
  );
}
