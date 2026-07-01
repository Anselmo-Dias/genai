import { SectionContainer } from "./section-container"

export function CtaSection() {
  return (
    <SectionContainer id="demo" className="mt-32 mb-24">
      <div className="rounded-[26px] bg-gradient-to-br from-[#3f1f57] to-[#532971] px-10 py-16 text-center">
        <h2 className="mx-auto max-w-[22ch] text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-snug mb-5">
          Um só lugar para criar, orquestrar e{" "}
          <span className="relative inline-flex items-center">
            <span className="relative z-10">governar</span>
            <svg 
              className="z-[1] absolute -bottom-[6px] md:-bottom-[8px] left-1/2 -translate-x-1/2 w-[110%] h-auto max-w-[220px]" 
              fill="none" 
              viewBox="0 0 215 78" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M158.557 18.0539C76.7629 3.59645 4.61999 27.4373 2.52132 45.016C-3.48726 95.3446 236.85 65.2142 210.188 23.9397C199.842 7.92214 121.61 -0.649778 30.7298 18.0808" 
                stroke="#FF720A" 
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>{" "}
          seus agentes de IA.
        </h2>
        <p className="mx-auto max-w-[640px] text-sm md:text-base leading-relaxed text-white/85 mb-8">
          Pare de espalhar IA por ferramentas e credenciais soltas. Centralize
          seus agentes, com o seu controle e o seu modelo — entregues a pessoas
          e a sistemas, com identidade e auditoria em tudo.
        </p>
        <a
          href="#"
          className="inline-flex items-center bg-[#FF720A] hover:bg-[#e0620a] text-white font-bold text-sm px-6 py-3 rounded-full transition-colors duration-200"
        >
          Agendar demonstração
        </a>
      </div>
    </SectionContainer>
  )
}
