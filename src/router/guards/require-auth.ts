import { redirect } from "@tanstack/react-router"

import { hasRole, keycloak, login } from "@/auth/keycloak"
import { type Role } from "@/auth/roles"

/**
 * Guard de autenticação para `beforeLoad` (equivalente ao isLoggedInSsoGuard).
 * Como o init usa `onLoad: 'login-required'`, a app já é privada por completo;
 * este guard serve como reforço explícito por rota.
 */
export function requireAuth() {
  if (!keycloak.authenticated) {
    void login(window.location.href)
    throw redirect({ to: "/" })
  }
}

/**
 * Guard de autorização por role (mirror do *ngxPermissionsOnly).
 * Uso: `beforeLoad: requireRole(RoleEnum.genAIAdmin, RoleEnum.superAdmin)`
 */
export function requireRole(...roles: Role[]) {
  return () => {
    requireAuth()
    if (!hasRole(...roles)) {
      throw redirect({ to: "/" })
    }
  }
}
