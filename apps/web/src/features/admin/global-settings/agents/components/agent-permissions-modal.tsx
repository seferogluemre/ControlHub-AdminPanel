import { X } from "lucide-react";
import { useState } from "react";
import { Button } from "#/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "#/components/ui/sheet";
import { Switch } from "#/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "#/components/ui/tabs";

interface Agent {
  id: string;
  name: string;
  email: string;
  departments: string[];
  isAdministrator: boolean;
  isActive: boolean;
}

interface AgentPermissionsModalProps {
  agent: Agent;
  isOpen: boolean;
  onClose: () => void;
}

interface PermissionCategory {
  name: string;
  description: string;
  enabled: boolean;
}

export default function AgentPermissionsModal({
  agent,
  isOpen,
  onClose,
}: AgentPermissionsModalProps) {
  const [activeTab, setActiveTab] = useState("live-chat");

  // Live Chat permissions state
  const [liveChatPermissions, setLiveChatPermissions] = useState<PermissionCategory[]>([
    {
      name: "Accept Chats",
      description: "Accept department's chat requests and non-department chat requests",
      enabled: true,
    },
    {
      name: "View All Chats and Offline Messages",
      description: "View all ongoing chats, transcripts, send/attach messages to email/tickets",
      enabled: false,
    },
    {
      name: "View My Departments' Chats and Offline Messages",
      description: "View departments' chat transcripts, send/attach messages to email/tickets",
      enabled: true,
    },
    {
      name: "View My Own Chats and Offline Messages",
      description: "View own chat transcript and offline messages, send/attach to email/tickets",
      enabled: false,
    },
    {
      name: "Delete Transcripts",
      description: "Delete any chat transcripts, offline messages",
      enabled: true,
    },
    {
      name: "Manage Campaigns",
      description:
        "Get Livechat code, enable/disable campaigns, create/edit campaigns and customize settings",
      enabled: false,
    },
    {
      name: "Manage Settings",
      description:
        "Enable/disable auto accept, audio/video, screen sharing, conversions, segmentations, shifts",
      enabled: true,
    },
    {
      name: "Manage Ban List",
      description: "Edit/lift bans, ban visitors/contacts/users by ID/IP",
      enabled: false,
    },
    {
      name: "View Reports",
      description: "View/Export Live Chat Reports",
      enabled: true,
    },
    {
      name: "Refuse Chats",
      description: "Decline department's chat requests and non-department chat requests",
      enabled: true,
    },
    {
      name: "Invite Visitors to Chat",
      description: "Manually send chat invitations to onsite visitors",
      enabled: true,
    },
    {
      name: "Join Chats",
      description: "Join department's ongoing chats and non-department ongoing chats",
      enabled: true,
    },
    {
      name: "Transfer Chats",
      description: "Transfer ongoing chats to other online/away agents and departments",
      enabled: false,
    },
    {
      name: "Monitor All Chats",
      description: "Invisibly monitor any ongoing chats",
      enabled: true,
    },
    {
      name: "Monitor My Departments' Chats",
      description: "Invisibly monitor my departments' ongoing chats",
      enabled: true,
    },
    {
      name: "Capture",
      description: "Capture and release onsite visitors in the visitor list",
      enabled: false,
    },
    {
      name: "Request Rating From Visitors",
      description: "Send a rating form to visitors during the chat to collect feedback",
      enabled: true,
    },
    {
      name: "Request Screen Sharing",
      description: "Share agent's screen with visitors and request visitors to share their screens",
      enabled: true,
    },
    {
      name: "Agent Message Recall",
      description: "Allow agent to recall the message that has been sent",
      enabled: true,
    },
    {
      name: "Manage Custom Variables",
      description: "Enable/disable/create/edit/delete custom variables",
      enabled: true,
    },
    {
      name: "View All In Site Visitors",
      description: "View all in site visitors in Agent Console",
      enabled: true,
    },
    {
      name: "Manage Cookie Restriction",
      description: "Enable/disable cookie restriction",
      enabled: true,
    },
    {
      name: "Manage Fields",
      description:
        "Edit/add/delete fields for pre-chat, post-chat, offline message and agent wrap-up forms",
      enabled: true,
    },
  ]);

  // AI & Automation permissions state
  const [aiAutomationPermissions, setAiAutomationPermissions] = useState<PermissionCategory[]>([
    {
      name: "Monitor and Take Over AI Agent Chats",
      description:
        "Monitor and take over department's AI Agent chat requests and non-department AI Agent chat requests",
      enabled: true,
    },
    {
      name: "Manage AI Agents",
      description: "Add/Edit/Delete/Import AI Agents, change AI Agent settings & Advanced Settings",
      enabled: true,
    },
    {
      name: "Manage Generative Answers",
      description: "Add/Edit/Delete knowledge contents of Generative Answers",
      enabled: true,
    },
    {
      name: "Manage Custom Answers",
      description: "Add/Edit/Delete Intents, Entities, and Canned Quick Replies",
      enabled: true,
    },
    {
      name: "Manage Learning, Smart Triggers, Event Messages & Small Talk",
      description:
        "Add/Edit/Delete Learning Questions, Smart Triggers, Small Talks, and Event Messages",
      enabled: true,
    },
    {
      name: "View AI Agent Collected Leads & Booked Meetings",
      description: "View AI Agent Collected Leads and Booked Meetings",
      enabled: true,
    },
    {
      name: "View AI Agents",
      description:
        "View AI Agent menus, settings, knowledge contents, intents, entities, and action comments",
      enabled: true,
    },
    {
      name: "View AI Agent Reports",
      description: "View/Export AI Agent reports",
      enabled: true,
    },
    {
      name: "Manage Task Bots",
      description: "View/Add/Edit/Delete/Import/Export Task Bots",
      enabled: true,
    },
    {
      name: "View Task Bot Collected Leads & Booked Meetings",
      description: "View Task Bot Collected Leads and Booked Meetings",
      enabled: true,
    },
    {
      name: "View Task Bot Reports",
      description: "View/Export Task Bot reports",
      enabled: true,
    },
    {
      name: "Manage Voice Bot Intents, Entities, Learning & Smart Triggers",
      description:
        "Add/Edit/Delete Voice Bot Intents, Entities, Learning Questions, and Smart Triggers",
      enabled: true,
    },
    {
      name: "Manage Voice Bots",
      description: "View/Add/Edit/Delete/Import/Export Voice Bots",
      enabled: true,
    },
    {
      name: "View Voice Bot Call Log",
      description: "View/Export Voice Bot Call Log",
      enabled: true,
    },
    {
      name: "View Voice Bot Reports",
      description: "View/Export Voice Bot reports",
      enabled: true,
    },
    {
      name: "Manage AI Copilot",
      description: "Manage all features of AI Copilot product",
      enabled: true,
    },
    {
      name: "Manage AI Insights",
      description:
        "Enable/disable Sentiment Analysis, Spotlights, and Chat Resolution Status features",
      enabled: true,
    },
  ]);

  // Global Settings permissions state
  const [globalSettingsPermissions, setGlobalSettingsPermissions] = useState<PermissionCategory[]>([
    {
      name: "Manage Site Profile",
      description: "View/Edit Site Profile and Update subdomain",
      enabled: true,
    },
    {
      name: "Manage Agent & Agent Roles",
      description:
        "Add/View/Edit/Delete agents, View/Edit agents' permissions, Add/View/Edit/Delete Agent Roles",
      enabled: true,
    },
    {
      name: "Manage My Profile",
      description: "Edit My Profile",
      enabled: true,
    },
    {
      name: "View Audit Log",
      description: "View/Query agents important activities in Comm100 modules",
      enabled: true,
    },
    {
      name: "View Agent Report",
      description: "View/Export Availability Report and View/Export Canned Message Report",
      enabled: true,
    },
    {
      name: "Manage Security",
      description:
        "View/Edit Password Policy, Add/View/Edit/Delete IP Allowlist, Enable/View/Edit/Disable Agent SSO, View/Edit Two-Factor Authentication",
      enabled: true,
    },
    {
      name: "Manage Departments",
      description: "Enable/Disable/Create/Edit/Delete Departments",
      enabled: true,
    },
    {
      name: "Manage Custom Away Status",
      description: "Enable/Disable/Create/Edit/Delete Custom Away Status",
      enabled: true,
    },
    {
      name: "Manage Credit Card Masking",
      description: "Enable/Disable Credit Card Masking",
      enabled: true,
    },
    {
      name: "Manage Public Canned Messages",
      description: "Create/Edit/Delete Public Canned Messages",
      enabled: true,
    },
    {
      name: "Manage Private Canned Messages",
      description: "Create/Edit/Delete/View Private Canned Messages",
      enabled: true,
    },
    {
      name: "Manage App & Integration",
      description:
        "Enable/Disable/Config apps, Create/Enable/Disable/Edit/Delete site private apps",
      enabled: true,
    },
    {
      name: "Chat with Other Agents",
      description:
        "Send messages to other Online/Away agents from the Agent Console, Receive messages from other Online/Away agents from the Agent Console",
      enabled: true,
    },
    {
      name: "View All Agents",
      description: "View all agents in Agent Console",
      enabled: true,
    },
    {
      name: "Set Agent Away",
      description: "Set Agent Status from Online to Away",
      enabled: true,
    },
    {
      name: "Log Agents Off",
      description: "Log agents off the Agent Console",
      enabled: true,
    },
    {
      name: "View All Chats Between Agents",
      description: "View the transcripts of all chats between agents",
      enabled: true,
    },
    {
      name: "View Chats Between Agents in My Departments",
      description: "View the transcripts of chats between agents in my departments",
      enabled: true,
    },
    {
      name: "Manage Restricted Words",
      description: "Add/View/Edit/Delete Restricted Words",
      enabled: true,
    },
    {
      name: "Manage Billing Info",
      description: "Change Billing Period, Edit Billing Info, Edit Payment Info",
      enabled: true,
    },
    {
      name: "Manage Skills",
      description: "Enable/Disable/Create/Edit/Delete Skills",
      enabled: true,
    },
    {
      name: "Generate 2FA Backup Code for Agent",
      description: "Manually generate a two-factor authentication backup code for site agents",
      enabled: true,
    },
    {
      name: "Add/Switch/Remove Product",
      description: "Purchase Comm100 product plans",
      enabled: true,
    },
    {
      name: "View Balance History",
      description: "View the debit/credit balance history",
      enabled: true,
    },
    {
      name: "Log into Agent Console",
      description: "Log into the Agent Console",
      enabled: true,
    },
    {
      name: "Manage Secure Form",
      description: "Create/Edit/Delete PCI forms",
      enabled: true,
    },
    {
      name: "Manage Custom Report",
      description: "Create/Edit/Delete/View/Copy/Export Custom Reports",
      enabled: true,
    },
    {
      name: "View Custom Report",
      description: "View/Export Custom Reports",
      enabled: true,
    },
    {
      name: "Manage Report Scheduling",
      description: "Allow agent can create/edit/delete the report schedules",
      enabled: true,
    },
    {
      name: "Manage Auto Translation",
      description: "View auto translation and Enable/Disable auto translation",
      enabled: true,
    },
    {
      name: "Custom SMTP Servers",
      description: "Allow all your emails to be sent through my own SMTP servers",
      enabled: true,
    },
    {
      name: "View Visitor/Contact Identifiable Information",
      description:
        "View Contact Identity in Agent Console, Contact Management and Outreach, View Visitor email and phone number in Agent Console and Live Chat History",
      enabled: true,
    },
    {
      name: "Manage Tags",
      description: "Create/Edit/Delete Contact Tags",
      enabled: true,
    },
  ]);

  const handlePermissionToggle = (categoryIndex: number) => {
    setLiveChatPermissions((prev) => {
      const updated = [...prev];
      updated[categoryIndex] = {
        ...updated[categoryIndex],
        enabled: !updated[categoryIndex].enabled,
      };
      return updated;
    });
  };

  const handleAiAutomationToggle = (categoryIndex: number) => {
    setAiAutomationPermissions((prev) => {
      const updated = [...prev];
      updated[categoryIndex] = {
        ...updated[categoryIndex],
        enabled: !updated[categoryIndex].enabled,
      };
      return updated;
    });
  };

  const handleGlobalSettingsToggle = (categoryIndex: number) => {
    setGlobalSettingsPermissions((prev) => {
      const updated = [...prev];
      updated[categoryIndex] = {
        ...updated[categoryIndex],
        enabled: !updated[categoryIndex].enabled,
      };
      return updated;
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-4/5 min-w-[1200px] max-w-[1400px] [&>button]:hidden">
        <SheetHeader className="text-left">
          <div className="flex items-center justify-start border-b pb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4 mr-1" />
              Close
            </Button>
          </div>
          <SheetTitle className="text-left text-lg font-semibold mt-4">
            Permission Settings of Agent "{agent.name}"
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 flex-1 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <div className="pt-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="live-chat">Live Chat</TabsTrigger>
                <TabsTrigger value="ai-automation">AI & Automation</TabsTrigger>
                <TabsTrigger value="global-settings">Global Settings</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="live-chat" className="mt-0 flex-1 overflow-hidden">
              <div className="h-full flex flex-col">
                {/* Header */}
                <div className="py-4 border-b bg-gray-50/50 dark:bg-gray-900/50">
                  <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-5 font-medium text-sm text-muted-foreground pl-8">
                      Items
                    </div>
                    <div className="col-span-4 font-medium text-sm text-muted-foreground">
                      Description
                    </div>
                    <div className="col-span-3 font-medium text-sm text-muted-foreground">
                      Individual Permissions
                    </div>
                  </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto">
                  <div className="py-6 space-y-6">
                    {liveChatPermissions.map((category, categoryIndex) => (
                      <div key={category.name} className="grid grid-cols-12 gap-8 items-center">
                        <div className="col-span-5">
                          <div className="font-medium text-sm pl-8">{category.name}</div>
                        </div>
                        <div className="col-span-4">
                          <div className="text-sm text-muted-foreground">
                            {category.description}
                          </div>
                        </div>
                        <div className="col-span-3">
                          <div className="flex justify-start">
                            <Switch
                              checked={category.enabled}
                              onCheckedChange={() => handlePermissionToggle(categoryIndex)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Extra scroll space at bottom */}
                  <div className="h-20"></div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="ai-automation" className="mt-0 flex-1 overflow-hidden">
              <div className="h-full flex flex-col">
                {/* Header */}
                <div className="py-4 border-b bg-gray-50/50 dark:bg-gray-900/50">
                  <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-5 font-medium text-sm text-muted-foreground pl-8">
                      Items
                    </div>
                    <div className="col-span-4 font-medium text-sm text-muted-foreground">
                      Description
                    </div>
                    <div className="col-span-3 font-medium text-sm text-muted-foreground">
                      Individual Permissions
                    </div>
                  </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto">
                  <div className="py-6 space-y-6">
                    {aiAutomationPermissions.map((category, categoryIndex) => (
                      <div key={category.name} className="grid grid-cols-12 gap-8 items-center">
                        <div className="col-span-5">
                          <div className="font-medium text-sm pl-8">{category.name}</div>
                        </div>
                        <div className="col-span-4">
                          <div className="text-sm text-muted-foreground">
                            {category.description}
                          </div>
                        </div>
                        <div className="col-span-3">
                          <div className="flex justify-start">
                            <Switch
                              checked={category.enabled}
                              onCheckedChange={() => handleAiAutomationToggle(categoryIndex)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Extra scroll space at bottom */}
                  <div className="h-20"></div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="global-settings" className="mt-0 flex-1 overflow-hidden">
              <div className="h-full flex flex-col">
                {/* Header */}
                <div className="py-4 border-b bg-gray-50/50 dark:bg-gray-900/50">
                  <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-5 font-medium text-sm text-muted-foreground pl-8">
                      Items
                    </div>
                    <div className="col-span-4 font-medium text-sm text-muted-foreground">
                      Description
                    </div>
                    <div className="col-span-3 font-medium text-sm text-muted-foreground">
                      Individual Permissions
                    </div>
                  </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto">
                  <div className="py-6 space-y-6">
                    {globalSettingsPermissions.map((category, categoryIndex) => (
                      <div key={category.name} className="grid grid-cols-12 gap-8 items-center">
                        <div className="col-span-5">
                          <div className="font-medium text-sm pl-8">{category.name}</div>
                        </div>
                        <div className="col-span-4">
                          <div className="text-sm text-muted-foreground">
                            {category.description}
                          </div>
                        </div>
                        <div className="col-span-3">
                          <div className="flex justify-start">
                            <Switch
                              checked={category.enabled}
                              onCheckedChange={() => handleGlobalSettingsToggle(categoryIndex)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Extra scroll space at bottom */}
                  <div className="h-20"></div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
}
