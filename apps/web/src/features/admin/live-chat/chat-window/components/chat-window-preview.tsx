import { ChatWindowPreviewProps, Message } from "../types/chat-window";

// Wave Background Component
function WaveBackground({
  variant,
  customColor,
  className = "",
}: {
  variant?: "purple" | "blue" | "pink" | "green" | "orange";
  customColor?: string;
  className?: string;
}) {
  const getWaveColors = (variant: string, customColor?: string) => {
    if (customColor) {
      // Convert custom color to different shades for gradients
      const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
          ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
            }
          : { r: 139, g: 92, b: 246 };
      };

      const rgb = hexToRgb(customColor);
      const stop1 = customColor;
      const stop2 = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8)`;
      const stop3 = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.6)`;
      const stop4 = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)`;

      return { stop1, stop2, stop3, stop4 };
    }

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

  const colors = getWaveColors(variant || "purple", customColor);
  const gradientId = customColor ? "custom" : variant || "purple";

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id={`gradient1-${gradientId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.stop1} stopOpacity="0.8" />
            <stop offset="50%" stopColor={colors.stop2} stopOpacity="0.6" />
            <stop offset="100%" stopColor={colors.stop3} stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id={`gradient2-${gradientId}`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colors.stop2} stopOpacity="0.7" />
            <stop offset="50%" stopColor={colors.stop3} stopOpacity="0.5" />
            <stop offset="100%" stopColor={colors.stop4} stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id={`gradient3-${gradientId}`} x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor={colors.stop1} stopOpacity="0.6" />
            <stop offset="100%" stopColor={colors.stop4} stopOpacity="0.2" />
          </linearGradient>
        </defs>

        <path
          d="M0,100 C80,120 120,80 200,100 C280,120 320,80 400,100 L400,300 L0,300 Z"
          fill={`url(#gradient1-${gradientId})`}
          className="animate-wave-slow"
        />
        <path
          d="M0,150 C100,130 150,170 250,150 C350,130 380,170 400,150 L400,300 L0,300 Z"
          fill={`url(#gradient2-${gradientId})`}
          className="animate-wave-medium"
        />
        <path
          d="M0,200 C120,180 180,220 300,200 C360,190 380,210 400,200 L400,300 L0,300 Z"
          fill={`url(#gradient3-${gradientId})`}
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

export function ChatWindowPreview({
  selectedStyle,
  color,
  selectedBackground,
  chatType,
  agentAvatar,
  agentTitle,
  customBackgroundColor,
  selectedView,
  displayAgentAvatar,
}: ChatWindowPreviewProps) {
  // Different welcome messages - more unique content
  const _welcomeMessages = [
    "Merhaba! Yatırım konusunda size nasıl yardımcı olabilirim?",
    "Bugün hangi finansal araç hakkında bilgi almak istiyorsunuz?",
    "Portföyünüz için en uygun yatırım önerilerini hazırlamaya başlayalım! 📈",
  ];

  // Initialize messages with different content
  const messages: Message[] = [
    {
      id: "1",
      content: "Ai hizmetimize hoş geldiniz! Size nasıl yardımcı olabilirim?",
      timestamp: "14:30",
      isBot: true,
    },
    {
      id: "2",
      content: "Merhaba, BIST 100 endeksine yatırım yapmak istiyorum. Hangi hisseler önerirsiniz?",
      timestamp: "14:31",
      isBot: false,
    },
    {
      id: "3",
      content:
        "Mükemmel bir tercih! BIST 100'de yer alan bankacılık ve teknoloji hisseleri son dönemde güçlü performans gösteriyor. Size özel bir analiz hazırlayabilirim.",
      timestamp: "14:31",
      isBot: true,
    },
    {
      id: "4",
      content: "Harika! Özellikle teknoloji hisseleri ile ilgileniyorum. TOASO ve ASELS nasıl?",
      timestamp: "14:32",
      isBot: false,
    },
    {
      id: "5",
      content:
        "TOASO ve ASELS gerçekten de güzel seçimler. Her iki hisse de güçlü fundamentallere sahip. Detaylı teknik analiz raporunu e-postanıza gönderebilirim.",
      timestamp: "14:33",
      isBot: true,
    },
  ];

  const agent = {
    avatar: "👨‍💼",
    title: "Ai Danışmanı",
  };

  const renderChatWindow = (isMobile = false) => {
    return (
      <div className="w-full h-full rounded-lg shadow-2xl overflow-hidden flex flex-col bg-white/95 backdrop-blur-sm">
        {/* Header */}
        <div
          className="text-white p-4 flex items-center justify-between flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${customBackgroundColor} 0%, ${customBackgroundColor}dd 100%)`,
          }}
        >
          <div className="flex items-center gap-3">
            {agentAvatar && (
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-lg">
                {agent.avatar}
              </div>
            )}
            {agentTitle && <span className="font-medium">{agent.title}</span>}
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

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
          {messages.map((message) => (
            <div key={message.id}>
              {displayAgentAvatar ? (
                // Instagram style - No avatars, messages aligned left/right
                <div className={`flex ${message.isBot ? "justify-start" : "justify-end"} mb-2`}>
                  <div
                    className={`max-w-[70%] p-3 rounded-2xl text-sm whitespace-pre-line ${
                      message.isBot
                        ? "bg-gray-100 text-gray-800 rounded-bl-md"
                        : "text-white rounded-br-md"
                    }`}
                    style={!message.isBot ? { backgroundColor: customBackgroundColor } : undefined}
                  >
                    {message.content}
                  </div>
                </div>
              ) : (
                // Original style - With avatars and titles
                <div className="flex items-start gap-3">
                  {agentAvatar && (
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                      {message.isBot ? agent.avatar : "👤"}
                    </div>
                  )}
                  <div className="flex-1">
                    {agentTitle && (
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          {message.isBot ? agent.title : "Ziyaretçi"}
                        </span>
                        <span className="text-xs text-gray-500">{message.timestamp}</span>
                      </div>
                    )}
                    <div
                      className={`p-3 rounded-lg text-sm whitespace-pre-line max-w-xs ${
                        message.isBot
                          ? "bg-blue-50 text-gray-800"
                          : "bg-gray-100 text-gray-800 ml-auto"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t bg-white flex-shrink-0">
          <div className="flex gap-2">
            <div className="flex-1 bg-gray-100 rounded-full px-4 py-2">
              <input
                type="text"
                placeholder="Mesajınızı yazın..."
                className="w-full bg-transparent text-sm outline-none"
                disabled
              />
            </div>
            <button
              className="p-2 rounded-full text-white shadow-md flex-shrink-0"
              style={{ backgroundColor: customBackgroundColor }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Preview Container */}
      <div
        className={`relative rounded-2xl border overflow-hidden bg-gray-100/80 backdrop-blur-sm shadow-2xl ${
          selectedView === "desktop" ? "w-full h-[40rem]" : "w-96 h-[40rem] mx-auto"
        }`}
      >
        {/* Wave Background */}
        <WaveBackground customColor={customBackgroundColor} className="rounded-2xl" />

        <div className="absolute inset-8 w-[calc(100%-4rem)] h-[calc(100%-4rem)] relative z-10">
          {chatType === "embedded" ? (
            <div className="w-full h-full">{renderChatWindow(selectedView === "mobile")}</div>
          ) : (
            <div className="w-full h-full relative">
              {renderChatWindow(selectedView === "mobile")}
              {selectedView === "desktop" && (
                <div className="absolute -top-6 -right-2 text-gray-500 text-sm">Popup Chat</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
