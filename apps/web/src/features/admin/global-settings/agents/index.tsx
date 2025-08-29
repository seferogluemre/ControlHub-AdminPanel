import { FileDown, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { DataTable } from "#/components/data-table";
import { Button } from "#/components/ui/button";
import { Card, CardContent } from "#/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "#/components/ui/dialog";
import { Input } from "#/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "#/components/ui/select";
import { agentsColumns } from "./components/columns";
import { agentsData as initialAgentsData } from "./data/agents-data";

export default function Agents() {
  const [showNoticeDialog, setShowNoticeDialog] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [agents, setAgents] = useState(initialAgentsData); // Local state for agents

  // Filtrelenmiş agents data
  const filteredAgents = useMemo(() => {
    let filtered = agents; // Use local state instead of imported data

    // Departman filtresi
    if (departmentFilter !== "all") {
      filtered = filtered.filter((agent) =>
        agent.departments.some((dept) =>
          dept.toLowerCase().includes(departmentFilter.toLowerCase()),
        ),
      );
    }

    // Keyword search
    if (searchKeyword.trim()) {
      const keyword = searchKeyword.toLowerCase();
      filtered = filtered.filter(
        (agent) =>
          agent.name.toLowerCase().includes(keyword) ||
          agent.email.toLowerCase().includes(keyword) ||
          (agent.bio && agent.bio.toLowerCase().includes(keyword)) ||
          agent.departments.some((dept) => dept.toLowerCase().includes(keyword)),
      );
    }

    return filtered;
  }, [agents, departmentFilter, searchKeyword]); // Updated dependencies

  // Unique departments for filter
  const availableDepartments = useMemo(() => {
    const depts = new Set<string>();
    agents.forEach((agent) => {
      // Use local state
      agent.departments.forEach((dept) => depts.add(dept));
    });
    return Array.from(depts);
  }, [agents]); // Updated dependencies

  const handleDeleteAgent = (agentId: string) => {
    // Update local state instead of mutating imported data
    setAgents((prevAgents) => {
      const agentToDelete = prevAgents.find((a) => a.id === agentId);
      if (agentToDelete) {
        // Agent silindi
        alert(`${agentToDelete.name} başarıyla silindi!`);
        return prevAgents.filter((a) => a.id !== agentId);
      }
      return prevAgents;
    });
  };

  // Create columns with delete handler
  const columnsWithActions = agentsColumns(handleDeleteAgent);

  const handleNewAgentClick = () => {
    setShowNoticeDialog(true);
  };

  const handleAddConfirm = () => {
    setShowNoticeDialog(false);
    // Navigate to new agent page
    window.location.href = "/global-settings/agents/new";
  };

  const handleCancel = () => {
    setShowNoticeDialog(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const handleDepartmentFilterChange = (value: string) => {
    setDepartmentFilter(value);
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-bold">Agents</h1>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button className="bg-blue-500 hover:bg-blue-600" onClick={handleNewAgentClick}>
            <Plus className="w-4 h-4 mr-2" />
            New Agent
          </Button>
          <Button variant="outline">
            <FileDown className="w-4 h-4 mr-2" />
            Export All
          </Button>
        </div>

        <div className="flex items-center space-x-3">
          <Select value={departmentFilter} onValueChange={handleDepartmentFilterChange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {availableDepartments.map((dept, index) => (
                <SelectItem key={index} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Keywords"
              className="pl-9 w-64"
              value={searchKeyword}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>

      {/* Results Info */}
      <div className="text-sm text-muted-foreground">
        {filteredAgents.length} of {agents.length} agents
        {departmentFilter !== "all" && ` in ${departmentFilter}`}
        {searchKeyword && ` matching "${searchKeyword}"`}
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <DataTable columns={columnsWithActions} data={filteredAgents} />
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center text-muted-foreground text-sm">© 2025 | Connected</div>

      {/* Notice Dialog */}
      <Dialog open={showNoticeDialog} onOpenChange={setShowNoticeDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Bildirim</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              Daha fazla agent ekledikçe ücretlendirileceksiniz. Ek agent'lar için ücret $63.00
              USD'dir. Sonraki faturalama tarihine kadar, yeni agent eklemek için $28.45 USD
              ücretlendirileceksiniz.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancel} className="mr-2">
              İptal
            </Button>
            <Button onClick={handleAddConfirm} className="bg-red-500 hover:bg-red-600">
              Ekle
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
