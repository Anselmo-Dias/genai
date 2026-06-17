// Espelha src/environments/whitelabel.mobilex.ts do mobileXGenAI_Portal (Angular).
// Os valores podem ser sobrescritos via variáveis de ambiente do Vite (.env).
export const whitelabel = {
  production: import.meta.env.PROD,
  name: "mobileX",
  slug: "mobilex",

  // Base da API REST.
  urlBase: import.meta.env.VITE_API_BASE_URL ?? "https://llama-beta.mobilex.tech",

  // Configuração do Keycloak.
  KEYCLOAK_URL: import.meta.env.VITE_KEYCLOAK_URL ?? "https://auth.mobilex.tech",
  KEYCLOAK_REALM: import.meta.env.VITE_KEYCLOAK_REALM ?? "mobilex",
  KEYCLOAK_CLIENT_ID: import.meta.env.VITE_KEYCLOAK_CLIENT_ID ?? "genai",
} as const
