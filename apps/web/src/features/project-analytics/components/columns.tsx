import {
  IconBan,
  IconCircle,
  IconCircleFilled,
  IconInfoCircle,
  IconLogin,
  IconMessageCircle,
  IconPin,
  IconPinFilled,
  IconUser,
} from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "#/components/ui/tooltip";
import { ChatStatus, Visitor } from "../data/types";

// Action handlers
const handleGoToChat = (visitor: Visitor) => {
  if (visitor.chatId) {
    // Chat sayfasına yönlendirme
    window.location.href = `/chats?chatId=${visitor.chatId}`;
  } else {
    console.log("No chat available for visitor:", visitor.id);
  }
};

const handleJoin = (visitor: Visitor) => {
  if (visitor.chatId) {
    // Chat sayfasına yönlendirme ve join
    window.location.href = `/chats?chatId=${visitor.chatId}&action=join`;
  } else {
    console.log("No active chat to join for visitor:", visitor.id);
  }
};

const handleBan = (visitorId: string) => {
  console.log("Ban:", visitorId);
  // Ban işlemi
};

// Pin handler will be passed from parent component

const handleShowInfo = (visitor: Visitor, onSelectVisitor?: (visitor: Visitor) => void) => {
  if (onSelectVisitor) {
    onSelectVisitor(visitor);
  }
};

const handleInvite = (visitorId: string) => {
  console.log("Invite visitor to chat:", visitorId);
  // Invite işlemi
};

// Flag emoji helper
const getCountryFlag = (countryCode: string): string => {
  const flags: Record<string, string> = {
    TR: "🇹🇷",
    US: "🇺🇸",
    GB: "🇬🇧",
    DE: "🇩🇪",
    FR: "🇫🇷",
    ES: "🇪🇸",
    IT: "🇮🇹",
    JP: "🇯🇵",
    IN: "🇮🇳",
    EG: "🇪🇬",
  };
  return flags[countryCode] || "🏳️";
};

// Chat status helper
const getChatStatusInfo = (status: ChatStatus) => {
  switch (status) {
    case "chatting":
      return {
        color: "text-blue-500 bg-blue-100 dark:bg-blue-900",
        tooltip: "Sohbet Ediyor",
      };
    case "chat_ended":
      return {
        color: "text-gray-500 bg-gray-100 dark:bg-gray-800",
        tooltip: "Sohbet Bitti",
      };
    case "chatting_with_bot":
      return {
        color: "text-purple-500 bg-purple-100 dark:bg-purple-900",
        tooltip: "Bot ile Sohbet Ediyor",
      };
    case "no_chat":
      return {
        color: "text-gray-400 bg-gray-50 dark:bg-gray-900",
        tooltip: "Sohbet Yok",
      };
    default:
      return {
        color: "text-gray-400 bg-gray-50 dark:bg-gray-900",
        tooltip: "Bilinmeyen Durum",
      };
  }
};

// Profile Status Cell Component
const ProfileStatusCell = ({ visitor }: { visitor: Visitor }) => {
  const statusInfo = getChatStatusInfo(visitor.chatStatus);

  return (
    <div className="flex justify-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className={`p-2 rounded-full ${statusInfo.color} transition-colors`}>
              <IconUser className="h-4 w-4" />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{statusInfo.tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

// Visitor Info Cell Component
const VisitorInfoCell = ({
  visitor,
  onSortOnline,
  onSelectVisitor,
  isSelected,
  onTogglePin,
  isPinned,
}: {
  visitor: Visitor;
  onSortOnline?: () => void;
  onSelectVisitor?: (visitor: Visitor) => void;
  isSelected?: boolean;
  onTogglePin?: (visitorId: string) => void;
  isPinned?: boolean;
}) => {
  const handleVisitorClick = () => {
    if (onSelectVisitor) {
      onSelectVisitor(visitor);
    }
    if (onSortOnline) {
      onSortOnline();
    }
  };

  return (
    <div
      className={`flex items-center gap-3 p-2 rounded-md transition-colors cursor-pointer ${
        isSelected
          ? "bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800"
          : "hover:bg-muted/50"
      }`}
      onClick={handleVisitorClick}
    >
      <div className="flex flex-col flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm" title={visitor.country}>
            {getCountryFlag(visitor.countryCode)}
          </span>
          {visitor.isOnline ? (
            <IconCircleFilled className="h-3 w-3 text-green-500" />
          ) : (
            <IconCircle className="h-3 w-3 text-gray-400" />
          )}
          <span className="font-medium">{visitor.name}</span>
          <div className="flex items-center gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-5 w-5 p-0 hover:bg-muted"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShowInfo(visitor, onSelectVisitor);
                    }}
                  >
                    <IconInfoCircle className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-xs space-y-1">
                    <p>
                      <strong>IP:</strong> {visitor.ip}
                    </p>
                    <p>
                      <strong>Son Aktivite:</strong>{" "}
                      {new Date(visitor.lastActivity).toLocaleString("tr-TR")}
                    </p>
                    <p>
                      <strong>E-posta:</strong> {visitor.email || "N/A"}
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-5 w-5 p-0 hover:bg-muted"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onTogglePin) {
                        onTogglePin(visitor.id);
                      }
                    }}
                  >
                    {isPinned ? (
                      <IconPinFilled className="h-3 w-3 text-blue-500" />
                    ) : (
                      <IconPin className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {isPinned ? "Ziyaretçi sabitlemesini kaldır" : "Ziyaretçiyi üstte sabitle"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <span className="text-sm text-muted-foreground">{visitor.location}</span>
      </div>
    </div>
  );
};

// Actions Cell Component
const ActionsCell = ({ visitor }: { visitor: Visitor }) => {
  // Visitor'ın chat durumuna göre butonları belirle
  const hasChat = visitor.chats > 0;
  const hasActiveChat = visitor.hasActiveChat;

  return (
    <div className="flex items-center gap-1">
      {hasChat ? (
        // Chat geçmişi olan kullanıcılar için: Go to Chat + Join + Ban
        <>
          <Button
            size="sm"
            variant="outline"
            className="h-7 px-2 text-xs"
            onClick={(e) => {
              e.stopPropagation();
              handleGoToChat(visitor);
            }}
            disabled={!visitor.chatId}
          >
            <IconMessageCircle className="h-3 w-3 mr-1" />
            Sohbete Git
          </Button>
          {hasActiveChat && (
            <Button
              size="sm"
              variant="outline"
              className="h-7 px-2 text-xs"
              onClick={(e) => {
                e.stopPropagation();
                handleJoin(visitor);
              }}
            >
              <IconLogin className="h-3 w-3 mr-1" />
              Katıl
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            className="h-7 px-2 text-xs text-red-600 hover:text-red-700"
            onClick={(e) => {
              e.stopPropagation();
              handleBan(visitor.id);
            }}
          >
            <IconBan className="h-3 w-3 mr-1" />
            Yasakla
          </Button>
        </>
      ) : (
        // Chat geçmişi olmayan kullanıcılar için: Invite + Ban
        <>
          <Button
            size="sm"
            variant="outline"
            className="h-7 px-2 text-xs text-blue-600 hover:text-blue-700"
            onClick={(e) => {
              e.stopPropagation();
              handleInvite(visitor.id);
            }}
          >
            <IconMessageCircle className="h-3 w-3 mr-1" />
            Davet Et
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-7 px-2 text-xs text-red-600 hover:text-red-700"
            onClick={(e) => {
              e.stopPropagation();
              handleBan(visitor.id);
            }}
          >
            <IconBan className="h-3 w-3 mr-1" />
            Yasakla
          </Button>
        </>
      )}
    </div>
  );
};

// Truncated Text Component
const TruncatedText = ({
  text,
  maxWidth = "max-w-[200px]",
}: {
  text: string;
  maxWidth?: string;
}) => (
  <div className={maxWidth}>
    <span className="text-sm truncate block" title={text}>
      {text}
    </span>
  </div>
);

export const visitorColumns = (
  onSortOnline?: () => void,
  onSelectVisitor?: (visitor: Visitor) => void,
  selectedVisitorId?: string,
  onTogglePin?: (visitorId: string) => void,
  pinnedVisitors?: Set<string>,
): ColumnDef<Visitor>[] => [
  {
    id: "profileStatus",
    header: "Durum",
    cell: ({ row }) => <ProfileStatusCell visitor={row.original} />,
    size: 60,
    enableSorting: false,
  },
  {
    id: "visitorInfo",
    header: "Ziyaretçi Bilgisi",
    accessorFn: (row) => `${row.name} ${row.location} ${row.email || ""}`,
    filterFn: "includesString",
    cell: ({ row }) => (
      <VisitorInfoCell
        visitor={row.original}
        onSortOnline={onSortOnline}
        onSelectVisitor={onSelectVisitor}
        isSelected={selectedVisitorId === row.original.id}
        onTogglePin={onTogglePin}
        isPinned={pinnedVisitors?.has(row.original.id)}
      />
    ),
  },
  {
    id: "actions",
    header: "İşlemler",
    cell: ({ row }) => <ActionsCell visitor={row.original} />,
  },
  {
    id: "agents",
    header: "Temsilciler",
    cell: ({ row }) => {
      const { agent } = row.original;
      return agent ? (
        <Badge variant="secondary" className="text-xs">
          {agent}
        </Badge>
      ) : (
        <span className="text-muted-foreground text-sm">-</span>
      );
    },
  },
  {
    id: "currentPage",
    header: "Mevcut Sayfa",
    cell: ({ row }) => <TruncatedText text={row.original.currentPage} />,
  },
  {
    id: "referredFrom",
    header: "Gönderen",
    cell: ({ row }) => {
      const { referredFrom } = row.original;
      return referredFrom ? (
        <TruncatedText text={referredFrom} maxWidth="max-w-[150px]" />
      ) : (
        <span className="text-muted-foreground text-sm">-</span>
      );
    },
  },
  {
    id: "visits",
    header: "Ziyaretler",
    cell: ({ row }) => <span className="text-sm">{row.original.visits}</span>,
  },
  {
    id: "chats",
    header: "Sohbetler",
    cell: ({ row }) => <span className="text-sm">{row.original.chats}</span>,
  },
];
