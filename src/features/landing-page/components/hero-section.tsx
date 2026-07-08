import { ArrowRight, ArrowUpRight } from "lucide-react"

import heroImage from "@/assets/tela-relatorio-de-uso.png"
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
        <div className="w-full max-w-[1400px] mx-auto flex flex-col xl:flex-row xl:items-center xl:justify-between xl:gap-12 lg:pl-10">
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
          <div className="relative mx-auto mt-12 w-full max-w-xl shrink-0 md:mt-16 xl:mx-0 xl:mt-0 xl:self-center xl:max-w-[600px]">
            {/*
              Efeito de sombra/brilho no fundo — circular, sem bordas marcadas,
              com expansão e desfoque suave para uma aparência mais minimalista e fumacenta.
            */}
            <div aria-hidden="true" className="pointer-events-none absolute -inset-32 z-0">
              <div
                className="absolute inset-0 rounded-full blur-[110px] opacity-40 dark:opacity-30"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,114,10,0.3) 0%, rgba(255,114,10,0) 70%)",
                }}
              />
              <div
                className="absolute inset-8 rounded-full blur-[90px] opacity-35 dark:opacity-25"
                style={{
                  background:
                    "radial-gradient(circle, rgba(83,41,113,0.25) 0%, rgba(83,41,113,0) 70%)",
                }}
              />
            </div>

            {/* Container com overflow-hidden para cortar a imagem exatamente no limite lateral direito */}
            <div className="relative w-full overflow-hidden z-10 rounded-2xl border border-black/10 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.15)] xl:rounded-l-2xl xl:rounded-r-none xl:border-r-0 xl:border-l xl:border-y xl:shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
              <img
                src={heroImage}
                alt="Preview da interface do mobileX GenAI"
                className="relative z-10 w-full xl:w-[800px] xl:max-w-none h-auto"
              />
            </div>
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
