import { AnimatePresence, motion } from "motion/react"
import { MessageCircle, X } from "lucide-react"

import { ChatModal } from "./chat-modal"
import { useChatStore } from "../store/chat-store"

/**
 * FAB que abre/fecha a modal de chat com o agente, em todos os breakpoints.
 * No mobile sobe um pouco (bottom-24) para não encostar na barra central
 * (FloatingNavMini); no desktop fica no canto inferior direito.
 */
export function ChatLauncher() {
  const open = useChatStore((state) => state.open)
  const toggleChat = useChatStore((state) => state.toggleChat)
  const closeChat = useChatStore((state) => state.closeChat)

  return (
    <>
      <motion.button
        type="button"
        aria-label={open ? "Fechar chat" : "Abrir chat com o assistente"}
        aria-expanded={open}
        onClick={toggleChat}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-24 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#F97316] text-white shadow-lg shadow-[#F97316]/30 transition-[filter] hover:brightness-110 lg:bottom-6 lg:right-6"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <ChatModal open={open} onClose={closeChat} />
    </>
  )
}
