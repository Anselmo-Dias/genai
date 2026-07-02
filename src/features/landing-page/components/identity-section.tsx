import { ShieldCheck, Lock, Terminal, UserCheck } from "lucide-react"

import { SectionContainer } from "./section-container"

const CARDS = [
  {
    title: "No chat",
    description:
      "O usuário se autentica para acessar o chat. O agente passa a agir com a identidade e as permissões dessa pessoa — ele só vê e faz o que ela poderia ver e fazer.",
  },
  {
    title: "Na API",
    description:
      "A aplicação repassa, na chamada, quem é o usuário por trás do agente. Mesmo automatizado, o agente continua associado a uma identidade real — e tudo fica auditável.",
  },
]

export function IdentitySection() {
  return (
    <SectionContainer id="identidade" className="mt-32 mb-0">
      {/* Header */}
      <div className="section-header-content gap-6 mb-12">
        <span className="uppercase text-sm font-medium text-[#FF720A] tracking-widest">
          Identidade do usuário
        </span>
        <div>
          <h2 className="text-[32px] md:text-[48px] font-semibold text-neutral-900 dark:text-white tracking-tighter font-manrope mb-4 leading-[120%]">
            O agente sempre sabe{" "}
            <span className="text-[#FF720A]">em nome de quem</span> está agindo.
          </h2>
          <p className="text-[18px] font-medium leading-[180%] tracking-[0.9px] text-neutral-600 dark:text-gray-400 max-w-2xl">
            Em qualquer caminho de acesso, a identidade da pessoa acompanha a
            ação do início ao fim — com as permissões dela e o registro do que
            foi feito.
          </p>
        </div>
      </div>

      {/* Main Grid: Left cards / Right console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Text Cards (col-span-5) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="group rounded-2xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-zinc-900/10 p-6 transition-all duration-300 hover:border-[#8a5fb0] hover:shadow-[0_10px_30px_-18px_rgba(83,41,113,0.15)] shadow-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-center text-neutral-500 dark:text-neutral-400 group-hover:text-[#FF720A] transition-colors">
                  <UserCheck className="w-4 h-4" />
                </div>
                <h3 className="text-xl font-semibold leading-[102%] tracking-[-0.4px] text-neutral-900 dark:text-white">
                  {card.title}
                </h3>
              </div>
              <p className="text-sm font-medium leading-[180%] tracking-[0.7px] text-neutral-600 dark:text-zinc-400">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* Right Side: High-tech Security console (col-span-7) */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-zinc-900/10 p-6 lg:p-8 relative overflow-hidden group/console shadow-sm">
          {/* Background Radial Glow */}
          <div className="opacity-80 absolute top-0 right-0 bottom-0 left-0 bg-[radial-gradient(circle_at_center,_rgba(83,41,113,0.04)_0%,_rgba(0,0,0,0)_70%)] pointer-events-none" />

          {/* Console Header */}
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-black/5 dark:border-white/5">
              <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
                <Terminal className="w-4 h-4" />
                <span className="text-[10px] font-mono tracking-widest uppercase">Audit Log Console</span>
              </div>
              <span className="flex items-center gap-1.5 text-[10px] font-mono text-green-500 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                SSO ACTIVE
              </span>
            </div>

            {/* Simulated Live Logs */}
            <div className="space-y-3 font-mono text-[11px] leading-relaxed bg-black/5 dark:bg-black/40 p-4 rounded-xl border border-black/5 dark:border-white/5">
              <div className="flex items-start gap-2">
                <span className="text-neutral-400 dark:text-zinc-600 shrink-0">14:52:02</span>
                <span className="text-green-600 dark:text-green-400 shrink-0 font-bold">[ALLOW]</span>
                <span className="text-neutral-700 dark:text-zinc-300">user:ana.silva → agent:atendimento-l1</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-neutral-400 dark:text-zinc-600 shrink-0">14:52:08</span>
                <span className="text-red-600 dark:text-red-400 shrink-0 font-bold">[DENY]</span>
                <span className="text-neutral-500 dark:text-zinc-500">user:ext_user → agent:financeiro</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-neutral-400 dark:text-zinc-600 shrink-0">14:52:15</span>
                <span className="text-green-600 dark:text-green-400 shrink-0 font-bold">[ALLOW]</span>
                <span className="text-neutral-700 dark:text-zinc-300">user:dev.team → key:sk-az-9c1e</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-neutral-400 dark:text-zinc-600 shrink-0">14:52:22</span>
                <span className="text-orange-600 dark:text-orange-400 shrink-0 font-bold">[AUDIT]</span>
                <span className="text-neutral-600 dark:text-zinc-400">context:agent-v2.1 → identity:auth-sso</span>
              </div>
            </div>
          </div>

          {/* Access matrix inside console */}
          <div className="mt-6 pt-6 border-t border-black/5 dark:border-white/5">
            <div className="text-[10px] font-mono text-neutral-400 dark:text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              <span>Matriz de Acesso do Usuário</span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/[0.02] transition-colors duration-200">
                <span className="text-xs text-neutral-700 dark:text-zinc-400 font-mono font-medium">admin / gestor</span>
                <div className="flex gap-1.5">
                  <div className="h-5 px-2 bg-green-500/10 rounded text-[9px] font-bold text-green-600 dark:text-green-400 flex items-center justify-center border border-green-500/20">R/W</div>
                  <div className="h-5 px-2 bg-green-500/10 rounded text-[9px] font-bold text-green-600 dark:text-green-400 flex items-center justify-center border border-green-500/20">EXE</div>
                  <div className="h-5 px-2 bg-green-500/10 rounded text-[9px] font-bold text-green-600 dark:text-green-400 flex items-center justify-center border border-green-500/20">DEL</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/[0.02] transition-colors duration-200">
                <span className="text-xs text-neutral-700 dark:text-zinc-400 font-mono font-medium">dev / analista</span>
                <div className="flex gap-1.5">
                  <div className="h-5 px-2 bg-blue-500/10 rounded text-[9px] font-bold text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-500/20">R/W</div>
                  <div className="h-5 px-2 bg-blue-500/10 rounded text-[9px] font-bold text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-500/20">EXE</div>
                  <div className="h-5 px-2 bg-black/5 dark:bg-white/5 rounded text-[9px] font-bold text-neutral-400 dark:text-neutral-600 flex items-center justify-center">—</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/[0.02] transition-colors duration-200">
                <span className="text-xs text-neutral-700 dark:text-zinc-400 font-mono font-medium">colaborador / client</span>
                <div className="flex gap-1.5">
                  <div className="h-5 px-2 bg-neutral-500/10 rounded text-[9px] font-bold text-neutral-600 dark:text-neutral-400 flex items-center justify-center border border-black/10 dark:border-white/10">R</div>
                  <div className="h-5 px-2 bg-black/5 dark:bg-white/5 rounded text-[9px] font-bold text-neutral-400 dark:text-neutral-600 flex items-center justify-center">—</div>
                  <div className="h-5 px-2 bg-black/5 dark:bg-white/5 rounded text-[9px] font-bold text-neutral-400 dark:text-neutral-600 flex items-center justify-center">—</div>
                </div>
              </div>
            </div>
          </div>

          {/* Secure token badge */}
          <div className="mt-5 relative z-10 flex items-center gap-2 rounded-xl border border-dashed border-[#8a5fb0]/60 bg-[#532971]/5 px-4 py-2.5 text-xs font-semibold text-[#532971] dark:text-[#a370d6]">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Sessão corporativa mapeada via JWT e protegida por segregação de acesso multi-tenant.</span>
          </div>

        </div>

      </div>
    </SectionContainer>
  )
}
