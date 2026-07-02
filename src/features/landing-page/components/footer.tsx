import { Mail, ShieldCheck } from "lucide-react"

import logoMobileX from "@/assets/mobileX.png"
import { useScheduleDemo } from "./schedule-demo-dialog"

// lucide-react não fornece ícones de marca; usamos SVGs inline.
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.73v20.54C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .78 23.2 0 22.22 0z" />
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.43-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.12 1.38C1.35 2.67.94 3.34.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.8.72 1.47 1.38 2.13.66.66 1.33 1.08 2.12 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.8-.3 1.47-.72 2.13-1.38.66-.66 1.08-1.33 1.38-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
    </svg>
  )
}

type FooterLink = {
  label: string
  href: string
}

type LinkGroup = {
  title: string
  links: FooterLink[]
}

const LINK_GROUPS: LinkGroup[] = [
  {
    title: "Produto",
    links: [
      { label: "O conceito", href: "#conceito" },
      { label: "Como funciona", href: "#arquitetura" },
      { label: "Identidade do usuário", href: "#identidade" },
      { label: "Integração", href: "#ecossistema" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { label: "Funcionalidades", href: "#funcionalidades" },
      { label: "Casos de uso", href: "#casos" },
      { label: "Agendar demonstração", href: "#demo" },
    ],
  },
]

export function Footer() {
  const { open: openScheduleDemo } = useScheduleDemo()

  // Rolagem suave para âncoras reais (#secao); placeholders ("#") ficam inertes.
  const handleAnchorClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (!href.startsWith("#") || href === "#") return
    const target = document.getElementById(href.slice(1))
    if (!target) return
    event.preventDefault()
    target.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <footer className="relative w-full rounded-t-3xl bg-neutral-100 px-6 pb-10 pt-20 text-neutral-600 dark:bg-black dark:text-neutral-400 lg:rounded-t-none lg:px-12">
      {/*
        Trilho superior do footer — full-bleed, de extremidade a extremidade,
        com a mesma espessura/cor/opacidade do trilho do header. Só em lg+, como
        as demais linhas estruturais; nesse breakpoint o topo do footer fica
        reto (lg:rounded-t-none) para a linha tocar as bordas sem cantos.
      */}
      <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-px bg-black/10 lg:block dark:bg-white/10" />

      <div className="mx-auto w-full max-w-[1400px] lg:px-10">
        {/* Grid principal */}
        <div className="grid grid-cols-1 gap-12 border-b border-neutral-200 pb-16 dark:border-neutral-800 md:grid-cols-4">
          {/* Marca */}
          <div className="col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <img
                src={logoMobileX}
                alt="mobileX"
                className="h-6 w-auto"
              />
              <span className="text-lg font-medium tracking-tight text-neutral-900 dark:text-white">
                mobileX GenAI
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
              A camada de IA corporativa do ecossistema mobileX — uma plataforma
              da MTM Tecnologia.
            </p>
          </div>

          {/* Grupos de links */}
          {LINK_GROUPS.map((group) => (
            <div key={group.title}>
              <h4 className="mb-6 text-sm font-semibold text-neutral-900 dark:text-white">
                {group.title}
              </h4>
              <ul className="space-y-4 text-sm">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.href === "#demo" ? (
                      <button
                        type="button"
                        onClick={openScheduleDemo}
                        className="text-left text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <a
                        href={link.href}
                        onClick={(event) => handleAnchorClick(event, link.href)}
                        className="text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contato */}
          <div>
            <h4 className="mb-6 text-sm font-semibold text-neutral-900 dark:text-white">
              Contato
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href="mailto:faleconosco@mtmtecnologia.com.br"
                  className="flex items-center gap-2 text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                  faleconosco@mtmtecnologia.com.br
                </a>
              </li>
              <li className="flex items-start gap-2 text-neutral-500 dark:text-neutral-400">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.5} />
                <span>
                  DPO: Ramilton Silva
                  <br />
                  <a
                    href="mailto:dpo@mtmtecnologia.com.br"
                    className="transition-colors hover:text-neutral-900 dark:hover:text-white"
                  >
                    dpo@mtmtecnologia.com.br
                  </a>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Linha inferior */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-sm text-neutral-400 dark:text-neutral-500 sm:flex-row">
          <p>A camada de IA corporativa do ecossistema mobileX — uma plataforma da MTM Tecnologia.</p>
          <div className="flex gap-4">
            <a
              href="https://br.linkedin.com/company/mtm-tecnologia"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="transition-colors hover:text-neutral-900 dark:hover:text-white"
            >
              <LinkedInIcon className="h-4 w-4" />
            </a>
            <a
              href="https://www.instagram.com/mtm.tecnologia"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="transition-colors hover:text-neutral-900 dark:hover:text-white"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
