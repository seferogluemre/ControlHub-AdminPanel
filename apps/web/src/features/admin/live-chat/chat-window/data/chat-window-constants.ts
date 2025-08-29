import type { BackgroundOption, HeaderTab, StyleOption } from "../types/chat-window";

export const DEFAULT_COLOR = "#3B82F6";
export const DEFAULT_STYLE = "style2";
export const DEFAULT_HEADER_TAB = "agent-info";
export const DEFAULT_BACKGROUND = "bg1";
export const DEFAULT_CHAT_TYPE = "embedded";

export const STYLE_OPTIONS: StyleOption[] = [
  {
    id: "style1",
    name: "Klasik",
  },
];

export const BASE_HEADER_TABS: HeaderTab[] = [
  { id: "agent-info", label: "Ai Bilgisi" },
  { id: "banner-image", label: "Banner Resmi" },
];

export const BACKGROUND_OPTIONS: BackgroundOption[] = [
  { id: "bg1", gradient: "from-gray-100 to-gray-200" },
  { id: "bg2", gradient: "from-blue-100 to-blue-200" },
  { id: "bg3", gradient: "from-purple-100 to-purple-200" },
  { id: "bg4", gradient: "from-green-100 to-green-200" },
  { id: "bg5", gradient: "from-orange-100 to-orange-200" },
];
