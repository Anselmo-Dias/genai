import { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";

interface SettingsSectionProps {
  title: string;
  children: ReactNode;
}

export function SettingsSection({ title, children }: SettingsSectionProps) {
  return (
    <div className="space-y-6 py-4">
      <div>
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      </div>
      <div className="divide-y divide-border">
        {children}
      </div>
    </div>
  );
}
