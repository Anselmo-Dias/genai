import { SectionContainer } from "./section-container"

export function CentralQuestionSection() {
  return (
    <SectionContainer 
      className="relative z-40 bg-[#532971] dark:bg-[#6c3a93] py-16 md:py-20 mt-16 lg:mt-0 mb-0"
      innerClassName="text-center"
    >
      <span className="inline-block mb-5 rounded-full bg-white/[0.14] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-white">
        A pergunta central
      </span>

      <h2 className="mx-auto max-w-4xl text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[120%]">
        E se você tivesse um só lugar para criar, governar e entregar todos os
        seus agentes de IA?
      </h2>

      <p className="mx-auto mt-6 max-w-3xl text-sm sm:text-base lg:text-lg leading-relaxed text-white/85">
        Atendendo pessoas no chat ou abastecendo aplicações via API — cada
        agente com o modelo certo, as permissões do usuário e o registro de
        tudo o que faz. É exatamente isso que o mobileX GenAI entrega.
      </p>
    </SectionContainer>
  )
}
