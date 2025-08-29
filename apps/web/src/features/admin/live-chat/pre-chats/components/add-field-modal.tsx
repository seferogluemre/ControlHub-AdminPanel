import { useState } from "react";
import { Button } from "#components/ui/button.tsx";
import { Input } from "#components/ui/input.tsx";
import { Label } from "#components/ui/label.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "#components/ui/select.tsx";
import { FIELD_TYPE_OPTIONS } from "../data/pre-chat-constants";

interface AddFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string, type: string) => void;
}

export function AddFieldModal({ isOpen, onClose, onAdd }: AddFieldModalProps) {
  const [fieldName, setFieldName] = useState("");
  const [fieldType, setFieldType] = useState("text");

  const handleAdd = () => {
    if (fieldName.trim()) {
      onAdd(fieldName, fieldType);
      setFieldName("");
      setFieldType("text");
      onClose();
    }
  };

  const handleClose = () => {
    setFieldName("");
    setFieldType("text");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-20 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-sm mx-4">
        <h3 className="text-lg font-semibold mb-4">Add New Field</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="field-name">Field Name</Label>
            <Input
              id="field-name"
              value={fieldName}
              onChange={(e) => setFieldName(e.target.value)}
              placeholder="Enter field name"
            />
          </div>
          <div>
            <Label htmlFor="field-type">Field Type</Label>
            <Select value={fieldType} onValueChange={setFieldType}>
              <SelectTrigger>
                <SelectValue placeholder="Select field type" />
              </SelectTrigger>
              <SelectContent>
                {FIELD_TYPE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAdd}>Add Field</Button>
        </div>
      </div>
    </div>
  );
}
