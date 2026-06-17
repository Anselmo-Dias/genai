import { create } from "zustand"

type ChatStore = {
  open: boolean
  openChat: () => void
  closeChat: () => void
  toggleChat: () => void
}

/** Estado global de abertura da modal de chat, compartilhado entre o FAB
 *  (desktop) e o botão do aside mobile (FloatingNavMini). */
export const useChatStore = create<ChatStore>((set) => ({
  open: false,
  openChat: () => set({ open: true }),
  closeChat: () => set({ open: false }),
  toggleChat: () => set((state) => ({ open: !state.open })),
}))
