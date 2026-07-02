import { Bot, EyeOff, Link, LayoutGrid } from "lucide-react"

import { cn } from "@/lib/utils"
import { SectionContainer } from "./section-container"

const STEPS = [
  {
    number: "01",
    title: "Vários agentes, várias funções",
    icon: Bot,
    description:
      "Um agente atende clientes, outro apoia o jurídico, outro vive dentro de um aplicativo e outro é consumido por um sistema. Em pouco tempo, são muitos — espalhados.",
  },
  {
    number: "02",
    title: "Você não enxerga o que cada agente faz",
    icon: EyeOff,
    description:
      "Sem um ponto central, falta visibilidade da operação: o que cada agente respondeu, quais dados acessou e quais ações executou. Quando ninguém vê o que a IA está fazendo, não há como auditar, corrigir ou confiar.",
  },
  {
    number: "03",
    title: "Usar a LLM direto prende você",
    icon: Link,
    description:
      "Dá para usar a plataforma de uma LLM de mercado. Mas você fica preso àquela infraestrutura: um único provedor, as regras dele e o controle dele. Trocar de modelo ou aplicar suas próprias políticas vira um problema.",
  },
  {
    number: "04",
    title: "Falta um ponto central",
    icon: LayoutGrid,
    description:
      "O que falta é um lugar para configurar, orquestrar e governar todos os agentes — e entregá-los tanto a pessoas quanto a aplicações, com o seu controle, não o do fornecedor.",
  },
]

const BORDER_CLASSES = [
  "border-b md:border-r lg:border-b-0 lg:border-r border-black/10 dark:border-white/10",
  "border-b lg:border-b-0 lg:border-r border-black/10 dark:border-white/10",
  "border-b md:border-b-0 md:border-r border-black/10 dark:border-white/10",
  "border-b-0 border-black/10 dark:border-white/10",
]

export function ProblemSection() {
  return (
    // Espaçamentos verticais como na referência: compactos no mobile
    // (py-8 → tablet:py-16) e generosos só no desktop.
    <SectionContainer id="conceito" className="mt-16 md:mt-24 lg:mt-32 mb-0">
      {/* Header */}
      <div className="relative w-full mb-12 md:mb-16">
        <div className="section-header-content gap-6 mb-8 md:mb-12">
          <div className="flex gap-3 items-center">
            <span className="uppercase text-sm font-medium text-[#FF720A] tracking-widest">
              O conceito
            </span>
          </div>

          <div>
            <h2 className="text-[32px] md:text-[48px] font-semibold text-neutral-900 dark:text-white tracking-tighter font-manrope mb-4 leading-[120%]">
              Usar IA de forma séria é gerenciar{" "}
              <span className="text-[#FF720A]">muitos agentes</span> — não
              apenas um.
            </h2>
            <p className="text-base md:text-[18px] font-medium leading-[180%] tracking-[0.9px] text-neutral-600 dark:text-gray-400 max-w-xl">
              Toda adoção de IA mais estruturada precisa de uma infraestrutura
              para administrar os vários agentes que passam a existir na
              operação. Sem ela, cada agente vira uma ilha, com seu próprio
              acesso, suas próprias regras e nenhuma visão do conjunto.
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute left-0 right-0 -bottom-8 h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/20 to-transparent" />
        <div className="pointer-events-none absolute left-0 right-0 -bottom-8 h-6 bg-gradient-to-r from-transparent via-black/5 dark:via-white/10 to-transparent blur-md" />
      </div>

      {/* Grid 2×2 / 1×4 */}
      <div className="w-full border border-black/10 dark:border-white/10 bg-white/50 dark:bg-zinc-950/20 rounded-2xl overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
          {STEPS.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={step.number}
                className={cn(
                  "group relative p-6 md:p-8 hover:bg-neutral-50/50 dark:hover:bg-zinc-900/10 transition-all duration-500 flex flex-col h-full",
                  BORDER_CLASSES[index]
                )}
              >
                {/* Glow de hover superior (linha laranja sutil) */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FF720A] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Efeito de gradiente interno no hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/[0.01] to-transparent dark:from-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-8">
                    <span className="font-mono text-xs font-medium text-neutral-400 dark:text-zinc-600 group-hover:text-[#FF720A] transition-colors duration-300">
                      {step.number}
                    </span>
                    <div className="p-2 rounded-lg bg-neutral-100 dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 text-neutral-500 dark:text-zinc-400 group-hover:text-neutral-900 dark:group-hover:text-white group-hover:border-neutral-300 dark:group-hover:border-zinc-700 transition-all duration-300 group-hover:scale-110">
                      <Icon className="w-[18px] h-[18px]" strokeWidth={1.5} />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold leading-[102%] tracking-[-0.4px] text-neutral-900 dark:text-white mb-3 group-hover:text-[#FF720A] transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-sm font-medium leading-[180%] tracking-[0.7px] text-neutral-500 dark:text-zinc-400">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </SectionContainer>
  )
}
