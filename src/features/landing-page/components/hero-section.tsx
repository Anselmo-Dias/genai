import { motion } from "motion/react"

import heroBg from "@/assets/hero-bg.jpeg"
import heroBgMobile from "@/assets/hero-bg-mobile.jpeg"
import heroBg43 from "@/assets/hero-bg-4-3.jpeg"

const EASE_OUT = [0.2, 0.8, 0.2, 1] as const

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="min-h-screen flex flex-col overflow-hidden w-full pt-16 md:pt-16 relative"
    >
      {/* Background image — versão mobile abaixo de md, desktop acima */}
      <div className="absolute inset-0 -z-10">
        <picture>
          <source media="(max-width: 767px)" srcSet={heroBgMobile} />
          <source media="(max-width: 1279px)" srcSet={heroBg43} />
          <img
            src={heroBg}
            alt=""
            className="absolute inset-0 w-full h-full object-cover brightness-[0.65]"
          />
        </picture>
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Hero Content — centralizado verticalmente, alinhado à esquerda */}
      <div className="flex-1 flex flex-col px-6 lg:px-12 relative z-10 justify-center">
        <div className="w-full max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.3, ease: EASE_OUT }}
            className="text-left space-y-6 max-w-3xl"
          >
            <span className="inline-block text-xs font-bold tracking-[0.12em] uppercase text-[#FF720A]">
              mobileX GenAI
            </span>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tighter leading-[1.05] font-manrope text-white">
              O lugar onde sua organização gerencia todos os agentes de IA.
            </h1>

            <p className="text-sm md:text-base leading-relaxed text-neutral-300 max-w-xl">
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
              </a>
              <a
                href="#conceito"
                className="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 text-white font-semibold text-sm px-5 py-3 rounded-full transition-colors duration-200 backdrop-blur-sm"
              >
                Entenda o conceito
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
