import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

import commonTR from "../../../public/locales/tr/common.json";
import commonEN from "../../../public/locales/en/common.json";
import dashboardTR from "../../../public/locales/tr/dashboard.json";
import dashboardEN from "../../../public/locales/en/dashboard.json";
import tasksTR from "../../../public/locales/tr/tasks.json";
import tasksEN from "../../../public/locales/en/tasks.json";
import projectsTR from "../../../public/locales/tr/projects.json";
import projectsEN from "../../../public/locales/en/projects.json";
import analyticsTR from "../../../public/locales/tr/analytics.json";
import analyticsEN from "../../../public/locales/en/analytics.json";

export const SUPPORTED_LANGUAGES = {
  tr: {
    code: "tr",
    name: "Türkçe",
    flag: "🇹🇷",
    nativeName: "Türkçe",
  },
  en: {
    code: "en",
    name: "English",
    flag: "🇬🇧",
    nativeName: "English",
  },
} as const;

export type SupportedLanguage = keyof typeof SUPPORTED_LANGUAGES;

export const NAMESPACES = {
  COMMON: "common",
  DASHBOARD: "dashboard",
  TASKS: "tasks",
  PROJECTS: "projects",
  TEAM: "team",
  ANALYTICS: "analytics",
  SETTINGS: "settings",
  NAVIGATION: "navigation",
} as const;

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",

    debug: process.env.NODE_ENV === "development",

    // Desteklenen diller
    supportedLngs: Object.keys(SUPPORTED_LANGUAGES),

    // Namespace ayarları
    defaultNS: NAMESPACES.COMMON,
    ns: Object.values(NAMESPACES),

    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      lookupLocalStorage: "devflow-language",
      lookupCookie: "devflow-language",
      lookupFromPathIndex: 0,
      checkWhitelist: true,
    },

    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
      requestOptions: {
        cache: "default",
      },
    },

    react: {
      useSuspense: true,
      // Bind events
      bindI18n: "languageChanged",
      bindI18nStore: "",
      // Trans component ayarları
      transEmptyNodeValue: "",
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ["br", "strong", "i"],
    },

    // Interpolation ayarları
    interpolation: {
      // React zaten XSS koruması sağlar
      escapeValue: false,
      // Formatters
      format: (value, format) => {
        if (format === "uppercase") return value.toUpperCase();
        if (format === "lowercase") return value.toLowerCase();
        if (format === "capitalize") return value.charAt(0).toUpperCase() + value.slice(1);
        return value;
      },
    },

    resources: {
      tr: {
        [NAMESPACES.COMMON]: commonTR,
        [NAMESPACES.DASHBOARD]: dashboardTR,
        [NAMESPACES.TASKS]: tasksTR,
        [NAMESPACES.PROJECTS]: projectsTR,
        [NAMESPACES.ANALYTICS]: analyticsTR,
      },
      en: {
        [NAMESPACES.COMMON]: commonEN,
        [NAMESPACES.DASHBOARD]: dashboardEN,
        [NAMESPACES.TASKS]: tasksEN,
        [NAMESPACES.PROJECTS]: projectsEN,
        [NAMESPACES.ANALYTICS]: analyticsEN,
      },
    },
  });

export default i18n;
