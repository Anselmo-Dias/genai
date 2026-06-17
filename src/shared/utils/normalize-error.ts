import { AxiosError } from "axios"

// Replica o AppError / normalizeHttpError do mobileXGenAI_Portal.
export type AppError = {
  message: string | null
  code?: string
  status?: number
  details?: unknown
  raw?: unknown
}

function readField(body: unknown, field: string): string | undefined {
  if (body && typeof body === "object" && field in body) {
    const value = (body as Record<string, unknown>)[field]
    if (typeof value === "string") return value
  }
  return undefined
}

export function normalizeAxiosError(err: unknown): AppError {
  if (err instanceof AxiosError) {
    const body = err.response?.data

    const message =
      readField(body, "error") ??
      readField(body, "message") ??
      (typeof body === "string" ? body : undefined) ??
      err.message

    return {
      message,
      code: err.code,
      status: err.response?.status,
      details: body,
      raw: err,
    }
  }

  if (err instanceof Error) {
    return { message: err.message, raw: err }
  }

  return { message: null, raw: err }
}
