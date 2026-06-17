import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

export function SidebarItem({ icon, label, active, onClick }: SidebarItemProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-3 px-3 py-2 h-9 text-sm font-normal",
        active 
          ? "bg-accent text-accent-foreground font-medium" 
          : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
      )}
      onClick={onClick}
    >
      <span className={cn("shrink-0", active ? "text-foreground" : "text-muted-foreground")}>
        {icon}
      </span>
      {label}
    </Button>
  );
}
