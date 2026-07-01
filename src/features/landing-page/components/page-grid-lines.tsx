/**
 * Estrutura de linhas da landing, seguindo o padrão da referência:
 *
 * - Trilho horizontal inferior do header: full-bleed, de extremidade a
 *   extremidade da página (como o `space-y-[1px]` da referência, que revela a
 *   linha na largura total do container).
 * - Verticais: dividers internos, confinados ao frame (`max-w-[1400px]` dentro
 *   de `px-6 lg:px-12`), como o `gap-[1px]` entre as colunas da referência.
 *   Percorrem toda a altura — do topo da viewport, atravessando o header sem
 *   interrupção, até o fim da página.
 *
 * O overlay é `absolute inset-0` no root (posicionado) — e não `fixed` — cobrindo
 * a página inteira desde o topo, de modo que as verticais partam da borda
 * superior da viewport (sem margem/padding). Fica atrás do header (z-30 < z-50
 * da navbar, que é transparente), então as linhas aparecem através dele. A
 * largura de referência é a do conteúdo (sem a barra de rolagem), nunca a da
 * viewport. Só em telas grandes (lg+): em mobile o conteúdo já ocupa quase toda
 * a largura.
 */
export function PageGridLines() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-30 hidden lg:block"
    >
      {/* Trilho inferior do header — full-bleed, até as extremidades da página */}
      <div className="absolute inset-x-0 top-[var(--header-height)] h-px bg-black/10 dark:bg-white/10" />

      {/* Verticais — do topo da viewport, atravessando o header, até o fim da página */}
      <div className="h-full w-full px-6 lg:px-12">
        <div className="relative mx-auto h-full w-full max-w-[1400px]">
          <div className="absolute inset-y-0 left-0 w-px bg-black/10 dark:bg-white/10" />
          <div className="absolute inset-y-0 right-0 w-px bg-black/10 dark:bg-white/10" />
        </div>
      </div>
    </div>
  )
}
