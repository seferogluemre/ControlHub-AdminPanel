import { Edit, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ConfirmDialog } from "#components/confirm-dialog.tsx";
import { Button } from "#components/ui/button.tsx";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "#components/ui/sheet.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "#components/ui/table.tsx";

interface ManageFieldsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onEditField: (field: FieldItem) => void;
}

interface FieldItem {
  id: string;
  name: string;
  type: string;
  color: "green" | "orange";
}

// Örnek field'lar borsa temasına uygun
const AVAILABLE_FIELDS: FieldItem[] = [
  { id: "1", name: "Döküman Eki", type: "Attachment", color: "green" },
  { id: "2", name: "Yatırım Kategorisi", type: "Category", color: "green" },
  { id: "3", name: "Yorum", type: "Comment", color: "green" },
  { id: "4", name: "Yatırım Firması", type: "Text box", color: "green" },
  { id: "5", name: "İçerik", type: "Text area", color: "green" },
  { id: "6", name: "Yatırım Departmanı", type: "Dropdown list", color: "green" },
  { id: "7", name: "E-posta", type: "Text box", color: "green" },
  { id: "8", name: "Yatırımcı Numarası", type: "Text box", color: "orange" },
  { id: "9", name: "Ad Soyad", type: "Text box", color: "green" },
  { id: "10", name: "Telefon", type: "Text box", color: "green" },
  { id: "11", name: "Yatırım Aracı", type: "Dropdown list", color: "green" },
  { id: "12", name: "Hizmet Puanı", type: "Rating", color: "green" },
  { id: "13", name: "Puanlama Yorumu", type: "Text area", color: "green" },
  { id: "14", name: "Portföy Türü", type: "Text box", color: "orange" },
];

export function ManageFieldsSheet({ isOpen, onClose, onEditField }: ManageFieldsSheetProps) {
  const [fields, setFields] = useState<FieldItem[]>(AVAILABLE_FIELDS);
  const [deleteFieldId, setDeleteFieldId] = useState<string | null>(null);

  const fieldToDelete = fields.find((f) => f.id === deleteFieldId);

  const handleEdit = (fieldId: string) => {
    const field = fields.find((f) => f.id === fieldId);
    if (field) {
      onEditField(field);
    }
  };

  const handleDeleteClick = (fieldId: string) => {
    setDeleteFieldId(fieldId);
  };

  const handleConfirmDelete = () => {
    if (deleteFieldId) {
      setFields(fields.filter((f) => f.id !== deleteFieldId));
      toast.success("Field deleted successfully");
      setDeleteFieldId(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteFieldId(null);
  };

  const handleNewField = () => {
    toast.info("New field functionality will be implemented");
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[500px] [&>button]:hidden flex flex-col">
        <SheetHeader className="text-left px-6 pt-6 pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-lg font-semibold">Fields</SheetTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6">
          <div className="space-y-4">
            {/* New Field Button */}
            <Button onClick={handleNewField} className="w-full justify-start">
              <Plus className="w-4 h-4 mr-2" />
              New Field
            </Button>

            {/* Fields Table */}
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12"></TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="w-32">Operations</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fields.map((field) => (
                    <TableRow key={field.id}>
                      <TableCell>
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-medium ${
                            field.color === "green" ? "bg-green-500" : "bg-orange-500"
                          }`}
                        >
                          S
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-blue-600 font-medium">{field.name}</span>
                      </TableCell>
                      <TableCell className="text-gray-600">{field.type}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(field.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteClick(field.id)}
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Dialog */}
        <ConfirmDialog
          open={!!deleteFieldId}
          onOpenChange={(open) => !open && handleCancelDelete()}
          title="Delete Field"
          desc={
            <div>
              Are you sure you want to delete the field <strong>"{fieldToDelete?.name}"</strong>?
              This action cannot be undone.
            </div>
          }
          confirmText="Yes, Delete"
          cancelBtnText="Cancel"
          destructive={true}
          handleConfirm={handleConfirmDelete}
        />
      </SheetContent>
    </Sheet>
  );
}
