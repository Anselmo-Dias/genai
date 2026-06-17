import axios from "axios"

import { getToken } from "@/auth/keycloak"
import { whitelabel } from "@/config/whitelabel"
import { normalizeAxiosError } from "@/shared/utils/normalize-error"

export const api = axios.create({
  baseURL: whitelabel.urlBase,
})

// Anexa o token do Keycloak (mirror do AuthTokenInterceptor; ignora 'run_code').
api.interceptors.request.use(async (config) => {
  if (!config.url?.includes("run_code")) {
    const token = await getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

// Normaliza os erros para AppError (mirror do ApiErrorInterceptor).
api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(normalizeAxiosError(error)),
)
