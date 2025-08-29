import { Button } from "#components/ui/button.tsx";
import { Input } from "#components/ui/input.tsx";

interface PreChatPreviewProps {
  preChatType: "form" | "taskbot";
  teamName: string;
  displayTeamName: boolean;
  displayAgentAvatars: boolean;
  greetingMessage: string;

  enableInputArea: boolean;
  selectedView: "desktop" | "mobile";
}

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

export function PreChatPreview({
  preChatType,
  teamName,
  displayTeamName,
  displayAgentAvatars,
  greetingMessage,

  enableInputArea,
  selectedView,
}: PreChatPreviewProps) {
  const renderChatCard = () => {
    return (
      <div className="w-full h-full rounded-lg shadow-2xl overflow-hidden flex flex-col bg-white/95 backdrop-blur-sm">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            {displayAgentAvatars && (
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-lg">
                👨‍💼
              </div>
            )}
            {displayTeamName && <span className="font-medium">{teamName}</span>}
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
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {preChatType === "form" ? (
            <>
              {/* Welcome Message */}
              <div className="bg-blue-50 text-gray-800 p-3 rounded-lg text-sm">
                <div className="font-semibold mb-2">Ai Hizmetimize Hoş Geldiniz!</div>
                <div className="text-xs space-y-1">
                  <p>
                    • Size en uygun yatırım stratejisini hazırlayabilmemiz için lütfen aşağıdaki
                    bilgileri doldurun
                  </p>
                  <p>• Uzman portföy yöneticilerimiz en kısa sürede sizinle iletişime geçecek</p>
                  <p>• Tüm yatırım sorularınız için buradayız</p>
                </div>
              </div>
            </>
          ) : (
            /* Task Bot Preview */
            <div className="space-y-4">
              {/* Bot Message */}
              <div className="flex items-start gap-3">
                {displayAgentAvatars && (
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                    🤖
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-gray-700">Ai Bot</span>
                    <span className="text-xs text-gray-500">16:22</span>
                  </div>
                  <div className="bg-blue-50 text-gray-800 p-3 rounded-lg text-sm">
                    Merhaba! Yatırım konusunda size nasıl yardımcı olabilirim? Lütfen aşağıdaki
                    seçeneklerden birini seçin.
                  </div>
                </div>
              </div>

              {/* Bot Options */}
              <div className={`space-y-2 ${displayAgentAvatars ? "ml-11" : ""}`}>
                <button className="w-full text-left p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm">
                  📈 Hisse Senedi Analizi
                </button>
                <button className="w-full text-left p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm">
                  💰 Portföy Yönetimi
                </button>
                <button className="w-full text-left p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm">
                  📊 Piyasa Araştırması
                </button>
              </div>

              {/* Input Area */}
              {enableInputArea && (
                <div className="border-t pt-3">
                  <div className="flex items-center gap-2">
                    <Input
                      className="h-9 text-sm flex-1"
                      placeholder="Yatırım sorularınızı yazın..."
                    />
                    <Button size="sm" className="h-9 px-3 bg-blue-600 hover:bg-blue-700">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                      </svg>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom Button */}
        {preChatType === "form" && (
          <div className="p-4 border-t bg-white flex-shrink-0">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded-lg">
              Ai'yı Başlat
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Preview Container */}
      <div
        className={`relative rounded-2xl border overflow-hidden bg-gray-100/80 backdrop-blur-sm shadow-2xl ${
          selectedView === "desktop" ? "w-full h-[32rem]" : "w-80 h-[32rem] mx-auto"
        }`}
      >
        {/* Wave Background */}
        <WaveBackground variant="blue" className="rounded-2xl" />

        <div className="absolute inset-6 w-[calc(100%-3rem)] h-[calc(100%-3rem)] relative z-10">
          {renderChatCard()}
        </div>
      </div>
    </div>
  );
}
