import { SectionContainer } from "./section-container"

const CARDS = [
  {
    role: "Como consumidor",
    roleStyle: "bg-[#532971]/10 text-[#532971] dark:text-[#8a5fb0]",
    title: "Os agentes usam o que já existe",
    description: (
      <>
        Os agentes leem dados e acionam serviços do <strong>Connect</strong>, do{" "}
        <strong>NEO</strong> e do <strong>Front</strong> — além dos seus sistemas
        atuais. O contexto que antes exigia desenvolvimento fica disponível de
        forma nativa.
      </>
    ),
  },
  {
    role: "Como provedor",
    roleStyle: "bg-[#FF720A]/10 text-[#e0620a]",
    title: "Os mesmos agentes viram serviço",
    description: (
      <>
        Os agentes ficam disponíveis para essas camadas: embarcados em um
        aplicativo do <strong>Front</strong>, chamados por uma automação ou
        consumidos por outro sistema via API. A inteligência passa a fazer parte
        das suas aplicações.
      </>
    ),
  },
]

export function EcosystemSection() {
  return (
    <SectionContainer id="ecossistema" className="mt-32 mb-0">
      <div className="section-header-content gap-6 mb-12">
        <span className="uppercase text-sm font-medium text-[#FF720A] tracking-widest">
          Integração nativa com o ecossistema mobileX
        </span>
        <div>
          <h2 className="text-[32px] md:text-[48px] font-semibold text-neutral-900 dark:text-white tracking-tighter font-manrope mb-4 leading-[120%]">
            Os agentes consomem e também são{" "}
            <span className="text-[#FF720A]">oferecidos como serviço</span>.
          </h2>
          <p className="text-[18px] font-medium leading-[180%] tracking-[0.9px] text-neutral-600 dark:text-gray-400 max-w-2xl">
            O GenAI conversa nativamente com os demais componentes mobileX nos
            dois sentidos — sem integração manual a cada novo caso.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[22px]">
        {CARDS.map((card) => (
          <div
            key={card.title}
            className="group rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900/30 p-6 transition-all duration-300 hover:border-[#8a5fb0] hover:shadow-[0_10px_30px_-18px_rgba(83,41,113,0.45)]"
          >
            <span className={`inline-block mb-4 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${card.roleStyle}`}>
              {card.role}
            </span>
            <h3 className="text-xl font-semibold leading-[102%] tracking-[-0.4px] text-neutral-900 dark:text-white mb-3">
              {card.title}
            </h3>
            <p className="text-sm font-medium leading-[180%] tracking-[0.7px] text-neutral-600 dark:text-zinc-400">
              {card.description}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-8 text-[18px] font-medium leading-[180%] tracking-[0.9px] text-neutral-600 dark:text-gray-400 max-w-2xl">
        E quando você precisar de mais — um novo app, uma nova integração, mais
        dados — tudo está no mesmo ecossistema, pronto. Você define o ritmo.
      </p>
    </SectionContainer>
  )
}
