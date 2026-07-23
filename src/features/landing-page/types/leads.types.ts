export type LeadsCreateRequest = {
  nome: string
  email: string
  empresa: string
  telefone: string
  cargo?: string
  porte?: string
  mensagem?: string
  recaptchaToken: string
}

export type LeadsCreateResponse = {
  status: number
  token: string | null
  err: number
  data: unknown
  msg: string
}
