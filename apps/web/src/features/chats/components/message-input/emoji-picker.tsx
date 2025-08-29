import { Smile } from "lucide-react";
import { useState } from "react";
import { Button } from "#/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "#/components/ui/popover";
import { ScrollArea } from "#/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "#/components/ui/tabs";
import { EMOJI_CATEGORIES } from "../../data/constants";

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
}

export function EmojiPicker({ onEmojiSelect }: EmojiPickerProps) {
  const [emojiOpen, setEmojiOpen] = useState(false);

  const handleEmojiSelect = (emoji: string) => {
    onEmojiSelect(emoji);
    setEmojiOpen(false);
  };

  return (
    <Popover open={emojiOpen} onOpenChange={setEmojiOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-gray-500 hover:text-gray-900 hover:bg-gray-200 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
        >
          <Smile className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        className="w-80 p-0 bg-blue-100 border-blue-300 shadow-xl"
        sideOffset={10}
      >
        <Tabs defaultValue="emojis" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-transparent gap-1 p-2">
            <TabsTrigger
              value="emojis"
              className="text-xs data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-md transition-all duration-200"
            >
              <span className="text-2xl filter drop-shadow-sm">😊</span>
            </TabsTrigger>
            <TabsTrigger
              value="flags"
              className="text-xs data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-md transition-all duration-200"
            >
              <span className="text-2xl filter drop-shadow-sm">🇹🇷</span>
            </TabsTrigger>
            <TabsTrigger
              value="animals"
              className="text-xs data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:shadow-md transition-all duration-200"
            >
              <span className="text-2xl filter drop-shadow-sm">🐶</span>
            </TabsTrigger>
            <TabsTrigger
              value="celebration"
              className="text-xs data-[state=active]:bg-white data-[state=active]:text-purple-600 data-[state=active]:shadow-md transition-all duration-200"
            >
              <span className="text-2xl filter drop-shadow-sm text-yellow-500">🎉</span>
            </TabsTrigger>
          </TabsList>

          <div className="h-52 bg-blue-50 rounded-lg m-1 border border-blue-200">
            <TabsContent value="emojis" className="mt-0">
              <ScrollArea className="h-52 p-3">
                <div className="grid grid-cols-8 gap-2">
                  {EMOJI_CATEGORIES.emojis.map((emoji, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      className="h-9 w-9 p-0 bg-blue-300/80 hover:bg-pink-100 hover:scale-110 transition-all duration-200 rounded-full border border-blue-200 shadow-sm"
                      onClick={() => handleEmojiSelect(emoji)}
                    >
                      <span className="text-lg filter drop-shadow-sm">{emoji}</span>
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="flags" className="mt-0">
              <ScrollArea className="h-52 p-3">
                <div className="grid grid-cols-8 gap-2">
                  {EMOJI_CATEGORIES.flags.map((emoji, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      className="h-9 w-9 p-0 bg-blue-300/80 hover:bg-blue-100 hover:scale-110 transition-all duration-200 rounded-full border border-blue-200 shadow-sm"
                      onClick={() => handleEmojiSelect(emoji)}
                    >
                      <span className="text-lg filter drop-shadow-sm">{emoji}</span>
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="animals" className="mt-0">
              <ScrollArea className="h-52 p-3">
                <div className="grid grid-cols-8 gap-2">
                  {EMOJI_CATEGORIES.animals.map((emoji, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      className="h-9 w-9 p-0 bg-blue-300/80 hover:bg-orange-100 hover:scale-110 transition-all duration-200 rounded-full border border-blue-200 shadow-sm"
                      onClick={() => handleEmojiSelect(emoji)}
                    >
                      <span className="text-lg filter drop-shadow-sm">{emoji}</span>
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="celebration" className="mt-0">
              <ScrollArea className="h-52 p-3">
                <div className="grid grid-cols-8 gap-2">
                  {EMOJI_CATEGORIES.celebration.map((emoji, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      className="h-9 w-9 p-0 bg-blue-300/80 hover:bg-purple-100 hover:scale-110 transition-all duration-200 rounded-full border border-blue-200 shadow-sm"
                      onClick={() => handleEmojiSelect(emoji)}
                    >
                      <span className="text-lg filter">{emoji}</span>
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </div>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}
