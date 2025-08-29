import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
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
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "#components/ui/sheet.tsx";
import { Switch } from "#components/ui/switch.tsx";

interface ManageFieldEditSheetProps {
  field: {
    id: string;
    name: string;
    type: string;
    color: "green" | "orange";
  } | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    fieldId: string,
    updates: {
      name: string;
      displayName: string;
      type: string;
      visible: boolean;
      required: boolean;
    },
  ) => void;
}

const FIELD_NAME_OPTIONS = [
  { value: "Attachment", label: "Döküman Eki" },
  { value: "Category", label: "Yatırım Kategorisi" },
  { value: "Comment", label: "Yorum" },
  { value: "Company", label: "Yatırım Firması" },
  { value: "Content", label: "İçerik" },
  { value: "Department", label: "Yatırım Departmanı" },
  { value: "Email", label: "E-posta" },
  { value: "Name", label: "Ad Soyad" },
  { value: "Phone", label: "Telefon" },
  { value: "ProductService", label: "Yatırım Aracı" },
  { value: "Rating", label: "Hizmet Puanı" },
  { value: "RatingComment", label: "Puanlama Yorumu" },
  { value: "YatırımcıNumarası", label: "Yatırımcı Numarası" },
  { value: "PortföyTürü", label: "Portföy Türü" },
];

const FIELD_TYPE_OPTIONS = [
  { value: "Text box", label: "Metin Kutusu" },
  { value: "Text area", label: "Uzun Metin" },
  { value: "Attachment", label: "Döküman Eki" },
  { value: "Category", label: "Yatırım Kategorisi" },
  { value: "Comment", label: "Yorum" },
  { value: "Dropdown list", label: "Açılır Liste" },
  { value: "Rating", label: "Puanlama" },
];

export function ManageFieldEditSheet({
  field,
  isOpen,
  onClose,
  onSave,
}: ManageFieldEditSheetProps) {
  const [formData, setFormData] = useState({
    name: "",
    displayName: "",
    type: "",
    visible: true,
    required: false,
  });

  useEffect(() => {
    if (field) {
      setFormData({
        name: field.name,
        displayName: getDisplayName(field.name),
        type: field.type,
        visible: true,
        required: false,
      });
    }
  }, [field]);

  // Field name'e göre display name'i ayarla
  const getDisplayName = (fieldName: string) => {
    const displayNames: Record<string, string> = {
      Comment: "Yorum",
      Rating: "Hizmet Puanı",
      Name: "Ad Soyad",
      Email: "E-posta",
      Phone: "Telefon",
      Company: "Yatırım Firması",
      Department: "Yatırım Departmanı",
      Content: "İçerik",
      Category: "Yatırım Kategorisi",
      ProductService: "Yatırım Aracı",
      RatingComment: "Puanlama Yorumu",
      Attachment: "Döküman Eki",
      YatırımcıNumarası: "Yatırımcı Numarası",
      PortföyTürü: "Portföy Türü",
    };
    return displayNames[fieldName] || fieldName;
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      toast.error("Field name is required");
      return;
    }

    if (!formData.displayName.trim()) {
      toast.error("Display name is required");
      return;
    }

    if (field) {
      onSave(field.id, {
        name: formData.name,
        displayName: formData.displayName,
        type: formData.type,
        visible: formData.visible,
        required: formData.required,
      });
      toast.success("Field updated successfully");
      onClose();
    }
  };

  const handleClose = () => {
    if (field) {
      setFormData({
        name: field.name,
        displayName: getDisplayName(field.name),
        type: field.type,
        visible: true,
        required: false,
      });
    }
    onClose();
  };

  if (!field) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[450px] [&>button]:hidden flex flex-col">
        <SheetHeader className="text-left px-6 pt-6 pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-lg font-semibold">Edit Field</SheetTitle>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            System fields are pre-built fields from Comm100. Field names and field types for system
            fields cannot be edited.
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
                value={formData.name}
                onValueChange={(value) => {
                  setFormData({
                    ...formData,
                    name: value,
                    displayName: getDisplayName(value),
                  });
                }}
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

            {/* Display Name */}
            <div className="space-y-3">
              <Label htmlFor="display-name" className="text-sm font-medium">
                Display name *
              </Label>
              <Input
                id="display-name"
                value={formData.displayName}
                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                placeholder="Enter display name"
                className="h-10"
              />
            </div>

            {/* Type */}
            <div className="space-y-3">
              <Label htmlFor="type" className="text-sm font-medium">
                Type
              </Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger className="h-10">
                  <SelectValue />
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

        <div className="px-6 py-4 border-t bg-gray-50/50 gap-3 flex">
          <Button variant="outline" onClick={handleClose} className="flex-1">
            İptal
          </Button>
          <Button onClick={handleSave} className="flex-1">
            Kaydet
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
