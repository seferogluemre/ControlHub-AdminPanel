import { Visitor } from "./data/types";

export const calculateVisitorStats = (visitors: Visitor[]) => {
  const totalVisitors = visitors.length;
  const onlineVisitors = visitors.filter((v) => v.isOnline).length;
  const waitingForChat = visitors.filter((v) => v.chats === 0 && v.isOnline).length;

  return {
    totalVisitors,
    onlineVisitors,
    waitingForChat,
  };
};

export const sortVisitorsByOnlineStatus = (visitors: Visitor[]): Visitor[] => {
  return [...visitors].sort((a, b) => {
    // Online olanları üstte göster
    if (a.isOnline && !b.isOnline) return -1;
    if (!a.isOnline && b.isOnline) return 1;

    // Aynı durumda olanları chat sayısına göre sırala
    if (a.isOnline === b.isOnline) {
      return b.chats - a.chats;
    }

    return 0;
  });
};

export const filterTabs = [
  { value: "all_visitors", label: "Tüm Ziyaretçiler" },
  { value: "all_chats", label: "Tüm Sohbetler" },
  { value: "my_chats", label: "Sohbetlerim" },
  { value: "custom", label: "Özel Filtre" },
] as const;

export const filterVisitorsByTab = (visitors: Visitor[], activeTab: string): Visitor[] => {
  switch (activeTab) {
    case "all_visitors":
      return visitors;
    case "all_chats":
      return visitors.filter((v) => v.chats > 0);
    case "my_chats":
      // My chats - assumiing current user is 'Tuğçe' or 'Hazal'
      return visitors.filter((v) => v.agent === "Tuğçe" || v.agent === "Hazal");
    case "custom":
      // Custom filter - online visitors with active chats
      return visitors.filter((v) => v.isOnline && v.hasActiveChat);
    default:
      return visitors;
  }
};
