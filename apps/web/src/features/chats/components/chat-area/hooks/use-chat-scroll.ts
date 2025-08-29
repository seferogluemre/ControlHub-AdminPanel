import { format } from "date-fns";
import { useRef, useState } from "react";

export function useChatScroll() {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [highlightedDate, setHighlightedDate] = useState<string | null>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (scrollAreaRef.current) {
        const scrollElement = scrollAreaRef.current.querySelector(
          "[data-radix-scroll-area-viewport]",
        );
        if (scrollElement) {
          scrollElement.scrollTop = scrollElement.scrollHeight;
        }
      }
    }, 100);
  };

  const scrollToDate = (targetDate: string) => {
    setHighlightedDate(targetDate);

    setTimeout(() => {
      const targetDisplayDate = format(new Date(targetDate), "d MMM, yyyy");
      const dateElement = document.querySelector(`[data-date="${targetDisplayDate}"]`);

      if (dateElement) {
        dateElement.scrollIntoView({ behavior: "smooth", block: "center" });

        setTimeout(() => {
          setHighlightedDate(null);
        }, 3000);
      } else {
        console.log("Date element not found:", targetDisplayDate);
      }
    }, 100);
  };

  return {
    scrollAreaRef,
    highlightedDate,
    scrollToBottom,
    scrollToDate,
  };
}
