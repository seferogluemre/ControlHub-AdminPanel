export interface ChatButtonSettings {
  type: "adaptive" | "image" | "text";
  color: string;
  desktopOffsetRight: string;
  desktopOffsetBottom: string;
  mobileOffsetRight: string;
  mobileOffsetBottom: string;
}

export interface ButtonTypeOption {
  id: string;
  label: string;
  icon: string;
}
