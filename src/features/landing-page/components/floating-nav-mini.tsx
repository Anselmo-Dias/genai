import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode } from "swiper/modules"
import "swiper/css"
import "swiper/css/free-mode"
import { Briefcase, Home, Layers, Lightbulb, Moon, Plug, ShieldCheck, Sun, Workflow } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { useTheme } from "@/components/theme-provider"
import { useScrollSpy } from "../hooks/use-scroll-spy"

/** Distância de scroll a partir da qual o header (absolute, no topo) some.
 *  Mesma referência usada pelo FloatingNav no desktop. */
const HEADER_GONE_AT = 80

/** Indica se o header já saiu de cena com o scroll. */
function useHeaderGone() {
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const update = () => setGone(window.scrollY > HEADER_GONE_AT)
    window.addEventListener("scroll", update, { passive: true })
    update()
    return () => window.removeEventListener("scroll", update)
  }, [])

  return gone
}

type NavItem = {
  id: string
  icon: LucideIcon
  label: string
}

/** Mesmas seções do rail desktop (FloatingNav), em formato compacto. */
const NAV_ITEMS: NavItem[] = [
  { id: "inicio", icon: Home, label: "Início" },
  { id: "conceito", icon: Lightbulb, label: "O conceito" },
  { id: "arquitetura", icon: Workflow, label: "Como funciona" },
  { id: "identidade", icon: ShieldCheck, label: "Identidade" },
  { id: "ecossistema", icon: Plug, label: "Integração" },
  { id: "funcionalidades", icon: Layers, label: "Funcionalidades" },
  { id: "casos", icon: Briefcase, label: "Casos de uso" },
]

const SECTION_IDS = NAV_ITEMS.map((item) => item.id)

/**
 * Versão minimalista e mobile-only do rail de navegação.
 * Barra fixa no rodapé, com os atalhos de seção dentro de um Swiper
 * (free mode) — o usuário desliza horizontalmente entre as seções.
 * No desktop (lg+) este componente some; lá quem atua é o FloatingNav.
 */
export function FloatingNavMini() {
  const activeId = useScrollSpy(SECTION_IDS)
  const { theme, setTheme } = useTheme()
  const isLight = theme === "light"
  const headerGone = useHeaderGone()

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    const target = document.getElementById(id)
    if (!target) return
    event.preventDefault()
    target.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <AnimatePresence>
      {headerGone && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
          className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 lg:hidden"
        >
          <nav
        aria-label="Navegação por seções"
        className="pointer-events-auto flex max-w-[calc(100vw-2rem)] items-center gap-1.5 rounded-full border border-black/10 bg-white/85 p-1.5 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-[#050505]/80"
      >
        <Swiper
          modules={[FreeMode]}
          freeMode
          slidesPerView="auto"
          spaceBetween={4}
          className="min-w-0 flex-1"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id
            return (
              <SwiperSlide key={item.id} className="!w-auto">
                <a
                  href={`#${item.id}`}
                  onClick={(event) => handleClick(event, item.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                    isActive
                      ? "bg-[#F97316]/15 text-[#F97316]"
                      : "text-neutral-500 hover:text-[#F97316] dark:text-neutral-400 dark:hover:text-[#F97316]",
                  )}
                >
                  <item.icon className="h-3.5 w-3.5 shrink-0" />
                  <span className="whitespace-nowrap">{item.label}</span>
                </a>
              </SwiperSlide>
            )
          })}
        </Swiper>

        {/* Divisor + toggle de tema fixo (fora do Swiper) */}
        <span className="h-5 w-px shrink-0 bg-black/10 dark:bg-white/10" />
        <button
          type="button"
          aria-label="Alternar tema claro/escuro"
          onClick={() => setTheme(isLight ? "dark" : "light")}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-neutral-500 transition-colors hover:text-[#F97316] dark:text-neutral-400 dark:hover:text-[#F97316]"
        >
          {isLight ? (
            <Sun className="h-3.5 w-3.5" />
          ) : (
            <Moon className="h-3.5 w-3.5" />
          )}
        </button>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
