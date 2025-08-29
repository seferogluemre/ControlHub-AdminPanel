import { useState } from "react";
import { Tabs } from "#/components/ui/tabs";
import { type ChatUser } from "../data/chat-types";
import { ContactTabContent } from "./contact-tab-content";
import { HelpTabContent } from "./help-tab-content";
import { HistoryTabContent } from "./history-tab-content";
import { InfoPanelHeader } from "./info-panel-header";
import { InfoPanelTabs } from "./info-panel-tabs";
import { InfoTabContent } from "./info-tab-content";

interface InfoPanelProps {
  selectedUser: ChatUser | null;
  onChatHistoryClick?: (date: string) => void;
}

export function InfoPanel({ selectedUser, onChatHistoryClick }: InfoPanelProps) {
  const [activeTab, setActiveTab] = useState("info");

  if (!selectedUser) {
    return null;
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-72 h-[750px] bg-card border-l flex flex-col">
      <InfoPanelHeader selectedUser={selectedUser} />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <InfoPanelTabs activeTab={activeTab} onTabChange={handleTabChange} />

        <div className="flex-1 overflow-hidden min-h-0">
          <InfoTabContent selectedUser={selectedUser} onTabChange={handleTabChange} />
          <ContactTabContent />
          <HistoryTabContent selectedUser={selectedUser} onChatHistoryClick={onChatHistoryClick} />
          <HelpTabContent />
        </div>
      </Tabs>
    </div>
  );
}
