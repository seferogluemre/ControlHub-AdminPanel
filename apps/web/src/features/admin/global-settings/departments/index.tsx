import { Link } from "@tanstack/react-router";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { DataTable } from "#/components/data-table";
import { Button } from "#/components/ui/button";
import { Card, CardContent } from "#/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "#/components/ui/dialog";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { Switch } from "#/components/ui/switch";
import { departmentsColumns } from "./components/columns";
import { departmentsData as initialDepartmentsData } from "./data/departments-data";

export default function Departments() {
  // State management
  const [departments, setDepartments] = useState(initialDepartmentsData);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedDepartmentMembers, setSelectedDepartmentMembers] = useState<any>(null);
  const [isMembersModalOpen, setIsMembersModalOpen] = useState(false);

  // Filtered departments based on search
  const filteredDepartments = useMemo(() => {
    if (!searchKeyword.trim()) return departments;

    const keyword = searchKeyword.toLowerCase();
    return departments.filter(
      (dept) =>
        dept.name.toLowerCase().includes(keyword) ||
        dept.description.toLowerCase().includes(keyword) ||
        dept.members.some((member) => member.name.toLowerCase().includes(keyword)),
    );
  }, [departments, searchKeyword]);

  // Delete handler
  const handleDeleteDepartment = (departmentId: string) => {
    const confirmDelete = confirm("Bu departmanı silmek istediğinizden emin misiniz?");
    if (confirmDelete) {
      setDepartments((prevDepartments) =>
        prevDepartments.filter((dept) => dept.id !== departmentId),
      );
    }
  };

  // Members modal handler
  const handleViewMembers = (department: any) => {
    setSelectedDepartmentMembers(department);
    setIsMembersModalOpen(true);
  };

  // Create columns with delete handler and members click handler
  const columnsWithActions = useMemo(
    () =>
      departmentsColumns.map((col) => {
        if (col.id === "actions") {
          return {
            ...col,
            cell: ({ row }: { row: any }) => {
              const department = row.original;
              return (
                <div className="flex items-center space-x-2">
                  <Link to="/global-settings/departments/edit/$id" params={{ id: department.id }}>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteDepartment(department.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              );
            },
          };
        } else if ((col as any).accessorKey === "members") {
          return {
            ...col,
            cell: ({ row }: { row: any }) => {
              const department = row.original;
              const members = department.members;
              return (
                <div
                  className="flex -space-x-2 cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => handleViewMembers(department)}
                >
                  {members.slice(0, 5).map((member: any, index: number) => (
                    <div
                      key={index}
                      className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-background flex items-center justify-center"
                    >
                      <span className="text-xs font-medium">
                        {member.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </span>
                    </div>
                  ))}
                  {members.length > 5 && (
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 border-2 border-background flex items-center justify-center">
                      <span className="text-xs font-medium">+{members.length - 5}</span>
                    </div>
                  )}
                </div>
              );
            },
          };
        }
        return col;
      }),
    [],
  );

  return (
    <div className="flex flex-col space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl font-bold">Departmanlar</h1>
          <div className="flex items-center space-x-2">
            <Label htmlFor="departments-toggle"></Label>
            <Switch id="departments-toggle" defaultChecked />
          </div>
        </div>
        <p className="text-muted-foreground">
          Bir departman, kuruluşunuzdaki belirli sorumlulukları olan bir iş birimini temsil eder.
          Onlara atanan farklı aracılarla birden fazla departman oluşturabilir ve bir bölümün
          çevrimdışı mesajlaşma, sohbet transferleri, yönlendirme kuralları, otomatik dağıtım vb.
          için bir seçenek olarak kullanılıp kullanılamayacağını tanımlayabilirsiniz.
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <Link to="/global-settings/departments/new">
          <Button className="bg-blue-500 hover:bg-blue-600">
            <Plus className="w-4 h-4 mr-2" />
            Yeni Departman
          </Button>
        </Link>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Departman ara..."
            className="pl-9 w-80"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <DataTable columns={columnsWithActions} data={filteredDepartments} />
        </CardContent>
      </Card>

      {/* Members Modal */}
      <Dialog open={isMembersModalOpen} onOpenChange={setIsMembersModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedDepartmentMembers
                ? `"${selectedDepartmentMembers.name}" Üyeleri`
                : "Department Members"}
            </DialogTitle>
          </DialogHeader>

          {selectedDepartmentMembers && (
            <div className="mt-4">
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">
                  Bu departmanda {selectedDepartmentMembers.members.length} üye bulunmaktadır:
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
                {selectedDepartmentMembers.members.map((member: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                      <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                        {member.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{member.name}</div>
                      <div className="text-xs text-muted-foreground">{member.email}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <div className="text-center text-muted-foreground text-sm">© 2025 | Connected</div>
    </div>
  );
}
