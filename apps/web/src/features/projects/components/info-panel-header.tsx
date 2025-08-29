import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";
import { type ChatUser } from "../data/chat-types";

interface InfoPanelHeaderProps {
  selectedUser: ChatUser;
}

export function InfoPanelHeader({ selectedUser }: InfoPanelHeaderProps) {
  return (
    <div className="p-3 border-b flex-shrink-0">
      <div className="flex items-center gap-2">
        <Avatar className="h-12 w-12">
          <AvatarImage src={selectedUser.profile} alt={selectedUser.username} />
          <AvatarFallback className="text-sm font-semibold">
            {selectedUser.fullName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm truncate">{selectedUser.fullName}</h3>
          <p className="text-xs text-muted-foreground truncate">{selectedUser.title}</p>
        </div>
      </div>
    </div>
  );
}
