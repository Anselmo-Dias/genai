import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Menu, X } from "lucide-react"

const NAV_LINKS = [
  { label: "O conceito", href: "#conceito" },
  { label: "Como funciona", href: "#arquitetura" },
  { label: "Identidade", href: "#identidade" },
  { label: "Integração", href: "#ecossistema" },
  { label: "Funcionalidades", href: "#funcionalidades" },
]

const EASE_OUT = [0.2, 0.8, 0.2, 1] as const

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Rolagem suave apenas para links com âncora real (#secao); placeholders ("#") são ignorados.
  const handleNavClick = (
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
    <motion.nav
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: EASE_OUT }}
      className="absolute top-0 inset-x-0 w-full px-6 py-6 lg:px-12 z-50"
    >
      <div className="w-full max-w-[1400px] mx-auto flex justify-between items-center">
        {/* Marca (esquerda) */}
        <a
          href="#inicio"
          onClick={(event) => handleNavClick(event, "#inicio")}
          className="flex items-center gap-3 text-white hover:text-[#F97316] transition-colors"
        >
          <span className="font-medium text-lg tracking-tight">mobileX GenAI</span>
        </a>

        {/* Links + CTA + toggle (direita) */}
        <div className="hidden md:flex items-center gap-8 text-xs font-medium uppercase tracking-wide text-neutral-300">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(event) => handleNavClick(event, link.href)}
              className="hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}

          <a
            href="#demo"
            onClick={(event) => handleNavClick(event, "#demo")}
            className="inline-flex items-center bg-[#FF720A] hover:bg-[#e0620a] text-white font-bold text-xs px-4 py-2 rounded-full transition-colors duration-200 normal-case tracking-normal"
          >
            Agendar demonstração
          </a>

        </div>

        {/* Mobile: hambúrguer */}
        <div className="flex md:hidden items-center gap-4">
          <button
            type="button"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/15 text-neutral-300 hover:text-[#F97316] hover:border-white/40 transition-colors"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden absolute top-full left-0 right-0 bg-[#050505]/95 backdrop-blur-md border-t border-white/10 overflow-hidden"
          >
            <div className="px-6 py-4 max-w-[1400px] mx-auto w-full flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(event) => {
                    handleNavClick(event, link.href)
                    setIsMenuOpen(false)
                  }}
                  className="block py-3 text-base font-medium text-neutral-300 hover:text-[#F97316] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 pb-1">
                <a
                  href="#demo"
                  onClick={(event) => {
                    handleNavClick(event, "#demo")
                    setIsMenuOpen(false)
                  }}
                  className="inline-flex items-center bg-[#FF720A] hover:bg-[#e0620a] text-white font-bold text-sm px-5 py-3 rounded-full transition-colors duration-200"
                >
                  Agendar demonstração
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
