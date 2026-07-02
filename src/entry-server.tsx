import { renderToString } from 'react-dom/server'
import { LandingPage } from './features/landing-page/pages/landing-page'

export function render(): string {
  return renderToString(<LandingPage />)
}
