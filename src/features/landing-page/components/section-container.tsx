import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type SectionContainerProps = {
  children: ReactNode
  /** Classes aplicadas à <section> externa (ex.: margens verticais). */
  className?: string
  /** Classes aplicadas ao wrapper interno de largura máxima. */
  innerClassName?: string
  id?: string
}

/**
 * Wrapper global das seções da landing page.
 *
 * Mantém o mesmo alinhamento de conteúdo da hero e do navbar:
 * padding horizontal na <section> (`px-6 lg:px-12`) e largura máxima
 * centralizada no conteúdo (`max-w-[1400px] mx-auto`).
 */
export function SectionContainer({
  children,
  className,
  innerClassName,
  id,
}: SectionContainerProps) {
  return (
    <section id={id} className={cn("w-full px-6 lg:px-12", className)}>
      <div className={cn("w-full max-w-[1400px] mx-auto", innerClassName)}>
        {children}
      </div>
    </section>
  )
}
