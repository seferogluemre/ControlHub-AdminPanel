import { useState } from "react";
import { DEFAULT_DISPLAY_OPTIONS } from "../data/constants";

export type DisplayOptionsType = typeof DEFAULT_DISPLAY_OPTIONS;
export type DisplayOptionKey = keyof DisplayOptionsType;

export function useDisplayOptions() {
  const [displayOptions, setDisplayOptions] = useState<DisplayOptionsType>(DEFAULT_DISPLAY_OPTIONS);

  const handleToggleDisplayOption = (option: DisplayOptionKey) => {
    setDisplayOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  const setMultipleOptions = (options: Partial<DisplayOptionsType>) => {
    setDisplayOptions((prev) => ({
      ...prev,
      ...options,
    }));
  };

  const resetDisplayOptions = () => {
    setDisplayOptions(DEFAULT_DISPLAY_OPTIONS);
  };

  const enableAllOptions = () => {
    setDisplayOptions({
      showDepartment: true,
      showCampaign: true,
      showAgentUnresponsiveTime: true,
      groupChatByStatus: true,
      showMostRecentChatOnTop: true,
    });
  };

  const isOptionEnabled = (option: DisplayOptionKey): boolean => {
    return displayOptions[option];
  };

  const activeOptionsCount = Object.values(displayOptions).filter(Boolean).length;

  return {
    // State
    displayOptions,

    // Handlers
    handleToggleDisplayOption,
    setMultipleOptions,
    resetDisplayOptions,
    enableAllOptions,

    // Utilities
    isOptionEnabled,
    activeOptionsCount,

    // Direct setter (for advanced usage)
    setDisplayOptions,
  };
}
