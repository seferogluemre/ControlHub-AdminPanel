import { ColorPicker } from "#components/color-picker.tsx";
import { Button } from "#components/ui/button.tsx";
import { Card, CardContent } from "#components/ui/card.tsx";
import { Checkbox } from "#components/ui/checkbox.tsx";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "#components/ui/collapsible.tsx";
import { Label } from "#components/ui/label.tsx";
import { ChevronDown } from "lucide-react";
import { BASE_HEADER_TABS } from "../data/chat-window-constants";
import { StyleSelector } from "./style-selector";

interface ChatWindowSettingsProps {
  selectedStyle: string;
  setSelectedStyle: (style: string) => void;
  color: string;
  setColor: (color: string) => void;
  selectedHeaderTab: string;
  setSelectedHeaderTab: (tab: string) => void;
  agentAvatar: boolean;
  setAgentAvatar: (value: boolean) => void;
  agentTitle: boolean;
  setAgentTitle: (value: boolean) => void;
  displayAgentAvatar: boolean;
  setDisplayAgentAvatar: (value: boolean) => void;
  textureBackground: boolean;
  setTextureBackground: (value: boolean) => void;
  customBackgroundColor: string;
  setCustomBackgroundColor: (color: string) => void;
  setSelectedBackground: (bg: string) => void;
  isOptionsOpen: boolean;
  setIsOptionsOpen: (open: boolean) => void;
  isAdvancedOpen: boolean;
  setIsAdvancedOpen: (open: boolean) => void;
  greetingMessage: string;
  setGreetingMessage: (message: string) => void;
  // Options states
  allowDownload: boolean;
  setAllowDownload: (value: boolean) => void;
  allowPrint: boolean;
  setAllowPrint: (value: boolean) => void;
  allowSoundNotifications: boolean;
  setAllowSoundNotifications: (value: boolean) => void;
  allowEmail: boolean;
  setAllowEmail: (value: boolean) => void;
  allowOfflineSwitch: boolean;
  setAllowOfflineSwitch: (value: boolean) => void;
  allowFileUpload: boolean;
  setAllowFileUpload: (value: boolean) => void;
  showUnreadDot: boolean;
  setShowUnreadDot: (value: boolean) => void;
  allowAudioChats: boolean;
  setAllowAudioChats: (value: boolean) => void;
  allowVideoChats: boolean;
  setAllowVideoChats: (value: boolean) => void;
  removePoweredBy: boolean;
  setRemovePoweredBy: (value: boolean) => void;
}

export function ChatWindowSettings(props: ChatWindowSettingsProps) {
  const {
    selectedStyle,
    setSelectedStyle,
    color,
    setColor,
    selectedHeaderTab,
    setSelectedHeaderTab,
    agentAvatar,
    setAgentAvatar,
    agentTitle,
    setAgentTitle,
    displayAgentAvatar,
    setDisplayAgentAvatar,
    textureBackground,
    setTextureBackground,
    customBackgroundColor,
    setCustomBackgroundColor,
    setSelectedBackground,
    isOptionsOpen,
    setIsOptionsOpen,
    isAdvancedOpen,
    setIsAdvancedOpen,
    greetingMessage,
    setGreetingMessage,
    allowDownload,
    setAllowDownload,
    allowPrint,
    setAllowPrint,
    allowSoundNotifications,
    setAllowSoundNotifications,
    allowEmail,
    setAllowEmail,
    allowOfflineSwitch,
    setAllowOfflineSwitch,
    allowFileUpload,
    setAllowFileUpload,
    showUnreadDot,
    setShowUnreadDot,
    allowAudioChats,
    setAllowAudioChats,
    allowVideoChats,
    setAllowVideoChats,
    removePoweredBy,
    setRemovePoweredBy,
  } = props;

  return (
    <div className="space-y-6">
      {/* Style Selection */}
      <Card>
        <CardContent className="p-6">
          <StyleSelector
            selectedStyle={selectedStyle}
            onStyleChange={setSelectedStyle}
            color={color}
            onColorChange={setColor}
          />
        </CardContent>
      </Card>

      {/* Header Section */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <Label className="text-sm font-medium">Header</Label>

            {/* Header Tabs */}
            <div className="flex space-x-2">
              {BASE_HEADER_TABS.map((tab) => (
                <Button
                  key={tab.id}
                  variant={selectedHeaderTab === tab.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedHeaderTab(tab.id)}
                  className="text-xs"
                >
                  {tab.label}
                </Button>
              ))}
            </div>

            {/* Header Options */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agent-avatar"
                  checked={agentAvatar}
                  onCheckedChange={(checked) => setAgentAvatar(checked === true)}
                />
                <Label htmlFor="agent-avatar" className="text-sm">
                  Agent avatar
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agent-title"
                  checked={agentTitle}
                  onCheckedChange={(checked) => setAgentTitle(checked === true)}
                />
                <Label htmlFor="agent-title" className="text-sm">
                  Agent title
                </Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Body Section */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <Label className="text-sm font-medium">Body</Label>

            {/* Body Options */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="display-avatar"
                  checked={displayAgentAvatar}
                  onCheckedChange={(checked) => setDisplayAgentAvatar(checked === true)}
                />
                <Label htmlFor="display-avatar" className="text-sm">
                  Display agent avatar next to messages
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="texture-background"
                  checked={textureBackground}
                  onCheckedChange={(checked) => setTextureBackground(checked === true)}
                />
                <Label htmlFor="texture-background" className="text-sm">
                  Texture and picture fill for background
                </Label>
              </div>
            </div>

            {/* Background Options */}
            <div className="space-y-3">
              {/* Custom Background Color */}
              <div className="border-t pt-3">
                <ColorPicker
                  value={customBackgroundColor}
                  onChange={(color) => {
                    setCustomBackgroundColor(color);
                    setSelectedBackground("custom");
                  }}
                  label="Custom Background Color"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Options for Visitors */}
      <Card>
        <CardContent className="p-6">
          <Collapsible open={isOptionsOpen} onOpenChange={setIsOptionsOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full">
              <Label className="text-sm font-medium">Options for Visitors</Label>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${isOptionsOpen ? "rotate-180" : ""}`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <div className="space-y-4">
                {/* Option checkboxes */}
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={allowDownload}
                      onCheckedChange={(checked) => setAllowDownload(checked === true)}
                    />
                    <Label className="text-sm">Allow visitors to download chat transcripts</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={allowPrint}
                      onCheckedChange={(checked) => setAllowPrint(checked === true)}
                    />
                    <Label className="text-sm">Allow visitors to print chat transcripts</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={allowSoundNotifications}
                      onCheckedChange={(checked) => setAllowSoundNotifications(checked === true)}
                    />
                    <Label className="text-sm">
                      Allow visitors to turn on/off sound notifications
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={allowEmail}
                      onCheckedChange={(checked) => setAllowEmail(checked === true)}
                    />
                    <Label className="text-sm">Allow visitors to email chat transcripts</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={allowOfflineSwitch}
                      onCheckedChange={(checked) => setAllowOfflineSwitch(checked === true)}
                    />
                    <Label className="text-sm">
                      Allow visitors to switch to the offline message window while waiting to chat
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={allowFileUpload}
                      onCheckedChange={(checked) => setAllowFileUpload(checked === true)}
                    />
                    <Label className="text-sm">Allow visitors to send files during chat</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={showUnreadDot}
                      onCheckedChange={(checked) => setShowUnreadDot(checked === true)}
                    />
                    <Label className="text-sm">Display dot icon for unread messages</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={allowAudioChats}
                      onCheckedChange={(checked) => setAllowAudioChats(checked === true)}
                    />
                    <Label className="text-sm">Allow visitors to request audio chats</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={allowVideoChats}
                      onCheckedChange={(checked) => setAllowVideoChats(checked === true)}
                    />
                    <Label className="text-sm">Allow visitors to request video chats</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={removePoweredBy}
                      onCheckedChange={(checked) => setRemovePoweredBy(checked === true)}
                    />
                    <Label className="text-sm">Remove 'Powered by Comm100' in Chat Window</Label>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>

      {/* Advanced Section */}

      {/* Action Buttons */}
      <div className="flex space-x-3 pt-4">
        <Button className="bg-blue-600 hover:bg-blue-700">Save</Button>
        <Button variant="outline">Cancel</Button>
      </div>
    </div>
  );
}
