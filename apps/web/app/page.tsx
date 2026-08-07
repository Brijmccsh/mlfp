import { AboutSection } from "@/components/about-section";
import { ApplicationSection } from "@/components/application-section";
import { ChallengeSection } from "@/components/challenge-section";
import { CredibilityStrip } from "@/components/credibility-strip";
import { FaqSection } from "@/components/faq-section";
import { HeroSection } from "@/components/hero-section";
import { ModulesSection } from "@/components/modules-section";
import { OutcomesSection } from "@/components/outcomes-section";
import { ProgramSection } from "@/components/program-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SummarySection } from "@/components/summary-section";
import { ValueSection } from "@/components/value-section";

export default function LandingPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <CredibilityStrip />
        <SummarySection />
        <ProgramSection />
        <ModulesSection />
        <ChallengeSection />
        <OutcomesSection />
        <AboutSection />
        <ValueSection />
        <FaqSection />
        <ApplicationSection />
      </main>
      <SiteFooter />
    </>
  );
}
