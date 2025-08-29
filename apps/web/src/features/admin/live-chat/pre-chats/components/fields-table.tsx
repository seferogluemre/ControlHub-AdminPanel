import { Edit, Trash2 } from "lucide-react";
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
import type { PreChatField } from "../types/pre-chat";

interface FieldsTableProps {
  fields: PreChatField[];
  onFieldUpdate: (fieldId: string, updates: Partial<PreChatField>) => void;
  onFieldDelete: (fieldId: string) => void;
  onFieldEdit: (field: PreChatField) => void;
  onAddField: () => void;
}

export function FieldsTable({
  fields,
  onFieldUpdate,
  onFieldDelete,
  onFieldEdit,
  onAddField,
}: FieldsTableProps) {
  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Display name</TableHead>
            <TableHead>Visible</TableHead>
            <TableHead>Required</TableHead>
            <TableHead>Operations</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.map((field) => (
            <TableRow key={field.id}>
              <TableCell
                className="font-medium text-blue-600 cursor-pointer hover:text-blue-800 transition-colors"
                onClick={() => onFieldEdit(field)}
              >
                {field.name}
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
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => onFieldEdit(field)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-red-500"
                    onClick={() => onFieldDelete(field.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add Field Button */}
      <div className="pt-4 border-t">
        <Button
          variant="ghost"
          size="sm"
          onClick={onAddField}
          className="text-blue-600 hover:text-blue-700"
        >
          + Add a field
        </Button>
      </div>
    </div>
  );
}
