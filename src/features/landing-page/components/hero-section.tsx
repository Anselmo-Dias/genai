import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"

import heroImage from "@/assets/hero-1-1.svg"

const EASE_OUT = [0.2, 0.8, 0.2, 1] as const

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="flex flex-col overflow-hidden w-full pt-[var(--header-height)] relative bg-background"
    >
      {/* Hero Content — texto à esquerda + preview do app à direita (xl+) */}
      <div className="flex flex-col px-6 lg:px-12 relative z-10 py-16 md:py-20">
        <div className="w-full max-w-[1400px] mx-auto flex flex-col xl:flex-row xl:items-center xl:justify-between xl:gap-12 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.3, ease: EASE_OUT }}
            className="min-w-0 flex-1 text-left space-y-6 max-w-3xl xl:max-w-2xl"
          >
            <span className="inline-block text-xs font-bold tracking-[0.12em] uppercase text-[#FF720A]">
              mobileX GenAI
            </span>

            <h1 className="text-[56px] md:text-[68px] font-semibold tracking-tighter leading-[105%] font-manrope text-[#3f1f57]">
              O lugar onde sua organização gerencia todos os{" "}
              <span className="animate-text-shimmer">agentes de IA.</span>
            </h1>

            <p className="text-lg font-medium leading-[180%] text-neutral-600 dark:text-white max-w-xl">
              Quando a IA entra de verdade na operação, surgem vários agentes —
              para diferentes áreas, pessoas e sistemas. O GenAI é a plataforma
              central para criar, orquestrar e governar todos eles, em um só
              lugar.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#demo"
                className="inline-flex items-center gap-2 bg-[#FF720A] hover:bg-[#e0620a] text-white font-bold text-sm px-5 py-3 rounded-full transition-colors duration-200"
              >
                Agendar demonstração
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#conceito"
                className="inline-flex items-center gap-2 border border-black/20 hover:border-black/40 text-neutral-900 dark:border-white/30 dark:hover:border-white/60 dark:text-white font-semibold text-sm px-5 py-3 rounded-full transition-colors duration-200 backdrop-blur-sm"
              >
                Entenda o conceito
              </a>
            </div>
          </motion.div>

          {/* Preview do produto — só em telas grandes (xl+) */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: EASE_OUT }}
            className="mt-16 hidden w-full max-w-xl shrink-0 xl:mt-0 xl:block xl:self-end"
          >
            <img
              src={heroImage}
              alt="Preview da interface do mobileX GenAI"
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </div>

      {/*
        Trilho inferior do hero — full-bleed, de extremidade a extremidade,
        separando o hero da seção seguinte ("O conceito"). Mesma espessura/cor/
        opacidade das demais linhas estruturais; só em lg+, como as outras.
      */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-px bg-black/10 lg:block dark:bg-white/10" />
    </section>
  )
}
