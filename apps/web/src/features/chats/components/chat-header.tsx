import {
  IconArrowRight,
  IconBan,
  IconFile,
  IconLogin,
  IconLogout,
  IconX,
} from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";
import { Button } from "#/components/ui/button";
import { type ChatUser } from "../data/chat-types";

interface ChatHeaderProps {
  selectedUser: ChatUser;
  onCloseChat?: () => void;
}

export function ChatHeader({ selectedUser, onCloseChat }: ChatHeaderProps) {
  return (
    <div className=" border-b flex items-center justify-between p-3">
      {/* Left Side */}
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Avatar className="h-10 w-10">
              <AvatarImage src={selectedUser.profile} alt={selectedUser.username} />
              <AvatarFallback className="text-sm font-semibold">
                {selectedUser.fullName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {selectedUser.isOngoing && (
              <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-base">{selectedUser.fullName}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-1.5">
        <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-secondary" title="Files">
          <IconFile className="h-4 w-4 text-muted-foreground" />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 hover:bg-secondary"
          title="Block User"
        >
          <IconBan className="h-4 w-4 text-muted-foreground" />
        </Button>

        <Button
          size="sm"
          variant="outline"
          className="h-8 px-2.5 flex items-center gap-1.5 text-xs"
          title="Transfer Chat"
        >
          <IconArrowRight className="h-3 w-3" />
          <span>Aktar</span>
        </Button>

        <Button
          size="sm"
          variant="outline"
          className="h-8 px-2.5 flex items-center gap-1.5 bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 text-xs"
          title="Join Chat"
        >
          <IconLogin className="h-3 w-3" />
          <span>Katıl</span>
        </Button>

        <Button
          size="sm"
          variant="outline"
          className="h-8 px-2.5 flex items-center gap-1.5 bg-red-50 border-red-200 text-red-700 hover:bg-red-100 text-xs"
          title="Leave Chat"
        >
          <IconLogout className="h-3 w-3" />
          <span>Sohbetten Ayrıl</span>
        </Button>

        {!selectedUser.isOngoing && onCloseChat && (
          <Button
            size="sm"
            variant="outline"
            className="h-8 px-2.5 flex items-center gap-1.5 bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 text-xs"
            title="Close That Window"
            onClick={onCloseChat}
          >
            <IconX className="h-3 w-3" />
            <span>Pencereyi Kapat</span>
          </Button>
        )}
      </div>
    </div>
  );
}
