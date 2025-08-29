import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ConfirmDialog } from "#components/confirm-dialog.tsx";
import { Button } from "#components/ui/button.tsx";
import { Switch } from "#components/ui/switch.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "#components/ui/table.tsx";
import type { PostChatField } from "../types/post-chat";

interface PostChatFieldsTableProps {
  fields: PostChatField[];
  onFieldUpdate: (fieldId: string, updates: Partial<PostChatField>) => void;
  onFieldDelete: (fieldId: string) => void;
  onFieldEdit: (field: PostChatField) => void;
}

export function PostChatFieldsTable({
  fields,
  onFieldUpdate,
  onFieldDelete,
  onFieldEdit,
}: PostChatFieldsTableProps) {
  const [deleteFieldId, setDeleteFieldId] = useState<string | null>(null);
  const fieldToDelete = fields.find((f) => f.id === deleteFieldId);

  const handleDeleteClick = (fieldId: string) => {
    setDeleteFieldId(fieldId);
  };

  const handleConfirmDelete = () => {
    if (deleteFieldId) {
      onFieldDelete(deleteFieldId);
      toast.success("Field deleted successfully");
      setDeleteFieldId(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteFieldId(null);
  };

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Display name</TableHead>
            <TableHead className="w-24">Visible</TableHead>
            <TableHead className="w-24">Required</TableHead>
            <TableHead className="w-32">Operations</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.map((field) => (
            <TableRow key={field.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 cursor-pointer hover:underline">
                    {field.displayName}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <Switch
                  checked={field.visible}
                  onCheckedChange={(checked) => onFieldUpdate(field.id, { visible: checked })}
                />
              </TableCell>
              <TableCell>
                <Switch
                  checked={field.required}
                  onCheckedChange={(checked) => onFieldUpdate(field.id, { required: checked })}
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onFieldEdit(field)}
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

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={!!deleteFieldId}
        onOpenChange={(open) => !open && handleCancelDelete()}
        title="Delete Field"
        desc={
          <div>
            Are you sure you want to delete the field{" "}
            <strong>"{fieldToDelete?.displayName}"</strong>? This action cannot be undone.
          </div>
        }
        confirmText="Yes, Delete"
        cancelBtnText="Cancel"
        destructive={true}
        handleConfirm={handleConfirmDelete}
      />
    </div>
  );
}
