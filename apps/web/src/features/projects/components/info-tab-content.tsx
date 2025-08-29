import {
  IconBrandAndroid,
  IconBrandApple,
  IconBrandChrome,
  IconBrandFirefox,
  IconBrandSafari,
  IconBrandWindows,
  IconChevronDown,
  IconCircleKeyFilled,
  IconClock,
  IconDeviceDesktop,
  IconDeviceMobile,
  IconGlobe,
  IconUsers,
  IconWorld,
} from "@tabler/icons-react";
import { format, parseISO } from "date-fns";
import { useState } from "react";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import { Card, CardContent } from "#/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "#/components/ui/collapsible";
import { ScrollArea } from "#/components/ui/scroll-area";
import { Separator } from "#/components/ui/separator";
import { TabsContent } from "#/components/ui/tabs";
import { cn } from "#/lib/utils";
import { type ChatUser } from "../data/chat-types";
import { UI_TEXTS } from "../data/constants";

interface InfoTabContentProps {
  selectedUser: ChatUser;
  onTabChange?: (tab: string) => void;
}

export function InfoTabContent({ selectedUser, onTabChange }: InfoTabContentProps) {
  const [sessionOpen, setSessionOpen] = useState(true);

  // Toplam chat gün sayısını hesapla
  const getTotalChatDays = () => {
    if (!selectedUser || !selectedUser.messages.length) {
      return 0;
    }

    // Mesajları tarihe göre grupla
    const uniqueDates = new Set(
      selectedUser.messages.map((message) => format(parseISO(message.timestamp), "yyyy-MM-dd")),
    );

    return uniqueDates.size;
  };

  // Icon helper functions
  const getBrowserIcon = (browser: string) => {
    switch (browser.toLowerCase()) {
      case "chrome":
        return IconBrandChrome;
      case "firefox":
        return IconBrandFirefox;
      case "safari":
        return IconBrandSafari;
      default:
        return IconGlobe;
    }
  };

  const getOSIcon = (os: string) => {
    switch (os.toLowerCase()) {
      case "windows":
        return IconBrandWindows;
      case "ios":
        return IconBrandApple;
      case "android":
        return IconBrandAndroid;
      default:
        return IconDeviceDesktop;
    }
  };

  const getDeviceIcon = (device: string) => {
    switch (device.toLowerCase()) {
      case "mobile":
        return IconDeviceMobile;
      case "desktop":
        return IconDeviceDesktop;
      default:
        return IconDeviceDesktop;
    }
  };

  const BrowserIcon = getBrowserIcon(selectedUser.userInfo.browser);
  const OSIcon = getOSIcon(selectedUser.userInfo.os);
  const _DeviceIcon = getDeviceIcon(selectedUser.userInfo.device);

  const totalChatDays = getTotalChatDays();

  return (
    <TabsContent value="info" className="mt-0 h-full overflow-hidden p-0">
      <ScrollArea className="h-full px-2" style={{ maxHeight: "calc(100vh - 280px)" }}>
        <div className="space-y-2">
          {/* User Info */}
          <Card className="border-0 p-0 m-0">
            <CardContent className="px-3 py-2 space-y-2">
              {/* Name */}
              <div className="text-lg font-medium text-foreground">{selectedUser.fullName}</div>
              <div className="flex items-center gap-2">
                <IconUsers className="h-4 w-4" />
                <span className="text-sm">2 - Promosyonlar</span>
              </div>

              {/* 4 Icons in horizontal row */}
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full flex-shrink-0">
                  <IconCircleKeyFilled className="h-4 w-4 text-red-500" />
                </div>
                <div className="w-4 h-4 rounded-full flex-shrink-0">
                  <BrowserIcon className="h-4 w-4 text-blue-500" />
                </div>
                <div className="w-4 h-4 rounded-sm flex-shrink-0">
                  <OSIcon className="h-4 w-4 text-green-500" />
                </div>
                <div className="w-4 h-4 rounded-full flex-shrink-0">
                  <IconWorld className="h-4 w-4 text-blue-400" />
                </div>
              </div>

              {/* All Chats and Visits */}
              <div className="flex items-center gap-2">
                <IconClock className="h-4 w-4" />
                <Button
                  variant="link"
                  className="p-0 h-auto text-sm text-blue-500 hover:underline"
                  onClick={() => onTabChange?.("history")}
                >
                  Tüm Sohbetler {totalChatDays}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Session Info */}
          <Collapsible className="p-0" open={sessionOpen} onOpenChange={setSessionOpen}>
            <CollapsibleTrigger className="flex w-full items-center justify-between p-2 border-0 rounded-md hover:bg-secondary/50 transition-colors">
              <span className="font-semibold text-sm">{UI_TEXTS.sessionInfo}</span>
              <IconChevronDown
                className={cn("h-4 w-4 transition-transform", sessionOpen && "rotate-180")}
              />
            </CollapsibleTrigger>

            <CollapsibleContent>
              <Card className="border-0 p-0">
                <CardContent className="pt-3 pb-10 space-y-2">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Sohbet ID:</p>
                    <p className="text-sm break-all">{selectedUser.sessionInfo.chatId}</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Konum:</p>
                    <p className="text-sm break-words">{selectedUser.sessionInfo.location}</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Kampanya:</p>
                    <p className="text-sm">{selectedUser.sessionInfo.campaign}</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Yönlendirildiği Kaynak:
                    </p>
                    <p className="text-sm break-all">{selectedUser.sessionInfo.referredFrom}</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Şu Anda Göz Atılan:</p>
                    <p className="text-sm break-words">
                      {selectedUser.sessionInfo.currentlyBrowsing}
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Cihaz Bilgisi:</p>
                    <p className="text-sm">{selectedUser.sessionInfo.deviceInfo}</p>
                  </div>
                  <Separator />
                  <div className="flex justify-between gap-3">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-muted-foreground">Ziyaretler:</p>
                      <Badge variant="outline" className="text-sm">
                        {selectedUser.sessionInfo.visits}
                      </Badge>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-muted-foreground">Tüm Sohbetler:</p>
                      <Badge variant="outline" className="text-sm">
                        {totalChatDays}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </ScrollArea>
    </TabsContent>
  );
}
