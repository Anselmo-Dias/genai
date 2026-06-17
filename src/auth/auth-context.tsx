import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { type KeycloakProfile } from "keycloak-js"

import {
  getUserRole,
  getUserRoles,
  keycloak,
  loadUserProfile,
  login,
  logout,
} from "./keycloak"
import { type Role } from "./roles"

type AuthContextValue = {
  authenticated: boolean
  profile: KeycloakProfile | null
  roles: string[]
  role: Role | undefined
  hasRole: (...roles: Role[]) => boolean
  login: typeof login
  logout: typeof logout
}

const AuthContext = createContext<AuthContextValue | null>(null)

/**
 * Disponibiliza o estado de autenticação para a árvore React.
 * Pressupõe que `initKeycloak()` já foi chamado antes do render (ver main.tsx),
 * portanto o Keycloak já está pronto quando este provider monta.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<KeycloakProfile | null>(null)
  const authenticated = !!keycloak.authenticated

  useEffect(() => {
    if (!authenticated) {
      setProfile(null)
      return
    }
    loadUserProfile()
      .then(setProfile)
      .catch(() => setProfile(null))
  }, [authenticated])

  const value = useMemo<AuthContextValue>(() => {
    const roles = getUserRoles()
    return {
      authenticated,
      profile,
      roles,
      role: getUserRole(),
      hasRole: (...wanted: Role[]) => wanted.some((r) => roles.includes(r)),
      login,
      logout,
    }
  }, [authenticated, profile])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider.")
  }
  return context
}
