import { IconCheck, IconGlobe } from "@tabler/icons-react";
import { Button } from "#/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";
import { useLanguage } from "#/lib/i18n/hooks";
import { cn } from "#/lib/utils";

interface LanguageSwitcherProps {
  variant?: "default" | "compact";
  align?: "start" | "center" | "end";
}

export function LanguageSwitcher({ variant = "default", align = "end" }: LanguageSwitcherProps) {
  const { currentLanguage, supportedLanguages, changeLanguage, currentLanguageInfo } =
    useLanguage();

  if (variant === "compact") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 px-2"
            title={`Current language: ${currentLanguageInfo.nativeName}`}
          >
            <span className="text-sm">{currentLanguageInfo.flag}</span>
            <span className="text-xs font-medium hidden sm:inline">
              {currentLanguageInfo.code.toUpperCase()}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={align} className="w-48">
          <DropdownMenuLabel className="flex items-center gap-2">
            <IconGlobe className="h-4 w-4" />
            Language / Dil
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {Object.values(supportedLanguages).map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => changeLanguage(language.code)}
              className={cn(
                "flex items-center gap-3 cursor-pointer",
                currentLanguage === language.code && "bg-accent",
              )}
            >
              <span className="text-base">{language.flag}</span>
              <div className="flex flex-col flex-1">
                <span className="font-medium">{language.nativeName}</span>
                <span className="text-xs text-muted-foreground">{language.name}</span>
              </div>
              {currentLanguage === language.code && <IconCheck className="h-4 w-4 text-primary" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          title={`Current language: ${currentLanguageInfo.nativeName}`}
        >
          <IconGlobe className="h-4 w-4" />
          <span className="text-sm">{currentLanguageInfo.flag}</span>
          <span className="font-medium">{currentLanguageInfo.nativeName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="w-52">
        <DropdownMenuLabel className="flex items-center gap-2">
          <IconGlobe className="h-4 w-4" />
          Choose Language
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {Object.values(supportedLanguages).map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={cn(
              "flex items-center gap-3 cursor-pointer py-2.5",
              currentLanguage === language.code && "bg-accent",
            )}
          >
            <span className="text-lg">{language.flag}</span>
            <div className="flex flex-col flex-1">
              <span className="font-medium">{language.nativeName}</span>
              <span className="text-xs text-muted-foreground">{language.name}</span>
            </div>
            {currentLanguage === language.code && <IconCheck className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
