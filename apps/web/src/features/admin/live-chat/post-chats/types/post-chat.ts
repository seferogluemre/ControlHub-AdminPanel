export interface PostChatField {
  id: string;
  name: string;
  displayName: string;
  type: "text" | "textarea" | "rating" | "email" | "phone" | "select" | "checkbox";
  visible: boolean;
  required: boolean;
  placeholder?: string;
  options?: string[];
  maxLength?: number;
  rows?: number;
  scaleOptions?: PostChatScaleOption[];
}

export interface PostChatScaleOption {
  id: string;
  scale: number;
  text: string;
  visible: boolean;
}

export interface PostChatSettings {
  enabled: boolean;
  greetingMessage: string;
  fields: PostChatField[];
  submitButtonText: string;
  thankYouMessage: string;
}

export type PostChatFieldType = PostChatField["type"];
