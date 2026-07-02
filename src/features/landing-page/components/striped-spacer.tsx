/**
 * Espaçador decorativo tracejado entre seções, no padrão da referência:
 * faixa de 64px preenchida pela hachura diagonal (.bg-stripes), confinada ao
 * frame de conteúdo (max-w-[1400px] dentro de px-6 lg:px-12) e fechada por um
 * trilho horizontal full-bleed na base.
 *
 * O trilho superior não é desenhado aqui: ele vem do divider da seção anterior
 * (SectionContainer), garantindo exatamente 1px em cada limite — como na
 * referência, onde cada fresta revela uma única linha.
 *
 * Só em lg+, como as demais linhas estruturais da landing.
 */
export function StripedSpacer() {
  return (
    <div
      aria-hidden="true"
      className="relative hidden w-full px-6 lg:block lg:px-12"
    >
      <div className="mx-auto h-16 w-full max-w-[1400px] bg-stripes text-black/10 dark:text-white/10" />

      {/* Trilho inferior full-bleed — mesmo padrão do divider do SectionContainer */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-black/10 dark:bg-white/10" />
    </div>
  )
}
