export interface PreChatField {
  id: string;
  name: string;
  visible: boolean;
  required: boolean;
  type: "text" | "email" | "tel" | "number" | "select" | "textarea";
}

export interface PreChatFormData {
  preChatEnabled: boolean;
  preChatType: "form" | "taskbot";
  displayTeamName: boolean;
  teamName: string;
  displayAgentAvatars: boolean;
  greetingMessage: string;
  facebookLogin: boolean;
  selectedTaskBot: string;
  enableInputArea: boolean;
  fields: PreChatField[];
}

export interface TaskBotOption {
  value: string;
  label: string;
}
