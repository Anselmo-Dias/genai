import { useCallback, useEffect } from "react"

/**
 * Site key pública do reCAPTCHA Enterprise. É uma chave pública (client-side),
 * então pode ficar no bundle; ainda assim lemos de env para permitir chaves
 * diferentes por ambiente. O fallback garante funcionamento sem `.env`.
 */
const SITE_KEY =
  import.meta.env.VITE_RECAPTCHA_SITE_KEY ??
  "6LdHNWAtAAAAACyhMwskcrVt_dRhmkXh9lOvF2MW"

const SCRIPT_ID = "recaptcha-enterprise"

/** Tempo máximo de espera pelo carregamento do script (ms). */
const READY_TIMEOUT = 10_000
const POLL_INTERVAL = 100

/** Aguarda o `grecaptcha.enterprise` ficar disponível na window. */
function waitForRecaptcha(): Promise<RecaptchaEnterprise> {
  return new Promise((resolve, reject) => {
    const start = Date.now()

    const check = () => {
      const enterprise = window.grecaptcha?.enterprise
      if (enterprise) {
        resolve(enterprise)
        return
      }
      if (Date.now() - start >= READY_TIMEOUT) {
        reject(new Error("reCAPTCHA não carregou a tempo."))
        return
      }
      window.setTimeout(check, POLL_INTERVAL)
    }

    check()
  })
}

/**
 * Carrega o script do reCAPTCHA Enterprise uma única vez e expõe uma função
 * `executeRecaptcha(action)` que aguarda o carregamento, executa o desafio e
 * resolve com o token. O componente consumidor nunca acessa `window.grecaptcha`
 * diretamente.
 *
 * @example
 * const { executeRecaptcha } = useRecaptchaEnterprise()
 * const token = await executeRecaptcha("SCHEDULE_DEMO")
 */
export function useRecaptchaEnterprise() {
  useEffect(() => {
    if (document.getElementById(SCRIPT_ID)) return

    const script = document.createElement("script")
    script.id = SCRIPT_ID
    script.src = `https://www.google.com/recaptcha/enterprise.js?render=${SITE_KEY}`
    script.async = true
    script.defer = true

    document.head.appendChild(script)
  }, [])

  const executeRecaptcha = useCallback(async (action: string) => {
    const enterprise = await waitForRecaptcha()

    return new Promise<string>((resolve, reject) => {
      enterprise.ready(() => {
        enterprise.execute(SITE_KEY, { action }).then(resolve).catch(reject)
      })
    })
  }, [])

  return { executeRecaptcha }
}
