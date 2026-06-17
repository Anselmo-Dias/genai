import { useEffect, useMemo, useRef, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { ImageIcon, SparklesIcon } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"
import { Spinner } from "@/components/ui/spinner"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useClientStore } from "@/features/clients/store/client-store"
import { type AppError } from "@/shared/utils/normalize-error"

import { useAgentsGetOne } from "../queries/use-agent-detail"
import { useAgentsGetAllModels } from "../queries/use-agents-models"
import { useAgentsImprovePrompt } from "../queries/use-agents-improve-prompt"
import { useAgentsCreate } from "../queries/use-create-agent"
import { useAgentsUpdate } from "../queries/use-update-agent"
import { type Agent } from "../types/agent.type"
import { type UpsertAgentPayload } from "../types/agent-mutations.type"

// ─── Constants ───────────────────────────────────────────────────────────────

const TYPE_OPTIONS = [
  "Assistant",
  "Doc Q&A",
  "Summarizer",
  "Code Interpreter",
  "Extractor",
]

const PROVIDER_OPTIONS = [
  { value: "OPEN AI", label: "OpenAI" },
  { value: "Gemini", label: "Google Gemini" },
  { value: "Anthropic", label: "Anthropic" },
]

const TIMEZONE_OPTIONS = [
  "America/Sao_Paulo",
  "America/Manaus",
  "America/Belem",
  "America/Fortaleza",
  "America/Recife",
  "America/Noronha",
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
]

const DAYS_OF_WEEK = [
  { value: "0", label: "Dom" },
  { value: "1", label: "Seg" },
  { value: "2", label: "Ter" },
  { value: "3", label: "Qua" },
  { value: "4", label: "Qui" },
  { value: "5", label: "Sex" },
  { value: "6", label: "Sáb" },
]

const PROMPT_SECTION_DEFS = [
  {
    key: "persona",
    label: "Papel / Persona",
    placeholder: "Ex: Você é um assistente especializado em...",
  },
  {
    key: "tone",
    label: "Tom e Estilo",
    placeholder: "Ex: Responda de forma objetiva e profissional...",
  },
  {
    key: "restrictions",
    label: "Restrições",
    placeholder: "Ex: Nunca invente dados, não responda sobre...",
  },
  {
    key: "output_format",
    label: "Formato de Resposta",
    placeholder: "Ex: Use markdown, bullet points, tabelas...",
  },
  {
    key: "context",
    label: "Contexto Adicional",
    placeholder: "Informações extras que o agente deve considerar...",
  },
]

// ─── Schema & types ───────────────────────────────────────────────────────────

const promptSectionSchema = z.object({
  key: z.string(),
  label: z.string(),
  placeholder: z.string(),
  value: z.string(),
})

const agentFormSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  type: z.string().min(1),
  selectedProvider: z.string(),
  modelName: z.string(),
  ragAvailable: z.enum(["Habilitado", "Desabilitado"]),
  documentPath: z.string(),
  apiKey: z.string(),
  description: z.string(),
  rawPrompt: z.string(),
  promptSections: z.array(promptSectionSchema),
  inheritTtl: z.boolean(),
  retentionDays: z.coerce
    .number()
    .int()
    .min(1, "Mínimo 1 dia")
    .max(180, "Máximo 180 dias"),
  temporalEnabled: z.boolean(),
  allowedDays: z.array(z.string()),
  startTime: z.string(),
  endTime: z.string(),
  timezone: z.string(),
})

type AgentFormValues = z.infer<typeof agentFormSchema>

// ─── Helpers ──────────────────────────────────────────────────────────────────

function emptyPromptSections(): AgentFormValues["promptSections"] {
  return PROMPT_SECTION_DEFS.map(s => ({ ...s, value: "" }))
}

function buildPromptFromSections(
  sections: AgentFormValues["promptSections"],
): string {
  return sections
    .filter(s => s.value.trim())
    .map(s => `## ${s.label}\n${s.value.trim()}`)
    .join("\n\n")
}

function parseSectionsFromPrompt(
  raw: string,
): AgentFormValues["promptSections"] | null {
  const regex = /^## (.+)$/gm
  const matches = [...raw.matchAll(regex)]
  if (!matches.length) return null
  return PROMPT_SECTION_DEFS.map(def => {
    const match = matches.find(m => m[1].trim() === def.label)
    if (!match) return { ...def, value: "" }
    const startIdx = match.index! + match[0].length
    const matchIdx = matches.indexOf(match)
    const endIdx =
      matchIdx + 1 < matches.length
        ? matches[matchIdx + 1].index!
        : raw.length
    return { ...def, value: raw.substring(startIdx, endIdx).trim() }
  })
}

function getProviderFilterTerm(provider: string): string {
  if (provider === "Anthropic") return "claude"
  return provider.toLowerCase().replace(/\s+/g, "")
}

const DEFAULT_VALUES: AgentFormValues = {
  title: "",
  type: TYPE_OPTIONS[0],
  selectedProvider: "",
  modelName: "",
  ragAvailable: "Desabilitado",
  documentPath: "",
  apiKey: "",
  description: "",
  rawPrompt: "",
  promptSections: emptyPromptSections(),
  inheritTtl: true,
  retentionDays: 90,
  temporalEnabled: false,
  allowedDays: [],
  startTime: "",
  endTime: "",
  timezone: "",
}

// ─── Component ────────────────────────────────────────────────────────────────

type AgentFormDialogProps = {
  agent?: Agent | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AgentFormDialog({
  agent,
  open,
  onOpenChange,
}: AgentFormDialogProps) {
  const isEdit = !!agent
  const { selectedClientName } = useClientStore()
  const iconFileRef = useRef<HTMLInputElement>(null)
  const [iconFile, setIconFile] = useState<File | null>(null)
  const [promptMode, setPromptMode] = useState<"blocks" | "raw">("blocks")
  const [isImproveOpen, setIsImproveOpen] = useState(false)
  const [improvedPromptValue, setImprovedPromptValue] = useState("")

  const { data: allModels = [], isLoading: isLoadingModels } =
    useAgentsGetAllModels({ enabled: open })
  const { data: detail } = useAgentsGetOne(
    { name: agent?.name ?? "" },
    { enabled: open && isEdit },
  )

  const createAgent = useAgentsCreate()
  const updateAgent = useAgentsUpdate()
  const improvePrompt = useAgentsImprovePrompt()
  const isPending = createAgent.isPending || updateAgent.isPending

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<AgentFormValues>({
    resolver: zodResolver(agentFormSchema),
    defaultValues: DEFAULT_VALUES,
  })

  const selectedProvider = watch("selectedProvider")
  const ragAvailable = watch("ragAvailable")
  const inheritTtl = watch("inheritTtl")
  const temporalEnabled = watch("temporalEnabled")
  const allowedDays = watch("allowedDays")
  const promptSections = watch("promptSections")

  const filteredModels = useMemo(() => {
    if (!selectedProvider) return allModels
    const term = getProviderFilterTerm(selectedProvider)
    return allModels.filter(m => m.uri.toLowerCase().includes(term))
  }, [allModels, selectedProvider])

  const showDocumentPath =
    ragAvailable === "Habilitado" &&
    (selectedProvider === "OPEN AI" || selectedProvider === "Anthropic")

  const filledSectionsCount = promptSections.filter(s => s.value.trim()).length

  function getCurrentPrompt(): string {
    return promptMode === "blocks"
      ? buildPromptFromSections(promptSections)
      : watch("rawPrompt")
  }

  // Reset on open / agent change
  useEffect(() => {
    if (!open) return
    if (agent) {
      reset({
        ...DEFAULT_VALUES,
        title: agent.title,
        type: agent.type,
        description: agent.description,
        modelName: agent.model_name ?? "",
        selectedProvider: agent.model_provider ?? "",
      })
      setPromptMode("raw")
    } else {
      reset(DEFAULT_VALUES)
      setPromptMode("blocks")
    }
    setIconFile(null)
    if (iconFileRef.current) iconFileRef.current.value = ""
  }, [open, agent, reset])

  // Prefill detailed fields when detail loads (edit mode)
  useEffect(() => {
    if (!detail) return
    setValue("rawPrompt", detail.prompt ?? "")
    setPromptMode("raw")
    setValue("modelName", detail.model_name ?? "")
    setValue("selectedProvider", detail.model_provider ?? "")
    setValue("ragAvailable", detail.rag_available ?? "Desabilitado")
    setValue("documentPath", detail.document_path ?? "")

    const ttl = detail.thread_expiration_period ?? -1
    setValue("inheritTtl", ttl === -1)
    if (ttl !== -1) setValue("retentionDays", ttl)

    const tempOn = detail.temporal_restriction_enabled === 1
    setValue("temporalEnabled", tempOn)
    if (tempOn) {
      const days = (detail.temporal_allowed_days ?? "")
        .replace(/[\[\]]/g, "")
        .split(",")
        .map(d => d.trim())
        .filter(Boolean)
      setValue("allowedDays", days)
      setValue("startTime", detail.temporal_start_time ?? "")
      setValue("endTime", detail.temporal_end_time ?? "")
      setValue("timezone", detail.temporal_timezone ?? "")
    }
  }, [detail, setValue])

  function handleToggleDay(dayValue: string) {
    const next = allowedDays.includes(dayValue)
      ? allowedDays.filter(d => d !== dayValue)
      : [...allowedDays, dayValue].sort()
    setValue("allowedDays", next)
  }

  function handleSwitchPromptMode() {
    if (promptMode === "blocks") {
      setValue("rawPrompt", buildPromptFromSections(promptSections))
      setPromptMode("raw")
    } else {
      const raw = watch("rawPrompt")
      const parsed = parseSectionsFromPrompt(raw)
      setValue("promptSections", parsed ?? emptyPromptSections())
      setPromptMode("blocks")
    }
  }

  function handleImprovePrompt() {
    const current = getCurrentPrompt().trim()
    if (!current) return
    improvePrompt.mutate(
      { currentPrompt: current },
      {
        onSuccess: data => {
          setImprovedPromptValue(data.improved_prompt)
          setIsImproveOpen(true)
        },
        onError: error => {
          toast.error(
            (error as AppError).message ??
              "Não foi possível melhorar o prompt. Tente novamente.",
          )
        },
      },
    )
  }

  function handleAcceptImprovedPrompt() {
    if (promptMode === "blocks") {
      const parsed = parseSectionsFromPrompt(improvedPromptValue)
      if (parsed?.some(s => s.value)) {
        setValue("promptSections", parsed)
      } else {
        setValue("rawPrompt", improvedPromptValue)
        setPromptMode("raw")
      }
    } else {
      setValue("rawPrompt", improvedPromptValue)
    }
    setIsImproveOpen(false)
    toast.success("Prompt atualizado com sucesso.")
  }

  function onValidSubmit(data: AgentFormValues) {
    const currentPrompt = getCurrentPrompt()
    const model = filteredModels.find(m => m.name === data.modelName)
    const includeDocPath =
      data.ragAvailable === "Habilitado" &&
      (data.selectedProvider === "OPEN AI" ||
        data.selectedProvider === "Anthropic")

    const basePayload: UpsertAgentPayload = {
      title: data.title,
      type: data.type,
      description: data.description,
      prompt: currentPrompt,
      ...(model ? { model_name: model.name, provider: model.provider } : {}),
      rag_available: data.ragAvailable,
      ...(includeDocPath && data.documentPath.trim()
        ? { document_path: data.documentPath.trim() }
        : {}),
      ...(data.apiKey.trim() ? { api_key: data.apiKey.trim() } : {}),
      ...(selectedClientName ? { client: selectedClientName } : {}),
      thread_expiration_period: data.inheritTtl ? -1 : data.retentionDays,
      temporal_restriction_enabled: data.temporalEnabled ? 1 : 0,
      ...(data.temporalEnabled
        ? {
            temporal_allowed_days: data.allowedDays.join(","),
            temporal_start_time: data.startTime,
            temporal_end_time: data.endTime,
            temporal_timezone: data.timezone,
          }
        : {}),
    }

    const payload: UpsertAgentPayload | FormData = (() => {
      if (!iconFile) return basePayload
      const fd = new FormData()
      Object.entries(basePayload).forEach(([key, val]) => {
        if (val !== undefined && val !== null) fd.append(key, String(val))
      })
      fd.append("icon", iconFile)
      return fd
    })()

    const onSuccess = () => {
      onOpenChange(false)
      toast.success(
        isEdit
          ? "Agente atualizado com sucesso."
          : "Agente criado com sucesso.",
      )
    }
    const onError = (error: unknown) => {
      toast.error(
        (error as AppError).message ??
          (isEdit
            ? "Não foi possível atualizar o agente."
            : "Não foi possível criar o agente."),
      )
    }

    if (agent) {
      updateAgent.mutate({ name: agent.name, payload }, { onSuccess, onError })
    } else {
      createAgent.mutate(payload, { onSuccess, onError })
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isEdit ? "Editar agente" : "Novo agente"}
            </DialogTitle>
            <DialogDescription>
              {isEdit
                ? "Atualize as informações do agente."
                : "Preencha as informações para criar um novo agente."}
            </DialogDescription>
          </DialogHeader>

          <form
            id="agent-form"
            onSubmit={handleSubmit(onValidSubmit)}
            className="flex flex-col gap-4"
          >
            {/* Título */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="agent-title">Título *</Label>
              <Input
                id="agent-title"
                placeholder="Ex: Assistente de RH"
                aria-invalid={!!errors.title}
                {...register("title")}
              />
              <FieldError errors={[errors.title]} />
            </div>

            {/* Provedor + Tipo */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-2">
                <Label htmlFor="agent-provider">Provedor (LLM)</Label>
                <Controller
                  name="selectedProvider"
                  control={control}
                  render={({ field }) => (
                    <NativeSelect
                      id="agent-provider"
                      className="w-full"
                      value={field.value}
                      onChange={e => {
                        field.onChange(e.target.value)
                        setValue("modelName", "")
                      }}
                    >
                      <NativeSelectOption value="">Selecione</NativeSelectOption>
                      {PROVIDER_OPTIONS.map(opt => (
                        <NativeSelectOption key={opt.value} value={opt.value}>
                          {opt.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  )}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="agent-type">Tipo</Label>
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <NativeSelect
                      id="agent-type"
                      className="w-full"
                      value={field.value}
                      onChange={e => field.onChange(e.target.value)}
                    >
                      {TYPE_OPTIONS.map(opt => (
                        <NativeSelectOption key={opt} value={opt}>
                          {opt}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  )}
                />
              </div>
            </div>

            {/* Modelo */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="agent-model">Modelo</Label>
              <Controller
                name="modelName"
                control={control}
                render={({ field }) => (
                  <NativeSelect
                    id="agent-model"
                    className="w-full"
                    value={field.value}
                    onChange={e => field.onChange(e.target.value)}
                    disabled={isLoadingModels}
                  >
                    <NativeSelectOption value="">
                      {isLoadingModels
                        ? "Carregando modelos..."
                        : !selectedProvider
                          ? "Selecione um provedor primeiro"
                          : filteredModels.length === 0
                            ? "Nenhum modelo disponível"
                            : "Selecione um modelo"}
                    </NativeSelectOption>
                    {filteredModels.map(model => (
                      <NativeSelectOption key={model.name} value={model.name}>
                        {model.friendly_name || model.model_name}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                )}
              />
            </div>

            {/* RAG */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="agent-rag">RAG</Label>
              <Controller
                name="ragAvailable"
                control={control}
                render={({ field }) => (
                  <NativeSelect
                    id="agent-rag"
                    className="w-full"
                    value={field.value}
                    onChange={e =>
                      field.onChange(
                        e.target.value as "Habilitado" | "Desabilitado",
                      )
                    }
                  >
                    <NativeSelectOption value="Desabilitado">
                      Desabilitado
                    </NativeSelectOption>
                    <NativeSelectOption value="Habilitado">
                      Habilitado
                    </NativeSelectOption>
                  </NativeSelect>
                )}
              />
            </div>

            {/* Vector Store (condicional) */}
            {showDocumentPath ? (
              <div className="flex flex-col gap-2">
                <Label htmlFor="agent-document-path">
                  Vector Store{" "}
                  <span className="text-xs font-normal text-muted-foreground">
                    (Base de Conhecimento Vetorial)
                  </span>
                </Label>
                <Input
                  id="agent-document-path"
                  placeholder="vs_xxxxxxxxxxxxx"
                  {...register("documentPath")}
                />
              </div>
            ) : null}

            {/* Chave de API */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="agent-api-key">Chave de API</Label>
              <Input
                id="agent-api-key"
                placeholder={
                  isEdit
                    ? "Deixe em branco para manter a atual"
                    : "Cole sua chave de API"
                }
                {...register("apiKey")}
              />
            </div>

            {/* Instruções do Agente */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Label>
                  Instruções do Agente
                  {promptMode === "blocks" ? (
                    <span className="ml-1.5 text-xs font-normal text-muted-foreground">
                      {filledSectionsCount}/{PROMPT_SECTION_DEFS.length} seções
                    </span>
                  ) : null}
                </Label>
                <div className="flex items-center gap-1">
                  {!isEdit ? (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={handleSwitchPromptMode}
                    >
                      {promptMode === "blocks" ? "Texto livre" : "Blocos"}
                    </Button>
                  ) : null}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 gap-1.5 text-xs"
                    disabled={
                      !getCurrentPrompt().trim() || improvePrompt.isPending
                    }
                    onClick={handleImprovePrompt}
                  >
                    {improvePrompt.isPending ? (
                      <>
                        <Spinner className="size-3" />
                        Melhorando...
                      </>
                    ) : (
                      <>
                        <SparklesIcon className="size-3.5" />
                        Melhorar
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {promptMode === "blocks" ? (
                <div className="flex flex-col gap-3 rounded-md border p-3">
                  {promptSections.map((section, index) => (
                    <div key={section.key} className="flex flex-col gap-1.5">
                      <span className="text-xs font-medium text-muted-foreground">
                        {section.label}
                      </span>
                      <Textarea
                        rows={2}
                        placeholder={section.placeholder}
                        value={section.value}
                        onChange={e => {
                          const next = [...promptSections]
                          next[index] = { ...section, value: e.target.value }
                          setValue("promptSections", next)
                        }}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <Textarea
                  id="agent-prompt"
                  rows={7}
                  placeholder="Descreva o comportamento, o tom e os objetivos do agente."
                  {...register("rawPrompt")}
                />
              )}
            </div>

            {/* Ícone */}
            <div className="flex flex-col gap-2">
              <Label>Ícone</Label>
              <div className="flex items-center gap-3">
                {isEdit && agent?.icon ? (
                  <Avatar className="size-10 shrink-0">
                    <AvatarImage src={agent.icon} alt={agent.title} />
                    <AvatarFallback className="text-xs">
                      {agent.title.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ) : null}
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={() => iconFileRef.current?.click()}
                  >
                    <ImageIcon className="size-4" />
                    {iconFile
                      ? iconFile.name
                      : isEdit
                        ? "Trocar ícone"
                        : "Selecionar imagem"}
                  </Button>
                  {iconFile ? (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 text-xs text-muted-foreground"
                      onClick={() => {
                        setIconFile(null)
                        if (iconFileRef.current) iconFileRef.current.value = ""
                      }}
                    >
                      Remover
                    </Button>
                  ) : null}
                </div>
                <input
                  ref={iconFileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => setIconFile(e.target.files?.[0] ?? null)}
                />
              </div>
            </div>

            {/* Descrição */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="agent-description">Descrição</Label>
              <Textarea
                id="agent-description"
                rows={2}
                placeholder="Breve descrição do que o agente faz."
                {...register("description")}
              />
            </div>

            {/* Retenção do histórico */}
            <div className="flex flex-col gap-3 rounded-md border p-3">
              <p className="text-sm font-medium">Retenção do histórico</p>
              <div className="flex items-center gap-3">
                <Controller
                  name="inheritTtl"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="inherit-ttl"
                      checked={field.value}
                      onCheckedChange={checked => {
                        field.onChange(checked)
                        if (checked) setValue("retentionDays", 90)
                      }}
                    />
                  )}
                />
                <Label
                  htmlFor="inherit-ttl"
                  className="font-normal text-muted-foreground"
                >
                  Herdar configuração da organização
                </Label>
              </div>
              {!inheritTtl ? (
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      Manter histórico por
                    </span>
                    <Input
                      type="number"
                      className="h-8 w-20"
                      aria-invalid={!!errors.retentionDays}
                      {...register("retentionDays", { valueAsNumber: true })}
                    />
                    <span className="text-sm text-muted-foreground">dias</span>
                  </div>
                  <FieldError errors={[errors.retentionDays]} />
                </div>
              ) : null}
            </div>

            {/* Restrição de horário */}
            <div className="flex flex-col gap-3 rounded-md border p-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Restrição de horário</p>
                <Controller
                  name="temporalEnabled"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
              {temporalEnabled ? (
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs text-muted-foreground">
                      Dias permitidos
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {DAYS_OF_WEEK.map(day => (
                        <Button
                          key={day.value}
                          type="button"
                          variant={
                            allowedDays.includes(day.value)
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          className="h-7 rounded-full px-2.5 text-xs"
                          onClick={() => handleToggleDay(day.value)}
                        >
                          {day.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <Label className="text-xs font-normal text-muted-foreground">
                        Início
                      </Label>
                      <Input
                        type="time"
                        className="h-8"
                        {...register("startTime")}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label className="text-xs font-normal text-muted-foreground">
                        Fim
                      </Label>
                      <Input
                        type="time"
                        className="h-8"
                        {...register("endTime")}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs font-normal text-muted-foreground">
                      Timezone
                    </Label>
                    <Controller
                      name="timezone"
                      control={control}
                      render={({ field }) => (
                        <NativeSelect
                          className="w-full"
                          value={field.value}
                          onChange={e => field.onChange(e.target.value)}
                        >
                          <NativeSelectOption value="">
                            Selecione o timezone
                          </NativeSelectOption>
                          {TIMEZONE_OPTIONS.map(tz => (
                            <NativeSelectOption key={tz} value={tz}>
                              {tz}
                            </NativeSelectOption>
                          ))}
                        </NativeSelect>
                      )}
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </form>

          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button
              type="submit"
              form="agent-form"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Spinner /> Salvando...
                </>
              ) : isEdit ? (
                "Salvar"
              ) : (
                "Criar"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Comparação de prompt melhorado */}
      <Dialog open={isImproveOpen} onOpenChange={setIsImproveOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Prompt melhorado</DialogTitle>
            <DialogDescription>
              Compare o prompt original com a versão melhorada pela IA e decida
              qual usar.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">Prompt atual</p>
              <div className="max-h-72 overflow-y-auto rounded-md border bg-muted/50 p-3 text-sm text-muted-foreground whitespace-pre-wrap">
                {getCurrentPrompt()}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">Prompt melhorado</p>
              <div className="max-h-72 overflow-y-auto rounded-md border p-3 text-sm whitespace-pre-wrap">
                {improvedPromptValue}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsImproveOpen(false)}>
              Rejeitar
            </Button>
            <Button onClick={handleAcceptImprovedPrompt}>Aceitar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
