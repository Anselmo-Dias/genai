import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"

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
          {/* mobile (< md) */}
          <source media="(max-width: 767px)" srcSet={heroBgMobile} />
          {/* tablet 4:3 (md até < xl) */}
          <source media="(max-width: 1279px)" srcSet={heroBg43} />
          {/* desktop wide (>= xl) */}
          <img
            src={heroBg}
            alt=""
            className="absolute inset-0 w-full h-full object-cover brightness-[0.65]"
          />
        </picture>
        {/* Overlay na faixa inferior: escurece a base onde o texto fica nos
            dois cantos, deixando o topo/centro da imagem (logo) mais visíveis */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      </div>

      {/* Hero Content — distribuído nos dois cantos inferiores */}
      <div className="flex-1 flex flex-col px-6 lg:px-12 mt-12 mb-16 lg:mb-20 relative z-10 justify-end">
        <div className="w-full max-w-[1400px] mx-auto flex flex-col-reverse md:flex-row justify-between items-end gap-12">
          {/* Canto inferior-esquerdo: subtexto + CTA sublinhado */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.6, ease: EASE_OUT }}
            className="max-w-md space-y-8 text-left"
          >
            <p className="leading-relaxed md:text-base text-sm font-light text-neutral-300 tracking-normal font-sans">
              Crie, configure e opere agentes inteligentes com múltiplos
              provedores de IA, RAG, MCP e observabilidade completa — tudo em
              uma única plataforma corporativa.
            </p>

            {/* CTA único — link sublinhado com underline animado e seta */}
            <a
              href="#"
              className="group relative inline-flex items-center gap-2 pb-2 text-xs font-bold uppercase tracking-widest text-white cursor-pointer"
            >
              Agendar demonstração
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              {/* underline base */}
              <span className="absolute bottom-0 left-0 h-px w-full bg-white/25" />
              {/* underline animado (laranja) que entra a partir da esquerda */}
              <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[#F97316] transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          </motion.div>

          {/* Canto inferior-direito: título */}
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.4, ease: EASE_OUT }}
            className="flex flex-col gap-y-1 leading-[0.95] md:text-[4rem] lg:text-[5rem] cursor-default text-3xl font-semibold tracking-tighter font-manrope text-left md:text-right"
          >
            <span className="inline-block leading-[0.95] bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/60">
              Orquestre agentes de IA com governança, controle e escala
            </span>
          </motion.h1>
        </div>
      </div>
    </section>
  )
}
