import { useState, useEffect, useRef } from "react"
import { ShieldCheck, User, MessageSquare, Database, Globe, Shield, UserCheck } from "lucide-react"

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

const EMITTERS = [
  {
    id: "chat",
    label: "Chat Application",
    desc: "Usuário conectado via SSO",
    icon: MessageSquare,
    method: "POST /chat/message",
    auth: "JWT Bearer Token",
    color: "emerald",
    particleColor: "#10b981",
    detectedUser: {
      name: "Ana Silva",
      role: "Diretora de RH",
      method: "SAML SSO (Okta)",
      status: "🔐 AUTENTICADO",
      statusColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    },
  },
  {
    id: "erp",
    label: "ERP Gateway",
    desc: "Sincronização agendada",
    icon: Database,
    method: "GET /nep/contracts",
    auth: "sk_live_erp_9c12...",
    color: "orange",
    particleColor: "#FF720A",
    detectedUser: {
      name: "ERP Sync Service",
      role: "Chave do Connect",
      method: "API Key (Criptografado)",
      status: "🔐 AUTENTICADO",
      statusColor: "text-[#FF720A] bg-[#FF720A]/10 border-[#FF720A]/20",
    },
  },
  {
    id: "portal",
    label: "Portal L1",
    desc: "Acesso externo de clientes",
    icon: Globe,
    method: "POST /support/ticket",
    auth: "Guest MFA Session",
    color: "blue",
    particleColor: "#3b82f6",
    detectedUser: {
      name: "Visitante L1",
      role: "Suporte Temporário",
      method: "MFA Guest Credentials",
      status: "⚠️ ACESSO LIMITADO",
      statusColor: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    },
  },
]

export function IdentitySection() {
  const [activeId, setActiveId] = useState("chat")
  const [requestProgress, setRequestProgress] = useState(0) // 0: parado, 1: viajando, 2: identificado
  const activeEmitter = EMITTERS.find((e) => e.id === activeId)!

  // Referências para calcular posições exatas dos conectores físicos (dots)
  const containerRef = useRef<HTMLDivElement>(null)
  const emitterDotRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const globeInputRef = useRef<HTMLDivElement>(null)

  const [coords, setCoords] = useState({
    chatX: 36,
    chatY: 20,
    erpX: 36,
    erpY: 50,
    portalX: 36,
    portalY: 80,
    globeX: 80,
    globeY: 50,
  })

  const updateCoords = () => {
    if (!containerRef.current || !globeInputRef.current) return

    const containerRect = containerRef.current.getBoundingClientRect()
    const globeInputRect = globeInputRef.current.getBoundingClientRect()

    const getRelativeCenterPercent = (rect: DOMRect) => {
      const centerX = rect.left + rect.width / 2 - containerRect.left
      const centerY = rect.top + rect.height / 2 - containerRect.top
      return {
        x: (centerX / containerRect.width) * 100,
        y: (centerY / containerRect.height) * 100,
      }
    }

    const chatDot = emitterDotRefs.current["chat"]
    const erpDot = emitterDotRefs.current["erp"]
    const portalDot = emitterDotRefs.current["portal"]

    const chatCoords = chatDot ? getRelativeCenterPercent(chatDot.getBoundingClientRect()) : { x: 36, y: 20 }
    const erpCoords = erpDot ? getRelativeCenterPercent(erpDot.getBoundingClientRect()) : { x: 36, y: 50 }
    const portalCoords = portalDot ? getRelativeCenterPercent(portalDot.getBoundingClientRect()) : { x: 36, y: 80 }
    const globeCoords = getRelativeCenterPercent(globeInputRect)

    setCoords({
      chatX: chatCoords.x,
      chatY: chatCoords.y,
      erpX: erpCoords.x,
      erpY: erpCoords.y,
      portalX: portalCoords.x,
      portalY: portalCoords.y,
      globeX: globeCoords.x,
      globeY: globeCoords.y,
    })
  }

  // Ciclo automático a cada 5 segundos para alternar requests
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveId((current) => {
        if (current === "chat") return "erp"
        if (current === "erp") return "portal"
        return "chat"
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Atualiza coordenadas no carregamento inicial e no resize
  useEffect(() => {
    const timer = setTimeout(updateCoords, 200) // Pequeno delay para garantir estabilização do layout
    window.addEventListener("resize", updateCoords)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("resize", updateCoords)
    }
  }, [])

  // Dispara animação de fluxo de dados sempre que o activeId mudar
  useEffect(() => {
    setRequestProgress(1) // Iniciou a viagem
    // Força atualização de coordenadas para garantir alinhamento atualizado
    setTimeout(updateCoords, 50)

    const travelTimer = setTimeout(() => {
      setRequestProgress(2) // Chegou no Globo GenAI e foi revelado
    }, 2500) // 2.5 segundos de viagem para dar tempo de ver a metamorfose geométrica

    return () => clearTimeout(travelTimer)
  }, [activeId])

  const handleSelectEmitter = (id: string) => {
    setActiveId(id)
  }

  // Gera o caminho de conexão cúbico Bézier clássico de Canvas de Fluxo (suave, com tangentes horizontais)
  const getPathD = (startX: number, startY: number) => {
    const distanceX = coords.globeX - startX
    const cp1X = startX + distanceX * 0.55
    const cp2X = coords.globeX - distanceX * 0.55
    return `M ${startX},${startY} C ${cp1X},${startY} ${cp2X},${coords.globeY} ${coords.globeX},${coords.globeY}`
  }

  return (
    <SectionContainer id="identidade" className="mt-32 mb-0">
      {/* Estilos CSS locais para rotação e pulso do Globo */}
      <style>{`
        @keyframes orbit-rotate-normal {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes orbit-rotate-reverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-orbit-normal {
          animation: orbit-rotate-normal 24s linear infinite;
        }
        .animate-orbit-reverse {
          animation: orbit-rotate-reverse 18s linear infinite;
        }
        @keyframes globe-pulse {
          0%, 100% {
            transform: scale(1);
            border-color: rgba(255, 114, 10, 0.1);
            box-shadow: 0 0 15px rgba(83, 41, 113, 0.05), 0 0 5px rgba(255, 114, 10, 0.02);
          }
          50% {
            transform: scale(1.02);
            border-color: rgba(255, 114, 10, 0.25);
            box-shadow: 0 0 25px rgba(83, 41, 113, 0.15), 0 0 15px rgba(255, 114, 10, 0.1);
          }
        }
        .animate-globe-glow {
          animation: globe-pulse 3s infinite ease-in-out;
        }
      `}</style>

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

      {/* Main Grid: Left cards / Right interactive Globe simulation */}
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

        {/* Right Side: GenAI Globe & Emitter Simulation (col-span-7) */}
        <div 
          ref={containerRef}
          className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-zinc-900/10 p-6 lg:p-8 relative overflow-hidden shadow-sm min-h-[460px]"
        >
          {/* Background Radial Glow */}
          <div className="opacity-80 absolute top-0 right-0 bottom-0 left-0 bg-[radial-gradient(circle_at_center,_rgba(83, 41, 113, 0.04)_0%,_rgba(0, 0, 0, 0)_70%)] pointer-events-none" />

          {/* SVG Dinâmico Responsivo com Linhas Convergentes e Partícula Minimalista */}
          {/* O SVG cobre agora TODO o container pai para garantir conexões corretas dos conectores */}
          <svg className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Linhas de conexão que convergem dinamicamente dos emissores na esquerda até o centro do Globo */}
            <path
              id="path-chat"
              d={getPathD(coords.chatX, coords.chatY)}
              fill="none"
              stroke={activeId === "chat" ? "rgba(255, 114, 10, 0.25)" : "rgba(100, 116, 139, 0.05)"}
              strokeWidth="0.15"
              className="transition-all duration-500"
            />
            <path
              id="path-erp"
              d={getPathD(coords.erpX, coords.erpY)}
              fill="none"
              stroke={activeId === "erp" ? "rgba(255, 114, 10, 0.25)" : "rgba(100, 116, 139, 0.05)"}
              strokeWidth="0.15"
              className="transition-all duration-500"
            />
            <path
              id="path-portal"
              d={getPathD(coords.portalX, coords.portalY)}
              fill="none"
              stroke={activeId === "portal" ? "rgba(255, 114, 10, 0.25)" : "rgba(100, 116, 139, 0.05)"}
              strokeWidth="0.15"
              className="transition-all duration-500"
            />

            {/* Partícula Super Minimalista Ativa (Flow Canvas Node) - Monta e desmonta com 'key' para resetar animação do SVG no tempo 0 */}
            <g key={activeId}>
              <circle r="0.5" fill={activeEmitter.particleColor}>
                <animateMotion dur="2.5s" repeatCount="1" fill="freeze">
                  <mpath 
                    href={activeId === "chat" ? "#path-chat" : activeId === "erp" ? "#path-erp" : "#path-portal"} 
                    xlinkHref={activeId === "chat" ? "#path-chat" : activeId === "erp" ? "#path-erp" : "#path-portal"} 
                  />
                </animateMotion>
                {/* Desaparece exatamente ao chegar no Globo (aos 2.5s) */}
                <animate
                  attributeName="opacity"
                  values="1; 1; 0"
                  keyTimes="0; 0.98; 1"
                  dur="2.5s"
                  repeatCount="1"
                  fill="freeze"
                />
                {/* Leve pulso de tamanho para simular metamorfose geométrica no tráfego */}
                <animate
                  attributeName="r"
                  values="0.4; 0.7; 0.3; 0.5"
                  dur="1.2s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          </svg>

          {/* Interactive Playground Area */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center my-auto relative z-10 py-4 w-full">
            
            {/* Column 1: Static Emitters (md:col-span-5) */}
            <div className="md:col-span-5 space-y-3">
              <span className="text-[9px] font-mono text-neutral-400 dark:text-zinc-500 uppercase tracking-wider block mb-1">
                Origem do Request
              </span>
              
              {EMITTERS.map((emitter) => {
                const isActive = activeId === emitter.id
                const Icon = emitter.icon
                return (
                  <button
                    key={emitter.id}
                    onClick={() => handleSelectEmitter(emitter.id)}
                    className={`w-full p-2.5 rounded-xl border text-left transition-all duration-300 relative flex items-center gap-3 group ${
                      isActive
                        ? "border-[#FF720A]/30 bg-white dark:bg-zinc-800/80 shadow-sm scale-[1.02]"
                        : "border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.005] hover:bg-black/[0.02] dark:hover:bg-white/[0.01] opacity-70 hover:opacity-100"
                    }`}
                  >
                    {/* Active highlight side bar */}
                    {isActive && (
                      <div className="absolute left-0 top-2.5 bottom-2.5 w-0.5 bg-[#FF720A] rounded-r-md" />
                    )}

                    {/* Output port dot (Flow Canvas style) - Com REF para medir a posição exata */}
                    <div 
                      ref={(el) => {
                        emitterDotRefs.current[emitter.id] = el
                      }}
                      className={`absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-black/10 dark:border-white/10 z-30 transition-all duration-300 ${
                        isActive 
                          ? "bg-[#FF720A] shadow-[0_0_6px_rgba(255,114,10,0.6)]" 
                          : "bg-neutral-200 dark:bg-zinc-850"
                      }`} 
                    />

                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                      isActive 
                        ? "bg-[#FF720A]/10 border-[#FF720A]/20 text-[#FF720A]" 
                        : "bg-neutral-100 dark:bg-zinc-800 border-black/5 dark:border-white/5 text-neutral-455 dark:text-neutral-500"
                    }`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-xs text-neutral-900 dark:text-white leading-tight">
                        {emitter.label}
                      </div>
                      <div className="text-[8px] text-neutral-400 dark:text-zinc-500 font-mono mt-0.5 truncate">
                        {emitter.method}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Spacer Column (md:col-span-3) - Serves as the empty corridor for SVG paths */}
            <div className="md:col-span-3 hidden md:block animate-pulse pointer-events-none" />

            {/* Column 3: GenAI Globe & Decoder HUD (md:col-span-4) */}
            <div className="md:col-span-4 flex flex-col items-center justify-center relative min-h-[220px]">
              
              {/* GenAI Minimalist Globe */}
              <div 
                className="w-24 h-24 rounded-full bg-black/5 dark:bg-black/40 flex items-center justify-center border border-neutral-200/30 dark:border-zinc-800 animate-globe-glow relative shadow-md"
              >
                {/* Input port dot (Flow Canvas style) - Com REF para medir a posição exata */}
                <div 
                  ref={globeInputRef}
                  className={`absolute left-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-black/10 dark:border-white/10 z-30 transition-all duration-555 ${
                    requestProgress === 2 
                      ? "bg-[#FF720A] shadow-[0_0_8px_rgba(255,114,10,0.7)]" 
                      : "bg-neutral-300 dark:bg-zinc-700"
                  }`} 
                />

                {/* Orbit rings - very thin and discrete */}
                <div className="absolute inset-[-6px] border border-dashed border-[#FF720A]/10 rounded-full animate-orbit-normal pointer-events-none" />
                <div className="absolute inset-[-12px] border border-dashed border-[#532971]/5 rounded-full animate-orbit-reverse pointer-events-none" />
                
                {/* Center Core */}
                <div className="z-10 flex flex-col items-center justify-center text-center">
                  <div className={`w-9 h-9 rounded-full bg-neutral-100/50 dark:bg-zinc-800/30 flex items-center justify-center transition-all duration-500 ${
                    requestProgress === 2 ? "scale-105 bg-[#FF720A]/10 border border-[#FF720A]/20" : ""
                  }`}>
                    {requestProgress === 2 ? (
                      <ShieldCheck className={`w-4 h-4 ${
                        activeId === "chat" ? "text-emerald-500" :
                        activeId === "erp" ? "text-[#FF720A]" : "text-blue-500"
                      }`} />
                    ) : (
                      <Shield className="w-4 h-4 text-neutral-400 dark:text-zinc-500" />
                    )}
                  </div>
                  <span className="text-[7px] font-bold text-neutral-400 dark:text-zinc-500 tracking-widest uppercase mt-1 font-mono">GENAI</span>
                </div>
              </div>

              {/* Holographic Projection Card (Minimalist) */}
              <div className={`absolute bottom-[-15px] w-[170px] rounded-xl border p-3 backdrop-blur-md bg-white/95 dark:bg-zinc-900/95 shadow-lg transition-all duration-500 flex flex-col gap-1 ${
                requestProgress === 2 
                  ? "opacity-100 translate-y-0 scale-100 border-[#FF720A]/20" 
                  : "opacity-0 translate-y-3 scale-95 border-black/5 dark:border-white/5 pointer-events-none"
              }`}>
                <div className="flex justify-between items-center">
                  <span className="text-[6.5px] font-mono uppercase font-bold text-neutral-450 dark:text-zinc-550">DETECTED IDENTITY:</span>
                  <span className={`text-[6.5px] font-mono font-bold px-1.5 py-0.5 rounded border ${activeEmitter.detectedUser.statusColor}`}>
                    {activeEmitter.detectedUser.status}
                  </span>
                </div>
                
                <div>
                  <h5 className="text-[10px] font-bold text-neutral-900 dark:text-white flex items-center gap-1">
                    <User className="w-3 h-3 text-[#FF720A] shrink-0" />
                    {activeEmitter.detectedUser.name}
                  </h5>
                  <p className="text-[8px] font-mono text-neutral-500 dark:text-zinc-400 mt-0.5">
                    {activeEmitter.detectedUser.role}
                  </p>
                </div>

                <div className="text-[7.5px] font-mono border-t border-black/5 dark:border-white/5 pt-1 text-neutral-400 truncate">
                  <span>METHOD: {activeEmitter.detectedUser.method}</span>
                </div>
              </div>

            </div>

          </div>



        </div>

      </div>
    </SectionContainer>
  )
}
