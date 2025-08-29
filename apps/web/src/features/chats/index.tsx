import { IconCheck, IconDotsVertical, IconMessages } from "@tabler/icons-react";
import { useState } from "react";
import { Main } from "#/components/layout/main";
import { Button } from "#/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";
import { ChatArea } from "./components/chat-area";
import { ChatList } from "./components/chat-list";
import { InfoPanel } from "./components/info-panel";
import { NewChat } from "./components/new-chat";
import { DROPDOWN_OPTIONS, UI_TEXTS } from "./data/constants";
import { useChatState, useDisplayOptions } from "./hooks";

export default function Chats() {
  const {
    conversations: chatUsers,
    selectedUser,
    mobileSelectedUser,
    createConversationDialogOpened,
    handleUserSelect,
    handleBackClick,
    handleCloseChat,
    handleTogglePin,
    openNewChatDialog,
    setCreateConversationDialog,
  } = useChatState();

  const { displayOptions, handleToggleDisplayOption } = useDisplayOptions();

  const [scrollToDateFn, setScrollToDateFn] = useState<((date: string) => void) | null>(null);

  const handleSendMessage = (message: string) => {
    if (selectedUser) {
      console.log("Sending message:", message, "to:", selectedUser.fullName);
    }
  };

  const handleChatHistoryClick = (date: string) => {
    if (scrollToDateFn) {
      scrollToDateFn(date);
    }
  };

  const users = chatUsers.map(({ messages, ...user }) => user);

  return (
    <>
      <Main fixed className="p-4 -mt-4">
        <div className="flex h-[calc(100vh-120px)] pt-0 gap-3">
          {/* 📱 Left Side - Chat List */}
          <div className="w-64 min-w-[274px] max-w-[256px] bg-card flex flex-col overflow-hidden h-full rounded-xl shadow-md border">
            {/* Header */}
            <div className="p-2.5 border-b flex-shrink-0">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-1.5">
                  <IconMessages className="h-4 w-4 text-primary" />
                  <h1 className="text-base font-bold">Chats</h1>
                </div>

                {/* Display Options Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost" className="h-7 w-7" title="Chat Options">
                      <IconDotsVertical className="h-3.5 w-3.5 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    {DROPDOWN_OPTIONS.map((option) => (
                      <DropdownMenuItem
                        key={option.key}
                        onClick={() => handleToggleDisplayOption(option.key)}
                        className="flex items-center justify-between cursor-pointer"
                      >
                        <span className="text-sm">{option.label}</span>
                        {displayOptions[option.key] && (
                          <IconCheck className="h-4 w-4 text-primary" />
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Chat List - Scrollable Area */}
            <div className="flex-1 overflow-hidden min-h-0">
              <ChatList
                conversations={chatUsers}
                selectedUser={selectedUser}
                onSelectUser={handleUserSelect}
                onTogglePin={handleTogglePin}
                displayOptions={displayOptions}
              />
            </div>
          </div>

          {/* 💬 Middle - Chat Area */}
          {selectedUser ? (
            <div className="flex-1 flex h-full min-h-0 overflow-hidden rounded-xl shadow-md">
              <ChatArea
                selectedUser={selectedUser}
                onSendMessage={handleSendMessage}
                onBackClick={handleBackClick}
                showBackButton={!!mobileSelectedUser}
                onCloseChat={handleCloseChat}
                onScrollToDate={setScrollToDateFn}
              />
            </div>
          ) : (
            <div
              className="flex-1 flex flex-col items-center justify-center h-full rounded-xl shadow-md border"
              style={{ background: "color-mix(in oklab, var(--muted) 15%, transparent)" }}
            >
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto">
                  <IconMessages className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">{UI_TEXTS.chatSelectMessage}</h2>
                  <p className="text-muted-foreground">{UI_TEXTS.chatSelectSubMessage}</p>
                </div>
                <Button onClick={openNewChatDialog} className="mt-4">
                  <IconDotsVertical className="h-4 w-4 mr-2" />
                  {UI_TEXTS.newChatButton}
                </Button>
              </div>
            </div>
          )}

          {/* 📊 Right Side - Info Panel */}
          <div className="h-full overflow-hidden rounded-xl shadow-md">
            <InfoPanel selectedUser={selectedUser} onChatHistoryClick={handleChatHistoryClick} />
          </div>
        </div>
      </Main>

      <NewChat
        users={users}
        onOpenChange={setCreateConversationDialog}
        open={createConversationDialogOpened}
      />
    </>
  );
}
