import { ApplyCtaSection } from "@/components/apply-cta-section";
import { CredibilityStrip } from "@/components/credibility-strip";
import { FaqSection } from "@/components/faq-section";
import { HeroSection } from "@/components/hero-section";
import { LearnFromSection } from "@/components/learn-from-section";
import { JourneySection } from "@/components/journey-section";
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
        <LearnFromSection />
        <ProgramSection />
        <JourneySection />
        <CredibilityStrip />
        <SummarySection />
        <OutcomesSection />
        <ValueSection />
        <FaqSection />
        <ApplyCtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
