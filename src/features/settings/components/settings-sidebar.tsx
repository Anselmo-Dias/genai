import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SidebarItem } from "./sidebar-item";
import type { SettingsSection, SettingsSectionId } from "../types";
import { 
  User, 
  Settings as SettingsIcon, 
  Shield, 
  CreditCard, 
  BarChart, 
  Zap, 
  Link, 
  Code 
} from "lucide-react";

interface SettingsSidebarProps {
  activeSection: SettingsSectionId;
  onSectionChange: (section: SettingsSectionId) => void;
}

export const SECTIONS: SettingsSection[] = [
  { id: "general", label: "Geral", icon: <SettingsIcon className="size-4" /> },
  { id: "account", label: "Conta", icon: <User className="size-4" /> },
  { id: "privacy", label: "Privacidade", icon: <Shield className="size-4" /> },
  { id: "billing", label: "Cobrança", icon: <CreditCard className="size-4" /> },
  { id: "usage", label: "Uso", icon: <BarChart className="size-4" /> },
  { id: "capabilities", label: "Capacidades", icon: <Zap className="size-4" /> },
  { id: "connectors", label: "Conectores", icon: <Link className="size-4" /> },
  { id: "claude-code", label: "Claude Code", icon: <Code className="size-4" /> },
];

export function SettingsSidebar({ activeSection, onSectionChange }: SettingsSidebarProps) {
  const [search, setSearch] = useState("");

  const filteredSections = SECTIONS.filter(section => 
    section.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-[260px] flex flex-col h-full bg-muted/30 border-r border-border">
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar configurações..."
            className="pl-9 h-9 bg-background/50"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {filteredSections.map((section) => (
          <SidebarItem
            key={section.id}
            icon={section.icon}
            label={section.label}
            active={activeSection === section.id}
            onClick={() => onSectionChange(section.id)}
          />
        ))}
        {filteredSections.length === 0 && (
          <p className="text-xs text-center text-muted-foreground py-4">
            Nenhuma seção encontrada.
          </p>
        )}
      </div>
    </div>
  );
}
