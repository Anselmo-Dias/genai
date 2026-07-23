// URL da plataforma (login/app). Configurável por ambiente via env, com
// fallback para produção.
export const PLATFORM_URL =
  import.meta.env.VITE_PLATFORM_URL ?? "https://genai.mobilex.tech/app"
