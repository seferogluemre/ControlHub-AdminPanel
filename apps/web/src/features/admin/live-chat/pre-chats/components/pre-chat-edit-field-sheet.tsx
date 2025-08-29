import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "#components/ui/button.tsx";
import { Label } from "#components/ui/label.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "#components/ui/select.tsx";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "#components/ui/sheet.tsx";
import { Switch } from "#components/ui/switch.tsx";

import type { PreChatField } from "../types/pre-chat";

interface PreChatEditFieldSheetProps {
  field: PreChatField | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (field: PreChatField) => void;
}

const FIELD_NAME_OPTIONS = [
  { value: "name", label: "Ad Soyad" },
  { value: "email", label: "E-posta" },
  { value: "phone", label: "Telefon" },
  { value: "company", label: "Yatırım Firması" },
  { value: "department", label: "Yatırım Departmanı" },
  { value: "username", label: "Yatırımcı Numarası" },
  { value: "product", label: "Yatırım Aracı" },
  { value: "subject", label: "Konu" },
];

const FIELD_TYPE_OPTIONS = [
  { value: "text", label: "Text" },
  { value: "email", label: "Email" },
  { value: "tel", label: "Phone" },
  { value: "number", label: "Number" },
  { value: "select", label: "Select" },
  { value: "textarea", label: "Textarea" },
];

export function PreChatEditFieldSheet({
  field,
  isOpen,
  onClose,
  onSave,
}: PreChatEditFieldSheetProps) {
  const [formData, setFormData] = useState<PreChatField>({
    id: "",
    name: "",
    visible: true,
    required: false,
    type: "text",
  });

  useEffect(() => {
    if (field && isOpen) {
      // Modal açıldığında field verilerini formData'ya aktar
      setFormData({
        id: field.id,
        name: field.name,
        visible: field.visible,
        required: field.required,
        type: field.type,
      });
    }
  }, [field, isOpen]);

  const handleSave = () => {
    if (!formData.name.trim()) {
      toast.error("Field name is required");
      return;
    }

    onSave(formData);
    toast.success("Field updated successfully");
    onClose();
  };

  const handleCancel = () => {
    // Modal kapatılırken formData'yı reset et
    if (field) {
      setFormData({
        id: field.id,
        name: field.name,
        visible: field.visible,
        required: field.required,
        type: field.type,
      });
    }
    onClose();
  };

  // Modal kapatıldığında formData'yı temizle
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        id: "",
        name: "",
        visible: true,
        required: false,
        type: "text",
      });
    }
  }, [isOpen]);

  if (!field) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[450px] [&>button]:hidden flex flex-col">
        <SheetHeader className="text-left px-6 pt-6 pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-lg font-semibold">Edit Field</SheetTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            Edit field properties and settings for the pre-chat form.
          </p>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6">
          <div className="space-y-6">
            {/* Field Name */}
            <div className="space-y-3">
              <Label htmlFor="field-name" className="text-sm font-medium">
                Field name *
              </Label>
              <Select
                key={`name-${field?.id}`}
                value={formData.name}
                onValueChange={(value) => setFormData({ ...formData, name: value })}
              >
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select field name" />
                </SelectTrigger>
                <SelectContent>
                  {FIELD_NAME_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Field Type */}
            <div className="space-y-3">
              <Label htmlFor="field-type" className="text-sm font-medium">
                Field type *
              </Label>
              <Select
                key={`type-${field?.id}`}
                value={formData.type}
                onValueChange={(value) =>
                  setFormData({ ...formData, type: value as PreChatField["type"] })
                }
              >
                <SelectTrigger className="h-10">
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

            {/* Visible and Required Toggles */}
            <div className="space-y-6">
              <div className="flex items-center justify-between py-2">
                <Label htmlFor="visible" className="text-sm font-medium">
                  Visible
                </Label>
                <Switch
                  id="visible"
                  checked={formData.visible}
                  onCheckedChange={(checked) => setFormData({ ...formData, visible: checked })}
                />
              </div>

              <div className="flex items-center justify-between py-2">
                <Label htmlFor="required" className="text-sm font-medium">
                  Required
                </Label>
                <Switch
                  id="required"
                  checked={formData.required}
                  onCheckedChange={(checked) => setFormData({ ...formData, required: checked })}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t flex gap-3">
          <Button onClick={handleSave} className="flex-1">
            Save
          </Button>
          <Button variant="outline" onClick={handleCancel} className="flex-1">
            Cancel
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
