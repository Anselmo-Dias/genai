import { useEffect, useState } from "react"

/**
 * Observa as seções pelos seus `id`s e retorna o id da seção atualmente
 * ativa (a última cujo topo cruzou a "linha de leitura" ~35% da viewport).
 *
 * @param ids Lista de ids de seção, na ordem em que aparecem na página.
 */
export function useScrollSpy(ids: readonly string[]) {
  const [activeId, setActiveId] = useState<string>(ids[0] ?? "")

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const line = window.innerHeight * 0.35
      let current = ids[0] ?? ""

      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top - line <= 0) {
          current = id
        }
      }

      setActiveId(current)
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [ids])

  return activeId
}
