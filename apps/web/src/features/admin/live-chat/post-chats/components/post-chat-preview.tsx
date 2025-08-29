import { Monitor, Smartphone, Star } from "lucide-react";
import { useState } from "react";
import { Button } from "#components/ui/button.tsx";
import { Textarea } from "#components/ui/textarea.tsx";
import type { PostChatField } from "../types/post-chat";

interface PostChatPreviewProps {
  greetingMessage: string;
  fields: PostChatField[];
  submitButtonText: string;
  customBackgroundColor: string;
  fieldLabelPosition: "left" | "above";
}

// Wave Background Component
function WaveBackground({
  variant,
  className = "",
}: {
  variant: "purple" | "blue" | "pink" | "green" | "orange";
  className?: string;
}) {
  const getWaveColors = (variant: string) => {
    switch (variant) {
      case "purple":
        return { stop1: "#8B5CF6", stop2: "#A855F7", stop3: "#C084FC", stop4: "#DDD6FE" };
      case "blue":
        return { stop1: "#3B82F6", stop2: "#06B6D4", stop3: "#67E8F9", stop4: "#DBEAFE" };
      case "pink":
        return { stop1: "#EC4899", stop2: "#F472B6", stop3: "#FBCFE8", stop4: "#FCE7F3" };
      case "green":
        return { stop1: "#10B981", stop2: "#34D399", stop3: "#86EFAC", stop4: "#D1FAE5" };
      case "orange":
        return { stop1: "#F97316", stop2: "#FB923C", stop3: "#FED7AA", stop4: "#FEF3E2" };
      default:
        return { stop1: "#8B5CF6", stop2: "#A855F7", stop3: "#C084FC", stop4: "#DDD6FE" };
    }
  };

  const colors = getWaveColors(variant);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id={`gradient1-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.stop1} stopOpacity="0.8" />
            <stop offset="50%" stopColor={colors.stop2} stopOpacity="0.6" />
            <stop offset="100%" stopColor={colors.stop3} stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id={`gradient2-${variant}`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colors.stop2} stopOpacity="0.7" />
            <stop offset="50%" stopColor={colors.stop3} stopOpacity="0.5" />
            <stop offset="100%" stopColor={colors.stop4} stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id={`gradient3-${variant}`} x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor={colors.stop1} stopOpacity="0.6" />
            <stop offset="100%" stopColor={colors.stop4} stopOpacity="0.2" />
          </linearGradient>
        </defs>

        <path
          d="M0,100 C80,120 120,80 200,100 C280,120 320,80 400,100 L400,300 L0,300 Z"
          fill={`url(#gradient1-${variant})`}
          className="animate-wave-slow"
        />
        <path
          d="M0,150 C100,130 150,170 250,150 C350,130 380,170 400,150 L400,300 L0,300 Z"
          fill={`url(#gradient2-${variant})`}
          className="animate-wave-medium"
        />
        <path
          d="M0,200 C120,180 180,220 300,200 C360,190 380,210 400,200 L400,300 L0,300 Z"
          fill={`url(#gradient3-${variant})`}
          className="animate-wave-fast"
        />

        <circle
          cx="80"
          cy="80"
          r="20"
          fill={colors.stop3}
          opacity="0.3"
          className="animate-float-1"
        />
        <circle
          cx="320"
          cy="120"
          r="15"
          fill={colors.stop2}
          opacity="0.4"
          className="animate-float-2"
        />
        <circle
          cx="200"
          cy="60"
          r="25"
          fill={colors.stop4}
          opacity="0.2"
          className="animate-float-3"
        />
      </svg>
    </div>
  );
}

export function PostChatPreview({
  greetingMessage,
  fields,
  submitButtonText,
  customBackgroundColor,
  fieldLabelPosition,
}: PostChatPreviewProps) {
  const [selectedView, setSelectedView] = useState<"desktop" | "mobile">("desktop");
  const visibleFields = fields.filter((field) => field.visible);

  const renderField = (field: PostChatField) => {
    const labelElement = (
      <label className="text-sm font-medium text-gray-700">
        {field.displayName}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
    );

    const getInputElement = () => {
      switch (field.type) {
        case "rating":
          return (
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="w-6 h-6 text-gray-300 hover:text-yellow-400 cursor-pointer transition-colors"
                  fill="none"
                />
              ))}
            </div>
          );

        case "textarea":
          return (
            <Textarea
              placeholder={field.placeholder || `${field.displayName}...`}
              rows={field.rows || 3}
              className="resize-none"
              disabled
            />
          );

        case "text":
        case "email":
        case "phone":
          return (
            <input
              type={field.type === "email" ? "email" : field.type === "phone" ? "tel" : "text"}
              placeholder={field.placeholder || `${field.displayName}...`}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled
            />
          );

        case "select":
          return (
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled
            >
              <option>Seçiniz...</option>
              {field.options?.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          );

        default:
          return null;
      }
    };

    // Checkbox field has special layout
    if (field.type === "checkbox") {
      return (
        <div key={field.id} className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            disabled
          />
          <label className="text-sm font-medium text-gray-700">
            {field.displayName}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        </div>
      );
    }

    // Dynamic layout based on fieldLabelPosition
    if (fieldLabelPosition === "left") {
      return (
        <div key={field.id} className="flex items-center gap-3">
          <div className="w-1/3 flex-shrink-0">{labelElement}</div>
          <div className="flex-1">{getInputElement()}</div>
        </div>
      );
    } else {
      return (
        <div key={field.id} className="space-y-2">
          {labelElement}
          {getInputElement()}
        </div>
      );
    }
  };

  const renderChatWindow = (isMobile = false) => {
    const containerClass = isMobile
      ? "w-full h-full rounded-lg shadow-2xl overflow-hidden flex flex-col"
      : "w-full h-full rounded-lg shadow-2xl overflow-hidden flex flex-col";

    return (
      <div className="relative z-10">
        <div className={`${containerClass} bg-white/95 backdrop-blur-sm`}>
          {/* Header */}
          <div
            className="text-white p-4 flex items-center justify-between flex-shrink-0"
            style={{
              background: `linear-gradient(135deg, ${customBackgroundColor} 0%, ${customBackgroundColor}dd 100%)`,
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-lg">
                🤖
              </div>
              <span className="font-medium">Emrah</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="text-white hover:bg-white/20 p-1 rounded">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
              </button>
              <button className="text-white hover:bg-white/20 p-1 rounded">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.88c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
                </svg>
              </button>
              <button className="text-white hover:bg-white/20 p-1 rounded">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 10l5 5 5-5z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Chat ended message */}
          <div className="p-4 text-center border-b bg-gray-50 flex-shrink-0">
            <div className="text-sm text-gray-500">Ai görüşmesi tamamlandı. (16:22:50)</div>
          </div>

          {/* Messages and Form */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-4">
              {/* Greeting Message */}
              <div className="bg-blue-50 text-gray-800 p-3 rounded-lg text-sm">
                {greetingMessage}
              </div>

              {/* Fields */}
              <div className="space-y-4">{visibleFields.map(renderField)}</div>

              {/* Submit Button */}
              <Button
                className="w-full"
                style={{ backgroundColor: customBackgroundColor }}
                disabled
              >
                {submitButtonText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* View Toggle */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Preview</span>
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
          <Button
            variant={selectedView === "desktop" ? "default" : "ghost"}
            size="sm"
            onClick={() => setSelectedView("desktop")}
            className="h-8 px-3"
          >
            <Monitor className="w-4 h-4 mr-1" />
            Desktop
          </Button>
          <Button
            variant={selectedView === "mobile" ? "default" : "ghost"}
            size="sm"
            onClick={() => setSelectedView("mobile")}
            className="h-8 px-3"
          >
            <Smartphone className="w-4 h-4 mr-1" />
            Mobile
          </Button>
        </div>
      </div>

      {/* Preview Container */}
      <div
        className={`relative rounded-2xl border overflow-hidden bg-gray-100/80 backdrop-blur-sm shadow-2xl ${
          selectedView === "desktop" ? "w-full h-[40rem]" : "w-96 h-[40rem] mx-auto"
        }`}
      >
        {/* Wave Background */}
        <WaveBackground variant="blue" className="rounded-2xl" />

        <div className="absolute inset-8 w-[calc(100%-4rem)] h-[calc(100%-4rem)]">
          {renderChatWindow(selectedView === "mobile")}
        </div>
      </div>
    </div>
  );
}
