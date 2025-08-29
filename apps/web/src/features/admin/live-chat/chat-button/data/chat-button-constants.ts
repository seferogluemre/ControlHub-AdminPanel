import type { ButtonTypeOption } from "../types/chat-button";

export const DEFAULT_COLOR = "#3B82F6";

export const DEFAULT_DESKTOP_OFFSET_RIGHT = "0";
export const DEFAULT_DESKTOP_OFFSET_BOTTOM = "60";
export const DEFAULT_MOBILE_OFFSET_RIGHT = "0";
export const DEFAULT_MOBILE_OFFSET_BOTTOM = "0";

export const BUTTON_TYPE_OPTIONS: ButtonTypeOption[] = [
  {
    id: "adaptive",
    label: "Uyumlu",
    icon: "📍",
  },
  {
    id: "image",
    label: "Resim",
    icon: "🖼️",
  },
];
