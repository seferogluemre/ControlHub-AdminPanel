import { X } from "lucide-react";
import { useState } from "react";
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

interface SimpleAddFieldSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (fieldName: string, displayName: string, visible: boolean, required: boolean) => void;
  onManageFields: () => void;
}

const FIELD_NAME_OPTIONS = [
  { value: "rating", label: "Hizmet Puanı" },
  { value: "comment", label: "Yorum" },
  { value: "feedback", label: "Geri Bildirim" },
  { value: "satisfaction", label: "Memnuniyet" },
  { value: "experience", label: "Deneyim" },
  { value: "quality", label: "Hizmet Kalitesi" },
];

export function SimpleAddFieldSheet({
  isOpen,
  onClose,
  onAdd,
  onManageFields,
}: SimpleAddFieldSheetProps) {
  const [fieldName, setFieldName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [visible, setVisible] = useState(true);
  const [required, setRequired] = useState(false);

  const handleAdd = () => {
    if (!fieldName.trim()) {
      toast.error("Field name is required");
      return;
    }

    if (!displayName.trim()) {
      toast.error("Display name is required");
      return;
    }

    onAdd(fieldName, displayName, visible, required);
    toast.success("Field added successfully");
    handleClose();
  };

  const handleClose = () => {
    // Reset form
    setFieldName("");
    setDisplayName("");
    setVisible(true);
    setRequired(false);
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[400px] [&>button]:hidden flex flex-col">
        <SheetHeader className="text-left px-6 pt-6 pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-lg font-semibold">Add a field</SheetTitle>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6">
          <div className="space-y-6">
            {/* Field Name */}
            <div className="space-y-3">
              <Label htmlFor="field-name" className="text-sm font-medium">
                Field name *
              </Label>
              <Select value={fieldName} onValueChange={setFieldName}>
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
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter display name"
                className="h-10"
              />
            </div>

            {/* Visible and Required Toggles */}
            <div className="space-y-6">
              <div className="flex items-center justify-between py-2">
                <Label htmlFor="visible" className="text-sm font-medium">
                  Visible
                </Label>
                <Switch id="visible" checked={visible} onCheckedChange={setVisible} />
              </div>

              <div className="flex items-center justify-between py-2">
                <Label htmlFor="required" className="text-sm font-medium">
                  Required
                </Label>
                <Switch id="required" checked={required} onCheckedChange={setRequired} />
              </div>
            </div>

            {/* Info Message */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-xs font-medium">i</span>
                </div>
                <p className="text-sm text-blue-800">
                  If you want to manage all fields in your account, click{" "}
                  <button
                    className="text-blue-600 underline hover:no-underline"
                    onClick={onManageFields}
                  >
                    Manage Fields
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t bg-gray-50/50 gap-3 flex">
          <Button variant="outline" onClick={handleClose} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleAdd} className="flex-1">
            OK
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
