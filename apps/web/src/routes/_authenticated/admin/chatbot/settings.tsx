import { Card, CardContent } from "#components/ui/card.tsx";
import { Checkbox } from "#components/ui/checkbox.tsx";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "#components/ui/collapsible.tsx";
import { Label } from "#components/ui/label.tsx";
import { RichTextEditor } from "#features/admin/live-chat/index.tsx";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_authenticated/admin/chatbot/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [autoEndChats, setAutoEndChats] = useState(false);
  const [autoEmailTranscripts, setAutoEmailTranscripts] = useState(false);
  const [limitQueueLength, setLimitQueueLength] = useState(false);
  const [enableEmojis, setEnableEmojis] = useState(false);
  const [greetingMessage, setGreetingMessage] = useState("");

  return (
    <div>
      <Card>
        <CardContent className="p-6">
          <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full">
              <Label className="text-sm font-medium">Advanced</Label>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${isAdvancedOpen ? "rotate-180" : ""}`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={autoEndChats}
                      onCheckedChange={(checked) => setAutoEndChats(checked === true)}
                    />
                    <Label className="text-sm">
                      Automatically end chats if visitors don't respond
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={autoEmailTranscripts}
                      onCheckedChange={(checked) => setAutoEmailTranscripts(checked === true)}
                    />
                    <Label className="text-sm">
                      Automatically email chat transcripts for archiving or followup
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={limitQueueLength}
                      onCheckedChange={(checked) => setLimitQueueLength(checked === true)}
                    />
                    <Label className="text-sm">Limit chat queue length</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={enableEmojis}
                      onCheckedChange={(checked) => setEnableEmojis(checked === true)}
                    />
                    <Label className="text-sm">Enable emojis for both visitors and agents</Label>
                  </div>
                </div>

                {/* Greeting Message */}
                <div className="space-y-3 mt-6">
                  <Label className="text-sm font-medium">Greeting Message</Label>
                  <RichTextEditor
                    value={greetingMessage}
                    onChange={setGreetingMessage}
                    placeholder="Enter your greeting message here..."
                    className="min-h-[200px]"
                  />
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>
    </div>
  );
}
