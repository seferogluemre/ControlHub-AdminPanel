import { useState } from "react";
import generateChatUsers from "../../../utils/mock-generators/chat-generator";
import { type ChatUser } from "../data/chat-types";

export function useChatState() {
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
  const [mobileSelectedUser, setMobileSelectedUser] = useState<ChatUser | null>(null);
  const [createConversationDialogOpened, setCreateConversationDialog] = useState(false);

  // Generate conversations with useMemo to maintain state
  const [conversations, setConversations] = useState<ChatUser[]>(() => {
    const { conversations: generatedConversations } = generateChatUsers(25);
    return generatedConversations;
  });

  const handleUserSelect = (user: ChatUser) => {
    setSelectedUser(user);
    setMobileSelectedUser(user);
  };

  const handleBackClick = () => {
    setMobileSelectedUser(null);
  };

  const handleCloseChat = () => {
    setSelectedUser(null);
    setMobileSelectedUser(null);
  };

  const handleTogglePin = (userId: string) => {
    setConversations((prevConversations) =>
      prevConversations.map((conversation) =>
        conversation.id === userId
          ? { ...conversation, pinned: !conversation.pinned }
          : conversation,
      ),
    );
  };

  const openNewChatDialog = () => setCreateConversationDialog(true);
  const closeNewChatDialog = () => setCreateConversationDialog(false);

  return {
    conversations,
    selectedUser,
    mobileSelectedUser,
    createConversationDialogOpened,

    handleUserSelect,
    handleBackClick,
    handleCloseChat,
    handleTogglePin,
    openNewChatDialog,
    closeNewChatDialog,

    setSelectedUser,
    setMobileSelectedUser,
    setCreateConversationDialog,
  };
}
