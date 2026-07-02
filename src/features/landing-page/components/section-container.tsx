import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type SectionContainerProps = {
  children: ReactNode
  /** Classes aplicadas à <section> externa (ex.: margens verticais). */
  className?: string
  /** Classes aplicadas ao wrapper interno de largura máxima. */
  innerClassName?: string
  id?: string
  /**
   * Renderiza um trilho horizontal full-bleed na base da seção, separando-a da
   * próxima — igual ao da hero. Ligado por padrão; desligue (`divider={false}`)
   * quando o limite já tiver uma linha (ex.: a última seção antes do footer,
   * que já possui o trilho superior do footer).
   */
  divider?: boolean
}

/**
 * Wrapper global das seções da landing page.
 *
 * Mantém o mesmo alinhamento de conteúdo da hero e do navbar:
 * padding horizontal na <section> (`px-6 lg:px-12`) e largura máxima
 * centralizada no conteúdo (`max-w-[1400px] mx-auto`).
 *
 * Em lg+, o conteúdo recebe um respiro interno (`lg:px-10`) para não ficar
 * colado nas linhas verticais estruturais, que ficam nas bordas do frame
 * (max-w-[1400px]). O respiro é interno ao frame, então é uniforme em qualquer
 * resolução e mantém o conteúdo centralizado.
 */
export function SectionContainer({
  children,
  className,
  innerClassName,
  id,
  divider = true,
}: SectionContainerProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full px-6 lg:px-12",
        // Respiro entre o conteúdo e o trilho inferior (mesma folga da hero),
        // para o conteúdo não encostar na linha.
        divider && "pb-16 md:pb-20",
        className,
      )}
    >
      <div className={cn("w-full max-w-[1400px] mx-auto lg:px-10", innerClassName)}>
        {children}
      </div>

      {/*
        Trilho inferior full-bleed — mesma espessura/cor/opacidade do trilho da
        hero, cortando entre esta seção e a próxima. Só em lg+, como as demais
        linhas estruturais.
      */}
      {divider && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-px bg-black/10 lg:block dark:bg-white/10" />
      )}
    </section>
  )
}
