export interface ChatWindowSettings {
  selectedStyle: string;
  color: string;
  selectedHeaderTab: string;
  agentAvatar: boolean;
  agentTitle: boolean;
  agentBio: boolean;
  displayAgentAvatar: boolean;
  textureBackground: boolean;
  selectedBackground: string;
  chatType: "embedded" | "popup";
  allowDownload: boolean;
  allowPrint: boolean;
  allowSoundNotifications: boolean;
  allowEmail: boolean;
  allowOfflineSwitch: boolean;
  allowFileUpload: boolean;
  showUnreadDot: boolean;
  allowAudioChats: boolean;
  allowVideoChats: boolean;
  removePoweredBy: boolean;
  autoEndChats: boolean;
  autoEmailTranscripts: boolean;
  limitQueueLength: boolean;
  enableEmojis: boolean;
  greetingMessage: string;
}

export interface StyleOption {
  id: string;
  name: string;
}

export interface HeaderTab {
  id: string;
  label: string;
}

export interface BackgroundOption {
  id: string;
  gradient: string;
}

export interface ChatWindowPreviewProps {
  selectedStyle: string;
  color: string;
  selectedBackground: string;
  chatType: "embedded" | "popup";
  agentAvatar: boolean;
  agentTitle: boolean;
  customBackgroundColor: string;
  selectedView: "desktop" | "mobile";
  displayAgentAvatar: boolean;
}

export interface Message {
  id: string;
  content: string;
  timestamp: string;
  isBot: boolean;
}
