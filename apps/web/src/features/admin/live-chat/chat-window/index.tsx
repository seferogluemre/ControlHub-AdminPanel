import { useState } from "react";

import { ChatWindowSettings } from "./components/ChatWindowSettings";
import { DEFAULT_COLOR, DEFAULT_HEADER_TAB, DEFAULT_STYLE } from "./data/chat-window-constants";

export function ChatWindow() {
  const [selectedStyle, setSelectedStyle] = useState(DEFAULT_STYLE);
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [selectedHeaderTab, setSelectedHeaderTab] = useState(DEFAULT_HEADER_TAB);
  const [agentAvatar, setAgentAvatar] = useState(false);
  const [agentTitle, setAgentTitle] = useState(false);
  const [_agentBio, _setAgentBio] = useState(false);
  const [displayAgentAvatar, setDisplayAgentAvatar] = useState(true);
  const [textureBackground, setTextureBackground] = useState(true);

  const [customBackgroundColor, setCustomBackgroundColor] = useState("#e20093");
  const [selectedBackground, setSelectedBackground] = useState("default");
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [greetingMessage, setGreetingMessage] = useState("");

  // Options states
  const [allowDownload, setAllowDownload] = useState(true);
  const [allowPrint, setAllowPrint] = useState(false);
  const [allowSoundNotifications, setAllowSoundNotifications] = useState(false);
  const [allowEmail, setAllowEmail] = useState(true);
  const [allowOfflineSwitch, setAllowOfflineSwitch] = useState(true);
  const [allowFileUpload, setAllowFileUpload] = useState(true);
  const [showUnreadDot, setShowUnreadDot] = useState(true);
  const [allowAudioChats, setAllowAudioChats] = useState(false);
  const [allowVideoChats, setAllowVideoChats] = useState(false);
  const [removePoweredBy, setRemovePoweredBy] = useState(true);

  return (
    <ChatWindowSettings
      selectedStyle={selectedStyle}
      setSelectedStyle={setSelectedStyle}
      color={color}
      setColor={setColor}
      selectedHeaderTab={selectedHeaderTab}
      setSelectedHeaderTab={setSelectedHeaderTab}
      agentAvatar={agentAvatar}
      setAgentAvatar={setAgentAvatar}
      agentTitle={agentTitle}
      setAgentTitle={setAgentTitle}
      displayAgentAvatar={displayAgentAvatar}
      setDisplayAgentAvatar={setDisplayAgentAvatar}
      textureBackground={textureBackground}
      setTextureBackground={setTextureBackground}
      customBackgroundColor={customBackgroundColor}
      setCustomBackgroundColor={setCustomBackgroundColor}
      setSelectedBackground={setSelectedBackground}
      isOptionsOpen={isOptionsOpen}
      setIsOptionsOpen={setIsOptionsOpen}
      isAdvancedOpen={isAdvancedOpen}
      setIsAdvancedOpen={setIsAdvancedOpen}
      greetingMessage={greetingMessage}
      setGreetingMessage={setGreetingMessage}
      allowDownload={allowDownload}
      setAllowDownload={setAllowDownload}
      allowPrint={allowPrint}
      setAllowPrint={setAllowPrint}
      allowSoundNotifications={allowSoundNotifications}
      setAllowSoundNotifications={setAllowSoundNotifications}
      allowEmail={allowEmail}
      setAllowEmail={setAllowEmail}
      allowOfflineSwitch={allowOfflineSwitch}
      setAllowOfflineSwitch={setAllowOfflineSwitch}
      allowFileUpload={allowFileUpload}
      setAllowFileUpload={setAllowFileUpload}
      showUnreadDot={showUnreadDot}
      setShowUnreadDot={setShowUnreadDot}
      allowAudioChats={allowAudioChats}
      setAllowAudioChats={setAllowAudioChats}
      allowVideoChats={allowVideoChats}
      setAllowVideoChats={setAllowVideoChats}
      removePoweredBy={removePoweredBy}
      setRemovePoweredBy={setRemovePoweredBy}
    />
  );
}
