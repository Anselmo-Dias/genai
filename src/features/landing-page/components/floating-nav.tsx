import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import {
  Briefcase,
  Home,
  Layers,
  Lightbulb,
  Moon,
  Plug,
  ShieldCheck,
  Sun,
  Workflow,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { useTheme } from "@/components/theme-provider"
import { useScrollSpy } from "../hooks/use-scroll-spy"

/** Animação de reflow (FLIP) usada quando o rail morfa de lateral → topo. */
const LAYOUT_TRANSITION = { type: "spring", stiffness: 320, damping: 34 } as const

/**
 * Surgimento do rail (pílula das bolinhas): orquestra os filhos em cascata,
 * fazendo as bolinhas "caírem" de cima para baixo, construindo o rail.
 */
const railPillVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.08 },
  },
} as const

/** Cada bolinha entra caindo de cima, dando a sensação de construção. */
const railItemVariants = {
  hidden: { opacity: 0, y: -16, scale: 0.3 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 520, damping: 24 },
  },
} as const

/** Toggle de tema dá o "plup" final, depois de todas as bolinhas. */
const railToggleVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 650, damping: 13, delay: 0.7 },
  },
} as const

/**
 * Faixa de viewport em que o rail lateral atrapalha o conteúdo central.
 * Até 1550px o conteúdo ainda fica próximo das bordas, então o rail morfa
 * para o topo. Acima disso há espaço de sobra nas laterais e o rail
 * permanece sempre na lateral.
 */
const COMPACT_QUERY = "(min-width: 1024px) and (max-width: 1549.98px)"

/** Distância de scroll a partir da qual o header (absolute, no topo) some. */
const HEADER_GONE_AT = 80

type NavItem = {
  id: string
  icon: LucideIcon
  label: string
}

const NAV_ITEMS: NavItem[] = [
  { id: "inicio", icon: Home, label: "Início" },
  { id: "conceito", icon: Lightbulb, label: "O conceito" },
  { id: "arquitetura", icon: Workflow, label: "Como funciona" },
  { id: "identidade", icon: ShieldCheck, label: "Identidade do usuário" },
  { id: "ecossistema", icon: Plug, label: "Integração" },
  { id: "funcionalidades", icon: Layers, label: "Funcionalidades" },
  { id: "casos", icon: Briefcase, label: "Casos de uso" },
]

const SECTION_IDS = NAV_ITEMS.map((item) => item.id)

/**
 * Define se o rail deve se "encaixar como header" no topo-centro.
 * Só acontece em telas menores (faixa lg) e quando o header original já
 * saiu de cena com o scroll.
 */
function useDockedHeader() {
  const [docked, setDocked] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(COMPACT_QUERY)
    let compact = mq.matches

    const update = () => {
      const headerGone = window.scrollY > HEADER_GONE_AT
      setDocked(compact && headerGone)
    }

    const onMqChange = (event: MediaQueryListEvent) => {
      compact = event.matches
      update()
    }

    mq.addEventListener("change", onMqChange)
    window.addEventListener("scroll", update, { passive: true })
    update()

    return () => {
      mq.removeEventListener("change", onMqChange)
      window.removeEventListener("scroll", update)
    }
  }, [])

  return docked
}

export function FloatingNav() {
  const activeId = useScrollSpy(SECTION_IDS)
  const { theme, setTheme } = useTheme()
  const isLight = theme === "light"
  const docked = useDockedHeader()

  // No desktop, o rail fica oculto enquanto a seção hero ("inicio") está ativa.
  const hiddenOnHero = activeId === "inicio"

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    const target = document.getElementById(id)
    if (!target) return
    event.preventDefault()
    target.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  // Tooltip à direita no modo lateral; abaixo no modo header (topo-centro).
  const tooltipClass = docked
    ? "top-full mt-2 left-1/2 -translate-x-1/2"
    : "left-12"

  const pillBase =
    "flex gap-2 rounded-full border border-black/10 bg-white/85 p-2 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-[#050505]/80"

  return (
    // Wrapper de posicionamento (não animado): centraliza via flex para que
    // o motion.aside fique livre de transforms e o `layout` anime sem brigas.
    <div
      className={cn(
        "pointer-events-none fixed z-40 hidden lg:flex",
        docked
          ? "inset-x-0 top-4 justify-center"
          : "bottom-0 left-6 top-0 flex-col justify-center",
      )}
    >
      <AnimatePresence>
        {!hiddenOnHero && (
          <motion.aside
            key="rail"
            layout
            transition={LAYOUT_TRANSITION}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={cn(
              "pointer-events-auto flex items-center gap-3",
              docked ? "flex-row" : "flex-col",
            )}
          >
            <motion.div
              layout
              variants={railPillVariants}
              transition={LAYOUT_TRANSITION}
              className={cn(
                pillBase,
                docked ? "flex-row" : "flex-col items-center",
              )}
            >
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id
            return (
              <motion.a
                key={item.id}
                layout
                variants={railItemVariants}
                transition={LAYOUT_TRANSITION}
                href={`#${item.id}`}
                onClick={(event) => handleClick(event, item.id)}
                aria-label={item.label}
                aria-current={isActive ? "true" : undefined}
                className="group relative grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-black/5 dark:hover:bg-white/5"
              >
                {isActive && (
                  <motion.span
                    layoutId="rail-active"
                    className="absolute inset-0 rounded-full bg-[#F97316]/15 ring-1 ring-[#F97316]/30"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <item.icon
                  className={cn(
                    "relative h-4 w-4 transition-colors",
                    isActive
                      ? "text-[#F97316]"
                      : "text-neutral-400 group-hover:text-[#F97316]",
                  )}
                />
                <span
                  className={cn(
                    "pointer-events-none absolute z-10 whitespace-nowrap rounded bg-neutral-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:bg-white dark:text-neutral-900",
                    tooltipClass,
                  )}
                >
                  {item.label}
                </span>
              </motion.a>
            )
          })}
        </motion.div>

        {/* Toggle de tema — bolinha separada (abaixo no modo lateral, ao lado no header) */}
        <motion.div
          layout
          variants={railToggleVariants}
          transition={LAYOUT_TRANSITION}
          className={pillBase}
        >
          <button
            type="button"
            aria-label="Alternar tema claro/escuro"
            onClick={() => setTheme(isLight ? "dark" : "light")}
            className="group relative grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-black/5 dark:hover:bg-white/5"
          >
            {isLight ? (
              <Sun className="relative h-4 w-4 text-neutral-400 transition-colors group-hover:text-[#F97316]" />
            ) : (
              <Moon className="relative h-4 w-4 text-neutral-400 transition-colors group-hover:text-[#F97316]" />
            )}
            <span
              className={cn(
                "pointer-events-none absolute z-10 whitespace-nowrap rounded bg-neutral-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:bg-white dark:text-neutral-900",
                tooltipClass,
              )}
            >
              {isLight ? "Tema claro" : "Tema escuro"}
            </span>
          </button>
        </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  )
}
