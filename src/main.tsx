import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './router'
import { AuthProvider } from '@/auth/auth-context'
import { initKeycloak } from '@/auth/keycloak'
import { ClientProvider } from '@/features/clients/store/client-store'
import { Toaster } from '@/components/ui/sonner'
import './index.css'
import { ThemeProvider } from './components/theme-provider'

const queryClient = new QueryClient()

// Inicializa o Keycloak antes de renderizar (equivalente ao APP_INITIALIZER do Angular).
// Com `onLoad: 'login-required'`, usuários não autenticados são redirecionados ao
// login do Keycloak e a app só renderiza após a sessão estar pronta.
initKeycloak()
  .catch((error) => {
    console.error('Falha ao inicializar o Keycloak', error)
    return false
  })
  .finally(() => {
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <ClientProvider>
              <RouterProvider router={router} />
              <Toaster position="bottom-right" richColors />
            </ClientProvider>
            </ThemeProvider>
          </AuthProvider>
        </QueryClientProvider>
      </StrictMode>,
    )
  })
