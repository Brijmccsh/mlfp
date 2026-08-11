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

export type SelectOption = { value: string; label: string };

/** Keys the hero maps to lucide icons. */
export type FeatureIcon = "target" | "lightbulb" | "users" | "trophy";

export type HeroFeature = {
  icon: FeatureIcon;
  title: string;
  description: string;
};

export type PressItem = {
  title: string;
  /** null renders a placeholder tile until the real asset lands. */
  image: string | null;
  /**
   * CSS object-position aiming the 3:2 crop. Only needed where the source
   * aspect differs enough that centring would cut something that matters.
   */
  focal?: string;
  /** null renders a non-interactive card until the real URL lands. */
  href: string | null;
};

export type FormField = { name: string; label: string; placeholder: string };

export type EssayPrompt = { name: string; prompt: string; placeholder: string };

/** Canonical vocabulary. The API validates against these, so the two can’t drift. */
export const EDUCATION_LEVELS = ["high_school", "college"] as const;
export type EducationLevel = (typeof EDUCATION_LEVELS)[number];

export const COHORTS = ["fall_2026", "winter_2026", "spring_2027", "summer_2027"] as const;
export type Cohort = (typeof COHORTS)[number];

export const brand = {
  name: "Marketing Leaders Fellowship Program",
  shortName: "MLFP",
  email: "admin@themlfp.com",
  logo: {
    src: "/brand/mlfp-logo-horizontal.png",
    /** Reversed lockup: white wordmark, brand blue preserved. Reads on navy. */
    srcDark: "/brand/mlfp-logo-horizontal-light.png",
    alt: "Marketing Leaders Fellowship Program",
    width: 1600,
    height: 421,
  },
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
  pill: "8-Week Experiential Fellowship",
  headline: {
    lead: "Learn the strategies, frameworks, and creative thinking behind building",
    /** Rendered in brand blue. */
    highlight: "award-winning, 360-degree marketing campaigns.",
  },
  body: "An immersive, real-world fellowship for the next generation of marketing leaders. Taught by industry experts. Built for impact.",
  features: [
    {
      icon: "target",
      title: "Real Campaigns",
      description: "Work on live brand challenges.",
    },
    {
      icon: "lightbulb",
      title: "Expert Mentorship",
      description: "Learn from top industry leaders.",
    },
    {
      icon: "users",
      title: "Collaborative Teams",
      description: "Solve big problems together.",
    },
    {
      icon: "trophy",
      title: "Recognition",
      description: "Earn a certificate of completion.",
    },
  ] satisfies HeroFeature[],
  primaryCta: { label: "Apply Now", href: "#apply" },
  secondaryCta: { label: "Explore the Program", href: "#program" },
  image: {
    src: "/team/chad-tons-hero.jpg",
    alt: "Chad Tons, guest instructor",
    width: 1068,
    height: 1600,
  } satisfies Asset,
  card: {
    eyebrow: "Guest Instructor",
    name: "Chad Tons",
    role: "Founder & CEO, Infinity Marketing Team",
    quote:
      "I’ve built campaigns that move markets, win awards, and break through the noise. Now, I’m here to help you do the same.",
  },
} as const;

export const credibility = {
  lead: "Built on the playbook behind campaigns for some of the world’s biggest brands.",
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
        "Four modules built on Chad Tons’ real agency playbook, covering how an agency runs, how a brand defines itself, and how a 360 campaign is designed from brief to buy.",
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
        "Pitch live to guest instructor Chad Tons and industry leaders. Defend the strategy, take the questions, and find out how the work holds up.",
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
  quoteAttribution: {
    name: "Chad Tons",
    role: "Founder & CEO, Infinity Marketing Team",
  },
  image: {
    src: "/team/chad-tons-about.jpg",
    alt: "Chad Tons",
    width: 1068,
    height: 1600,
  } satisfies Asset,
  press: {
    heading: "Appearances and press",
    items: [
      {
        title: "Tons Keynotes USC Marshall Summit",
        image: "/press/usc-marshall-summit.jpg",
        // Portrait source in a 3:2 frame. Biased slightly high so the summit
        // screen and Chad's head both survive the crop.
        focal: "center 42%",
        href: "https://www.marshall.usc.edu/posts/marshall-alumni-reconnect-at-leadership-summit",
      },
      {
        title: "Tons Keynotes Pico Global Conference",
        // Source is already 3:2, so it needs no focal adjustment.
        image: "/press/pico-international-conference.jpg",
        // Canonical permalink. The share link this came from carried utm_* and
        // an `rcm` token tied to the sharer's account; both are stripped.
        href: "https://www.linkedin.com/posts/chadtons_always-a-highlight-to-end-my-year-imt-and-activity-7407860934221869056-pWOo",
      },
      {
        title: "Chad Tons Family Café Unveiled at Fertitta Hall",
        // 16:9 source: wider than the frame, so it crops at the sides only and
        // the café signage above the group is never at risk. No focal needed.
        image: "/press/chad-tons-family-cafe.jpg",
        href: "https://www.marshall.usc.edu/posts/chad-tons-caf-unveiled-in-fertitta-hall",
      },
    ] satisfies PressItem[],
  },
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
  selectPrompt: "Select one",
  optionalHint: "Optional",

  about: {
    heading: "About you",
    fullName: "Full name",
    email: "Email",
    phone: "Phone",
    educationLevel: "Education level",
    school: "School",
    gradYear: "Graduation year",
  },

  educationLevels: [
    { value: EDUCATION_LEVELS[0], label: "High school" },
    { value: EDUCATION_LEVELS[1], label: "College / university" },
  ] satisfies SelectOption[],

  cohort: {
    heading: "Cohort",
    label: "Which cohort are you applying for?",
    testScoreLabel: "PSAT / SAT / ACT score",
    testScoreHint: "Your highest so far. Leave blank if you haven’t taken one.",
    testScorePlaceholder: "e.g. 1380 SAT",
  },

  cohorts: [
    { value: COHORTS[0], label: "Fall 2026" },
    { value: COHORTS[1], label: "Winter 2026" },
    { value: COHORTS[2], label: "Spring 2027" },
    { value: COHORTS[3], label: "Summer 2027" },
  ] satisfies SelectOption[],

  activities: {
    heading: "Top 5 extracurricular activities",
    hint: "List up to five. At least one is required.",
    max: 5,
    addLabel: "Add another activity",
    removeLabel: "Remove activity",
    rowLabel: "Activity",
    fields: [
      {
        name: "organization",
        label: "Organization / activity",
        placeholder: "e.g. DECA, school newspaper, family business",
      },
      {
        name: "role",
        label: "Leadership role / position",
        placeholder: "e.g. Chapter President, Editor, Volunteer",
      },
      {
        name: "description",
        label: "Description",
        placeholder: "What you did, and what came of it.",
      },
    ] satisfies FormField[],
  },

  honors: {
    heading: "Honors and awards",
    label: "Anything you’d like us to know about",
    placeholder: "Awards, scholarships, recognitions — or leave this blank.",
  },

  links: {
    heading: "Additional links",
    hint: "Optional — paste links (LinkedIn, portfolio, or a shared resume URL).",
    fields: [
      { name: "resume", label: "Resume URL", placeholder: "https://…" },
      { name: "linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/in/…" },
      { name: "portfolio", label: "Portfolio or website", placeholder: "https://…" },
      { name: "other", label: "Anything else", placeholder: "https://…" },
    ] satisfies FormField[],
  },

  essays: {
    heading: "Essays",
    hint: "Three short essays, around 200–300 words each.",
    minWords: 200,
    maxWords: 300,
    /** `{count}` is replaced with the live word count. */
    counterTemplate: "{count} of 200–300 words",
    items: [
      {
        name: "favorite_campaign",
        prompt: "Tell us about a brand or ad campaign you love. Why does it stick with you?",
        placeholder: "What it was, and why it stayed with you.",
      },
      {
        name: "promoted_something",
        prompt:
          "Have you ever helped promote something (a club, event, small business, fundraiser)? What did you do?",
        placeholder: "It does not have to be marketing work. Tell us what you actually did.",
      },
      {
        name: "why_join",
        prompt: "Why do you want to join the Marketing Leaders Fellowship Program?",
        placeholder: "Be specific about what you want out of the eight weeks.",
      },
    ] satisfies EssayPrompt[],
  },

  submitLabel: "Submit application",
  submittingLabel: "Submitting…",
  success: {
    title: "Application received",
    body: "Thanks — we have your application and we’ll be in touch. Keep an eye on the inbox you gave us.",
  },
  error: {
    title: "That didn’t go through",
    body: "Something went wrong submitting your application. Please try again, or email us directly.",
    duplicate: "You’ve already applied for this cohort.",
    invalid: "Some answers need another look. Check the required fields and try again.",
  },
} as const;

export const footer = {
  tagline: "An eight-week experiential fellowship in marketing leadership.",
  links: nav.links,
  email: brand.email,
  copyright: `© ${new Date().getFullYear()} Marketing Leaders Fellowship Program. All rights reserved.`,
} as const;
