import { ReactNode } from "react";

export type SettingsSectionId = 
  | "general" 
  | "account" 
  | "privacy" 
  | "billing" 
  | "usage" 
  | "capabilities" 
  | "connectors" 
  | "claude-code";

export interface SettingsSection {
  id: SettingsSectionId;
  label: string;
  icon: ReactNode;
}
