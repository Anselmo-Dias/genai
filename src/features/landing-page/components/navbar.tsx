import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import {
  Activity,
  BookOpen,
  Bot,
  ChevronDown,
  Menu,
  Moon,
  Plug,
  Sun,
  X,
} from "lucide-react"

import { useTheme } from "@/components/theme-provider"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

const NAV_LINKS = [
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Capacidades", href: "#capacidades" },
  { label: "Segurança", href: "#seguranca" },
  { label: "Casos de uso", href: "#casos" },
]

const PLATFORM_PILLARS = [
  {
    icon: Bot,
    title: "Gestão centralizada de agentes",
    description: "Crie, versiona e administre agentes em um único lugar.",
    href: "#plataforma",
  },
  {
    icon: BookOpen,
    title: "Conhecimento e contexto com RAG",
    description: "Conecte documentos para respostas precisas e auditáveis.",
    href: "#capacidades",
  },
  {
    icon: Plug,
    title: "Integração com tools e MCP",
    description: "Conecte APIs, CRMs e ERPs com segurança e controle.",
    href: "#arquitetura",
  },
  {
    icon: Activity,
    title: "Governança e observabilidade",
    description: "Acompanhe custo, uso, latência e erros por agente.",
    href: "#seguranca",
  },
]

const EASE_OUT = [0.2, 0.8, 0.2, 1] as const

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const isLight = theme === "light"

  // Rolagem suave apenas para links com âncora real (#secao); placeholders ("#") são ignorados.
  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (!href.startsWith("#") || href === "#") return
    const target = document.getElementById(href.slice(1))
    if (!target) return
    event.preventDefault()
    target.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: EASE_OUT }}
      className="absolute top-0 inset-x-0 w-full px-6 py-6 lg:px-12 z-50"
    >
      <div className="w-full max-w-[1400px] mx-auto flex justify-between items-center">
        {/* Marca (esquerda) */}
        <a
          href="#inicio"
          onClick={(event) => handleNavClick(event, "#inicio")}
          className="flex items-center gap-3 text-white hover:text-[#F97316] transition-colors"
        >
          <span className="font-medium text-lg tracking-tight">mobileX GenAI</span>
        </a>

        {/* Links + toggle (direita) */}
        <div className="hidden md:flex items-center gap-8 text-xs font-medium uppercase tracking-wide text-neutral-300">
          <HoverCard openDelay={150} closeDelay={100}>
            <HoverCardTrigger asChild>
              <a
                href="#plataforma"
                onClick={(event) => handleNavClick(event, "#plataforma")}
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                Plataforma
                <ChevronDown className="w-3.5 h-3.5" />
              </a>
            </HoverCardTrigger>
            <HoverCardContent align="end" className="w-80 p-3">
              <div className="flex flex-col gap-1">
                {PLATFORM_PILLARS.map((pillar) => (
                  <a
                    key={pillar.title}
                    href={pillar.href}
                    onClick={(event) => handleNavClick(event, pillar.href)}
                    className="flex items-start gap-3 rounded-md p-2 hover:bg-accent transition-colors"
                  >
                    <pillar.icon className="w-4 h-4 mt-0.5 shrink-0 text-[#F97316]" />
                    <span className="flex flex-col gap-0.5">
                      <span className="text-sm font-medium text-popover-foreground normal-case tracking-normal">
                        {pillar.title}
                      </span>
                      <span className="text-xs text-muted-foreground leading-relaxed normal-case tracking-normal">
                        {pillar.description}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </HoverCardContent>
          </HoverCard>

          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(event) => handleNavClick(event, link.href)}
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              {link.label}
            </a>
          ))}

          <div className="h-4 w-px bg-white/15" />

          <button
            type="button"
            aria-label="Alternar tema claro/escuro"
            title="Alternar tema"
            onClick={() => setTheme(isLight ? "dark" : "light")}
            className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/15 text-neutral-300 hover:text-[#F97316] hover:border-white/40 transition-colors"
          >
            {isLight ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
          </button>
        </div>

        {/* Mobile: toggle + hambúrguer */}
        <div className="flex md:hidden items-center gap-4">
          <button
            type="button"
            aria-label="Alternar tema claro/escuro"
            title="Alternar tema"
            onClick={() => setTheme(isLight ? "dark" : "light")}
            className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/15 text-neutral-300 hover:text-[#F97316] hover:border-white/40 transition-colors"
          >
            {isLight ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
          </button>

          <button
            type="button"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/15 text-neutral-300 hover:text-[#F97316] hover:border-white/40 transition-colors"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden absolute top-full left-0 right-0 bg-[#050505]/95 backdrop-blur-md border-t border-white/10 overflow-hidden"
          >
            <div className="px-6 py-4 max-w-[1400px] mx-auto w-full flex flex-col gap-1">
              <a
                href="#plataforma"
                onClick={(event) => {
                  handleNavClick(event, "#plataforma")
                  setIsMenuOpen(false)
                }}
                className="block py-3 text-base font-medium text-neutral-300 hover:text-[#F97316] transition-colors"
              >
                Plataforma
              </a>
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(event) => {
                    handleNavClick(event, link.href)
                    setIsMenuOpen(false)
                  }}
                  className="block py-3 text-base font-medium text-neutral-300 hover:text-[#F97316] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
