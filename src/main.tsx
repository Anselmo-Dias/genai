import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@/components/theme-provider'
import { LandingPage } from '@/features/landing-page/pages/landing-page'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* storageKey nova ("-light") descarta a preferência dark que ficou salva
        no navegador antes de o toggle de tema ser removido da landing. */}
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme-light">
      <LandingPage />
    </ThemeProvider>
  </StrictMode>,
)
