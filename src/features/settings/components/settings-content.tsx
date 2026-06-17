import { ScrollArea } from "@/components/ui/scroll-area";
import type { SettingsSectionId } from "../types";
import { SettingsSection } from "./settings-section";
import { SettingRow } from "./setting-row";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";

interface SettingsContentProps {
  activeSection: SettingsSectionId;
}

export function SettingsContent({ activeSection }: SettingsContentProps) {
  const { theme, setTheme } = useTheme();

  return (
    <ScrollArea className="flex-1 h-full">
      <div className="max-w-3xl mx-auto p-6 md:p-8">
        {activeSection === "general" && (
          <SettingsSection title="Configurações Gerais">
            <SettingRow 
              label="Tema do Sistema" 
              description="Escolha entre o modo claro ou escuro para a interface."
            >
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione o tema" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Claro</SelectItem>
                  <SelectItem value="dark">Escuro</SelectItem>
                  <SelectItem value="system">Sistema</SelectItem>
                </SelectContent>
              </Select>
            </SettingRow>
            
            <SettingRow 
              label="Idioma" 
              description="Selecione o idioma preferido para a plataforma."
            >
              <Select defaultValue="pt-BR">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione o idioma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                  <SelectItem value="en">English (US)</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                </SelectContent>
              </Select>
            </SettingRow>

            <SettingRow 
              label="Notificações via Desktop" 
              description="Permitir que o aplicativo envie notificações para o seu computador."
            >
              <Switch defaultChecked />
            </SettingRow>
          </SettingsSection>
        )}

        {activeSection === "account" && (
          <SettingsSection title="Minha Conta">
            <SettingRow label="Foto de Perfil">
              <div className="flex items-center gap-4">
                <Avatar className="size-16">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" size="sm">Alterar foto</Button>
                  <Button variant="ghost" size="sm" className="text-destructive">Remover</Button>
                </div>
              </div>
            </SettingRow>

            <SettingRow label="Nome de Exibição">
              <Input placeholder="John Doe" defaultValue="John Doe" />
            </SettingRow>

            <SettingRow label="E-mail">
              <Input placeholder="john@example.com" defaultValue="john@example.com" readOnly className="bg-muted" />
            </SettingRow>

            <SettingRow label="Bio" description="Uma breve descrição sobre você.">
              <Textarea placeholder="Fale um pouco sobre você..." className="resize-none h-24" />
            </SettingRow>
          </SettingsSection>
        )}

        {/* Mocks para outras seções */}
        {["privacy", "billing", "usage", "capabilities", "connectors", "claude-code"].includes(activeSection) && (
          <div className="flex flex-col items-center justify-center h-[50vh] text-center space-y-4">
            <div className="size-12 rounded-full bg-muted flex items-center justify-center">
              <SettingsIcon className="size-6 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-lg">Em desenvolvimento</h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                Esta seção de configurações ({activeSection}) está sendo preparada e estará disponível em breve.
              </p>
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}

// Re-importing SettingsIcon to avoid circular dependency if it was in Sidebar
import { Settings as SettingsIcon } from "lucide-react";
