import { format } from "date-fns";

interface DateSeparatorProps {
  date: string;
  highlightedDate: string | null;
}

export function DateSeparator({ date, highlightedDate }: DateSeparatorProps) {
  return (
    <div className="flex items-center justify-center">
      <div
        className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs"
        data-date={date}
        style={{
          backgroundColor:
            highlightedDate && format(new Date(highlightedDate), "d MMM, yyyy") === date
              ? "var(--primary)"
              : "var(--secondary)",
          color:
            highlightedDate && format(new Date(highlightedDate), "d MMM, yyyy") === date
              ? "var(--primary-foreground)"
              : "var(--secondary-foreground)",
          transition: "all 0.3s ease",
        }}
      >
        {date}
      </div>
    </div>
  );
}
