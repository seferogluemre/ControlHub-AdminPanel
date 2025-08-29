export interface ChatUser {
  id: string;
  profile: string;
  username: string;
  fullName: string;
  title: string;
  messages: Convo[];
  unreadCount: number;
  lastMessageTime: string;
  department: string;
  isOngoing: boolean;
  pinned?: boolean;
  sessionInfo: SessionInfo;
  userInfo: UserInfo;
}

export interface Convo {
  sender: string;
  message: string;
  timestamp: string;
}

export interface SessionInfo {
  chatId: string;
  location: string;
  campaign: string;
  campaignDisplay: string;
  referredFrom: string;
  currentlyBrowsing: string;
  deviceInfo: string;
  allChats: number;
  visits: number;
}

export interface UserInfo {
  country: string;
  browser: string;
  os: string;
  device: string;
}
