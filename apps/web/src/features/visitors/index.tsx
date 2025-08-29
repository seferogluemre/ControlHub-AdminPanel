import { IconSearch } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { DataTable } from "#/components/data-table/index";
import { Input } from "#/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "#/components/ui/tabs";
// Mock Data - Using Faker.js generator
import generateVisitors from "../../utils/mock-generators/visitor-generator";
import { visitorColumns } from "./components/columns";
import { DetailPanel } from "./components/detail-panel";
import { Visitor } from "./data/types";
import { calculateVisitorStats, filterTabs, filterVisitorsByTab } from "./utils";

export default function Visitors() {
  const [activeTab, setActiveTab] = useState("all_visitors");
  const [isOnlineSorted, setIsOnlineSorted] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState<Visitor | null>(null);
  const [pinnedVisitors, setPinnedVisitors] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  // Generate visitors using Faker.js (memoized for performance)
  const mockVisitors = useMemo(() => generateVisitors(50), []);

  // Apply search filter first
  const searchFilteredVisitors = mockVisitors.filter((visitor) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      visitor.name.toLowerCase().includes(query) ||
      (visitor.location && visitor.location.toLowerCase().includes(query)) ||
      (visitor.email && visitor.email.toLowerCase().includes(query))
    );
  });

  // Then apply tab filters
  const filteredVisitors = filterVisitorsByTab(searchFilteredVisitors, activeTab);

  // Calculate visitor statistics based on filtered data
  const { totalVisitors, waitingForChat } = calculateVisitorStats(filteredVisitors);

  // Apply sorting with pinned visitors first
  const sortedVisitors = [...filteredVisitors].sort((a, b) => {
    // First sort by pinned status
    const aPinned = pinnedVisitors.has(a.id);
    const bPinned = pinnedVisitors.has(b.id);

    if (aPinned && !bPinned) return -1;
    if (!aPinned && bPinned) return 1;

    // Then apply online sorting if enabled
    if (isOnlineSorted) {
      if (a.isOnline && !b.isOnline) return -1;
      if (!a.isOnline && b.isOnline) return 1;
    }

    return 0;
  });

  const displayedVisitors = sortedVisitors;

  const handleSortOnline = () => {
    setIsOnlineSorted(!isOnlineSorted);
  };

  const handleSelectVisitor = (visitor: Visitor) => {
    setSelectedVisitor(visitor);
  };

  const handleCloseDetail = () => {
    setSelectedVisitor(null);
  };

  const handleTogglePin = (visitorId: string) => {
    setPinnedVisitors((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(visitorId)) {
        newSet.delete(visitorId);
      } else {
        newSet.add(visitorId);
      }
      return newSet;
    });
  };

  return (
    <div className="flex gap-6 h-full">
      {/* Main Table Section */}
      <div className={`space-y-6 ${selectedVisitor ? "flex-1" : "w-full"}`}>
        <div className="rounded-md border">
          {/* Table Header - Stats + Filters */}
          <div className="border-b bg-muted/50 px-4 py-3">
            <div className="flex items-center justify-between">
              {/* Left Side - Title and Stats */}
              <div className="flex items-center gap-6">
                <h2 className="text-lg font-semibold text-foreground">Ziyaretçiler</h2>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-blue-500">
                    <span className="font-medium">{totalVisitors}</span> ziyaretçi sitede
                  </span>
                  <span className="text-muted-foreground">
                    <span className="font-medium text-foreground">{waitingForChat}</span> ziyaretçi
                    sohbet bekliyor
                  </span>
                </div>
              </div>

              {/* Right Side - Filter Tabs */}
              <div className="flex items-center gap-2">
                {/* Online Sort Indicator */}
                {isOnlineSorted && (
                  <div className="text-xs text-blue-600 bg-blue-50 dark:bg-blue-950 px-2 py-1 rounded-md mr-2">
                    ↑ Çevrimiçi duruma göre sıralandı
                  </div>
                )}

                {/* Filter Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="bg-background border">
                    {filterTabs.map((tab) => (
                      <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className="px-4 py-2 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                      >
                        {tab.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="border-b bg-muted/30 px-4 py-3">
            <div className="relative max-w-md">
              <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Ziyaretçi ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Table Content */}
          <div className="p-4">
            <DataTable
              columns={visitorColumns(
                handleSortOnline,
                handleSelectVisitor,
                selectedVisitor?.id,
                handleTogglePin,
                pinnedVisitors,
              )}
              data={displayedVisitors}
            />
          </div>
        </div>
      </div>

      {/* Detail Panel Section - Only show when visitor is selected */}
      {selectedVisitor && (
        <div className="w-80 flex-shrink-0">
          <DetailPanel visitor={selectedVisitor} onClose={handleCloseDetail} />
        </div>
      )}
    </div>
  );
}
