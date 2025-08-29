import type { BackgroundOption, HeaderTab, StyleOption } from "../types/chat-window";

export const DEFAULT_COLOR = "#0EA5E9";
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
  { id: "bg1", gradient: "from-slate-100 to-slate-200" },
  { id: "bg2", gradient: "from-blue-100 to-cyan-200" },
  { id: "bg3", gradient: "from-teal-100 to-emerald-200" },
  { id: "bg4", gradient: "from-cyan-100 to-blue-200" },
  { id: "bg5", gradient: "from-indigo-100 to-blue-200" },
];
