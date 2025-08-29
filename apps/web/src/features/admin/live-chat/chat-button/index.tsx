import { ColorPicker } from "#components/color-picker.tsx";
import { Button } from "#components/ui/button.tsx";
import { Input } from "#components/ui/input.tsx";
import { Label } from "#components/ui/label.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "#components/ui/tabs.tsx";
import { Upload, X } from "lucide-react";
import { useRef, useState } from "react";

import {
  DEFAULT_COLOR,
  DEFAULT_DESKTOP_OFFSET_BOTTOM,
  DEFAULT_DESKTOP_OFFSET_RIGHT,
  DEFAULT_MOBILE_OFFSET_BOTTOM,
  DEFAULT_MOBILE_OFFSET_RIGHT,
} from "./data/chat-button-constants";

export function ChatButton() {
  const [activeTab, setActiveTab] = useState("adaptive");
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [desktopOffsetRight, setDesktopOffsetRight] = useState(DEFAULT_DESKTOP_OFFSET_RIGHT);
  const [desktopOffsetLeft, setDesktopOffsetLeft] = useState("");
  const [desktopOffsetBottom, setDesktopOffsetBottom] = useState(DEFAULT_DESKTOP_OFFSET_BOTTOM);
  const [desktopUseLeft, setDesktopUseLeft] = useState(false);
  const [mobileOffsetRight, setMobileOffsetRight] = useState(DEFAULT_MOBILE_OFFSET_RIGHT);
  const [mobileOffsetLeft, setMobileOffsetLeft] = useState("");
  const [mobileOffsetBottom, setMobileOffsetBottom] = useState(DEFAULT_MOBILE_OFFSET_BOTTOM);
  const [mobileUseLeft, setMobileUseLeft] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6">
      {/* Type Selection with Tabs */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Type</Label>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="adaptive" className="flex items-center gap-2">
              <span>📍</span>
              Adaptive
            </TabsTrigger>
            <TabsTrigger value="image" className="flex items-center gap-2">
              <span>🖼️</span>
              Image
            </TabsTrigger>
          </TabsList>

          <TabsContent value="adaptive" className="mt-4 space-y-4">
            <ColorPicker value={color} onChange={setColor} label="Color" />
          </TabsContent>

          <TabsContent value="image" className="mt-4 space-y-4">
            <div className="space-y-3">
              <Label className="text-sm font-medium">Custom Icon</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {uploadedImage ? (
                  <div className="space-y-3">
                    <div className="relative inline-block">
                      <img
                        src={uploadedImage}
                        alt="Uploaded icon"
                        className="w-16 h-16 rounded-full object-cover mx-auto"
                      />
                      <button
                        onClick={removeImage}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600">Click to change image</p>
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                      size="sm"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Change Image
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Upload an image</p>
                      <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
                    </div>
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                      size="sm"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Choose File
                    </Button>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Desktop View */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Desktop View</Label>
        <div className="space-y-4">
          {/* Horizontal Position */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label
                htmlFor="desktop-left"
                className={`text-sm ${desktopUseLeft ? "text-blue-600 font-medium" : "text-gray-400"}`}
              >
                Left offset {desktopUseLeft && "(aktif)"}
              </Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="desktop-left"
                  type="number"
                  value={desktopOffsetLeft}
                  onChange={(e) => {
                    setDesktopOffsetLeft(e.target.value);
                    setDesktopOffsetRight("");
                    setDesktopUseLeft(true);
                  }}
                  className={`flex-1 ${desktopUseLeft ? "border-blue-300 bg-blue-50" : "bg-gray-50"}`}
                  disabled={!desktopUseLeft && desktopOffsetRight !== ""}
                />
                <span className="text-xs text-gray-500">px</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="desktop-right"
                className={`text-sm ${!desktopUseLeft ? "text-blue-600 font-medium" : "text-gray-400"}`}
              >
                Right offset {!desktopUseLeft && "(aktif)"}
              </Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="desktop-right"
                  type="number"
                  value={desktopOffsetRight}
                  onChange={(e) => {
                    setDesktopOffsetRight(e.target.value);
                    setDesktopOffsetLeft("");
                    setDesktopUseLeft(false);
                  }}
                  className={`flex-1 ${!desktopUseLeft ? "border-blue-300 bg-blue-50" : "bg-gray-50"}`}
                  disabled={desktopUseLeft && desktopOffsetLeft !== ""}
                />
                <span className="text-xs text-gray-500">px</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="desktop-bottom" className="text-sm text-gray-600">
              Offset from bottom
            </Label>
            <div className="flex items-center space-x-2">
              <Input
                id="desktop-bottom"
                type="number"
                value={desktopOffsetBottom}
                onChange={(e) => setDesktopOffsetBottom(e.target.value)}
                className="flex-1"
              />
              <span className="text-sm text-gray-500">pixels</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Mobile View</Label>
        <div className="space-y-4">
          {/* Horizontal Position */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label
                htmlFor="mobile-left"
                className={`text-sm ${mobileUseLeft ? "text-blue-600 font-medium" : "text-gray-400"}`}
              >
                Left offset {mobileUseLeft && "(aktif)"}
              </Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="mobile-left"
                  type="number"
                  value={mobileOffsetLeft}
                  onChange={(e) => {
                    setMobileOffsetLeft(e.target.value);
                    setMobileOffsetRight("");
                    setMobileUseLeft(true);
                  }}
                  className={`flex-1 ${mobileUseLeft ? "border-blue-300 bg-blue-50" : "bg-gray-50"}`}
                  disabled={!mobileUseLeft && mobileOffsetRight !== ""}
                />
                <span className="text-xs text-gray-500">px</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="mobile-right"
                className={`text-sm ${!mobileUseLeft ? "text-blue-600 font-medium" : "text-gray-400"}`}
              >
                Right offset {!mobileUseLeft && "(aktif)"}
              </Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="mobile-right"
                  type="number"
                  value={mobileOffsetRight}
                  onChange={(e) => {
                    setMobileOffsetRight(e.target.value);
                    setMobileOffsetLeft("");
                    setMobileUseLeft(false);
                  }}
                  className={`flex-1 ${!mobileUseLeft ? "border-blue-300 bg-blue-50" : "bg-gray-50"}`}
                  disabled={mobileUseLeft && mobileOffsetLeft !== ""}
                />
                <span className="text-xs text-gray-500">px</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mobile-bottom" className="text-sm text-gray-600">
              Offset from bottom
            </Label>
            <div className="flex items-center space-x-2">
              <Input
                id="mobile-bottom"
                type="number"
                value={mobileOffsetBottom}
                onChange={(e) => setMobileOffsetBottom(e.target.value)}
                className="flex-1"
              />
              <span className="text-sm text-gray-500">pixels</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
