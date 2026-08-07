/**
 * Every string and asset path on the landing page. Components read from here
 * and hold no copy of their own, so the page can be re-written without
 * touching a single component.
 */

export type NavLink = { label: string; href: string };

export type Asset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ProgramPhase = {
  eyebrow: string;
  title: string;
  description: string;
  detail: string;
};

export type Module = {
  number: string;
  title: string;
  description: string;
};

export type ChallengeStep = {
  title: string;
  description: string;
};

export type Outcome = {
  title: string;
  description: string;
};

export type ValueProp = {
  title: string;
  description: string;
};

export type FaqEntry = {
  question: string;
  answer: string;
};

export type ShortAnswer = {
  name: string;
  label: string;
  placeholder: string;
  maxLength: number;
};

export type SelectOption = { value: string; label: string };

/** Canonical vocabulary. The API validates against this, so the two can’t drift. */
export const EDUCATION_LEVELS = ["high_school", "college"] as const;
export type EducationLevel = (typeof EDUCATION_LEVELS)[number];

export const brand = {
  name: "Marketing Leaders Fellowship Program",
  shortName: "MLFP",
  email: "admin@themlfp.com",
  logo: {
    src: "/brand/mlfp-logo-horizontal.png",
    alt: "Marketing Leaders Fellowship Program",
    width: 1600,
    height: 421,
  } satisfies Asset,
} as const;

export const nav = {
  links: [
    { label: "Program", href: "#program" },
    { label: "Modules", href: "#modules" },
    { label: "The Challenge", href: "#challenge" },
    { label: "Outcomes", href: "#outcomes" },
    { label: "FAQ", href: "#faq" },
  ] satisfies NavLink[],
  cta: { label: "Apply Now", href: "#apply" },
} as const;

export const hero = {
  eyebrow: "8-Week Experiential Fellowship",
  headline: ["Learn Marketing.", "Lead What’s Next."],
  body: "An eight-week experiential fellowship led by Chad Tons, Founder & CEO of Infinity Marketing Team. Learn how real campaigns get built — then build one yourself.",
  primaryCta: { label: "Apply Now", href: "#apply" },
  secondaryCta: { label: "See the program", href: "#program" },
  image: {
    src: "/team/chad-tons-hero.jpg",
    alt: "Chad Tons, Founder & CEO of Infinity Marketing Team",
    width: 3605,
    height: 5400,
  } satisfies Asset,
  caption: {
    name: "Chad Tons",
    role: "Founder & CEO, Infinity Marketing Team",
  },
} as const;

export const credibility = {
  lead: "Led by the mind behind campaigns for some of the world’s biggest brands.",
  points: [
    "Three decades building integrated campaigns that moved markets.",
    "Founder of a full-service agency trusted with nine-figure budgets.",
    "Taught the way the work actually happens — not the way it is written up afterwards.",
  ],
} as const;

export const summary = {
  eyebrow: "Executive Summary",
  heading: "A fellowship built the way agencies actually work.",
  body: [
    "Most marketing education stops at theory. The Marketing Leaders Fellowship Program starts there and keeps going — into the brief, the budget, the channel plan, and the room where the work gets sold.",
    "Over eight weeks, fellows move through four self-paced modules covering agency operations, brand strategy, and integrated campaign design. They then form teams and take on the CEO Challenge: a real $25M campaign brief, answered with a written strategy and a pitch delivered live.",
    "Every participant finishes with a portfolio-grade campaign, a certificate, and a working understanding of how marketing decisions are actually made.",
  ],
} as const;

export const program = {
  eyebrow: "Program Structure",
  heading: "Eight weeks, three phases.",
  body: "Structured enough to follow while you study or work. Demanding enough to be worth putting on a résumé.",
  phases: [
    {
      eyebrow: "Weeks 1–4",
      title: "Self-Paced Learning",
      description:
        "Four modules taught by Chad Tons, covering how an agency runs, how a brand defines itself, and how a 360 campaign is designed from brief to buy.",
      detail: "Roughly 3–5 hours per week, on your own schedule.",
    },
    {
      eyebrow: "Weeks 5–7",
      title: "The CEO Challenge Project",
      description:
        "Teams receive a live client brief and build a full integrated campaign against it — strategy, channels, budget allocation, and creative direction.",
      detail: "Team-based, with checkpoints along the way.",
    },
    {
      eyebrow: "Week 8",
      title: "Program Close",
      description:
        "Every team presents live. Work is judged on strategic clarity, channel logic, and the strength of the pitch itself.",
      detail: "Live pitch, awards, and recognition.",
    },
  ] satisfies ProgramPhase[],
} as const;

export const modules = {
  eyebrow: "Curriculum",
  heading: "Four modules. No filler.",
  body: "Each module ends where the next begins, so by week four you are holding everything the Challenge requires.",
  items: [
    {
      number: "01",
      title: "Welcome & The IMT Story",
      description:
        "How a full-service agency is built and run — the roles, the economics, and the decisions that separate agencies that last from agencies that don’t.",
    },
    {
      number: "02",
      title: "Mission, Vision & Capabilities",
      description:
        "How a brand defines what it is and what it refuses to be, and how those choices cascade into every downstream marketing decision.",
    },
    {
      number: "03",
      title: "Building a 360 Campaign",
      description:
        "Designing across all four channels at once — the mechanics of integration, budget allocation, sequencing, and measurement.",
    },
    {
      number: "04",
      title: "The CEO Challenge Client",
      description:
        "The brief itself: the client, the market, the constraints, and exactly what a winning response has to prove.",
    },
  ] satisfies Module[],
} as const;

export const challenge = {
  eyebrow: "The CEO Challenge",
  heading: "Design a $25M campaign. Then defend it.",
  body: "The Challenge is the centre of the program. Teams are handed a real brief and a real budget, and are expected to answer it the way an agency would.",
  budget: { value: "$25M", label: "Campaign budget to allocate" },
  steps: [
    {
      title: "Build the strategy",
      description:
        "Define the audience, the insight, and the through-line. Decide what the campaign is actually arguing — before a single channel is chosen.",
    },
    {
      title: "Write the report",
      description:
        "A full written campaign strategy: positioning, channel plan, budget allocation across all four marketing channels, and how success gets measured.",
    },
    {
      title: "Build the deck",
      description:
        "A pitch deck that carries the idea — structured, designed, and written to survive a room that asks hard questions.",
    },
    {
      title: "Pitch it live",
      description:
        "Present to Chad Tons directly. Defend the strategy, take the questions, and find out how the work holds up.",
    },
  ] satisfies ChallengeStep[],
} as const;

export const outcomes = {
  eyebrow: "Outcomes & Recognition",
  heading: "What you leave with.",
  body: "The work is the outcome. The recognition is what makes it legible to everyone else.",
  items: [
    {
      title: "Certificate of Completion",
      description:
        "Every fellow who completes the program receives a certificate naming the fellowship and the cohort.",
    },
    {
      title: "Channel Awards",
      description:
        "Awards are given across each of the four marketing channels, recognising the strongest work in every discipline rather than a single overall winner.",
    },
    {
      title: "Letter of Recommendation",
      description:
        "The winning team receives a personal letter of recommendation from Chad Tons — the kind that carries weight because it is specific.",
    },
  ] satisfies Outcome[],
} as const;

export const about = {
  eyebrow: "Who leads it",
  heading: "Chad Tons",
  role: "Founder & CEO, Infinity Marketing Team",
  body: [
    "Chad Tons has spent his career building integrated campaigns for brands operating at national scale — the kind of work where strategy, media, creative, and measurement have to move as one or not at all.",
    "He founded Infinity Marketing Team to do that work end to end, and built the fellowship because the gap between how marketing is taught and how it is practised kept showing up in the people he hired.",
    "He teaches every module himself, and sits in the room for every final pitch.",
  ],
  quote:
    "Great marketing doesn’t just sell — it moves people, shifts culture, and drives real impact.",
  image: {
    src: "/team/chad-tons-about.jpg",
    alt: "Chad Tons",
    width: 3605,
    height: 5400,
  } satisfies Asset,
} as const;

export const value = {
  eyebrow: "Why students choose us",
  heading: "Built for people who want the real thing.",
  items: [
    {
      title: "Taught by an operator",
      description:
        "Not a lecturer describing the industry from outside it. Every module comes from someone who has run the work and carried the outcome.",
    },
    {
      title: "A portfolio piece, not a transcript line",
      description:
        "You finish holding a complete $25M campaign strategy and pitch deck — something you can put in front of an employer and talk through.",
    },
    {
      title: "Real stakes, real feedback",
      description:
        "The final pitch is delivered live and questioned properly. You learn where the argument holds and where it doesn’t.",
    },
    {
      title: "Open to high school and college students",
      description:
        "No prior marketing coursework required. What matters is that you show up ready to do the work.",
    },
  ] satisfies ValueProp[],
} as const;

export const faq = {
  eyebrow: "FAQ",
  heading: "Questions, answered.",
  items: [
    {
      question: "Who is eligible to apply?",
      answer:
        "High school and college students are both welcome. No prior marketing coursework is required — the first module starts from first principles and builds from there.",
    },
    {
      question: "How much time does the program take?",
      answer:
        "Expect roughly 3–5 hours per week during the four self-paced modules, and more during the Challenge weeks as your team builds the strategy, report, and deck. The program runs eight weeks end to end.",
    },
    {
      question: "Is the program remote?",
      answer:
        "Yes. The modules are self-paced and online, team work happens remotely, and final pitches are delivered live over video so fellows can take part from anywhere.",
    },
    {
      question: "What exactly is the CEO Challenge?",
      answer:
        "Teams receive a real client brief with a $25M budget and design a full 360 campaign against it. The deliverables are a written campaign strategy and a pitch deck, presented live to Chad Tons in the final week.",
    },
    {
      question: "Do I need to bring my own team?",
      answer:
        "No. Teams are formed within the cohort once the self-paced modules are complete, so you will be working with other fellows regardless of how you applied.",
    },
    {
      question: "What do I receive at the end?",
      answer:
        "Every fellow who completes the program receives a certificate. Awards are given across each of the four marketing channels, and the winning team receives a letter of recommendation from Chad Tons.",
    },
  ] satisfies FaqEntry[],
} as const;

export const application = {
  eyebrow: "Applications open",
  heading: "Apply to the fellowship.",
  body: "Tell us who you are and why you want in. Applications are read individually and we respond to every one.",
  educationLevels: [
    { value: EDUCATION_LEVELS[0], label: "High school" },
    { value: EDUCATION_LEVELS[1], label: "College / university" },
  ] satisfies SelectOption[],
  shortAnswers: [
    {
      name: "motivation",
      label: "Why do you want to join the fellowship?",
      placeholder: "A few sentences is plenty.",
      maxLength: 800,
    },
    {
      name: "campaign",
      label: "Describe a campaign — from any brand — that you think actually worked. Why?",
      placeholder: "We are more interested in your reasoning than in the brand you pick.",
      maxLength: 800,
    },
    {
      name: "outcome",
      label: "What do you want to be able to do by the end of eight weeks?",
      placeholder: "Be specific.",
      maxLength: 800,
    },
  ] satisfies ShortAnswer[],
  submitLabel: "Submit application",
  submittingLabel: "Submitting…",
  success: {
    title: "Application received",
    body: "Thanks — we have your application and we’ll be in touch. Keep an eye on the inbox you gave us.",
  },
  error: {
    title: "That didn’t go through",
    body: "Something went wrong submitting your application. Please try again, or email us directly.",
  },
} as const;

export const footer = {
  tagline: "An eight-week experiential fellowship in marketing leadership.",
  links: nav.links,
  email: brand.email,
  copyright: `© ${new Date().getFullYear()} Marketing Leaders Fellowship Program. All rights reserved.`,
} as const;
