import { IconChevronDown } from "@tabler/icons-react";
import { useState } from "react";
import { Badge } from "#/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "#/components/ui/collapsible";
import { cn } from "#/lib/utils";
import { type ChatUser } from "../../data/chat-types";
import { ChatItem } from "./chat-item";

interface ChatGroupsProps {
  ongoingChats: ChatUser[];
  endedChats: ChatUser[];
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

export function ChatGroups({
  ongoingChats,
  endedChats,
  selectedUser,
  onSelectUser,
  onTogglePin,
  displayOptions,
}: ChatGroupsProps) {
  const [ongoingOpen, setOngoingOpen] = useState(true);
  const [endedOpen, setEndedOpen] = useState(false);

  return (
    <>
      {/* Ongoing Chats */}
      <Collapsible open={ongoingOpen} onOpenChange={setOngoingOpen}>
        <CollapsibleTrigger className="flex w-full items-center justify-between p-2.5 rounded-md hover:bg-secondary/50 transition-colors max-w-full overflow-hidden">
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-semibold text-xs">Ongoing</span>
            <Badge variant="secondary" className="text-xs flex-shrink-0">
              {ongoingChats.length}
            </Badge>
          </div>
          <IconChevronDown
            className={cn(
              "h-3 w-3 transition-transform flex-shrink-0",
              ongoingOpen && "rotate-180",
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-0.5 mt-1 w-full max-w-full overflow-hidden">
          {ongoingChats.map((chat) => (
            <ChatItem
              key={chat.id}
              chat={chat}
              selectedUser={selectedUser}
              onSelectUser={onSelectUser}
              onTogglePin={onTogglePin}
              displayOptions={displayOptions}
            />
          ))}
          {ongoingChats.length === 0 && (
            <div className="text-center text-muted-foreground text-xs py-3 ">No ongoing chats</div>
          )}
        </CollapsibleContent>
      </Collapsible>

      {/* Ended Chats */}
      <Collapsible open={endedOpen} onOpenChange={setEndedOpen}>
        <CollapsibleTrigger className="flex w-full items-center justify-between p-2.5 rounded-md hover:bg-secondary/50 transition-colors max-w-full overflow-hidden">
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-semibold text-xs">Chat Ended</span>
            <Badge variant="secondary" className="text-xs flex-shrink-0">
              {endedChats.length}
            </Badge>
          </div>
          <IconChevronDown
            className={cn("h-3 w-3 transition-transform flex-shrink-0", endedOpen && "rotate-180")}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-0.5 mt-1 w-full max-w-full overflow-hidden">
          {endedChats.map((chat) => (
            <ChatItem
              key={chat.id}
              chat={chat}
              selectedUser={selectedUser}
              onSelectUser={onSelectUser}
              onTogglePin={onTogglePin}
              displayOptions={displayOptions}
            />
          ))}
          {endedChats.length === 0 && (
            <div className="text-center text-muted-foreground text-xs py-3">No ended chats</div>
          )}
        </CollapsibleContent>
      </Collapsible>
    </>
  );
}
