import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { X } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"

import imgAgentes from "@/assets/pilar-gestao-agentes.jpeg"
import imgRag from "@/assets/pilar-rag.jpeg"
import imgMcp from "@/assets/pilar-mcp.jpeg"
import imgObservabilidade from "@/assets/pilar-observabilidade.jpeg"
import { SectionContainer } from "./section-container"

const EASE_OUT = [0.2, 0.8, 0.2, 1] as const

const fadeSlideIn = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
} as const

type Pillar = {
  title: string
  description: string
  image: string
}

// Título e descrição alimentam o alt (acessibilidade/SEO); o texto visível
// já vive dentro da própria imagem do pilar.
const PILLARS: Pillar[] = [
  {
    title: "Gestão centralizada de agentes",
    description:
      "Crie e administre agentes com modelo, provedor, arquivos, memória, permissões, histórico e versionamento em uma única plataforma.",
    image: imgAgentes,
  },
  {
    title: "Conhecimento e contexto com RAG",
    description:
      "Conecte documentos e bases de conhecimento para respostas mais precisas, auditáveis e alinhadas ao contexto do negócio.",
    image: imgRag,
  },
  {
    title: "Integração segura com tools e MCP",
    description:
      "Amplie a ação dos agentes conectando APIs, sistemas internos, CRMs, ERPs e outras ferramentas com segurança e controle total.",
    image: imgMcp,
  },
  {
    title: "Governança e observabilidade",
    description:
      "Controle acesso, chaves, custos, consumo, latência e erros por agente para operar IA de forma corporativa e escalável.",
    image: imgObservabilidade,
  },
]

/** Imagem do pilar emoldurada — funciona em light e dark sem cropar o texto.
 *  Clicar amplia em tela cheia (lightbox). */
function PillarImage({
  pillar,
  onOpen,
}: {
  pillar: Pillar
  onOpen: (pillar: Pillar) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(pillar)}
      aria-label={`Ampliar imagem: ${pillar.title}`}
      className="block w-full cursor-zoom-in overflow-hidden rounded-3xl border border-black/10 bg-white p-2 transition-colors duration-300 hover:border-black/20 dark:border-white/10 dark:bg-[#0a0a0a] dark:hover:border-white/20"
    >
      <img
        src={pillar.image}
        alt={`${pillar.title}. ${pillar.description}`}
        loading="lazy"
        className="w-full rounded-2xl"
      />
    </button>
  )
}

/** Overlay em tela cheia com a imagem ampliada. */
function Lightbox({
  pillar,
  onClose,
}: {
  pillar: Pillar | null
  onClose: () => void
}) {
  useEffect(() => {
    if (!pillar) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [pillar, onClose])

  return (
    <AnimatePresence>
      {pillar && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={pillar.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
        >
          <button
            type="button"
            aria-label="Fechar"
            onClick={onClose}
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
          <motion.img
            src={pillar.image}
            alt={`${pillar.title}. ${pillar.description}`}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            onClick={(event) => event.stopPropagation()}
            className="max-h-[90vh] max-w-[95vw] rounded-2xl object-contain"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function PlatformSection() {
  const [zoomed, setZoomed] = useState<Pillar | null>(null)

  return (
    <SectionContainer id="plataforma" className="mt-32 mb-0">
      {/* Header */}
      <div className="relative w-full">
        <div className="flex flex-col max-w-3xl gap-6 mb-12">
          <motion.div
            variants={fadeSlideIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, delay: 0.2, ease: EASE_OUT }}
            className="flex items-center gap-3"
          >
            <span className="uppercase text-sm font-medium text-[#F97316] tracking-widest">
              02. A plataforma
            </span>
          </motion.div>

          <motion.div
            variants={fadeSlideIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, delay: 0.4, ease: EASE_OUT }}
            className="flex flex-col gap-6"
          >
            <h2 className="md:text-6xl text-5xl font-medium tracking-tighter font-manrope text-neutral-900 dark:text-white">
              O que a plataforma <span className="text-[#F97316]">entrega</span>
            </h2>
            <p className="leading-relaxed text-lg font-light max-w-xl text-neutral-600 dark:text-gray-400">
              Quatro pilares que cobrem todo o ciclo de vida de agentes de IA em
              ambientes corporativos — do provisionamento à observabilidade.
            </p>
          </motion.div>
        </div>

        {/* divisores em gradiente */}
        <div className="pointer-events-none absolute left-0 right-0 -bottom-6 h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/20 to-transparent" />
        <div className="pointer-events-none absolute left-0 right-0 -bottom-6 h-6 bg-gradient-to-r from-transparent via-black/5 dark:via-white/10 to-transparent blur-md" />
      </div>

      {/* Desktop (md+): grid com os 4 pilares visíveis de uma vez */}
      <div className="mt-12 hidden grid-cols-2 gap-6 md:grid">
        {PILLARS.map((pillar, index) => (
          <motion.div
            key={pillar.title}
            variants={fadeSlideIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: EASE_OUT }}
          >
            <PillarImage pillar={pillar} onOpen={setZoomed} />
          </motion.div>
        ))}
      </div>

      {/* Mobile (< md): Swiper deslizável com peek do próximo slide */}
      <div className="mt-12 md:hidden">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          slidesPerView={1.1}
          spaceBetween={16}
          className="!pb-10 [--swiper-pagination-bullet-inactive-opacity:0.5] [--swiper-pagination-bullet-inactive-color:#737373] [--swiper-pagination-color:#F97316] dark:[--swiper-pagination-bullet-inactive-color:#a3a3a3]"
        >
          {PILLARS.map((pillar) => (
            <SwiperSlide key={pillar.title}>
              <PillarImage pillar={pillar} onOpen={setZoomed} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Lightbox pillar={zoomed} onClose={() => setZoomed(null)} />
    </SectionContainer>
  )
}
