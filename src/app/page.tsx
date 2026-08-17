import { ApplyCta } from "@/components/apply-cta";
import { Faq } from "@/components/faq";
import { Hero } from "@/components/hero";
import { LearnFrom } from "@/components/learn-from";
import { Outcomes } from "@/components/outcomes";
import { Phases } from "@/components/phases";
import { Program } from "@/components/program";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { GoldDefs } from "@/components/ui";

export default function Home() {
  return (
    <>
      <GoldDefs />
      <SiteHeader />
      <main>
        <Hero />
        <LearnFrom />
        <Phases />
        <Program />
        <Outcomes />
        <Faq />
        <ApplyCta />
      </main>
      <SiteFooter />
    </>
  );
}
