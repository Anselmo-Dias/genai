import { AnimatePresence, motion } from "motion/react"
import { Bot, Send, Sparkles, X } from "lucide-react"

const EASE_OUT = [0.2, 0.8, 0.2, 1] as const

type ChatModalProps = {
  open: boolean
  onClose: () => void
}

/**
 * Shell visual da modal de chat com o agente.
 * Por enquanto sem integração — apenas a casca (header, área de mensagens
 * e composer) pronta para receber service/query depois.
 */
export function ChatModal({ open, onClose }: ChatModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop — só no mobile, onde o painel ocupa quase a tela toda */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden"
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Chat com o assistente"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
            style={{ transformOrigin: "bottom right" }}
            className="fixed inset-x-4 bottom-24 top-24 z-50 flex flex-col overflow-hidden rounded-3xl border border-black/10 bg-white shadow-2xl dark:border-white/10 dark:bg-[#0a0a0a] lg:inset-x-auto lg:top-auto lg:right-6 lg:h-[600px] lg:max-h-[calc(100vh-7rem)] lg:w-[380px]"
          >
            {/* Header */}
            <header className="flex items-center justify-between gap-3 border-b border-black/10 px-4 py-3 dark:border-white/10">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[#F97316]/15 text-[#F97316]">
                  <Bot className="h-4 w-4" />
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-neutral-900 dark:text-white">
                    Assistente GenAI
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    Online
                  </span>
                </div>
              </div>
              <button
                type="button"
                aria-label="Fechar chat"
                onClick={onClose}
                className="grid h-8 w-8 place-items-center rounded-full text-neutral-500 transition-colors hover:bg-black/5 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-white/5 dark:hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            {/* Área de mensagens (placeholder até a integração) */}
            <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-[#F97316]/10 text-[#F97316]">
                <Sparkles className="h-5 w-5" />
              </span>
              <p className="text-sm font-medium text-neutral-900 dark:text-white">
                Converse com o agente
              </p>
              <p className="max-w-[16rem] text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                A integração com o assistente será adicionada em breve.
              </p>
            </div>

            {/* Composer (desabilitado por enquanto) */}
            <div className="border-t border-black/10 p-3 dark:border-white/10">
              <div className="flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.02] px-3 py-1.5 dark:border-white/10 dark:bg-white/[0.03]">
                <input
                  type="text"
                  disabled
                  placeholder="Em breve…"
                  className="flex-1 bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400 disabled:cursor-not-allowed dark:text-white"
                />
                <button
                  type="button"
                  disabled
                  aria-label="Enviar mensagem"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#F97316] text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
