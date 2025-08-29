import {
  Calendar,
  Clock,
  Download,
  Edit,
  ExternalLink,
  Eye,
  Mail,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "#/components/ui/button";
import { Calendar as CalendarComponent } from "#/components/ui/calendar";
import { Card, CardContent } from "#/components/ui/card";
import { Checkbox } from "#/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "#/components/ui/dialog";
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
import { type Chat, chatsData } from "../data/history-data";

export default function Chats() {
  const [dateRange, setDateRange] = useState({
    from: new Date(2025, 6, 1), // 1 Temmuz 2025
    to: new Date(2025, 6, 31), // 31 Temmuz 2025
  });
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedAgent, setSelectedAgent] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [keywords, setKeywords] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const [selectedSummary, setSelectedSummary] = useState<string>("");
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [chatToDelete, setChatToDelete] = useState<Chat | null>(null);

  // Local state for chats data
  const [chats, setChats] = useState<Chat[]>(chatsData);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Get unique departments from global settings
  const availableDepartments = globalData.departments.map((dept) => ({
    id: dept.id,
    name: dept.name,
  }));

  // Get unique agents from global settings
  const availableAgents = globalData.agents.map((agent) => ({
    id: agent.id,
    name: agent.name,
  }));

  // Get unique categories from history data
  const availableCategories = useMemo(() => {
    const categories = new Set(chats.map((chat) => chat.category).filter(Boolean));
    return Array.from(categories);
  }, [chats]);

  // Filter chats based on criteria
  const filteredChats = useMemo(() => {
    return chats.filter((chat) => {
      // Date filter
      if (dateRange.from && dateRange.to) {
        const chatDate = new Date(chat.time.split(" ")[0]); // "2025/07/17 10:48:36" -> "2025/07/17"
        if (chatDate < dateRange.from || chatDate > dateRange.to) return false;
      }

      // Department filter
      if (selectedDepartment && selectedDepartment !== "all") {
        const matchedDept = globalData.departments.find((d) => d.id === selectedDepartment);
        if (!matchedDept || !chat.department.includes(matchedDept.name)) return false;
      }

      // Agent filter
      if (selectedAgent && selectedAgent !== "all") {
        if (selectedAgent === "ai-bot") {
          if (!chat.agent.includes("AI Bot")) return false;
        } else {
          const matchedAgent = globalData.agents.find((a) => a.id === selectedAgent);
          if (!matchedAgent || !chat.agent.includes(matchedAgent.name)) return false;
        }
      }

      // Category filter
      if (selectedCategory && selectedCategory !== "all") {
        if (chat.category !== selectedCategory) return false;
      }

      // Keywords filter
      if (keywords) {
        const keyword = keywords.toLowerCase();
        const matchesKeyword =
          chat.visitor.toLowerCase().includes(keyword) ||
          chat.summary.toLowerCase().includes(keyword) ||
          chat.agent.toLowerCase().includes(keyword);
        if (!matchesKeyword) return false;
      }

      return true;
    });
  }, [chats, dateRange, selectedDepartment, selectedAgent, selectedCategory, keywords]);

  // Pagination calculations
  const totalItems = filteredChats.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedChats = filteredChats.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [dateRange, selectedDepartment, selectedAgent, selectedCategory, keywords]);

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

  const handleConfirmDelete = () => {
    if (chatToDelete) {
      // Remove chat from local state
      setChats((prev) => prev.filter((c) => c.id !== chatToDelete.id));
      setIsDeleteDialogOpen(false);
      setChatToDelete(null);
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(paginatedChats.map((chat) => chat.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowSelect = (chatId: number) => {
    setSelectedRows((prev) => {
      if (prev.includes(chatId)) {
        return prev.filter((id) => id !== chatId);
      } else {
        return [...prev, chatId];
      }
    });
  };

  const handleVisitorClick = (chat: Chat) => {
    handleViewDetails(chat);
  };

  const handleSummaryClick = (summary: string) => {
    setSelectedSummary(summary);
    setIsSummaryModalOpen(true);
  };

  const handleViewDetails = (chat: Chat) => {
    setSelectedChat(chat);
    setIsTranscriptOpen(true);
  };

  const handleViewHistory = (chat: Chat) => {
    setSelectedChat(chat);
    setIsHistoryOpen(true);
  };

  const handleDeleteClick = (chat: Chat) => {
    setChatToDelete(chat);
    setIsDeleteDialogOpen(true);
  };

  const truncateText = (text: string, maxLength: number = 50) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-2">
        <h1 className="text-3xl font-bold">Chats</h1>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 p-4 bg-card rounded-lg border">
        {/* Date Range */}
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="justify-start text-left font-normal">
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

        {/* Department Filter */}
        <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {availableDepartments.map((dept) => (
              <SelectItem key={dept.id} value={dept.id}>
                {dept.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Agent Filter */}
        <Select value={selectedAgent} onValueChange={setSelectedAgent}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Agent" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Agents</SelectItem>
            <SelectItem value="ai-bot">AI Bot</SelectItem>
            {availableAgents.map((agent) => (
              <SelectItem key={agent.id} value={agent.id}>
                {agent.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Category Filter */}
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {availableCategories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* New Filter Button */}
        <Button variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          New Filter
        </Button>

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

      {/* Export Button */}
      <div className="flex justify-start">
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export All
        </Button>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[35px]">
                  <Checkbox
                    checked={
                      selectedRows.length === paginatedChats.length && paginatedChats.length > 0
                    }
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead className="w-[90px]">Time</TableHead>
                <TableHead className="w-[100px]">Visitor</TableHead>
                <TableHead className="w-[120px]">Department</TableHead>
                <TableHead className="w-[80px]">Agent</TableHead>
                <TableHead className="w-[250px]">Summary</TableHead>
                <TableHead className="w-[90px]">Category</TableHead>
                <TableHead className="w-[70px]">Duration</TableHead>
                <TableHead className="w-[100px]">Campaign</TableHead>
                <TableHead className="w-[100px]">Operations</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedChats.map((chat) => (
                <TableRow key={chat.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(chat.id)}
                      onCheckedChange={() => handleRowSelect(chat.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="text-xs">
                      <div>
                        {chat.time.split(" ")[0].split("/")[2]}/
                        {chat.time.split(" ")[0].split("/")[1]}
                      </div>
                      <div>{chat.time.split(" ")[1].substring(0, 5)}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div
                      className="text-blue-600 hover:text-blue-800 cursor-pointer relative group text-xs"
                      onClick={() => handleVisitorClick(chat)}
                    >
                      {chat.visitor.length > 12
                        ? chat.visitor.substring(0, 10) + ".."
                        : chat.visitor}
                      <div className="absolute bottom-full left-0 mb-2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                        {chat.visitor}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs">
                    {chat.department.length > 20
                      ? chat.department.split(" - ")[0]
                      : chat.department}
                  </TableCell>
                  <TableCell>
                    <div className="text-xs">
                      {chat.agent.length > 15
                        ? `${chat.agent.split(", ")[0]}${chat.agent.includes(",") ? " +" + (chat.agent.split(", ").length - 1) : ""}`
                        : chat.agent
                            .split(", ")
                            .map((agent, index) => <div key={index}>{agent}</div>)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div
                      className="text-sm text-muted-foreground cursor-pointer hover:text-foreground"
                      onClick={() => handleSummaryClick(chat.summary)}
                      title="Tam metni görmek için tıklayın"
                    >
                      {truncateText(chat.summary, 45)}
                    </div>
                  </TableCell>
                  <TableCell className="text-xs">{chat.category}</TableCell>
                  <TableCell className="text-xs font-mono">{chat.duration}</TableCell>
                  <TableCell className="text-xs">
                    {chat.campaign.length > 15
                      ? chat.campaign.replace("Kampanyası", "K.")
                      : chat.campaign}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-6 h-6 p-0"
                        onClick={() => handleViewDetails(chat)}
                        title="View Details"
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-6 h-6 p-0"
                        onClick={() => handleViewHistory(chat)}
                        title="View History"
                      >
                        <Clock className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-6 h-6 p-0 text-red-500 hover:text-red-700"
                        onClick={() => handleDeleteClick(chat)}
                        title="Delete Chat"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

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

      {/* Transcript Detail Sheet */}
      <Sheet open={isTranscriptOpen} onOpenChange={setIsTranscriptOpen}>
        <SheetContent
          side="right"
          className="w-[85vw] min-w-[1400px] max-w-none [&>button]:hidden overflow-y-auto"
        >
          <SheetHeader className="text-left">
            <div className="flex items-center justify-between border-b pb-4 px-6">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsTranscriptOpen(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                  Close
                </Button>

                <SheetTitle className="text-lg font-medium flex items-center gap-2">
                  Transcript Detail
                  <ExternalLink className="h-4 w-4" />
                </SheetTitle>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Transcript
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </SheetHeader>

          {selectedChat && (
            <div className="mt-8 px-6 pb-8 grid grid-cols-3 gap-8">
              {/* Sol taraf - Transcript */}
              <div className="col-span-2 space-y-6">
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                  <h3 className="font-medium mb-6">Transcript</h3>
                  <div className="space-y-3 text-sm">
                    <div className="text-gray-600 dark:text-gray-300">
                      <strong>AI Bot</strong> sohbete katıldı.
                    </div>

                    {selectedChat.transcript.messages.map((message, index) => (
                      <div key={index} className="text-gray-600 dark:text-gray-300">
                        <span className="text-blue-600 dark:text-blue-400">[{message.time}]</span>{" "}
                        <strong>{message.sender}</strong>: {message.message}
                      </div>
                    ))}

                    <div className="text-gray-600 dark:text-gray-300">
                      Agent görüşmeden ayrıldı
                      <br />
                      Görüşme sonlandırıldı. ({selectedChat.transcript.endTime.split(" ")[1]})
                    </div>
                  </div>
                </div>
              </div>

              {/* Sağ taraf - Visitor Info, History, Chat Info */}
              <div className="space-y-6">
                {/* Visitor Info */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-medium mb-4">Visitor</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Type:</span>
                        <span>Investor</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Name:</span>
                        <span>{selectedChat.transcript.visitorName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Email:</span>
                        <span>-</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Number of Visits:</span>
                        <span>1</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Number of Chats:</span>
                        <span>1</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">First Visit Time:</span>
                        <span>{selectedChat.time}</span>
                      </div>
                      <div className="mt-3">
                        <Button variant="outline" size="sm" className="w-full">
                          🚫 Ban
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* History */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-medium mb-4">History</h3>
                    <div className="text-sm text-blue-600 dark:text-blue-400">
                      {selectedChat.time.split(" ")[1]}
                    </div>
                  </CardContent>
                </Card>

                {/* Chat Info */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-medium mb-4">Chat Info</h3>
                    <div className="space-y-2 text-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Chat ID:</span>
                          <div className="text-xs break-all">{selectedChat.transcript.chatId}</div>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Name:</span>
                          <div>{selectedChat.transcript.visitorName}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Email:</span>
                          <div>-</div>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Department:</span>
                          <div>{selectedChat.department || "-"}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Agent:</span>
                          <div>{selectedChat.agent}</div>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Start Time:</span>
                          <div>{selectedChat.time}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">End Time:</span>
                          <div>{selectedChat.transcript.endTime}</div>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">
                            Product/ Service:
                          </span>
                          <div>Borsa İşlemleri</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Phone:</span>
                          <div>-</div>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Company:</span>
                          <div>-</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Source:</span>
                          <div>Chat Button</div>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Auto Invitation:</span>
                          <div>-</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Waiting Time:</span>
                          <div>00:00:00</div>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                          <div>{selectedChat.duration}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Transfer Log:</span>
                          <div>-</div>
                        </div>
                        <div></div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Request Page:</span>
                          <div className="text-blue-600 dark:text-blue-400 text-xs">
                            Casivera Borsa 🔗 (https://borsa.casivera179.com/tr/)
                          </div>
                        </div>
                        <div></div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Campaign:</span>
                          <div>{selectedChat.campaign}</div>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">
                            Campaign Display Language:
                          </span>
                          <div>Turkish</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Custom Variable, Attachment, Note Attachment, Rating */}
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400 text-sm">
                        Custom Variable:
                      </span>
                      <div className="text-sm">-</div>
                    </div>
                    <div>
                      <span className="text-gray-600 text-sm">Attachment:</span>
                      <div className="text-sm">-</div>
                    </div>
                    <div>
                      <span className="text-gray-600 text-sm">Note Attachment:</span>
                      <div className="text-sm">-</div>
                    </div>
                    <div>
                      <span className="text-gray-600 text-sm">Rating:</span>
                      <div className="text-sm">-</div>
                    </div>
                    <div>
                      <span className="text-gray-600 text-sm">Rating Comment:</span>
                      <div className="text-sm">-</div>
                    </div>
                  </CardContent>
                </Card>

                {/* Agent Wrap-up */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">Agent Wrap-up</h3>
                      <Edit className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-gray-600">Category:</label>
                        <div className="mt-1 p-2 border rounded text-sm">
                          {selectedChat.category}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Comment:</label>
                        <div className="mt-1 p-2 border rounded text-sm min-h-[60px]">
                          Borsa işlemleri konusunda destek sağlandı.
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Session Info */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-medium mb-4">Session Info</h3>
                    <div className="space-y-2 text-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-gray-600">Start Time:</span>
                          <div>{selectedChat.time}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">IP:</span>
                          <div>78.163.119.75</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-gray-600">City:</span>
                          <div>Istanbul</div>
                        </div>
                        <div>
                          <span className="text-gray-600">State:</span>
                          <div>Istanbul</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-gray-600">Country/ Region:</span>
                          <div>Türkiye</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Search Engine:</span>
                          <div>-</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-gray-600">Keyword:</span>
                          <div>-</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Browser:</span>
                          <div>Safari 18.5</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-gray-600">Operating System:</span>
                          <div>iPhone iOS 18.5</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Screen Resolution:</span>
                          <div>414x896</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-gray-600">Language:</span>
                          <div>tr-TR</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Time Zone:</span>
                          <div>GMT +03:00</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-gray-600">Referer URL:</span>
                          <div className="text-blue-600 text-xs">
                            https://borsa.casivera179.com/ 🔗
                          </div>
                        </div>
                        <div></div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Landing Page:</span>
                          <div className="text-xs">(https://borsa.casivera179.com/tr/)</div>
                        </div>
                        <div></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Summary Modal */}
      <Dialog open={isSummaryModalOpen} onOpenChange={setIsSummaryModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Chat Summary</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-sm whitespace-pre-wrap">{selectedSummary}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Chat'i Sil</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <p className="text-sm text-muted-foreground mb-4">
              Bu chat'i silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
            </p>
            {chatToDelete && (
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4">
                <div className="text-sm">
                  <div>
                    <strong>Visitor:</strong> {chatToDelete.visitor}
                  </div>
                  <div>
                    <strong>Time:</strong> {chatToDelete.time}
                  </div>
                  <div>
                    <strong>Duration:</strong> {chatToDelete.duration}
                  </div>
                </div>
              </div>
            )}
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                İptal
              </Button>
              <Button variant="destructive" onClick={handleConfirmDelete}>
                Sil
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* History Sheet */}
      <Sheet open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
        <SheetContent side="right" className="w-[600px] min-w-[500px] [&>button]:hidden">
          <SheetHeader className="text-left">
            <div className="flex items-center justify-between border-b pb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsHistoryOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4 mr-1" />
                Close
              </Button>
              <SheetTitle className="text-lg font-medium flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Chat History
              </SheetTitle>
            </div>
          </SheetHeader>

          {selectedChat && (
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-card rounded-lg border">
                <h3 className="font-medium mb-3">Chat Bilgileri</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Visitor:</span>
                    <div className="font-medium">{selectedChat.visitor}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Agent:</span>
                    <div className="font-medium">{selectedChat.agent}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Department:</span>
                    <div className="font-medium">{selectedChat.department}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Category:</span>
                    <div className="font-medium">{selectedChat.category}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Duration:</span>
                    <div className="font-medium">{selectedChat.duration}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Campaign:</span>
                    <div className="font-medium">{selectedChat.campaign}</div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-card rounded-lg border">
                <h3 className="font-medium mb-3">Session Geçmişi</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1 text-sm">
                      <div className="font-medium">Chat Started</div>
                      <div className="text-xs text-muted-foreground">{selectedChat.time}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1 text-sm">
                      <div className="font-medium">Agent Joined</div>
                      <div className="text-xs text-muted-foreground">
                        {selectedChat.agent} sohbete katıldı
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <div className="flex-1 text-sm">
                      <div className="font-medium">Chat Completed</div>
                      <div className="text-xs text-muted-foreground">
                        {selectedChat.transcript.endTime}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-card rounded-lg border">
                <h3 className="font-medium mb-3">Önceki Sohbetler</h3>
                <div className="text-sm text-muted-foreground">
                  Bu visitor için önceki sohbet bulunamadı.
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
