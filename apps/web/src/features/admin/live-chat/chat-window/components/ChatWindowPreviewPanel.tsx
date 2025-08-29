import { Monitor, Smartphone } from "lucide-react";
import { Button } from "#components/ui/button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "#components/ui/card.tsx";

import { ChatWindowPreview } from "./chat-window-preview";

interface ChatWindowPreviewPanelProps {
  selectedView: "desktop" | "mobile";
  setSelectedView: (view: "desktop" | "mobile") => void;
  selectedStyle: string;
  color: string;
  selectedBackground: string;
  chatType: "embedded" | "popup";
  agentAvatar: boolean;
  agentTitle: boolean;
  customBackgroundColor: string;
  displayAgentAvatar: boolean;
}

export function ChatWindowPreviewPanel({
  selectedView,
  setSelectedView,
  selectedStyle,
  color,
  selectedBackground,
  chatType,
  agentAvatar,
  agentTitle,
  customBackgroundColor,
  displayAgentAvatar,
}: ChatWindowPreviewPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Preview
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <Button
              variant={selectedView === "desktop" ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedView("desktop")}
              className="h-8 px-3"
            >
              <Monitor className="w-4 h-4 mr-1" />
              Desktop
            </Button>
            <Button
              variant={selectedView === "mobile" ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedView("mobile")}
              className="h-8 px-3"
            >
              <Smartphone className="w-4 h-4 mr-1" />
              Mobile
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <ChatWindowPreview
          selectedStyle={selectedStyle}
          color={color}
          selectedBackground={selectedBackground}
          chatType={chatType}
          agentAvatar={agentAvatar}
          agentTitle={agentTitle}
          customBackgroundColor={customBackgroundColor}
          selectedView={selectedView}
          displayAgentAvatar={displayAgentAvatar}
        />
      </CardContent>
    </Card>
  );
}
