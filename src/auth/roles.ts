// Equivalente ao RoleEnum do mobileXGenAI_Portal.
// `enum` não é permitido (tsconfig: erasableSyntaxOnly), então usamos um objeto const.
export const RoleEnum = {
  genAIUser: "GenAI User",
  genAIAdmin: "GenAI Admin",
  superAdmin: "SuperAdmin",
} as const

export type Role = (typeof RoleEnum)[keyof typeof RoleEnum]

export const roleEnumFilterOptions = new Map<Role, string>([
  [RoleEnum.genAIUser, "GenAI User"],
  [RoleEnum.genAIAdmin, "GenAI Admin"],
  [RoleEnum.superAdmin, "SuperAdmin"],
])

// Papéis com acesso às áreas administrativas (mirror de *ngxPermissionsOnly).
export const ADMIN_ROLES: Role[] = [RoleEnum.genAIAdmin, RoleEnum.superAdmin]
