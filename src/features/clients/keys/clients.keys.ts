export const clientsKeys = {
  all: ["clients"] as const,
  getAll: ["clients", "getAll"] as const,
  getById: (name: string) => ["clients", "getById", name] as const,
}
