import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Textarea } from "#/components/ui/textarea.tsx";
import { Tooltip, TooltipContent, TooltipTrigger } from "#/components/ui/tooltip.tsx";
import { AUTO_RESPONSE_SHORTCUTS } from "../../data/constants";

interface MessageComposerProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export interface MessageComposerRef {
  addEmoji: (emoji: string) => void;
  getMessage: () => string;
  canSend: () => boolean;
  sendMessage: () => void;
}

export const MessageComposer = forwardRef<MessageComposerRef, MessageComposerProps>(
  ({ onSendMessage, disabled = false, placeholder = "Mesajınızı yazın..." }, ref) => {
    const [message, setMessage] = useState("");
    const [previousMessage, setPreviousMessage] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [autoSendTimer, setAutoSendTimer] = useState<NodeJS.Timeout | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (message.trim() && !disabled) {
        const messageToSend = message.trim();
        setMessage("");
        setShowSuggestions(false);
        setSuggestions([]);
        if (autoSendTimer) {
          clearTimeout(autoSendTimer);
          setAutoSendTimer(null);
        }
        onSendMessage(messageToSend);
      }
    };

    const sendMessage = () => {
      if (message.trim() && !disabled) {
        const messageToSend = message.trim();
        setMessage("");
        setShowSuggestions(false);
        setSuggestions([]);
        if (autoSendTimer) {
          clearTimeout(autoSendTimer);
          setAutoSendTimer(null);
        }
        onSendMessage(messageToSend);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (showSuggestions) {
        if (e.key === "Tab") {
          e.preventDefault();
          const selectedCode = suggestions[selectedSuggestionIndex];
          const codeMessage =
            AUTO_RESPONSE_SHORTCUTS[selectedCode as keyof typeof AUTO_RESPONSE_SHORTCUTS];
          setMessage(codeMessage);
          setShowSuggestions(false);
          setSuggestions([]);
          return;
        }

        if (e.key === "Escape") {
          e.preventDefault();
          setMessage(previousMessage);
          setShowSuggestions(false);
          setSuggestions([]);
          return;
        }

        if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedSuggestionIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
          return;
        }

        if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedSuggestionIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
          return;
        }
      }

      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e);
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setMessage(newValue);

      // Clear existing timer
      if (autoSendTimer) {
        clearTimeout(autoSendTimer);
      }

      // Find matching codes
      const matchingCodes = Object.keys(AUTO_RESPONSE_SHORTCUTS).filter(
        (code) => code.toLowerCase().includes(newValue.toLowerCase()) && newValue.trim().length > 0,
      );

      if (matchingCodes.length > 0 && newValue.trim().length > 0) {
        setPreviousMessage(message);
        setSuggestions(matchingCodes);
        setSelectedSuggestionIndex(0);
        setShowSuggestions(true);

        // Set auto-send timer for 8-10 seconds
        const timer = setTimeout(() => {
          // Check if user typed exact match
          const exactMatch = Object.keys(AUTO_RESPONSE_SHORTCUTS).find(
            (code) => code.toLowerCase() === newValue.toLowerCase(),
          );

          if (exactMatch) {
            const autoMessage =
              AUTO_RESPONSE_SHORTCUTS[exactMatch as keyof typeof AUTO_RESPONSE_SHORTCUTS];
            onSendMessage(autoMessage);
            setMessage("");
            setShowSuggestions(false);
            setSuggestions([]);
          }
        }, 10000); // 9 seconds

        setAutoSendTimer(timer);
      } else {
        setShowSuggestions(false);
        setSuggestions([]);
      }
    };

    // Cleanup timer on unmount
    useEffect(() => {
      return () => {
        if (autoSendTimer) {
          clearTimeout(autoSendTimer);
        }
      };
    }, [autoSendTimer]);

    const addEmoji = (emoji: string) => {
      setMessage((prev) => prev + emoji);
    };

    useImperativeHandle(ref, () => ({
      addEmoji,
      getMessage: () => message,
      canSend: () => message.trim().length > 0 && !disabled,
      sendMessage,
    }));

    return (
      <div className="w-full relative">
        {showSuggestions && suggestions.length > 0 && (
          <Tooltip open={showSuggestions}>
            <TooltipTrigger asChild>
              <div className="absolute bottom-full left-4 mb-2 w-fit" />
            </TooltipTrigger>
            <TooltipContent
              side="top"
              align="start"
              className="bg-gray-800 border-gray-600 text-white p-2"
            >
              <div className="space-y-1">
                {suggestions.map((code, index) => (
                  <div
                    key={code}
                    className={`cursor-pointer px-2 py-1 rounded text-xs ${
                      index === selectedSuggestionIndex
                        ? "bg-blue-600 text-white font-semibold"
                        : "text-gray-300 hover:text-white hover:bg-gray-700"
                    }`}
                    onClick={() => {
                      const codeMessage =
                        AUTO_RESPONSE_SHORTCUTS[code as keyof typeof AUTO_RESPONSE_SHORTCUTS];
                      setMessage(codeMessage);
                      setShowSuggestions(false);
                      setSuggestions([]);
                    }}
                  >
                    {code}
                  </div>
                ))}
              </div>
            </TooltipContent>
          </Tooltip>
        )}

        {/* Message Input */}
        <div className="p-4">
          <form onSubmit={handleSubmit}>
            <Textarea
              placeholder={placeholder}
              value={message}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="min-h-[90px] bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder:text-gray-400 resize-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              disabled={disabled}
            />
          </form>
        </div>
      </div>
    );
  },
);
