import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"

// Estado global do client selecionado (multi-tenant), equivalente ao
// ClientStateService do mobileXGenAI_Portal. `""` representa a própria organização.
const STORAGE_KEY = "selected_client_name"

type ClientStoreValue = {
  selectedClientName: string
  setSelectedClient: (name: string) => void
}

const ClientStoreContext = createContext<ClientStoreValue | null>(null)

export function ClientProvider({ children }: { children: ReactNode }) {
  const [selectedClientName, setSelectedClientName] = useState<string>(
    () => localStorage.getItem(STORAGE_KEY) ?? "",
  )

  const setSelectedClient = useCallback((name: string) => {
    setSelectedClientName(name)
    if (name) {
      localStorage.setItem(STORAGE_KEY, name)
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  const value = useMemo<ClientStoreValue>(
    () => ({ selectedClientName, setSelectedClient }),
    [selectedClientName, setSelectedClient],
  )

  return (
    <ClientStoreContext.Provider value={value}>
      {children}
    </ClientStoreContext.Provider>
  )
}

export function useClientStore() {
  const context = useContext(ClientStoreContext)
  if (!context) {
    throw new Error("useClientStore deve ser usado dentro de um ClientProvider.")
  }
  return context
}
