import { Badge } from "#components/ui/badge.tsx";
import { Card, CardContent } from "#components/ui/card.tsx";
import { Checkbox } from "#components/ui/checkbox.tsx";
import { Input } from "#components/ui/input.tsx";
import { Label } from "#components/ui/label.tsx";
import { Switch } from "#components/ui/switch.tsx";
import { useState } from "react";

import { RichTextEditor } from "../components/rich-text-editor";
import { DEFAULT_GREETING_MESSAGE, DEFAULT_TEAM_NAME } from "./data/pre-chat-constants";

export function PreChats() {
  const [preChatEnabled, setPreChatEnabled] = useState(true);

  const [displayTeamName, setDisplayTeamName] = useState(true);
  const [teamName, setTeamName] = useState(DEFAULT_TEAM_NAME);
  const [displayAgentAvatars, setDisplayAgentAvatars] = useState(false);
  const [greetingMessage, setGreetingMessage] = useState(DEFAULT_GREETING_MESSAGE);
  const [_facebookLogin, _setFacebookLogin] = useState(false);
  // const [selectedTaskBot, setSelectedTaskBot] = useState('casivera-bot')
  // const [enableInputArea, setEnableInputArea] = useState(true)

  return (
    <div className="space-y-6">
      {/* Pre-chat Toggle */}
      <div className="flex items-center space-x-3">
        <Label className="text-sm font-medium">Pre-chat</Label>
        <div className="flex items-center space-x-2">
          <Switch
            checked={preChatEnabled}
            onCheckedChange={setPreChatEnabled}
            className="data-[state=checked]:bg-green-500"
          />
          <Badge
            variant={preChatEnabled ? "default" : "secondary"}
            className={preChatEnabled ? "bg-green-500" : ""}
          >
            {preChatEnabled ? "ON" : "OFF"}
          </Badge>
        </div>
      </div>
      {/* Form Section */}
      {/* Header Section */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <Label className="text-sm font-medium">Header</Label>

            {/* Display team name */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="display-team-name"
                  checked={displayTeamName}
                  onCheckedChange={(checked) => setDisplayTeamName(checked === true)}
                />
                <Label htmlFor="display-team-name" className="text-sm">
                  Display team name
                </Label>
              </div>

              {displayTeamName && (
                <div className="ml-6 space-y-2">
                  <Label htmlFor="team-name" className="text-sm text-red-500">
                    Team name *
                  </Label>
                  <Input
                    id="team-name"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="Enter team name"
                  />
                </div>
              )}
            </div>

            {/* Display agent avatars */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="display-avatars"
                checked={displayAgentAvatars}
                onCheckedChange={(checked) => setDisplayAgentAvatars(checked === true)}
              />
              <Label htmlFor="display-avatars" className="text-sm">
                Display agent avatars
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Greeting Message */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <Label className="text-sm font-medium">Başlangıç Mesajı</Label>
            <RichTextEditor
              value={greetingMessage}
              onChange={setGreetingMessage}
              placeholder="Enter your greeting message here..."
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
