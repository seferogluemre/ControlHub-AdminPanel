import { Input } from "#components/ui/input.tsx";
import { Label } from "#components/ui/label.tsx";
import { RadioGroup, RadioGroupItem } from "#components/ui/radio-group.tsx";
import { STYLE_OPTIONS } from "../data/chat-window-constants";

interface StyleSelectorProps {
  selectedStyle: string;
  onStyleChange: (style: string) => void;
  color: string;
  onColorChange: (color: string) => void;
}

export function StyleSelector({
  selectedStyle,
  onStyleChange,
  color,
  onColorChange,
}: StyleSelectorProps) {
  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium">Style</Label>
      <RadioGroup value={selectedStyle} onValueChange={onStyleChange} className="flex space-x-4">
        {STYLE_OPTIONS.map((style) => (
          <div key={style.id} className="flex flex-col items-center space-y-2">
            <Label htmlFor={style.id} className="cursor-pointer">
              <div
                className={`w-20 h-24 bg-white rounded border-2 ${selectedStyle === style.id ? "border-blue-500" : "border-gray-200"} p-2 relative overflow-hidden`}
              >
                {/* Style 1 - Classic */}
                {style.id === "style1" && (
                  <div className="w-full h-full">
                    <div className="h-6 bg-slate-600 rounded-t flex items-center px-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div className="h-16 bg-gray-50 rounded-b p-1">
                      <div className="space-y-1">
                        <div className="h-2 bg-gray-300 rounded w-full"></div>
                        <div className="h-2 bg-blue-200 rounded w-3/4 ml-auto"></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Style 2 - Modern */}
                {style.id === "style2" && (
                  <div className="w-full h-full border-2 border-blue-400 rounded relative">
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="h-full bg-blue-50 rounded p-1 pt-3">
                      <div className="space-y-1">
                        <div className="h-2 bg-gray-300 rounded w-full"></div>
                        <div className="h-2 bg-blue-300 rounded w-2/3 ml-auto"></div>
                      </div>
                    </div>
                    {selectedStyle === style.id && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-bl-lg flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Style 3 - Bubble */}
                {style.id === "style3" && (
                  <div className="w-full h-full border-2 border-dashed border-gray-400 rounded p-1">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        <div className="h-2 bg-gray-300 rounded w-2/3"></div>
                      </div>
                      <div className="flex items-center justify-end space-x-1">
                        <div className="h-2 bg-gray-400 rounded w-1/2"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Label>
            <div className="flex items-center space-x-1">
              <RadioGroupItem value={style.id} id={style.id} className="w-3 h-3" />
              <Label htmlFor={style.id} className="text-xs cursor-pointer">
                {style.name}
              </Label>
            </div>
          </div>
        ))}
      </RadioGroup>

      {/* Color Selection */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Color</Label>
        <div className="flex items-center space-x-3">
          <span className="text-sm">#</span>
          <Input
            value={color.replace("#", "")}
            onChange={(e) => onColorChange("#" + e.target.value)}
            className="flex-1"
            maxLength={6}
          />
          <div
            className="w-8 h-8 rounded border border-gray-200"
            style={{ backgroundColor: color }}
          />
        </div>
      </div>
    </div>
  );
}
