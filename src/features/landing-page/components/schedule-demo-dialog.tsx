import { createContext, useContext, useState, type ReactNode } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { CheckCircle2, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const scheduleDemoSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome."),
  email: z
    .string()
    .trim()
    .regex(EMAIL_REGEX, "Informe um e-mail corporativo válido."),
  empresa: z.string().trim().min(2, "Informe o nome da empresa."),
  telefone: z.string().trim().min(8, "Informe um telefone/WhatsApp válido."),
  cargo: z.string().trim().optional(),
  porte: z.string().optional(),
  mensagem: z.string().trim().max(500, "Máximo de 500 caracteres.").optional(),
})

type ScheduleDemoValues = z.infer<typeof scheduleDemoSchema>

const PORTE_OPTIONS = [
  "1–10 colaboradores",
  "11–50 colaboradores",
  "51–200 colaboradores",
  "201–1000 colaboradores",
  "Mais de 1000 colaboradores",
]

type ScheduleDemoContextValue = { open: () => void }

const ScheduleDemoContext = createContext<ScheduleDemoContextValue | null>(null)

/**
 * Abre o dialog de "Agendar demonstração" a partir de qualquer botão/CTA da
 * landing. Deve ser usado dentro de <ScheduleDemoProvider>.
 */
export function useScheduleDemo() {
  const ctx = useContext(ScheduleDemoContext)
  if (!ctx) {
    throw new Error(
      "useScheduleDemo deve ser usado dentro de <ScheduleDemoProvider>.",
    )
  }
  return ctx
}

/**
 * Provider que mantém um único dialog de agendamento compartilhado por toda a
 * landing. Envolva o conteúdo da página e chame `open()` (via useScheduleDemo)
 * nos botões "Agendar demonstração".
 */
export function ScheduleDemoProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <ScheduleDemoContext.Provider value={{ open: () => setIsOpen(true) }}>
      {children}
      <ScheduleDemoDialog open={isOpen} onOpenChange={setIsOpen} />
    </ScheduleDemoContext.Provider>
  )
}

function ScheduleDemoDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ScheduleDemoValues>({
    resolver: zodResolver(scheduleDemoSchema),
    defaultValues: {
      nome: "",
      email: "",
      empresa: "",
      telefone: "",
      cargo: "",
      porte: "",
      mensagem: "",
    },
  })

  const onSubmit = async (values: ScheduleDemoValues) => {
    // TODO: integrar com a rota de agendamento (service + mutation) quando o
    // endpoint estiver disponível. Por ora apenas simula o envio.
    await new Promise((resolve) => setTimeout(resolve, 800))
    console.log("[agendar-demo] solicitação:", values)
    setSubmitted(true)
  }

  const handleOpenChange = (next: boolean) => {
    onOpenChange(next)
    if (!next) {
      // Restaura o formulário após a animação de fechamento.
      setTimeout(() => {
        setSubmitted(false)
        reset()
      }, 200)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[540px]">
        {submitted ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <CheckCircle2
              className="h-12 w-12 text-[#FF720A]"
              strokeWidth={1.5}
            />
            <DialogTitle>Solicitação recebida!</DialogTitle>
            <DialogDescription>
              Obrigado. Nossa equipe entrará em contato em breve para agendar
              sua demonstração do mobileX GenAI.
            </DialogDescription>
            <Button className="mt-2" onClick={() => handleOpenChange(false)}>
              Fechar
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Agendar demonstração</DialogTitle>
              <DialogDescription>
                Preencha seus dados e nossa equipe entrará em contato para
                agendar uma demonstração do{" "}
                <ScribbleHighlight>mobileX GenAI</ScribbleHighlight>.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Field id="nome" label="Nome completo" required error={errors.nome?.message}>
                <Input id="nome" placeholder="Seu nome" {...register("nome")} />
              </Field>

              <Field
                id="email"
                label="E-mail corporativo"
                required
                error={errors.email?.message}
              >
                <Input
                  id="email"
                  type="email"
                  placeholder="voce@empresa.com.br"
                  {...register("email")}
                />
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  id="empresa"
                  label="Empresa"
                  required
                  error={errors.empresa?.message}
                >
                  <Input
                    id="empresa"
                    placeholder="Nome da empresa"
                    {...register("empresa")}
                  />
                </Field>

                <Field
                  id="telefone"
                  label="Telefone / WhatsApp"
                  required
                  error={errors.telefone?.message}
                >
                  <Input
                    id="telefone"
                    type="tel"
                    placeholder="(00) 00000-0000"
                    {...register("telefone")}
                  />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="cargo" label="Cargo" hint="(opcional)">
                  <Input
                    id="cargo"
                    placeholder="Seu cargo"
                    {...register("cargo")}
                  />
                </Field>

                <Field id="porte" label="Porte da empresa" hint="(opcional)">
                  <Controller
                    control={control}
                    name="porte"
                    render={({ field }) => (
                      <Select
                        value={field.value || undefined}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger id="porte" className="w-full">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          {PORTE_OPTIONS.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </Field>
              </div>

              <Field
                id="mensagem"
                label="Mensagem"
                hint="(opcional)"
                error={errors.mensagem?.message}
              >
                <Textarea
                  id="mensagem"
                  rows={3}
                  placeholder="Conte rapidamente o que você gostaria de ver na demonstração."
                  {...register("mensagem")}
                />
              </Field>

              <DialogFooter className="gap-2 sm:gap-2">
                <DialogClose asChild>
                  <Button type="button" variant="outline" disabled={isSubmitting}>
                    Cancelar
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  )}
                  {isSubmitting ? "Enviando..." : "Solicitar demonstração"}
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

/**
 * Rabisco oval desenhado à mão em volta do texto, no padrão da referência
 * (efeito do "soluções"): SVG absoluto centralizado sobre a palavra, com o
 * texto em z-10. O path é o mesmo da referência; aqui ele estica junto com o
 * texto (preserveAspectRatio="none") e dimensiona em `em`, com traço fixo e
 * fino (non-scaling-stroke) para funcionar no font-size pequeno do modal.
 */
function ScribbleHighlight({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-flex whitespace-nowrap">
      <span className="relative z-10">{children}</span>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[1.9em] w-[calc(100%+0.9em)] -translate-x-1/2 -translate-y-1/2"
        viewBox="0 0 215 78"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          className="stroke-[#532971] dark:stroke-[#8b5cf6]"
          d="M158.557 18.0539C76.7629 3.59645 4.61999 27.4373 2.52132 45.016C-3.48726 95.3446 236.85 65.2142 210.188 23.9397C199.842 7.92214 121.61 -0.649778 30.7298 18.0808"
          strokeWidth="1.25"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  )
}

function Field({
  id,
  label,
  required,
  hint,
  error,
  children,
}: {
  id: string
  label: string
  required?: boolean
  hint?: string
  error?: string
  children: ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-[#FF720A]"> *</span>}
        {hint && (
          <span className="font-normal text-muted-foreground"> {hint}</span>
        )}
      </Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}
