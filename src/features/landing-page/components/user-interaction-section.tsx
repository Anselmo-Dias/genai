import { useCallback, useLayoutEffect, useRef, useState } from "react"
import type { LucideIcon } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import {
  MessageSquare,
  Clock,
  LayoutGrid,
  Paperclip,
  Search,
  Lock,
  ChevronDown,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { SectionContainer } from "./section-container"

const EASE_OUT = [0.2, 0.8, 0.2, 1] as const

const fadeSlideIn = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
} as const

type FeatureKey = "chat" | "history" | "multi" | "files" | "rag" | "sso"

type Feature = {
  key: FeatureKey
  label: string
  icon: LucideIcon
  title: string
  desc: string
  items: string[]
}

const FEATURES: Feature[] = [
  {
    key: "chat",
    label: "Interface de Chat Corporativa",
    icon: MessageSquare,
    title: "Interface de Chat Corporativa",
    desc: "Acesse seus agentes via uma interface conversacional intuitiva, desenhada para o ambiente empresarial.",
    items: [
      "Interface web moderna e responsiva",
      "Suporte a markdown e blocos de código",
      "Acesso via browser, sem instalação",
      "Compatível com desktop e mobile",
    ],
  },
  {
    key: "history",
    label: "Histórico Persistente",
    icon: Clock,
    title: "Histórico Persistente",
    desc: "Mantenha um registro completo de todas as interações, garantindo continuidade e rastreabilidade nas conversas.",
    items: [
      "Exportação do histórico de conversas",
      "Auditoria completa por usuário e agente",
      "Busca full-text em conversas antigas",
      "Retenção configurável por política",
    ],
  },
  {
    key: "multi",
    label: "Múltiplas Conversas e Contextos",
    icon: LayoutGrid,
    title: "Múltiplas Conversas e Contextos",
    desc: "Gerencie várias conversas simultaneamente, com agentes e contextos distintos para diferentes tarefas.",
    items: [
      "Abas de conversa independentes",
      "Troca de agente sem perda de contexto",
      "Contexto isolado por thread",
      "Sem interferência entre sessões simultâneas",
    ],
  },
  {
    key: "files",
    label: "Anexo de Arquivos Direto",
    icon: Paperclip,
    title: "Anexo de Arquivos Direto",
    desc: "Amplie o contexto do agente anexando documentos e arquivos diretamente na interação, de forma segura.",
    items: [
      "Suporte a PDF, DOCX, XLSX e mais",
      "Processamento seguro e isolado",
      "Extração automática de conteúdo",
      "Arquivos não armazenados após a sessão",
    ],
  },
  {
    key: "rag",
    label: "Respostas Contextualizadas (RAG)",
    icon: Search,
    title: "Respostas Contextualizadas (RAG)",
    desc: "Agentes que respondem com base no conhecimento estruturado da sua empresa, garantindo precisão e relevância.",
    items: [
      "Citação de fontes nas respostas",
      "Retrieval semântico de alta precisão",
      "Base de conhecimento sempre atualizada",
      "Respostas auditáveis e rastreáveis",
    ],
  },
  {
    key: "sso",
    label: "Autenticação Integrada (SSO)",
    icon: Lock,
    title: "Autenticação Integrada (SSO)",
    desc: "Acesso seguro via Single Sign-On, com suporte a Google Workspace e Microsoft 365, simplificando a adoção.",
    items: [
      "Google Workspace",
      "Microsoft 365 / Azure AD",
      "Provisionamento automático de usuários",
      "MFA e políticas de acesso suportados",
    ],
  },
]

const DEFAULT_PATH = "M-50 60 C 80 60, 80 240, 180 240 L 240 240"

/** Marcador (triângulo laranja) usado nos itens do card de detalhe. */
function ItemBullet() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="#f97316" aria-hidden>
      <path d="M22 12 6 22V2z" />
    </svg>
  )
}

function DetailCard({ feature }: { feature: Feature }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl bg-neutral-200 p-[2px] electric-card dark:bg-neutral-900">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-yellow-300 via-orange-500 to-transparent opacity-80" />
      <div className="relative z-10 flex h-full min-h-[400px] flex-col overflow-hidden rounded-[22px] bg-white p-8 dark:bg-[#0A0A0A] lg:p-10">
        <div className="pointer-events-none absolute right-0 top-0 h-40 w-full bg-gradient-to-b from-orange-500/10 to-transparent" />

        <AnimatePresence mode="wait">
          <motion.div
            key={feature.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="relative z-10 flex flex-1 flex-col"
          >
            <h3 className="mb-2 text-2xl font-light tracking-tight text-neutral-900 dark:text-white font-bricolage">
              {feature.title}
            </h3>
            <p className="mb-8 mt-4 border-b border-black/10 pb-8 text-sm leading-relaxed text-neutral-600 dark:border-white/10 dark:text-neutral-400 font-sans">
              {feature.desc}
            </p>
            <div className="mb-10 flex-grow space-y-5 font-sans">
              {feature.items.map((item) => (
                <div key={item} className="group/item flex items-center gap-4">
                  <div className="flex-none transition-transform group-hover/item:translate-x-1">
                    <ItemBullet />
                  </div>
                  <span className="text-sm text-neutral-800 dark:text-white">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function AccordionItem({
  feature,
  isOpen,
  onToggle,
}: {
  feature: Feature
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border bg-neutral-100 dark:bg-[#181824] transition-colors",
        isOpen
          ? "border-orange-500/45"
          : "border-black/10 dark:border-white/5",
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-3 p-4 text-left"
      >
        <span
          className={cn(
            "text-base font-medium transition-colors",
            isOpen
              ? "text-neutral-900 dark:text-white"
              : "text-neutral-600 dark:text-neutral-300",
          )}
        >
          {feature.title}
        </span>
        <ChevronDown
          className={cn(
            "shrink-0 text-neutral-500 transition-transform duration-300",
            isOpen && "rotate-180",
          )}
          size={18}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">
              <p className="mb-4 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400 font-sans">
                {feature.desc}
              </p>
              <div className="space-y-3 font-sans">
                {feature.items.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="shrink-0">
                      <ItemBullet />
                    </span>
                    <span className="text-sm text-neutral-700 dark:text-neutral-200">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function UserInteractionSection() {
  const [activeKey, setActiveKey] = useState<FeatureKey>("chat")
  const [openKey, setOpenKey] = useState<FeatureKey | null>("chat")
  const [pathD, setPathD] = useState(DEFAULT_PATH)

  const svgRef = useRef<SVGSVGElement | null>(null)
  const buttonRefs = useRef<Partial<Record<FeatureKey, HTMLButtonElement | null>>>({})

  const activeFeature =
    FEATURES.find((f) => f.key === activeKey) ?? FEATURES[0]

  const recomputePath = useCallback(() => {
    const svg = svgRef.current
    const btn = buttonRefs.current[activeKey]
    if (!svg || !btn) return
    const svgRect = svg.getBoundingClientRect()
    const btnRect = btn.getBoundingClientRect()
    const btnCenterY = btnRect.top + btnRect.height / 2 - svgRect.top
    const svgY = Math.round((btnCenterY / svgRect.height) * 480)
    setPathD(`M-50 ${svgY} C 80 ${svgY}, 80 240, 180 240 L 240 240`)
  }, [activeKey])

  useLayoutEffect(() => {
    recomputePath()
    window.addEventListener("resize", recomputePath)
    return () => window.removeEventListener("resize", recomputePath)
  }, [recomputePath])

  return (
    <SectionContainer id="interacao" className="mt-32 mb-0">
      <motion.div
        variants={fadeSlideIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, delay: 0.1, ease: EASE_OUT }}
        className="border-gradient relative rounded-3xl bg-gradient-to-tr from-transparent via-black/[0.04] to-transparent p-6 backdrop-blur dark:via-white/[0.05] lg:p-10"
      >
        {/* Mobile: cabeçalho + acordeão */}
        <div className="relative z-10 lg:hidden">
          <h2 className="mb-3 text-3xl font-light tracking-tight text-neutral-900 dark:text-white font-bricolage">
            Como os usuários interagem com os agentes
          </h2>
          <p className="mb-8 text-base leading-relaxed text-neutral-600 dark:text-neutral-400 font-sans">
            Os agentes são disponibilizados em uma interface conversacional
            corporativa, simples de usar e preparada para o dia a dia da empresa.
          </p>
          <div className="flex flex-col gap-3">
            {FEATURES.map((feature) => (
              <AccordionItem
                key={feature.key}
                feature={feature}
                isOpen={openKey === feature.key}
                onToggle={() =>
                  setOpenKey((prev) => (prev === feature.key ? null : feature.key))
                }
              />
            ))}
          </div>
        </div>

        {/* Desktop: tabs + conector + card de detalhe */}
        <div className="relative z-10 hidden items-center gap-12 lg:grid lg:grid-cols-12">
          {/* Coluna esquerda */}
          <div className="flex flex-col justify-center lg:col-span-5">
            <h2 className="mb-3 text-3xl font-light tracking-tight text-neutral-900 dark:text-white font-bricolage md:text-4xl">
              Como os usuários interagem com os agentes
            </h2>
            <p className="mb-10 max-w-lg text-base leading-relaxed text-neutral-600 dark:text-neutral-400 font-sans">
              Os agentes são disponibilizados em uma interface conversacional
              corporativa, simples de usar e preparada para o dia a dia da
              empresa.
            </p>

            <div className="relative z-10 flex w-full max-w-md flex-col gap-3">
              {FEATURES.map((feature) => {
                const isActive = feature.key === activeKey
                const Icon = feature.icon
                return (
                  <button
                    key={feature.key}
                    type="button"
                    ref={(el) => {
                      buttonRefs.current[feature.key] = el
                    }}
                    onClick={() => setActiveKey(feature.key)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl p-4 text-left font-sans transition-all",
                      isActive
                        ? "border-t border-white/20 bg-gradient-to-r from-orange-500 to-amber-500 shadow-[0_0_30px_-10px_rgba(249,115,22,0.5)] hover:scale-[1.01]"
                        : "border border-black/10 bg-neutral-100 hover:bg-neutral-200 dark:border-white/5 dark:bg-[#181824] dark:hover:bg-[#20202e] dark:hover:border-white/10",
                    )}
                  >
                    <span
                      className={cn(
                        "text-base transition-colors",
                        isActive
                          ? "font-medium text-white"
                          : "text-neutral-500 dark:text-neutral-400",
                      )}
                    >
                      {feature.label}
                    </span>
                    <Icon
                      size={18}
                      className={cn(
                        "shrink-0 transition-colors",
                        isActive
                          ? "text-white"
                          : "text-neutral-400 dark:text-neutral-500",
                      )}
                    />
                  </button>
                )
              })}
            </div>
          </div>

          {/* Conector */}
          <div className="relative z-10 hidden h-[480px] lg:col-span-2 lg:block">
            <svg
              ref={svgRef}
              className="absolute inset-0 h-full w-full overflow-visible"
              preserveAspectRatio="none"
              viewBox="0 0 200 480"
            >
              <path
                className="animate-flow"
                d={pathD}
                fill="none"
                stroke="#f97316"
                strokeDasharray="8 8"
                strokeWidth={2}
              />
              <path
                d="M230 235 L 240 240 L 230 245"
                fill="none"
                stroke="#f97316"
                strokeWidth={2}
              />
              <circle cx={240} cy={240} fill="#f97316" r={2} />
            </svg>
          </div>

          {/* Card de detalhe */}
          <div className="relative h-full lg:col-span-5">
            <DetailCard feature={activeFeature} />
          </div>
        </div>
      </motion.div>
    </SectionContainer>
  )
}
