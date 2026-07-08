import type { FC } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import "../landing-page.css"
import { Navbar } from "../components/navbar"
import { PageGridLines } from "../components/page-grid-lines"
import { HeroSection } from "../components/hero-section"
import { ProblemSection } from "../components/problem-section"
import { StripedSpacer } from "../components/striped-spacer"
import { CentralQuestionSection } from "../components/central-question-section"
import { ArchitectureSection } from "../components/architecture-section"
import { IdentitySection } from "../components/identity-section"
import { EcosystemSection } from "../components/ecosystem-section"
import { FeaturesSection } from "../components/features-section"
import { UseCasesSection } from "../components/use-cases-section"
import { CtaSection } from "../components/cta-section"
import { Footer } from "../components/footer"
import { ScheduleDemoProvider } from "../components/schedule-demo-dialog"
// import { ChatLauncher } from "@/features/chat/components/chat-launcher"

const queryClient = new QueryClient()

export const LandingPage: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <ScheduleDemoProvider>
    <div className="text-neutral-300 min-h-screen flex flex-col overflow-x-hidden selection:bg-[#F97316] selection:text-black relative">
      <Navbar />
      <PageGridLines />
      {/*
        Rail de navegação flutuante (aside) desativado por ora — os componentes
        continuam disponíveis em components/floating-nav(.mini).tsx caso volte.
      */}
      <HeroSection />
      <ProblemSection />
      <StripedSpacer />
      <CentralQuestionSection />
      <StripedSpacer />
      <ArchitectureSection />
      <IdentitySection />
      <EcosystemSection />
      <FeaturesSection />
      <UseCasesSection />
      <CtaSection />
      <Footer />
      {/* <ChatLauncher /> */}
    </div>
    </ScheduleDemoProvider>
    </QueryClientProvider>
  )
};

export default LandingPage;
