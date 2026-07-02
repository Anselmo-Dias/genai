import { SectionContainer } from "./section-container"

const FEATURES = [
  {
    title: "Multi-provedor de LLM",
    description:
      "OpenAI, Anthropic, Gemini e modelos open source em uma só interface, com seleção por agente — sem ficar preso a um fornecedor.",
  },
  {
    title: "Base de conhecimento por agente",
    description:
      "Cada agente responde com base nos documentos da sua empresa e cita as fontes da resposta.",
  },
  {
    title: "Memória dos agentes",
    description:
      "O agente lembra do contexto entre conversas — o usuário não precisa repetir tudo a cada interação.",
  },
  {
    title: "Ferramentas e ações via MCP",
    description:
      "Os agentes executam ações in loco em sistemas reais, conectando-se a servidores internos e externos.",
  },
  {
    title: "Histórico e auditoria completos",
    description:
      "Toda conversa e cada ação ficam registradas, com filtros por agente, usuário e período.",
  },
  {
    title: "Controle de acesso granular",
    description:
      "Defina quem pode criar, editar, usar ou ver cada agente — por usuário, grupo e perfil.",
  },
  {
    title: "Gestão segura de chaves",
    description:
      "Credenciais criptografadas e isoladas por cliente e por agente — nada exposto em código ou logs.",
  },
  {
    title: "Políticas e custos por agente",
    description:
      "Defina limites de uso e acompanhe quanto cada agente consome — em tokens e em reais, em tempo real.",
  },
  {
    title: "Confirmação humana e multi-tenant",
    description:
      "Ações sensíveis pedem aprovação humana, e cada cliente opera com dados totalmente isolados.",
  },
]

export function FeaturesSection() {
  return (
    <SectionContainer id="funcionalidades" className="mt-32 mb-0">
      <div className="section-header-content gap-6 mb-12">
        <span className="uppercase text-sm font-medium text-[#FF720A] tracking-widest">
          Funcionalidades
        </span>
        <h2 className="text-[32px] md:text-[48px] font-semibold text-neutral-900 dark:text-white tracking-tighter font-manrope leading-[120%]">
          Tudo que sua equipe precisa para operar IA{" "}
          <span className="text-[#FF720A]">com controle</span>.
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[22px]">
        {FEATURES.map((feature) => (
          <div
            key={feature.title}
            className="group rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900/30 p-6 transition-all duration-300 hover:border-[#8a5fb0] hover:shadow-[0_10px_30px_-18px_rgba(83,41,113,0.45)]"
          >
            <h3 className="flex items-start gap-2.5 text-xl font-semibold leading-[102%] tracking-[-0.4px] text-neutral-900 dark:text-white mb-2">
              <span className="mt-[7px] flex-none w-2 h-2 rounded-sm bg-[#532971] dark:bg-[#FF720A]" />
              {feature.title}
            </h3>
            <p className="text-sm font-medium leading-[180%] tracking-[0.7px] text-neutral-600 dark:text-zinc-400">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </SectionContainer>
  )
}
