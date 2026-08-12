import { AboutSection } from "@/components/about-section";
import { ApplicationSection } from "@/components/application-section";
import { CredibilityStrip } from "@/components/credibility-strip";
import { FaqSection } from "@/components/faq-section";
import { HeroSection } from "@/components/hero-section";
import { JourneySection } from "@/components/journey-section";
import { PressSection } from "@/components/press-section";
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
        <AboutSection />
        <PressSection />
        <ProgramSection />
        <CredibilityStrip />
        <SummarySection />
        <JourneySection />
        <OutcomesSection />
        <ValueSection />
        <FaqSection />
        <ApplicationSection />
      </main>
      <SiteFooter />
    </>
  );
}
