import {
  IconBrandAndroid,
  IconBrandChrome,
  IconChevronDown,
  IconChevronUp,
  IconCircle,
  IconCircleFilled,
  IconClock,
  IconDotsVertical,
  IconHistory,
  IconMessageCircle,
  IconNavigation,
  IconUser,
  IconWorld,
  IconX,
} from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "#/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "#/components/ui/collapsible";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "#/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";
import { Separator } from "#/components/ui/separator";
import { cn } from "#/lib/utils";
import { Visitor } from "../data/types";

// Flag emoji helper
const getCountryFlag = (countryCode: string): string => {
  const flags: Record<string, string> = {
    TR: "🇹🇷",
    US: "🇺🇸",
    GB: "🇬🇧",
    DE: "🇩🇪",
    FR: "🇫🇷",
    ES: "🇪🇸",
    IT: "🇮🇹",
    JP: "🇯🇵",
    IN: "🇮🇳",
    EG: "🇪🇬",
  };
  return flags[countryCode] || "🏳️";
};

// City helper
const getCityFromLocation = (location: string): string => {
  return location.split(",")[0].trim();
};

// Mock chat history data (investment related)
const mockChatHistory = [
  {
    id: "1",
    timestamp: "13:27:44",
    agent: "Hazal",
    department: "1 - Yatırım Danışmanlığı",
    status: "completed",
  },
  {
    id: "2",
    timestamp: "12:58:48",
    agent: "Hazal",
    department: "1 - Yatırım Danışmanlığı",
    status: "completed",
  },
];

// Mock navigation data (financial websites)
const mockNavigation = [
  { page: "https://finans.mynet.com/borsa", duration: "03:27" },
  { page: "https://bigpara.hurriyet.com.tr/bist", duration: "01:45" },
  { page: "https://tr.tradingview.com/markets/stocks-turkey/", duration: "00:32" },
  { page: "https://www.bloomberg.com/markets/stocks", duration: "02:18" },
  { page: "https://www.investing.com/equities/turkey", duration: "01:56" },
  { page: "https://finans.mynet.com/hisse-senetleri", duration: "00:45" },
  { page: "https://bigpara.hurriyet.com.tr/portfoy", duration: "00:28" },
  { page: "https://tr.tradingview.com/chart", duration: "01:12" },
  { page: "https://www.bloomberg.com/news/economics", duration: "00:55" },
  { page: "https://finans.mynet.com/altin-fiyatlari", duration: "02:33" },
  { page: "https://bigpara.hurriyet.com.tr/forex", duration: "01:21" },
  { page: "https://tr.tradingview.com/markets/currencies", duration: "00:47" },
  { page: "https://www.investing.com/commodities", duration: "02:15" },
  { page: "https://finans.mynet.com/yatirim-fonlari", duration: "01:38" },
  { page: "https://bigpara.hurriyet.com.tr/mobil", duration: "00:52" },
];

// Mock conversation data (financial/investment related)
const mockConversation = [
  {
    id: "1",
    sender: "bot",
    timestamp: "13:27:44",
    message: "Yatırım Danışmanı sohbete katıldı.",
  },
  {
    id: "2",
    sender: "bot",
    timestamp: "13:27:44",
    message:
      "BORSA İSTANBUL'A\nHOŞ GELDİNİZ!\n\n📈 BIST 100 Endeksi\n%2.5 yükselişte\n💼 Günlük işlem hacmi\n8.5 Milyar TL\n📊 Portföy analizi için\nuzmanlarımızla\niletişime geçin!",
  },
  {
    id: "3",
    sender: "user",
    timestamp: "13:27:53",
    message: "İzzet",
  },
  {
    id: "4",
    sender: "bot",
    timestamp: "13:28:15",
    message:
      "📈 THYAO hissesi %3.2 yükselişte!\n🔥 ASELS teknik analiz raporu hazır!\n💼 Portföy diversifikasyonu önerilerimiz mevcut!\n\nHoşgeldiniz.\nİlk olarak isminiz ve yatırım deneyiminiz hakkında bilgi verebilir misiniz?\nİsminizi girdiniz.",
  },
  {
    id: "5",
    sender: "user",
    timestamp: "13:28:45",
    message: "Merhaba, portföyümde bazı sorunlar var. Yardım alabilir miyim?",
  },
  {
    id: "6",
    sender: "bot",
    timestamp: "13:29:02",
    message:
      "Tabii ki yardımcı olabilirim! Lütfen portföyünüzdeki sorunu detaylı bir şekilde açıklayabilir misiniz? Böylece size daha iyi yatırım önerileri sunabilirim.",
  },
  {
    id: "7",
    sender: "user",
    timestamp: "13:29:35",
    message:
      "Hisse satma işlemi yapmaya çalışıyorum ama sürekli hata veriyor. Hisselerim var ama satılmıyor.",
  },
  {
    id: "8",
    sender: "bot",
    timestamp: "13:29:58",
    message:
      "Bu durumu inceleyelim. Birkaç kontrol yapmamız gerekiyor:\n\n1. Hisseleriniz blokeli mi?\n2. Piyasa saatleri içinde mi işlem yapıyorsunuz?\n3. Emir limitleriniz uygun mu?\n\nBu bilgileri kontrol edip bana bildirebilir misiniz?",
  },
];

// Tab navigation items
const tabItems = [
  { id: "info", label: "Bilgi", icon: IconUser },
  { id: "history", label: "Geçmiş", icon: IconHistory },
  { id: "navigation", label: "Gezinti", icon: IconNavigation },
];

interface DetailPanelProps {
  visitor: Visitor | null;
  onClose: () => void;
}

export function DetailPanel({ visitor, onClose }: DetailPanelProps) {
  const [activeTab, setActiveTab] = useState("info");
  const [isSessionOpen, setIsSessionOpen] = useState(false);
  const [isPreChatOpen, setIsPreChatOpen] = useState(false);
  const [browsingDisplay, setBrowsingDisplay] = useState("both");
  const [_preChatActiveTab, _setPreChatActiveTab] = useState("history");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when modal opens or when messages change
  useEffect(() => {
    if (isPreChatOpen && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isPreChatOpen, mockConversation]);

  if (!visitor) return null;

  const renderCurrentlyBrowsing = () => {
    const url = visitor.currentPage;
    const title = "Borsa İstanbul - Piyasa Verileri";

    if (browsingDisplay === "title") return <span className="text-blue-600">{title}</span>;
    if (browsingDisplay === "url") return <span className="text-blue-600">{url}</span>;
    return (
      <div className="flex flex-col gap-1">
        <span className="text-blue-600">{title}</span>
        <span className="text-xs text-muted-foreground">{url}</span>
      </div>
    );
  };

  const handleHistoryItemClick = (historyItem: any) => {
    console.log("History item clicked:", historyItem);
    setIsPreChatOpen(true);
  };

  const handleAllChatsClick = () => {
    setActiveTab("history");
  };

  return (
    <>
      <Card className="w-full max-w-80 h-fit bg-background border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Ziyaretçi Detayları</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <IconX className="h-4 w-4" />
            </Button>
          </div>

          {/* Modern Tab Navigation */}
          <div className="flex bg-muted/50 p-1 rounded-lg">
            {tabItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  size="sm"
                  className={cn(
                    "flex-1 h-8 text-xs gap-1.5",
                    activeTab === item.id
                      ? "bg-background shadow-sm text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                  onClick={() => setActiveTab(item.id)}
                >
                  <Icon className="h-3 w-3" />
                  {item.label}
                </Button>
              );
            })}
          </div>
        </CardHeader>

        <CardContent className="p-4 pt-0">
          {/* Tab Content */}
          {activeTab === "info" && (
            <div className="space-y-4">
              {/* User Name */}
              <div className="flex items-center gap-2 text-lg font-semibold">
                <span title={getCityFromLocation(visitor.location || "")}>
                  {getCountryFlag(visitor.countryCode)}
                </span>
                <span className="truncate">{visitor.name}</span>
              </div>

              {/* Status Icons */}
              <div className="flex items-center gap-2">
                {visitor.isOnline ? (
                  <IconCircleFilled className="h-4 w-4 text-red-500" />
                ) : (
                  <IconCircle className="h-4 w-4 text-gray-400" />
                )}
                <div title={`IP: ${visitor.ip}`}>
                  <IconBrandChrome className="h-4 w-4 text-blue-500 cursor-pointer" />
                </div>
                <div title="Android 12.0">
                  <IconBrandAndroid className="h-4 w-4 text-green-500 cursor-pointer" />
                </div>
                <IconWorld className="h-4 w-4 text-blue-500" />
              </div>

              {/* Department */}
              <div className="text-sm text-muted-foreground">1 - Yatırım Danışmanlığı</div>

              {/* All Chats and Visits */}
              <div className="flex items-center gap-1 text-sm">
                <IconMessageCircle className="h-3 w-3 text-blue-500" />
                <button
                  onClick={handleAllChatsClick}
                  className="text-blue-500 hover:text-blue-600 hover:underline transition-colors"
                >
                  Tüm Sohbetler
                </button>
                <span className="text-muted-foreground">{visitor.chats} Ziyaret</span>
              </div>

              <Separator />

              {/* Session Collapsible */}
              <Collapsible open={isSessionOpen} onOpenChange={setIsSessionOpen}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                    <div className="flex items-center gap-2">
                      <IconClock className="h-4 w-4" />
                      <span className="font-medium">Oturum</span>
                    </div>
                    {isSessionOpen ? (
                      <IconChevronUp className="h-4 w-4" />
                    ) : (
                      <IconChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>

                <CollapsibleContent className="space-y-3 mt-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Gönderen:</span>
                      <span>google</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ziyaret Süresi:</span>
                      <span>00:05:32</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sayfa Görüntüleme:</span>
                      <span>3</span>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Şu anda göz atıyor:</span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <IconDotsVertical className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setBrowsingDisplay("title")}>
                            Sadece Başlık
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setBrowsingDisplay("url")}>
                            Sadece URL
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setBrowsingDisplay("both")}>
                            Başlık ve URL
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="text-sm">{renderCurrentlyBrowsing()}</div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          )}

          {activeTab === "history" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Sohbet Geçmişi</span>
                <span className="text-xs text-muted-foreground">
                  {mockChatHistory.length} sohbet
                </span>
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {mockChatHistory.map((chat) => (
                  <div
                    key={chat.id}
                    className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => handleHistoryItemClick(chat)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{chat.timestamp}</span>
                        <span className="text-sm text-muted-foreground">{chat.agent}</span>
                      </div>
                      <IconMessageCircle className="h-4 w-4 text-blue-500" />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{chat.department}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "navigation" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Sayfa Gezintisi</span>
                <span className="text-xs text-muted-foreground">{mockNavigation.length} sayfa</span>
              </div>

              <div className="space-y-1 max-h-96 overflow-y-auto">
                {mockNavigation.map((nav, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 hover:bg-muted/50 rounded text-sm"
                  >
                    <div className="flex-1 text-blue-400 truncate pr-2" title={nav.page}>
                      {nav.page}
                    </div>
                    <div className="text-muted-foreground text-xs font-mono">{nav.duration}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pre-Chat Modal */}
      <Dialog open={isPreChatOpen} onOpenChange={setIsPreChatOpen}>
        <DialogContent
          className="w-[101vw] max-w-[1600px] h-[62vh] max-h-[900px] p-0 overflow-hidden flex flex-col"
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader className="p-6 pb-4 border-b flex-shrink-0">
            <DialogTitle className="text-xl">Ön Sohbet</DialogTitle>
          </DialogHeader>

          <div className="flex flex-1 overflow-hidden">
            {/* Left Panel - User Info */}
            <div className="w-64 flex-shrink-0 bg-slate-800 text-white p-4 flex flex-col">
              <div className="space-y-4">
                <div>
                  <div className="text-xs font-medium text-slate-300 mb-1">Ad:</div>
                  <div className="text-sm text-white">{visitor.name}</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-slate-300 mb-1">Konum:</div>
                  <div className="text-sm text-white">{visitor.location}</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-slate-300 mb-1">E-posta:</div>
                  <div className="text-sm text-white">{visitor.email || "Yok"}</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-slate-300 mb-1">Durum:</div>
                  <div className="text-sm text-white">
                    {visitor.isOnline ? "Çevrimiçi" : "Çevrimdışı"}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-medium text-slate-300 mb-1">IP:</div>
                  <div className="text-sm text-white">{visitor.ip}</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-slate-300 mb-1">Mevcut Sayfa:</div>
                  <div className="text-sm text-white break-all">{visitor.currentPage}</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-slate-300 mb-1">Gönderen:</div>
                  <div className="text-sm text-white break-all">{visitor.referredFrom}</div>
                </div>
              </div>
            </div>

            {/* Right Panel - Chat Conversation */}
            <div className="flex-1 flex flex-col bg-slate-900 min-h-0">
              <div className="flex items-center justify-between p-4 border-b border-slate-700 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <IconMessageCircle className="h-5 w-5 text-blue-400" />
                  <span className="font-medium text-white">{visitor.name} ile Sohbet</span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 min-h-0">
                <div className="space-y-4">
                  {mockConversation.map((msg) => (
                    <div key={msg.id} className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span>{msg.sender === "bot" ? "Yatırım Danışmanı" : visitor.name}:</span>
                        <span>{msg.timestamp}</span>
                      </div>
                      <div
                        className={cn(
                          "p-3 rounded-lg max-w-[85%] text-sm whitespace-pre-wrap",
                          msg.sender === "bot"
                            ? "bg-blue-600 text-white"
                            : "bg-slate-600 text-white",
                        )}
                      >
                        {msg.message}
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>
              </div>

              <div className="p-4 border-t border-slate-700 flex justify-end flex-shrink-0 bg-slate-900">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-slate-800 text-white border-slate-600 hover:bg-slate-700"
                >
                  Detaylar
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
