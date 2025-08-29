import { ScrollArea } from "#/components/ui/scroll-area";
import { type ChatUser } from "../../data/chat-types";
import { ChatGroups } from "./chat-groups";
import { ChatItem } from "./chat-item";

interface ChatListProps {
  conversations: ChatUser[];
  selectedUser: ChatUser | null;
  onSelectUser: (user: ChatUser) => void;
  onTogglePin: (userId: string) => void;
  displayOptions: {
    showDepartment: boolean;
    showCampaign: boolean;
    showAgentUnresponsiveTime: boolean;
    groupChatByStatus: boolean;
    showMostRecentChatOnTop: boolean;
  };
}

export function ChatList({
  conversations,
  selectedUser,
  onSelectUser,
  onTogglePin,
  displayOptions,
}: ChatListProps) {
  // Filter conversations by search (removed - not used)
  const filteredConversations = conversations;

  // Sort conversations by pinned status and recent messages
  const sortByPinned = (chats: ChatUser[]) => {
    return chats.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;

      if (displayOptions.showMostRecentChatOnTop) {
        return new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime();
      }

      return 0;
    });
  };

  // Separate ongoing and ended chats
  const ongoingChats = sortByPinned(filteredConversations.filter((chat) => chat.isOngoing));
  const endedChats = sortByPinned(filteredConversations.filter((chat) => !chat.isOngoing));

  return (
    <div className="flex flex-col h-[750px] w-full max-w-[256px] overflow-hidden rounded-lg">
      <ScrollArea className="flex-1 h-full">
        <div className="space-y-1 p-3 w-full max-w-full overflow-hidden">
          {displayOptions.groupChatByStatus ? (
            <ChatGroups
              ongoingChats={ongoingChats}
              endedChats={endedChats}
              selectedUser={selectedUser}
              onSelectUser={onSelectUser}
              onTogglePin={onTogglePin}
              displayOptions={displayOptions}
            />
          ) : (
            <>
              {/* All Chats - No Grouping */}
              <div className="space-y-0.5">
                {[...ongoingChats, ...endedChats].map((chat) => (
                  <ChatItem
                    key={chat.id}
                    chat={chat}
                    selectedUser={selectedUser}
                    onSelectUser={onSelectUser}
                    onTogglePin={onTogglePin}
                    displayOptions={displayOptions}
                  />
                ))}
                {filteredConversations.length === 0 && (
                  <div className="text-center text-muted-foreground text-xs py-3">
                    No chats found
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
