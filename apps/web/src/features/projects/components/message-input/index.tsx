import { useEffect, useRef, useState } from "react";
import { Button } from "#/components/ui/button";
import { MessageComposer, type MessageComposerRef } from "./message-composer";
import { Toolbar } from "./toolbar";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function MessageInput({
  onSendMessage,
  disabled = false,
  placeholder = "Mesajınızı yazın...",
}: MessageInputProps) {
  const composerRef = useRef<MessageComposerRef>(null);
  const [canSend, setCanSend] = useState(false);

  // Check canSend status periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const newCanSend = composerRef.current?.canSend() ?? false;
      setCanSend(newCanSend);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = () => {
    composerRef.current?.sendMessage();
    setCanSend(false);
  };

  const handleEmojiSelect = (emoji: string) => {
    composerRef.current?.addEmoji(emoji);
  };

  return (
    <div className="w-full mx-auto text-gray-900 dark:text-white rounded-lg">
      {/* Header with Reply and Note buttons */}
      <div className="flex items-center gap-4 border-b border-gray-200 dark:border-gray-700">
        <Button
          variant="ghost"
          className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
        >
          Yanıtla
        </Button>
        <Button
          variant="ghost"
          className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
        >
          Not
        </Button>
      </div>

      {/* Message Composer */}
      <MessageComposer
        ref={composerRef}
        onSendMessage={onSendMessage}
        disabled={disabled}
        placeholder={placeholder}
      />

      {/* Toolbar */}
      <Toolbar
        onSendMessage={handleSendMessage}
        onEmojiSelect={handleEmojiSelect}
        canSend={canSend}
        disabled={disabled}
      />
    </div>
  );
}
