import { format } from "date-fns";
import { type ChatUser } from "../../data/chat-types";
import { AGENT_NAMES } from "../../data/constants";

interface EmptyStateProps {
  selectedUser: ChatUser;
}

interface ChatEndedMessageProps {
  selectedUser: ChatUser;
}

export function EmptyState({ selectedUser }: EmptyStateProps) {
  return (
    <div className="flex items-center justify-center h-full text-muted-foreground">
      <div className="text-center">
        <p className="text-lg mb-2">Henüz mesaj yok</p>
        <p className="text-sm">{selectedUser.fullName} ile sohbete başlayın</p>
      </div>
    </div>
  );
}

export function ChatEndedMessage({ selectedUser }: ChatEndedMessageProps) {
  // Random agent name from constants for ended conversations
  const randomAgent = AGENT_NAMES[Math.floor(Math.random() * AGENT_NAMES.length)];

  if (selectedUser.isOngoing) {
    return null;
  }

  return (
    <div className="flex items-center justify-center mt-6">
      <div className="bg-secondary/50 text-secondary-foreground px-4 py-3 rounded-lg text-center space-y-1 max-w-md">
        <div className="text-sm font-medium">Agent {randomAgent} görüşmeden ayrıldı</div>
        <div className="text-xs text-muted-foreground">
          Görüşme sonlandırıldı ({format(new Date(), "HH:mm")})
        </div>
      </div>
    </div>
  );
}
