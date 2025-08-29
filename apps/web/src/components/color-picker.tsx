import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "#components/ui/button.tsx";
import { Input } from "#components/ui/input.tsx";
import { Label } from "#components/ui/label.tsx";
import { Popover, PopoverContent, PopoverTrigger } from "#components/ui/popover.tsx";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
}

interface HSV {
  h: number; // 0-360
  s: number; // 0-100
  v: number; // 0-100
}

// HSV to RGB conversion
const hsvToRgb = (h: number, s: number, v: number): [number, number, number] => {
  h = h / 360;
  s = s / 100;
  v = v / 100;

  const c = v * s;
  const x = c * (1 - Math.abs(((h * 6) % 2) - 1));
  const m = v - c;

  let r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 1 / 6) {
    r = c;
    g = x;
    b = 0;
  } else if (1 / 6 <= h && h < 2 / 6) {
    r = x;
    g = c;
    b = 0;
  } else if (2 / 6 <= h && h < 3 / 6) {
    r = 0;
    g = c;
    b = x;
  } else if (3 / 6 <= h && h < 4 / 6) {
    r = 0;
    g = x;
    b = c;
  } else if (4 / 6 <= h && h < 5 / 6) {
    r = x;
    g = 0;
    b = c;
  } else if (5 / 6 <= h && h < 1) {
    r = c;
    g = 0;
    b = x;
  }

  return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
};

// RGB to Hex conversion
const rgbToHex = (r: number, g: number, b: number): string => {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
};

// Hex to HSV conversion
const hexToHsv = (hex: string): HSV => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;

  let h = 0;
  if (diff !== 0) {
    if (max === r) {
      h = 60 * (((g - b) / diff) % 6);
    } else if (max === g) {
      h = 60 * ((b - r) / diff + 2);
    } else {
      h = 60 * ((r - g) / diff + 4);
    }
  }
  if (h < 0) h += 360;

  const s = max === 0 ? 0 : (diff / max) * 100;
  const v = max * 100;

  return { h, s, v };
};

export function ColorPicker({ value, onChange, label = "Color" }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hsv, setHsv] = useState<HSV>(() => hexToHsv(value));
  const [isDraggingArea, setIsDraggingArea] = useState(false);
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);

  const colorAreaRef = useRef<HTMLDivElement>(null);
  const hueSliderRef = useRef<HTMLDivElement>(null);

  const updateColorFromHSV = useCallback(
    (newHsv: HSV) => {
      const [r, g, b] = hsvToRgb(newHsv.h, newHsv.s, newHsv.v);
      const hex = rgbToHex(r, g, b);
      onChange(hex);
      setHsv(newHsv);
    },
    [onChange],
  );

  const handleColorAreaMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDraggingArea(true);
    handleColorAreaMove(e);
  }, []);

  const handleColorAreaMove = useCallback(
    (e: React.MouseEvent) => {
      if (!colorAreaRef.current) return;

      const rect = colorAreaRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));

      const s = (x / rect.width) * 100;
      const v = 100 - (y / rect.height) * 100;

      updateColorFromHSV({ ...hsv, s, v });
    },
    [hsv, updateColorFromHSV],
  );

  const handleHueSliderMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDraggingSlider(true);
    handleHueSliderMove(e);
  }, []);

  const handleHueSliderMove = useCallback(
    (e: React.MouseEvent) => {
      if (!hueSliderRef.current) return;

      const rect = hueSliderRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const h = (x / rect.width) * 360;

      updateColorFromHSV({ ...hsv, h });
    },
    [hsv, updateColorFromHSV],
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingArea) {
        handleColorAreaMove(e as unknown as React.MouseEvent);
      } else if (isDraggingSlider) {
        handleHueSliderMove(e as unknown as React.MouseEvent);
      }
    };

    const handleMouseUp = () => {
      setIsDraggingArea(false);
      setIsDraggingSlider(false);
    };

    if (isDraggingArea || isDraggingSlider) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDraggingArea, isDraggingSlider, handleColorAreaMove, handleHueSliderMove]);

  // Update HSV when value changes externally
  useEffect(() => {
    setHsv(hexToHsv(value));
  }, [value]);

  const handleInputChange = (newValue: string) => {
    if (newValue.match(/^#[0-9A-Fa-f]{6}$/)) {
      onChange(newValue);
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="flex items-center space-x-3">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-12 h-12 p-0 border-2 rounded-lg"
              style={{ backgroundColor: value }}
            >
              <span className="sr-only">Pick a color</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-4">
            <div className="space-y-4">
              {/* Color Area */}
              <div
                ref={colorAreaRef}
                className="relative w-full h-48 rounded-lg cursor-crosshair"
                style={{
                  background: `linear-gradient(to right, white, hsl(${hsv.h}, 100%, 50%)), linear-gradient(to top, black, transparent)`,
                }}
                onMouseDown={handleColorAreaMouseDown}
              >
                {/* Color Picker Indicator */}
                <div
                  className="absolute w-4 h-4 border-2 border-white rounded-full shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${hsv.s}%`,
                    top: `${100 - hsv.v}%`,
                    boxShadow: "0 0 0 1px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(0,0,0,0.3)",
                  }}
                />
              </div>

              {/* Hue Slider */}
              <div
                ref={hueSliderRef}
                className="relative w-full h-4 rounded-lg cursor-pointer"
                style={{
                  background:
                    "linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)",
                }}
                onMouseDown={handleHueSliderMouseDown}
              >
                {/* Hue Indicator */}
                <div
                  className="absolute w-4 h-6 border-2 border-white rounded shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-1"
                  style={{
                    left: `${(hsv.h / 360) * 100}%`,
                    backgroundColor: `hsl(${hsv.h}, 100%, 50%)`,
                    boxShadow: "0 0 0 1px rgba(0,0,0,0.3)",
                  }}
                />
              </div>

              {/* Color Preview and Hex Input */}
              <div className="flex items-center space-x-3">
                <div
                  className="w-12 h-12 rounded-lg border-2 border-gray-200"
                  style={{ backgroundColor: value }}
                />
                <div className="flex-1">
                  <Input
                    value={value}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder="#e20093"
                    className="font-mono text-sm"
                  />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <div className="flex-1">
          <Input
            value={value}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="#e20093"
            className="font-mono"
          />
        </div>
      </div>
    </div>
  );
}
