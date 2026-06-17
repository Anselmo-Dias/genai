import { useState, useEffect } from "react";
import { X, ChevronLeft } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SettingsSidebar } from "./settings-sidebar";
import { SettingsContent } from "./settings-content";
import type { SettingsSectionId } from "../types";
import { useIsMobile } from "@/hooks/use-mobile";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { cn } from "@/lib/utils";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const [activeSection, setActiveSection] = useState<SettingsSectionId>("general");
  const [showMobileContent, setShowMobileContent] = useState(false);
  const isMobile = useIsMobile();

  // Reset mobile view when dialog closes or opens
  useEffect(() => {
    if (!open) {
      setShowMobileContent(false);
    }
  }, [open]);

  const handleSectionChange = (section: SettingsSectionId) => {
    setActiveSection(section);
    if (isMobile) {
      setShowMobileContent(true);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        showCloseButton={false}
        className={cn(
          "p-0 overflow-hidden gap-0 border-none sm:rounded-xl",
          "w-[90vw] md:w-[70vw] max-w-[700px]! h-[85vh] md:h-[80vh]!",
          "sm:max-w-none!"
        )}
      >
        <VisuallyHidden>
          <DialogTitle>Configurações</DialogTitle>
          <DialogDescription>Gerencie suas preferências de conta e aplicativo.</DialogDescription>
        </VisuallyHidden>

        <div className="flex h-full relative">
          {/* Sidebar */}
          <div className={cn(
            "h-full transition-all duration-300",
            isMobile && showMobileContent ? "hidden" : "block",
            isMobile ? "w-full" : "w-[260px]"
          )}>
            <SettingsSidebar 
              activeSection={activeSection} 
              onSectionChange={handleSectionChange} 
            />
          </div>

          {/* Main Content */}
          <div className={cn(
            "flex-1 flex flex-col min-w-0 bg-background h-full transition-all duration-300",
            isMobile && !showMobileContent ? "hidden" : "block"
          )}>
            {/* Custom Header with Close and Back Button */}
            <div className="flex items-center justify-between p-4 md:absolute md:right-4 md:top-4 md:p-0 z-50 bg-background/80 backdrop-blur-sm md:bg-transparent">
              <div className="flex items-center gap-2">
                {isMobile && showMobileContent && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    onClick={() => setShowMobileContent(false)}
                  >
                    <ChevronLeft className="size-4" />
                    <span className="sr-only">Voltar</span>
                  </Button>
                )}
                {isMobile && showMobileContent && (
                  <h2 className="text-sm font-semibold capitalize">
                    {activeSection.replace("-", " ")}
                  </h2>
                )}
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                className="size-8 rounded-full hover:bg-muted"
                onClick={() => onOpenChange(false)}
              >
                <X className="size-4" />
                <span className="sr-only">Fechar</span>
              </Button>
            </div>

            <SettingsContent activeSection={activeSection} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
