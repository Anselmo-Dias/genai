import type { FC } from "react"

import "../landing-page.css"
import { Navbar } from "../components/navbar"
import { HeroSection } from "../components/hero-section"
import { FloatingNav } from "../components/floating-nav"
import { FloatingNavMini } from "../components/floating-nav-mini"
import { ProblemSection } from "../components/problem-section"
import { WhyItMattersSection } from "../components/why-it-matters-section"
import { PlatformSection } from "../components/platform-section"
import { HowItWorksSection } from "../components/how-it-works-section"
import { UserInteractionSection } from "../components/user-interaction-section"
import { CapabilitiesSection } from "../components/capabilities-section"
import { ArchitectureSection } from "../components/architecture-section"
import { GovernanceSection } from "../components/governance-section"
import { UseCasesSection } from "../components/use-cases-section"
import { CtaSection } from "../components/cta-section"
import { Footer } from "../components/footer"
import { ChatLauncher } from "@/features/chat/components/chat-launcher"

export const LandingPage: FC = () => {
  return (
    <div className="text-neutral-300 min-h-screen flex flex-col overflow-x-hidden selection:bg-[#F97316] selection:text-black relative">
      <Navbar />
      <FloatingNav />
      <FloatingNavMini />
      <HeroSection />
      <ProblemSection />
      <ArchitectureSection />
      <WhyItMattersSection />
      <PlatformSection />
      <HowItWorksSection />
      <UserInteractionSection />
      <CapabilitiesSection />
      <GovernanceSection />
      <UseCasesSection />
      <CtaSection />
      <Footer />
      <ChatLauncher />
    </div>
  )
};

export default LandingPage;
