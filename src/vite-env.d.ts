/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_KEYCLOAK_URL?: string
  readonly VITE_KEYCLOAK_REALM?: string
  readonly VITE_KEYCLOAK_CLIENT_ID?: string
  readonly VITE_API_BASE_URL?: string
  readonly VITE_LEADS_ENDPOINT?: string
  readonly VITE_PLATFORM_URL?: string
  readonly VITE_RECAPTCHA_SITE_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface RecaptchaEnterprise {
  ready: (callback: () => void) => void
  execute: (siteKey: string, options: { action: string }) => Promise<string>
}

interface Window {
  grecaptcha?: {
    enterprise?: RecaptchaEnterprise
  }
}
