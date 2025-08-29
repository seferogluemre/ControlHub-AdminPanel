import { Calendar, Menu, Search, User, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";
import { Button } from "#/components/ui/button";
import { Calendar as CalendarComponent } from "#/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { Input } from "#/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "#/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "#/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "#/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "#/components/ui/table";
import globalData from "../../global-settings/global-settings.json";
import { agentChatsData } from "../data/history-data";

export default function AgentChats() {
  const [dateRange, setDateRange] = useState({
    from: new Date(2024, 10, 1), // Kasım 1, 2024
    to: new Date(2025, 6, 31), // Temmuz 31, 2025
  });
  const [selectedAgent, setSelectedAgent] = useState<string>("");
  const [keywords, setKeywords] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [isDetailsPanelOpen, setIsDetailsPanelOpen] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Get agents from global settings
  const availableAgents = globalData.agents.map((agent) => ({
    id: agent.id,
    name: agent.name,
  }));

  const formatDateRange = () => {
    if (dateRange.from && dateRange.to) {
      const fromDate = dateRange.from
        .toLocaleDateString("tr-TR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\./g, "/");

      const toDate = dateRange.to
        .toLocaleDateString("tr-TR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\./g, "/");

      return `${fromDate} — ${toDate}`;
    }
    return "Tarih seçin";
  };

  // Filtreleme fonksiyonu
  const filteredChats = useMemo(() => {
    return agentChatsData
      .filter((chat) => {
        // Tarih filtresi
        if (dateRange.from && dateRange.to) {
          const chatDate = new Date(chat.date);
          if (chatDate < dateRange.from || chatDate > dateRange.to) return false;
        }

        // Agent filtresi
        if (selectedAgent && selectedAgent !== "all") {
          const matchedAgent = globalData.agents.find((a) => a.id === selectedAgent);
          if (!matchedAgent) return false;

          const agentMatch =
            chat.agent1.name === matchedAgent.name || chat.agent2.name === matchedAgent.name;
          if (!agentMatch) return false;
        }

        // Keywords filtresi
        if (keywords) {
          const keyword = keywords.toLowerCase();
          const keywordMatch =
            chat.agent1.name.toLowerCase().includes(keyword) ||
            chat.agent2.name.toLowerCase().includes(keyword) ||
            chat.summary.some((item) => item.message.toLowerCase().includes(keyword));
          if (!keywordMatch) return false;
        }

        return true;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // En yeni önce
  }, [dateRange, selectedAgent, keywords]);

  // Pagination calculations
  const totalItems = filteredChats.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedChats = filteredChats.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [dateRange, selectedAgent, keywords]);

  const handleChatDetails = (chatId: number) => {
    setSelectedChatId(chatId);
    setIsDetailsPanelOpen(true);
  };

  const selectedChat = selectedChatId
    ? agentChatsData.find((chat) => chat.id === selectedChatId)
    : null;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center space-x-2">
        <h1 className="text-3xl font-bold">Agent Chats</h1>
      </div>

      {/* Filtreler */}
      <div className="flex items-center gap-4 p-4 bg-card rounded-lg border">
        {/* Tarih Aralığı Seçici */}
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[280px] justify-start text-left font-normal">
              <Calendar className="mr-2 h-4 w-4" />
              {formatDateRange()}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="range"
              selected={dateRange}
              onSelect={(range) => {
                if (range?.from && range?.to) {
                  setDateRange({ from: range.from, to: range.to });
                  setIsCalendarOpen(false);
                }
              }}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>

        {/* Agent Dropdown */}
        <Select value={selectedAgent} onValueChange={setSelectedAgent}>
          <SelectTrigger className="w-[200px]">
            <User className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Agent" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tüm Agentlar</SelectItem>
            {availableAgents.map((agent) => (
              <SelectItem key={agent.id} value={agent.id}>
                {agent.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Keywords Search */}
        <div className="flex-1 max-w-sm ml-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Keywords"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Tablo */}
      <div className="bg-card rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Agent</TableHead>
              <TableHead className="w-[200px]">Agent</TableHead>
              <TableHead>Summary</TableHead>
              <TableHead className="w-[100px]">Operations</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedChats.map((chat) => (
              <TableRow key={chat.id}>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={chat.agent1.avatar} alt={chat.agent1.name} />
                      <AvatarFallback>{chat.agent1.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{chat.agent1.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={chat.agent2.avatar} alt={chat.agent2.name} />
                      <AvatarFallback>{chat.agent2.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{chat.agent2.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-foreground mb-2">{chat.date}</div>
                    {chat.summary.map((item, index) => (
                      <div key={index} className="text-sm text-muted-foreground">
                        <span className="font-medium">[{item.time}]</span> {item.message}
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    onClick={() => handleChatDetails(chat.id)}
                  >
                    <Menu className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span>
            {totalItems === 0 ? "0" : startIndex + 1}-{Math.min(endIndex, totalItems)} of{" "}
            {totalItems} row(s) selected.
          </span>
        </div>

        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => {
                setItemsPerPage(Number(value));
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent side="top">
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="30">30</SelectItem>
                <SelectItem value="40">40</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-center text-sm font-medium">
            Page {currentPage} of {Math.max(1, totalPages)}
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage <= 1}
            >
              <span className="sr-only">Go to first page</span>
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
              >
                <path
                  d="M6.85355 3.85355C7.04882 3.65829 7.04882 3.34171 6.85355 3.14645C6.65829 2.95118 6.34171 2.95118 6.14645 3.14645L2.14645 7.14645C1.95118 7.34171 1.95118 7.65829 2.14645 7.85355L6.14645 11.8536C6.34171 12.0488 6.65829 12.0488 6.85355 11.8536C7.04882 11.6583 7.04882 11.3417 6.85355 11.1464L3.20711 7.5L6.85355 3.85355ZM12.8536 3.85355C13.0488 3.65829 13.0488 3.34171 12.8536 3.14645C12.6583 2.95118 12.3417 2.95118 12.1464 3.14645L8.14645 7.14645C7.95118 7.34171 7.95118 7.65829 8.14645 7.85355L12.1464 11.8536C12.3417 12.0488 12.6583 12.0488 12.8536 11.8536C13.0488 11.6583 13.0488 11.3417 12.8536 11.1464L9.20711 7.5L12.8536 3.85355Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage <= 1}
            >
              <span className="sr-only">Go to previous page</span>
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
              >
                <path
                  d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage >= totalPages}
            >
              <span className="sr-only">Go to next page</span>
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
              >
                <path
                  d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage >= totalPages}
            >
              <span className="sr-only">Go to last page</span>
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
              >
                <path
                  d="M2.14645 11.1464C1.95118 11.3417 1.95118 11.6583 2.14645 11.8536C2.34171 12.0488 2.65829 12.0488 2.85355 11.8536L6.85355 7.85355C7.04882 7.65829 7.04882 7.34171 6.85355 7.14645L2.85355 3.14645C2.65829 2.95118 2.34171 2.95118 2.14645 3.14645C1.95118 3.34171 1.95118 3.65829 2.14645 3.85355L5.79289 7.5L2.14645 11.1464ZM8.14645 11.1464C7.95118 11.3417 7.95118 11.6583 8.14645 11.8536C8.34171 12.0488 8.65829 12.0488 8.85355 11.8536L12.8536 7.85355C13.0488 7.65829 13.0488 7.34171 12.8536 7.14645L8.85355 3.14645C8.65829 2.95118 8.34171 2.95118 8.14645 3.14645C7.95118 3.34171 7.95118 3.65829 8.14645 3.85355L11.7929 7.5L8.14645 11.1464Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Chat Details Panel */}
      <Sheet open={isDetailsPanelOpen} onOpenChange={setIsDetailsPanelOpen}>
        <SheetContent side="right" className="w-2/3 min-w-[500px] min-h-screen [&>button]:hidden">
          <SheetHeader className="text-left">
            <div className="flex items-center justify-start border-b pb-4 px-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsDetailsPanelOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4 mr-1" />
                Close
              </Button>
            </div>
            <SheetTitle className="text-left text-xl font-semibold mt-6 px-2">
              Agent Chat Details
            </SheetTitle>
          </SheetHeader>

          {selectedChat && (
            <div className="mt-8 px-4 space-y-8">
              {/* Agent Bilgileri */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Agent Konuşması</CardTitle>
                </CardHeader>
                <CardContent className="px-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12 border-2 border-gray-200">
                        <AvatarImage
                          src={selectedChat.agent1.avatar}
                          alt={selectedChat.agent1.name}
                        />
                        <AvatarFallback className="font-semibold">
                          {selectedChat.agent1.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <span className="font-semibold text-base">{selectedChat.agent1.name}</span>
                        <div className="text-xs text-muted-foreground">Agent</div>
                      </div>
                    </div>
                    <span className="text-muted-foreground mx-4 text-lg">↔</span>
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12 border-2 border-gray-200">
                        <AvatarImage
                          src={selectedChat.agent2.avatar}
                          alt={selectedChat.agent2.name}
                        />
                        <AvatarFallback className="font-semibold">
                          {selectedChat.agent2.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <span className="font-semibold text-base">{selectedChat.agent2.name}</span>
                        <div className="text-xs text-muted-foreground">Agent</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 mt-4">
                    <p className="text-sm text-muted-foreground font-medium">
                      📅 Tarih: {selectedChat.date}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Transcript */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Konuşma İçeriği</CardTitle>
                </CardHeader>
                <CardContent className="px-6">
                  <div className="space-y-4">
                    <div className="text-sm font-medium text-foreground mb-4">
                      {selectedChat.date}
                    </div>
                    {selectedChat.summary.map((item, index) => (
                      <div
                        key={index}
                        className="text-sm p-5 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm"
                      >
                        <span className="font-medium text-blue-600 text-xs">[{item.time}]</span>
                        <div className="text-foreground mt-2 leading-relaxed">{item.message}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
