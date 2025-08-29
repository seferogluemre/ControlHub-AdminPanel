import {
  IconChevronDown,
  IconChevronRight,
  IconExternalLink,
  IconFile,
  IconFolder,
  IconMinus,
  IconPlus,
  IconRefresh,
  IconSearch,
  IconUpload,
} from "@tabler/icons-react";
import { useState } from "react";
import { Button } from "#/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "#/components/ui/collapsible";
import { Input } from "#/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "#/components/ui/popover";
import { ScrollArea } from "#/components/ui/scroll-area";
import {
  TabsContent as MainTabsContent,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "#/components/ui/tabs";
import { AUTO_RESPONSE_SHORTCUTS, HELP_FILE_LIST, UI_TEXTS } from "../data/constants";

export function HelpTabContent() {
  const [helpSearch, setHelpSearch] = useState("");
  const [publicFolderOpen, setPublicFolderOpen] = useState(true);

  const autoResponseCodes = Object.keys(AUTO_RESPONSE_SHORTCUTS);

  const normalFiles = HELP_FILE_LIST.filter(
    (file) =>
      file &&
      file.toLocaleLowerCase().includes(helpSearch.trim()) &&
      !autoResponseCodes.includes(file),
  );

  const filteredAutoResponseCodes = autoResponseCodes.filter(
    (code) => code && code.toLocaleLowerCase().includes(helpSearch.toLocaleLowerCase()),
  );

  const filteredFiles = [...filteredAutoResponseCodes, ...normalFiles];

  return (
    <MainTabsContent value="help" className="mt-0 h-full overflow-hidden">
      <div className="p-3 h-full flex flex-col bg-background rounded-lg border">
        <div className="mb-4 flex-shrink-0">
          <h3 className="text-lg font-semibold mb-3 text-foreground">Yardım İçeriği</h3>
          <div className="relative">
            <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Arama"
              value={helpSearch}
              onChange={(e) => setHelpSearch(e.target.value)}
              className="pl-10 bg-input border-border text-foreground placeholder-muted-foreground"
            />
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="canned" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-2 flex-shrink-0 bg-muted">
              <TabsTrigger
                value="canned"
                className="text-sm text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-foreground"
              >
                Hazır Yanıtlar
              </TabsTrigger>
              <TabsTrigger
                value="task-bot"
                className="text-sm text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-foreground"
              >
                Görev Botu
              </TabsTrigger>
            </TabsList>

            <TabsContent value="canned" className="mt-2 flex-1 overflow-hidden bg-background">
              <div className="flex items-center justify-between p-2 border-b border-border mb-2">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary/80 hover:bg-accent text-sm"
                    onClick={() => console.log("Manage clicked")}
                  >
                    {UI_TEXTS.manageButton}
                    <IconExternalLink className="h-4 w-4 ml-1" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent"
                    onClick={() => console.log("Upload clicked")}
                  >
                    <IconUpload className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent"
                  onClick={() => console.log("Refresh clicked")}
                >
                  <IconRefresh className="h-4 w-4" />
                </Button>
              </div>

              <ScrollArea className="h-[400px]">
                <div className="space-y-1 p-2">
                  <div className="flex items-center justify-start gap-1 mb-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-muted-foreground hover:text-foreground"
                      onClick={() => console.log("Remove file")}
                    >
                      <IconMinus className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-muted-foreground hover:text-foreground"
                      onClick={() => console.log("Add file")}
                    >
                      <IconPlus className="h-3 w-3" />
                    </Button>
                  </div>

                  {/* Public Folder */}
                  <Collapsible open={publicFolderOpen} onOpenChange={setPublicFolderOpen}>
                    <CollapsibleTrigger className="flex items-center gap-2 w-full p-2 hover:bg-accent rounded-md text-left transition-colors">
                      {publicFolderOpen ? (
                        <IconChevronDown className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <IconChevronRight className="h-4 w-4 text-muted-foreground" />
                      )}
                      <IconFolder className="h-4 w-4 text-primary" />
                      <span className="text-sm text-foreground font-medium">
                        {UI_TEXTS.publicFolder}
                      </span>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <div className="space-y-0.5 max-h-[400px] overflow-y-auto">
                        {filteredFiles
                          .filter((file) => file.toLowerCase().includes(helpSearch.toLowerCase()))
                          .map((fileName, index) => (
                            <Popover key={index}>
                              <PopoverTrigger asChild>
                                <div className="flex items-center gap-2 p-2 hover:bg-accent rounded-md cursor-pointer transition-colors">
                                  <IconFile className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                  <span className="text-sm text-foreground truncate">
                                    {fileName}
                                  </span>
                                </div>
                              </PopoverTrigger>

                              <PopoverContent
                                side="left"
                                className="w-80 bg-popover border-border text-popover-foreground"
                                sideOffset={10}
                              >
                                <div className="space-y-3">
                                  <div className="flex items-center justify-between">
                                    <h4 className="font-medium text-sm truncate">{fileName}</h4>
                                  </div>

                                  <div className="text-sm text-muted-foreground leading-relaxed">
                                    Bu dosya müşteri destek ekibi tarafından sıkça kullanılan hazır
                                    yanıt şablonlarını içermektedir. Hızlı erişim için favori
                                    listenize ekleyebilirsiniz.
                                  </div>

                                  <div className="pt-2 border-t border-border space-y-1">
                                    <div className="flex justify-between text-xs text-muted-foreground">
                                      <span>Son güncelleme:</span>
                                      <span>2 gün önce</span>
                                    </div>
                                    <div className="flex justify-between text-xs text-muted-foreground">
                                      <span>Dosya boyutu:</span>
                                      <span>1.2 KB</span>
                                    </div>
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>
                          ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="task-bot" className="mt-2 flex-1 overflow-hidden">
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <p className="text-sm">Görev botu içeriği mevcut değil</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainTabsContent>
  );
}
