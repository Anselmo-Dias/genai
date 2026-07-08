import { Bot, Cpu, Plug, Network, ShieldCheck, ArrowRight, ArrowLeft } from "lucide-react"

import { SectionContainer } from "./section-container"

const CONSUMERS = [
  {
    title: "Usuários finais",
    sub: "Pessoas da operação e clientes",
    via: "Acesso via Chat — com login",
  },
  {
    title: "Aplicações e sistemas",
    sub: "Apps, automações e outros sistemas",
    via: "Acesso via API — identidade repassada",
  },
]

const TOOLS = [
  { title: "Connect", sub: "Integrações e conectores" },
  { title: "NEO", sub: "Dados e workflows" },
  { title: "Front", sub: "Apps e portais" },
  { title: "Sistemas externos", sub: "CRM, ERP, bases atuais" },
]

const HUB_PILLS = ["Configuração de agentes", "Governança por identidade", "Multi-provedor de LLM"]

const BOTTOM_CARDS = [
  { title: "Configura", description: "Todos os agentes criados, ajustados e versionados em um só painel." },
  { title: "Orquestra", description: "Orquestração agêntica centralizada, com o modelo e as regras de cada agente." },
  { title: "Conecta", description: "Consome ferramentas, dados e serviços via servidores MCP." },
  { title: "Entrega", description: "Disponibiliza os agentes por chat (pessoas) e por API (aplicações)." },
]

export function ArchitectureSection() {
  return (
    <SectionContainer id="arquitetura" className="mt-32 mb-0">
      {/* Header */}
      <div className="section-header-content gap-6 mb-12">
        <span className="uppercase text-sm font-medium text-[#FF720A] tracking-widest">
          Como funciona
        </span>
        <div>
          <h2 className="max-w-xl text-[32px] md:text-[48px] font-semibold text-neutral-900 dark:text-white tracking-tighter font-manrope mb-4 leading-[120%]">
            O GenAI no centro da sua{" "}
            <span className="text-[#FF720A]">operação de IA</span>.
          </h2>
          <p className="text-[18px] font-medium leading-[180%] tracking-[0.9px] text-neutral-600 dark:text-gray-400 max-w-2xl">
            Você configura seus agentes em um só lugar. O GenAI orquestra esses
            agentes de forma centralizada, conecta-se às suas ferramentas e
            dados, e os entrega para quem precisa — pessoas e sistemas.
          </p>
        </div>
      </div>

      {/* Main Grid: Left Panel (Component lists) & Right Panel (Orbit Hub Diagram) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">

        {/* Left Panel: lists (col-span-5) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Consumers Group */}
          <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-zinc-900/10 p-6 flex flex-col justify-between shadow-sm relative">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.1em] text-neutral-400">
                Quem usa os agentes
              </p>
              <div className="flex flex-col gap-3">
                {CONSUMERS.map((node) => (
                  <div 
                    key={node.title} 
                    className="flex items-center gap-3 p-3 bg-neutral-100/50 dark:bg-white/[0.03] border border-black/5 dark:border-white/5 rounded-xl hover:border-[#FF720A]/20 dark:hover:border-[#FF720A]/20 transition-all duration-300"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center flex-shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FF720A] animate-pulse" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-neutral-900 dark:text-white leading-tight">{node.title}</p>
                      <p className="text-xs text-neutral-500 leading-normal mt-0.5">{node.sub}</p>
                    </div>
                    <span className="rounded-full bg-[#532971]/10 dark:bg-[#532971]/20 px-2.5 py-0.5 text-[10px] font-bold text-[#532971] dark:text-[#a370d6]">
                      {node.via}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Duas bolhas individuais de seta (Ida e Volta) empilhadas com gap-2 */}
            <div className="hidden lg:flex absolute -right-[28px] top-1/2 -translate-y-1/2 flex-col gap-1.5 z-30">
              <div className="w-6 h-6 rounded-full bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 flex items-center justify-center shadow-sm text-[#FF720A] transition-colors duration-300">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
              <div className="w-6 h-6 rounded-full bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 flex items-center justify-center shadow-sm text-[#FF720A] transition-colors duration-300">
                <ArrowLeft className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Tools Group */}
          <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-zinc-900/10 p-6 flex flex-col justify-between shadow-sm relative">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.1em] text-neutral-400">
                Ferramentas, dados e serviços
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TOOLS.map((node) => (
                  <div 
                    key={node.title} 
                    className="flex items-center gap-3 p-3 bg-neutral-100/50 dark:bg-white/[0.03] border border-black/5 dark:border-white/5 rounded-xl hover:border-[#FF720A]/20 dark:hover:border-[#FF720A]/20 transition-all duration-300 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-[#FF720A]/30 transition-colors">
                      <div className="w-3.5 h-3.5 rounded-sm bg-neutral-200 dark:bg-white/10 group-hover:bg-[#FF720A]/20 transition-colors flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-white/30 group-hover:bg-[#FF720A]" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-neutral-900 dark:text-white leading-tight">{node.title}</p>
                      <p className="text-xs text-neutral-500 leading-normal mt-0.5">{node.sub}</p>
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.7)] flex-shrink-0 animate-pulse" />
                  </div>
                ))}
              </div>
            </div>

            {/* Duas bolhas individuais de seta (Ida e Volta) empilhadas com gap-2 */}
            <div className="hidden lg:flex absolute -right-[28px] top-1/2 -translate-y-1/2 flex-col gap-1.5 z-30">
              <div className="w-6 h-6 rounded-full bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 flex items-center justify-center shadow-sm text-[#FF720A] transition-colors duration-300">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
              <div className="w-6 h-6 rounded-full bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 flex items-center justify-center shadow-sm text-[#FF720A] transition-colors duration-300">
                <ArrowLeft className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

        </div>

        {/* Right Panel: Orbit / Ecosystem Diagram (col-span-7) */}
        <div className="lg:col-span-7 min-h-[480px] flex flex-col justify-between rounded-2xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-zinc-900/10 p-6 lg:p-10 relative overflow-hidden group/orbit shadow-sm">
          {/* Background Radial Glow */}
          <div className="opacity-80 absolute top-0 right-0 bottom-0 left-0 bg-[radial-gradient(circle_at_center,_rgba(255,114,10,0.06)_0%,_rgba(0,0,0,0)_70%)] pointer-events-none" />

          {/* Trilha de identidade inside the visual area */}
          <div className="relative z-10 flex items-center gap-2 rounded-xl border border-dashed border-[#8a5fb0]/60 bg-[#532971]/5 px-4 py-3 text-xs md:text-sm font-semibold text-[#532971] dark:text-[#a370d6]">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>A identidade do usuário é preservada em todas as camadas — do chat ou da API até cada acesso a dados.</span>
          </div>

          {/* Central Orbit System */}
          <div className="relative flex-1 flex items-center justify-center my-6 scale-90 md:scale-100 transition-transform duration-500">
            {/* Concentric helper rings */}
            <div className="absolute w-[180px] h-[180px] rounded-full border border-black/5 dark:border-white/5 pointer-events-none" />
            <div className="absolute w-[280px] h-[280px] rounded-full border border-dashed border-[#FF720A]/10 dark:border-[#FF720A]/10 pointer-events-none" />
            <div className="absolute w-[380px] h-[380px] rounded-full border border-black/5 dark:border-white/5 pointer-events-none" />
            
            {/* Central glowing hub */}
            <div className="relative w-28 h-28 rounded-full bg-[#532971] dark:bg-[#6c3a93] border border-[#FF720A]/30 dark:border-[#FF720A]/50 flex flex-col items-center justify-center shadow-[0_0_40px_-5px_rgba(83,41,113,0.6)] dark:shadow-[0_0_50px_-5px_rgba(108,58,147,0.8)] z-20 text-center">
              <div className="animate-ping opacity-10 border-[#FF720A] border rounded-full absolute inset-0 pointer-events-none" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF720A]">mobileX</span>
              <span className="text-lg font-extrabold text-white leading-none mt-0.5">GenAI</span>
            </div>

            {/* Orbit container */}
            <div className="absolute inset-0 flex items-center justify-center animate-[spin_40s_linear_infinite] pointer-events-none">
              {/* Node 1: Chat (0deg = right) */}
              <div className="absolute top-1/2 left-1/2" style={{ transform: "translate(-50%, -50%) rotate(0deg) translateY(-140px) rotate(0deg)" }}>
                <div className="flex flex-col items-center gap-1.5 animate-[spin_40s_linear_infinite_reverse] pointer-events-auto">
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:text-[#FF720A] hover:border-[#FF720A]/30 hover:bg-[#FF720A]/5 transition-all hover:scale-110 shadow-md cursor-default">
                    <Bot className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-semibold whitespace-nowrap bg-white/95 dark:bg-zinc-950/95 px-1.5 py-0.5 rounded border border-black/5 dark:border-white/5 shadow-sm">Chat</span>
                </div>
              </div>

              {/* Node 2: LLMs (90deg = bottom) */}
              <div className="absolute top-1/2 left-1/2" style={{ transform: "translate(-50%, -50%) rotate(90deg) translateY(-140px) rotate(-90deg)" }}>
                <div className="flex flex-col items-center gap-1.5 animate-[spin_40s_linear_infinite_reverse] pointer-events-auto">
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:text-[#FF720A] hover:border-[#FF720A]/30 hover:bg-[#FF720A]/5 transition-all hover:scale-110 shadow-md cursor-default">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-semibold whitespace-nowrap bg-white/95 dark:bg-zinc-950/95 px-1.5 py-0.5 rounded border border-black/5 dark:border-white/5 shadow-sm">LLMs</span>
                </div>
              </div>

              {/* Node 3: MCP (180deg = left) */}
              <div className="absolute top-1/2 left-1/2" style={{ transform: "translate(-50%, -50%) rotate(180deg) translateY(-140px) rotate(-180deg)" }}>
                <div className="flex flex-col items-center gap-1.5 animate-[spin_40s_linear_infinite_reverse] pointer-events-auto">
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:text-[#FF720A] hover:border-[#FF720A]/30 hover:bg-[#FF720A]/5 transition-all hover:scale-110 shadow-md cursor-default">
                    <Plug className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-semibold whitespace-nowrap bg-white/95 dark:bg-zinc-950/95 px-1.5 py-0.5 rounded border border-black/5 dark:border-white/5 shadow-sm">MCP</span>
                </div>
              </div>

              {/* Node 4: APIs (270deg = top) */}
              <div className="absolute top-1/2 left-1/2" style={{ transform: "translate(-50%, -50%) rotate(270deg) translateY(-140px) rotate(-270deg)" }}>
                <div className="flex flex-col items-center gap-1.5 animate-[spin_40s_linear_infinite_reverse] pointer-events-auto">
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:text-[#FF720A] hover:border-[#FF720A]/30 hover:bg-[#FF720A]/5 transition-all hover:scale-110 shadow-md cursor-default">
                    <Network className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-semibold whitespace-nowrap bg-white/95 dark:bg-zinc-950/95 px-1.5 py-0.5 rounded border border-black/5 dark:border-white/5 shadow-sm">APIs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Horizontal list of pills */}
          <div className="relative z-10 flex flex-wrap justify-center gap-2 mt-4">
            {HUB_PILLS.map((pill) => (
              <span
                key={pill}
                className="rounded-full bg-neutral-100 dark:bg-white/[0.08] px-3.5 py-1 text-xs font-semibold text-neutral-700 dark:text-white border border-black/5 dark:border-white/5"
              >
                {pill}
              </span>
            ))}
          </div>

        </div>

      </div>

      {/* 4 cards inferiores */}
      <div className="mt-8 grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-4">
        {BOTTOM_CARDS.map((card) => (
          <div
            key={card.title}
            className="group rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900/30 p-6 transition-all duration-300 hover:border-[#FF720A]/40 hover:shadow-[0_10px_30px_-18px_rgba(255,114,10,0.15)] dark:hover:shadow-[0_10px_30px_-18px_rgba(255,114,10,0.3)]"
          >
            <h3 className="mb-2 text-xl font-semibold leading-[102%] tracking-[-0.4px] text-neutral-900 dark:text-white group-hover:text-[#FF720A] transition-colors duration-300">
              {card.title}
            </h3>
            <p className="text-sm font-medium leading-[180%] tracking-[0.7px] text-neutral-600 dark:text-zinc-400">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </SectionContainer>
  )
}
