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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "#components/ui/table.tsx";

import { FIELD_TYPE_OPTIONS } from "../data/post-chat-constants";
import type { PostChatField, PostChatScaleOption } from "../types/post-chat";

interface PostChatEditFieldSheetProps {
  field: PostChatField | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (field: PostChatField) => void;
}

const FIELD_NAME_OPTIONS = [
  { value: "rating", label: "Hizmet Puanı" },
  { value: "ratingComment", label: "Puanlama Yorumu" },
  { value: "comment", label: "Yorum" },
  { value: "feedback", label: "Geri Bildirim" },
  { value: "satisfaction", label: "Memnuniyet" },
  { value: "recommendation", label: "Tavsiye" },
];

export function PostChatEditFieldSheet({
  field,
  isOpen,
  onClose,
  onSave,
}: PostChatEditFieldSheetProps) {
  const [formData, setFormData] = useState<PostChatField>({
    id: "",
    name: "",
    displayName: "",
    type: "text",
    visible: true,
    required: false,
  });

  const [scaleOptions, setScaleOptions] = useState<PostChatScaleOption[]>([
    { id: "1", scale: 1, text: "Poor", visible: true },
    { id: "2", scale: 2, text: "Fair", visible: true },
    { id: "3", scale: 3, text: "Good", visible: true },
    { id: "4", scale: 4, text: "Very good", visible: true },
    { id: "5", scale: 5, text: "Excellent", visible: true },
  ]);

  useEffect(() => {
    if (field) {
      setFormData(field);
      if (field.scaleOptions) {
        setScaleOptions(field.scaleOptions);
      }
    }
  }, [field]);

  const handleSave = () => {
    if (!formData.displayName.trim()) {
      toast.error("Display name is required");
      return;
    }

    const updatedField: PostChatField = {
      ...formData,
      scaleOptions: formData.type === "rating" ? scaleOptions : undefined,
    };

    onSave(updatedField);
    toast.success("Field updated successfully");
    onClose();
  };

  const handleCancel = () => {
    if (field) {
      setFormData(field);
      if (field.scaleOptions) {
        setScaleOptions(field.scaleOptions);
      }
    }
    onClose();
  };

  const updateScaleOption = (id: string, updates: Partial<PostChatScaleOption>) => {
    setScaleOptions((options) =>
      options.map((option) => (option.id === id ? { ...option, ...updates } : option)),
    );
  };

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
            System fields are pre-built fields from Comm100. Field names and field types for system
            fields cannot be edited.
          </p>
        </SheetHeader>

        <div className="flex-1 overflow-y-scroll px-6">
          <div className="space-y-6">
            {/* Field Name */}
            <div className="space-y-3">
              <Label htmlFor="field-name" className="text-sm font-medium">
                Field name *
              </Label>
              <Select
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
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    type: value as PostChatField["type"],
                  })
                }
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

            {/* Scale Options for Rating Type */}
            {formData.type === "rating" && (
              <div className="space-y-4">
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-20 px-4 py-3">Scale</TableHead>
                        <TableHead className="px-4 py-3">Text</TableHead>
                        <TableHead className="w-20 px-4 py-3">Visible</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {scaleOptions.map((option) => (
                        <TableRow key={option.id}>
                          <TableCell className="font-medium px-4 py-3">
                            Scale {option.scale}
                          </TableCell>
                          <TableCell className="px-4 py-3">
                            <Input
                              value={option.text}
                              onChange={(e) =>
                                updateScaleOption(option.id, {
                                  text: e.target.value,
                                })
                              }
                              className="border-none p-2 h-8 focus-visible:ring-0 bg-transparent"
                            />
                          </TableCell>
                          <TableCell className="px-4 py-3">
                            <Switch
                              checked={option.visible}
                              onCheckedChange={(checked) =>
                                updateScaleOption(option.id, {
                                  visible: checked,
                                })
                              }
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}

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

        <div className="px-6 py-2 border-t ">
          <Button onClick={handleSave} className="flex-1">
            Kaydet
          </Button>
          <Button variant="outline" onClick={handleCancel} className="flex-1">
            İptal
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
