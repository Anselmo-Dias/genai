import { MessageSquare, BookOpen, TrendingUp, FileText, Scale, Cpu } from "lucide-react"

import { SectionContainer } from "./section-container"

const USE_CASES = [
  {
    number: "01",
    title: "Atendimento e suporte interno",
    description:
      "Agentes que respondem dúvidas de colaboradores e clientes com base nas políticas e manuais da empresa.",
    icon: MessageSquare,
  },
  {
    number: "02",
    title: "Consulta a documentos e políticas",
    description:
      "Perguntas sobre contratos, regulamentos e normas internas, com respostas auditáveis e fontes citadas.",
    icon: BookOpen,
  },
  {
    number: "03",
    title: "Apoio comercial",
    description:
      "Qualificação de leads e suporte às vendas com contexto do CRM, integrado pela plataforma.",
    icon: TrendingUp,
  },
  {
    number: "04",
    title: "Análise de documentos",
    description:
      "Extração, resumo e classificação de contratos, relatórios e documentos financeiros.",
    icon: FileText,
  },
  {
    number: "05",
    title: "Apoio jurídico",
    description:
      "Suporte à análise contratual e à pesquisa, sempre a partir de fontes auditáveis.",
    icon: Scale,
  },
  {
    number: "06",
    title: "IA dentro das suas aplicações",
    description:
      "Agentes oferecidos via API e embarcados em apps, levando inteligência para sistemas que você já usa.",
    icon: Cpu,
  },
]

export function UseCasesSection() {
  return (
    <SectionContainer id="casos" className="mt-32 mb-0">
      {/* Estilos CSS locais para a animação do marquee infinito */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        /* Máscara gradiente para esvanecer as laterais do carrossel */
        .marquee-mask {
          mask-image: linear-gradient(
            to right,
            transparent,
            black 15%,
            black 85%,
            transparent
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black 15%,
            black 85%,
            transparent
          );
        }
      `}</style>

      {/* Header */}
      <div className="section-header-content gap-6 mb-12">
        <span className="uppercase text-sm font-medium text-[#FF720A] tracking-widest">
          Casos de uso
        </span>
        <h2 className="text-[32px] md:text-[48px] font-semibold text-neutral-900 dark:text-white tracking-tighter font-manrope leading-[120%]">
          O que sua organização faz{" "}
          <span className="text-[#FF720A]">com o GenAI</span>.
        </h2>
      </div>

      {/* Infinite Carousel Container */}
      <div className="relative w-full overflow-hidden py-4 marquee-mask">
        {/* Sliding Row */}
        <div className="flex gap-6 animate-marquee hover:[animation-play-state:paused] w-max select-none">
          {[...USE_CASES, ...USE_CASES, ...USE_CASES].map((item, index) => (
            <div
              key={`${item.number}-${index}`}
              className="w-[320px] md:w-[350px] shrink-0 group relative rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900/30 p-8 transition-all duration-300 hover:border-black/20 dark:hover:border-white/20 hover:shadow-[0_10px_30px_-18px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_10px_30px_-18px_rgba(255,255,255,0.05)] overflow-hidden flex flex-col justify-between h-[230px]"
            >
              {/* Top glowing orange line on hover */}
              <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#FF720A]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  {/* Top bar: Number & Icon */}
                  <div className="flex items-start justify-between mb-6">
                    <span className="font-mono text-sm font-semibold text-neutral-400 dark:text-zinc-600 group-hover:text-[#FF720A] transition-colors duration-300">
                      {item.number}
                    </span>
                    <div className="p-2 rounded-lg bg-neutral-100 dark:bg-zinc-900 border border-black/5 dark:border-zinc-800 text-neutral-400 dark:text-zinc-500 group-hover:text-[#FF720A] dark:group-hover:text-white group-hover:border-[#FF720A]/30 dark:group-hover:border-zinc-700 transition-all duration-300 group-hover:scale-110">
                      <item.icon className="w-[18px] h-[18px]" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold leading-[102%] tracking-[-0.4px] text-neutral-900 dark:text-white mb-3 group-hover:text-[#FF720A] dark:group-hover:text-orange-100 transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm font-medium leading-[180%] tracking-[0.7px] text-neutral-600 dark:text-zinc-400 line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  )
}
