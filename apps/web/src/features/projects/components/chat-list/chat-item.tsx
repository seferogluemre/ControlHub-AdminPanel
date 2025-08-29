import { IconActivity, IconPin, IconPinFilled } from "@tabler/icons-react";
import { Fragment } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";
import { Badge } from "#/components/ui/badge";
import { cn } from "#/lib/utils";
import { type ChatUser } from "../../data/chat-types";

interface ChatItemProps {
  chat: ChatUser;
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

export function ChatItem({
  chat,
  selectedUser,
  onSelectUser,
  onTogglePin,
  displayOptions,
}: ChatItemProps) {
  const lastMessage = chat.messages[0];
  const lastMsg = lastMessage?.message || "";
  const shortMsg = lastMsg.length > 30 ? lastMsg.substring(0, 30) + "..." : lastMsg;

  return (
    <Fragment key={chat.id}>
      <div className="relative -mx-1">
        {/* Pin Button - Only show for selected user */}
        {selectedUser?.id === chat.id && (
          <button
            type="button"
            className={cn(
              "absolute top-1 left-1 z-10 p-1 rounded-full hover:bg-secondary/80 transition-colors",
              chat.pinned ? "bg-primary text-primary-foreground" : "bg-background shadow-sm",
            )}
            onClick={(e) => {
              e.stopPropagation();
              onTogglePin(chat.id);
            }}
          >
            {chat.pinned ? <IconPinFilled className="h-3 w-3" /> : <IconPin className="h-3 w-3" />}
          </button>
        )}

        <button
          type="button"
          className={cn(
            "hover:bg-secondary/75 flex w-full rounded-lg px-2 py-2 text-left text-sm transition-all duration-200 hover:shadow-sm",
            selectedUser?.id === chat.id && "bg-muted shadow-sm",
          )}
          onClick={() => onSelectUser(chat)}
        >
          <div className="flex w-full items-center gap-1.5 min-w-0">
            <div className="relative flex-shrink-0">
              {chat.isOngoing && (
                <div className="absolute -left-0.5 top-5.5 z-10">
                  <div className="bg-green-500 rounded-full p-0.5 flex items-center justify-center">
                    <IconActivity className="h-3 w-3 text-6xl text-white " />
                  </div>
                </div>
              )}
              {!chat.isOngoing && (
                <div className="absolute -left-0.5 top-5.5 z-10">
                  <div className="bg-gray-400 rounded-full p-0.5 flex items-center justify-center">
                    <IconActivity className="h-3 w-3 text-6xl text-white" />
                  </div>
                </div>
              )}
              <Avatar className="h-8 w-8">
                <AvatarImage src={chat.profile} alt={chat.username} />
                <AvatarFallback className="text-xs">
                  {chat.fullName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 min-w-0">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="font-medium text-xs truncate">{chat.fullName}</span>
                    {chat.pinned && (
                      <IconPinFilled className="h-3 w-3 text-primary flex-shrink-0" />
                    )}
                  </div>

                  {displayOptions.showDepartment && (
                    <Badge
                      variant="secondary"
                      className="text-xs h-4 px-1.5 bg-blue-100 text-blue-700 hover:bg-blue-100 mt-0.5"
                    >
                      {chat.department}
                    </Badge>
                  )}
                </div>

                <div className="text-right flex-shrink-0 mr-2">
                  <div className="text-xs text-muted-foreground">{chat.lastMessageTime}</div>
                  {chat.unreadCount > 0 && (
                    <Badge
                      variant="destructive"
                      className="text-xs h-4 px-1.5 min-w-[16px] flex items-center -left-4.5 justify-center mr-1.5 mt-0.5"
                    >
                      {chat.unreadCount > 99 ? "99+" : chat.unreadCount}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="text-xs text-muted-foreground truncate mt-0.5">{shortMsg}</div>

              {displayOptions.showCampaign && (
                <Badge
                  variant="secondary"
                  className="text-xs h-4 px-1.5 bg-amber-100 text-amber-700 hover:bg-amber-100 mt-0.5"
                >
                  Campaign: {chat.sessionInfo.campaign}
                </Badge>
              )}
            </div>
          </div>
        </button>
      </div>
    </Fragment>
  );
}
