import { format } from "date-fns";
import { type Convo } from "../../data/chat-types";

export function formatMessagesByDate(messages: Convo[]): [string, Convo[]][] {
  const messagesByDate = messages.reduce((acc: Record<string, Convo[]>, message) => {
    const dateKey = format(new Date(message.timestamp), "d MMM, yyyy");
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(message);
    return acc;
  }, {});

  return Object.entries(messagesByDate)
    .sort(([dateA], [dateB]) => {
      return new Date(dateA).getTime() - new Date(dateB).getTime();
    })
    .map(
      ([date, messagesForDate]) =>
        [
          date,
          messagesForDate.sort(
            (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
          ),
        ] as [string, Convo[]],
    );
}
