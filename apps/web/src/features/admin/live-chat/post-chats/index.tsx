import { Button } from "#components/ui/button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "#components/ui/card.tsx";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "#components/ui/collapsible.tsx";
import { Label } from "#components/ui/label.tsx";
import { RadioGroup, RadioGroupItem } from "#components/ui/radio-group.tsx";
import { Switch } from "#components/ui/switch.tsx";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import { useState } from "react";

import { RichTextEditor } from "../components/rich-text-editor";
import { ManageFieldEditSheet } from "./components/manage-field-edit-sheet";
import { ManageFieldsSheet } from "./components/manage-fields-sheet";
import { PostChatEditFieldSheet } from "./components/post-chat-edit-field-sheet";
import { PostChatFieldsTable } from "./components/post-chat-fields-table";
import { SimpleAddFieldSheet } from "./components/simple-add-field-sheet";
import { DEFAULT_FIELDS, DEFAULT_GREETING_MESSAGE } from "./data/post-chat-constants";
import type { PostChatField } from "./types/post-chat";

export function PostChats() {
  const [postChatEnabled, setPostChatEnabled] = useState(true);
  const [greetingMessage, setGreetingMessage] = useState(DEFAULT_GREETING_MESSAGE);

  const [fields, setFields] = useState<PostChatField[]>(DEFAULT_FIELDS);

  // Modal states
  const [isAddFieldModalOpen, setIsAddFieldModalOpen] = useState(false);
  const [editingField, setEditingField] = useState<PostChatField | null>(null);
  const [isFieldLayoutOpen, setIsFieldLayoutOpen] = useState(false);
  const [fieldLabelPosition, setFieldLabelPosition] = useState<"above" | "left">("above");
  const [isManageFieldsOpen, setIsManageFieldsOpen] = useState(false);
  const [editingManageField, setEditingManageField] = useState<any>(null);

  const handleFieldUpdate = (fieldId: string, updates: Partial<PostChatField>) => {
    setFields(fields.map((f) => (f.id === fieldId ? { ...f, ...updates } : f)));
  };

  const handleFieldDelete = (fieldId: string) => {
    setFields(fields.filter((f) => f.id !== fieldId));
  };

  const handleFieldEdit = (field: PostChatField) => {
    setEditingField(field);
  };

  const handleFieldSave = (updatedField: PostChatField) => {
    setFields(fields.map((f) => (f.id === updatedField.id ? updatedField : f)));
    setEditingField(null);
  };

  const handleAddField = (
    fieldName: string,
    displayName: string,
    visible: boolean,
    required: boolean,
  ) => {
    const newField: PostChatField = {
      id: Date.now().toString(),
      name: fieldName,
      displayName: displayName,
      type: "text", // default type
      visible: visible,
      required: required,
    };
    setFields([...fields, newField]);
    setIsAddFieldModalOpen(false);
  };

  const handleManageFields = () => {
    setIsAddFieldModalOpen(false); // Mevcut sheet'i kapat
    setIsManageFieldsOpen(true); // Manage fields sheet'ini aç
  };

  const handleEditManageField = (field: any) => {
    setEditingManageField(field);
  };

  const handleSaveManageField = (fieldId: string, updates: any) => {
    // Bu dummy bir güncelleme - gerçek uygulamada API'ye gönderilecek
    console.log("Field updated:", fieldId, updates);
    setEditingManageField(null);
  };

  return (
    <div className="space-y-6">
      {/* Post-chat Toggle */}
      <div className="flex items-center space-x-3">
        <Label className="text-sm font-medium">Post-chat</Label>
        <div className="flex items-center space-x-2">
          <Switch
            checked={postChatEnabled}
            onCheckedChange={setPostChatEnabled}
            className="data-[state=checked]:bg-green-500"
          />
          <span className="text-sm font-medium text-green-600">ON</span>
        </div>
      </div>
      {/* Greeting Message */}
      <Card>
        <CardHeader>
          <CardTitle>Başlangıç Mesajı</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <RichTextEditor
              value={greetingMessage}
              onChange={setGreetingMessage}
              placeholder="Karşılama mesajınızı yazın..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Fields */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Fields</CardTitle>
            <Button
              onClick={() => setIsAddFieldModalOpen(true)}
              className="flex items-center gap-2"
              size="sm"
            >
              <Plus className="w-4 h-4" />
              Add a field
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <PostChatFieldsTable
            fields={fields}
            onFieldUpdate={handleFieldUpdate}
            onFieldDelete={handleFieldDelete}
            onFieldEdit={handleFieldEdit}
          />

          {/* Field Layout Accordion */}
          <div className="mt-4 border rounded-lg">
            <Collapsible open={isFieldLayoutOpen} onOpenChange={setIsFieldLayoutOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">Field Layout</span>
                  <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-xs text-gray-600">?</span>
                  </div>
                </div>
                {isFieldLayoutOpen ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
              </CollapsibleTrigger>

              <CollapsibleContent className="px-4 pb-4">
                <RadioGroup
                  value={fieldLabelPosition}
                  onValueChange={(value) => setFieldLabelPosition(value as "above" | "left")}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="left" id="left" />
                    <Label htmlFor="left" className="text-sm">
                      Place text label on the left of the input
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="above" id="above" />
                    <Label htmlFor="above" className="text-sm">
                      Place text label above the input
                    </Label>
                  </div>
                </RadioGroup>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </CardContent>
      </Card>

      <SimpleAddFieldSheet
        isOpen={isAddFieldModalOpen}
        onClose={() => setIsAddFieldModalOpen(false)}
        onAdd={handleAddField}
        onManageFields={handleManageFields}
      />

      <PostChatEditFieldSheet
        field={editingField}
        isOpen={!!editingField}
        onClose={() => setEditingField(null)}
        onSave={handleFieldSave}
      />

      <ManageFieldsSheet
        isOpen={isManageFieldsOpen}
        onClose={() => setIsManageFieldsOpen(false)}
        onEditField={handleEditManageField}
      />

      <ManageFieldEditSheet
        field={editingManageField}
        isOpen={!!editingManageField}
        onClose={() => setEditingManageField(null)}
        onSave={handleSaveManageField}
      />
    </div>
  );
}
