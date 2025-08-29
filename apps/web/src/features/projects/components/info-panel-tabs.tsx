import {
  IconDotsVertical,
  IconHistory,
  IconInfoCircle,
  IconNavigation,
  IconPackage,
  IconQuestionMark,
  IconUser,
} from "@tabler/icons-react";
import { Button } from "#/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";
import { TabsList, TabsTrigger } from "#/components/ui/tabs";
import { UI_TEXTS } from "../data/constants";

interface InfoPanelTabsProps {
  activeTab: string;
  onTabChange?: (tab: string) => void;
}

export function InfoPanelTabs({ activeTab, onTabChange }: InfoPanelTabsProps) {
  return (
    <div className="flex items-center justify-between m-2">
      <TabsList className="grid w-full grid-cols-3 gap-1 bg-gray-50/50 dark:bg-gray-800/50 p-1 rounded-lg">
        <TabsTrigger
          value="info"
          className="flex items-center gap-2 text-sm px-3 py-2 bg-white/50 hover:bg-white/80 data-[state=active]:bg-white data-[state=active]:shadow-sm dark:bg-gray-700/50 dark:hover:bg-gray-700/80 dark:data-[state=active]:bg-blue-9500 border-0 rounded-md transition-all duration-200 text-gray-600 data-[state=active]:text-gray-900 dark:text-gray-300 dark:data-[state=active]:text-white font-medium"
        >
          <IconInfoCircle className="h-4 w-4" />
          {activeTab === "info" && <span>{UI_TEXTS.infoTab}</span>}
        </TabsTrigger>
        <TabsTrigger
          value="contact"
          className="flex items-center gap-2 text-sm px-3 py-2 bg-white/50 hover:bg-white/80 data-[state=active]:bg-white data-[state=active]:shadow-sm dark:bg-gray-700/50 dark:hover:bg-gray-700/80 dark:data-[state=active]:bg-blue-600 border-0 rounded-md transition-all duration-200 text-gray-600 data-[state=active]:text-gray-900 dark:text-gray-300 dark:data-[state=active]:text-white font-medium"
        >
          <IconUser className="h-4 w-4" />
          {activeTab === "contact" && <span>{UI_TEXTS.contactTab}</span>}
        </TabsTrigger>
        <TabsTrigger
          value="help"
          className="flex items-center gap-2 text-sm px-3 py-2 bg-white/50 hover:bg-white/80 data-[state=active]:bg-white data-[state=active]:shadow-sm dark:bg-gray-700/50 dark:hover:bg-gray-700/80 dark:data-[state=active]:bg-blue-600 border-0 rounded-md transition-all duration-200 text-gray-600 data-[state=active]:text-gray-900 dark:text-gray-300 dark:data-[state=active]:text-white font-medium"
        >
          <IconQuestionMark className="h-4 w-4" />
          {activeTab === "help" && <span>{UI_TEXTS.helpTab}</span>}
        </TabsTrigger>
      </TabsList>

      {/* Vertical Dots Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost" className="h-8 w-8 ml-2" title="More Options">
            <IconDotsVertical className="h-4 w-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-40 z-50"
          side="bottom"
          sideOffset={4}
          avoidCollisions={true}
        >
          <DropdownMenuItem
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onTabChange?.("history")}
          >
            <IconHistory className="h-4 w-4" />
            <span>{UI_TEXTS.historyOption}</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
            <IconPackage className="h-4 w-4" />
            <span>{UI_TEXTS.wrapUpOption}</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
            <IconNavigation className="h-4 w-4" />
            <span>{UI_TEXTS.navigationOption}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
