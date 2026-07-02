import { ArrowRight, ArrowUpRight } from "lucide-react"

import heroImage from "@/assets/hero-1-1.svg"
import { useScheduleDemo } from "./schedule-demo-dialog"

export function HeroSection() {
  const { open: openScheduleDemo } = useScheduleDemo()

  return (
    <section
      id="inicio"
      className="flex flex-col overflow-hidden w-full pt-[var(--header-height)] relative bg-background"
    >
      {/* Hero Content — texto à esquerda + preview do app à direita (xl+) */}
      <div className="flex flex-col px-6 lg:px-12 relative z-10 py-16 md:py-20">
        <div className="w-full max-w-[1400px] mx-auto flex flex-col xl:flex-row xl:items-center xl:justify-between xl:gap-12 lg:px-10">
          <div className="min-w-0 flex-1 text-left space-y-6 max-w-3xl xl:max-w-2xl">
            <span className="inline-block text-xs font-bold tracking-[0.12em] uppercase text-[#FF720A]">
              mobileX GenAI
            </span>

            <h1 className="text-[56px] md:text-[68px] font-semibold tracking-tighter leading-[105%] font-manrope text-[#3f1f57] dark:text-[#a370d6]">
              O lugar onde sua organização gerencia todos os{" "}
              <span className="animate-text-shimmer">agentes de IA.</span>
            </h1>

            <p className="text-lg font-medium leading-[180%] text-neutral-600 dark:text-white max-w-xl">
              Quando a IA entra de verdade na operação, surgem vários agentes —
              para diferentes áreas, pessoas e sistemas. O GenAI é a plataforma
              central para criar, orquestrar e governar todos eles, em um só
              lugar.
            </p>

            {/*
              CTAs — como na referência: full-width e empilhados no mobile
              (botão `w-full justify-center`), largura natural lado a lado a
              partir do tablet (`tablet:w-fit` ≈ md:).
            */}
            <div className="flex w-full flex-col gap-3 pt-2 md:w-auto md:flex-row md:flex-wrap">
              <button
                type="button"
                onClick={openScheduleDemo}
                className="inline-flex w-full items-center justify-center gap-2 bg-[#FF720A] hover:bg-[#e0620a] text-white font-bold text-sm px-5 py-3 rounded-full transition-colors duration-200 md:w-fit"
              >
                Agendar demonstração
                <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href="https://genai.mobilex.tech/"
                className="inline-flex w-full items-center justify-center gap-2 border border-black/20 hover:border-black/40 text-neutral-900 dark:border-white/30 dark:hover:border-white/60 dark:text-white font-semibold text-sm px-5 py-3 rounded-full transition-colors duration-200 backdrop-blur-sm md:w-fit"
              >
                Acessar plataforma
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/*
            Preview do produto — como na referência, o mockup aparece em todas
            as larguras: abaixo do texto quando empilhado (< xl) e ao lado a
            partir de xl (≈ desktopDefault da referência, onde o grid vira
            2 colunas).
          */}
          <div className="relative mx-auto mt-12 w-full max-w-xl shrink-0 md:mt-16 xl:mx-0 xl:mt-0 xl:self-end">
            {/*
              Efeito atrás da imagem — inspirado na referência (blob desfocado +
              textura). Brilho difuso nas cores da marca e uma grade sutil, tudo
              atrás da imagem (que fica em z-10). pointer-events-none para não
              capturar cliques.
            */}
            <div aria-hidden="true" className="pointer-events-none absolute -inset-16">
              {/* Brilho difuso (glow) — laranja + roxo da marca, vazando muito
                  além da imagem para formar uma aura visível ao redor dela. */}
              <div
                className="absolute left-1/2 top-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(255,114,10,0.45), rgba(255,114,10,0) 72%)",
                }}
              />
              <div
                className="absolute right-0 top-0 h-[80%] w-[80%] rounded-full blur-3xl"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(83,41,113,0.42), rgba(83,41,113,0) 72%)",
                }}
              />
              {/* Textura de grade sutil, esmaecida nas bordas */}
              <div className="hero-grid-fx absolute inset-0 text-black/15 dark:text-white/15" />
            </div>

            <img
              src={heroImage}
              alt="Preview da interface do mobileX GenAI"
              className="relative z-10 w-full h-auto"
            />
          </div>
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
