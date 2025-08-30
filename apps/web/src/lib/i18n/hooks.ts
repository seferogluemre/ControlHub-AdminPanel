import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES, NAMESPACES, type SupportedLanguage } from "./config";

export function useLanguage() {
  const { i18n } = useTranslation();

  const currentLanguage = i18n.language as SupportedLanguage;
  const currentLanguageInfo = SUPPORTED_LANGUAGES[currentLanguage] || SUPPORTED_LANGUAGES.en;

  const changeLanguage = (language: SupportedLanguage) => {
    i18n.changeLanguage(language);
  };

  const isLanguageSupported = (language: string): language is SupportedLanguage => {
    return language in SUPPORTED_LANGUAGES;
  };

  return {
    currentLanguage,
    currentLanguageInfo,
    supportedLanguages: SUPPORTED_LANGUAGES,
    changeLanguage,
    isLanguageSupported,
  };
}

export function useNamespaceTranslation(namespace: keyof typeof NAMESPACES) {
  const { t, i18n } = useTranslation(NAMESPACES[namespace]);

  return {
    t,
    i18n,
    ready: i18n.isInitialized,
  };
}

export function useCommonTranslation() {
  return useNamespaceTranslation("COMMON");
}

export function useDashboardTranslation() {
  return useNamespaceTranslation("DASHBOARD");
}

export function useTasksTranslation() {
  return useNamespaceTranslation("TASKS");
}

export function useProjectsTranslation() {
  return useNamespaceTranslation("PROJECTS");
}

export function useAnalyticsTranslation() {
  return useNamespaceTranslation("ANALYTICS");
}

export function useTeamTranslation() {
  return useNamespaceTranslation("TEAM");
}

export function useFormattedTranslation() {
  const { t } = useTranslation();

  const formatCount = (key: string, count: number) => {
    return t(key, { count });
  };

  const formatPercent = (key: string, percent: number) => {
    return t(key, { percent });
  };

  const formatDate = (date: Date, format: "short" | "long" = "short") => {
    const locale = useLanguage().currentLanguage;

    if (format === "short") {
      return date.toLocaleDateString(locale === "tr" ? "tr-TR" : "en-US");
    }

    return date.toLocaleDateString(locale === "tr" ? "tr-TR" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return {
    formatCount,
    formatPercent,
    formatDate,
  };
}
