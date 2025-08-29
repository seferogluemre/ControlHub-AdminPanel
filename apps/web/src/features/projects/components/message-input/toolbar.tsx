import { Mic, Paperclip, Send } from "lucide-react";
import { Button } from "#/components/ui/button";
import { EmojiPicker } from "./emoji-picker";

interface ToolbarProps {
  onSendMessage: () => void;
  onEmojiSelect: (emoji: string) => void;
  canSend: boolean;
  disabled?: boolean;
}

export function Toolbar({ onSendMessage, onEmojiSelect, canSend, disabled }: ToolbarProps) {
  return (
    <div className="px-4 pb-4">
      <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 rounded-lg p-2 border border-gray-300 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-500 hover:text-gray-900 hover:bg-gray-200 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
            disabled={disabled}
          >
            <Paperclip className="h-4 w-4" />
          </Button>

          {/* Emoji Picker */}
          <EmojiPicker onEmojiSelect={onEmojiSelect} />

          {/* Voice Message */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-500 hover:text-gray-900 hover:bg-gray-200 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
            disabled={disabled}
          >
            <Mic className="h-4 w-4" />
          </Button>
        </div>

        {/* Send Button */}
        <Button
          onClick={onSendMessage}
          disabled={!canSend || disabled}
          className="h-8 px-4 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
