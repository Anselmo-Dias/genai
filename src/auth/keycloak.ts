import Keycloak, { type KeycloakProfile } from "keycloak-js"

import { whitelabel } from "@/config/whitelabel"
import { RoleEnum, type Role } from "./roles"

// Mesmas chaves de localStorage usadas no sso-init.ts do projeto Angular.
const TOKEN_KEY = "kc_token"
const REFRESH_TOKEN_KEY = "kc_refresh_token"

export const keycloak = new Keycloak({
  url: whitelabel.KEYCLOAK_URL,
  realm: whitelabel.KEYCLOAK_REALM,
  clientId: whitelabel.KEYCLOAK_CLIENT_ID,
})

function persistTokens() {
  if (keycloak.token) {
    localStorage.setItem(TOKEN_KEY, keycloak.token)
  } else {
    localStorage.removeItem(TOKEN_KEY)
  }

  if (keycloak.refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, keycloak.refreshToken)
  } else {
    localStorage.removeItem(REFRESH_TOKEN_KEY)
  }
}

function clearTokens() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}

let initPromise: Promise<boolean> | null = null

/**
 * Inicializa o Keycloak. A landing page (`/`) é pública: não usamos
 * onLoad 'login-required' nem 'check-sso' (esse último depende de um
 * iframe para o endpoint do Keycloak, que o próprio servidor bloqueia via
 * `frame-ancestors 'self'`). Em vez disso, o init só tenta restaurar uma
 * sessão a partir do token/refresh-token salvos em localStorage; sem eles,
 * a app carrega deslogada. As rotas privadas (dentro de `_layout.route.tsx`)
 * são protegidas pelo guard `requireAuth` em `beforeLoad`, que dispara o
 * redirect real para o login do Keycloak quando necessário.
 */
export function initKeycloak(): Promise<boolean> {
  if (initPromise) return initPromise

  // Handlers de evento (equivalente ao keycloakEvents$ do keycloak-angular).
  keycloak.onReady = () => persistTokens()
  keycloak.onAuthSuccess = () => persistTokens()
  keycloak.onAuthRefreshSuccess = () => persistTokens()
  keycloak.onTokenExpired = () => {
    void keycloak.updateToken(20)
  }
  keycloak.onAuthError = () => {
    clearTokens()
  }

  initPromise = keycloak.init({
    pkceMethod: "S256",
    redirectUri: window.location.origin + "/",
    token: localStorage.getItem(TOKEN_KEY) ?? undefined,
    refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY) ?? undefined,
    scope: "openid profile email",
    enableLogging: !whitelabel.production,
  })

  return initPromise
}

/**
 * Retorna um token válido, renovando-o se faltar menos de `minValidity` segundos.
 * Use ao montar requisições HTTP (equivalente ao AuthTokenInterceptor).
 */
export async function getToken(minValidity = 20): Promise<string | undefined> {
  try {
    await keycloak.updateToken(minValidity)
  } catch {
    clearTokens()
  }
  return keycloak.token
}

/** Todas as roles do usuário (realm + client), como no getUserRoles do keycloak-angular. */
export function getUserRoles(): string[] {
  const realmRoles = keycloak.realmAccess?.roles ?? []
  const clientRoles = Object.values(keycloak.resourceAccess ?? {}).flatMap(
    (resource) => resource.roles,
  )
  return Array.from(new Set([...realmRoles, ...clientRoles]))
}

/** Primeira role conhecida do usuário (mirror do getUserRole do Angular). */
export function getUserRole(): Role | undefined {
  const roles = getUserRoles()
  return Object.values(RoleEnum).find((role) => roles.includes(role))
}

export function hasRole(...roles: Role[]): boolean {
  const userRoles = getUserRoles()
  return roles.some((role) => userRoles.includes(role))
}

export function loadUserProfile(): Promise<KeycloakProfile> {
  return keycloak.loadUserProfile()
}

export function login(redirectUri: string = window.location.href) {
  return keycloak.login({ redirectUri })
}

export function logout(redirectUri: string = window.location.origin) {
  clearTokens()
  return keycloak.logout({ redirectUri })
}
