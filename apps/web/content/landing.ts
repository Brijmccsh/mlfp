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

/** Each phase card carries its own accent so the three read as distinct steps. */
export type PhaseAccent = "accent" | "primary" | "violet";

export type ProgramPhase = {
  number: string;
  accent: PhaseAccent;
  icon: "book-open" | "users" | "trophy";
  eyebrow: string;
  title: string;
  description: string;
  detailIcon: "calendar" | "users" | "star";
  detail: string;
};

export type JourneyModule = {
  title: string;
  description: string;
};

export type ChallengeFacet = {
  icon: "megaphone" | "folder" | "target" | "users";
  label: string;
  description: string;
};

export type OutcomeIcon = "award" | "briefcase" | "chart" | "clipboard" | "trophy";

export type Outcome = {
  icon: OutcomeIcon;
  /** Line 1 renders white, line 2 renders brand blue. */
  titleTop: string;
  titleBottom: string;
  description: string;
};

/** A phrase in the closing tagline. `accent` renders in brand blue. */
export type TaglinePhrase = { text: string; accent?: boolean };

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

export type HeroCredential = {
  icon: "shield" | "star";
  label: string;
};

export type HeroFeature = {
  icon: FeatureIcon;
  title: string;
  description: string;
};

export type LearnFromCard = {
  title: string;
  image: string;
  /** CSS object-position aiming the crop where centring would cut something. */
  focal?: string;
  /** null renders a non-interactive card rather than a dead link. */
  href: string | null;
};

export type FormField = { name: string; label: string; placeholder: string };

export type EssayPrompt = { name: string; prompt: string; placeholder: string };

/** One step of the /apply flow. */
export type ApplyStep = { id: string; label: string; title: string };

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
  // Modules and The Challenge are two halves of the merged 8-Week Journey
  // section, so each deep-links to its own column rather than the section top.
  // Root-relative, not bare fragments: the header and footer are shared with
  // /apply, where a bare "#faq" has no target and the click does nothing.
  links: [
    { label: "Program", href: "/#program" },
    { label: "Modules", href: "/#journey-modules" },
    { label: "The Challenge", href: "/#journey-challenge" },
    { label: "Outcomes", href: "/#outcomes" },
    { label: "FAQ", href: "/#faq" },
  ] satisfies NavLink[],
  cta: { label: "Apply Now", href: "/apply" },
} as const;

export const hero = {
  pill: "8-Week Experiential Fellowship",
  headline: {
    lead: "Your 8-Week Journey to",
    /** Rendered in hero blue, always on its own line. */
    highlight: "Marketing Leadership.",
  },
  body: "A step-by-step fellowship designed to take you from foundational insights to a real-world CEO challenge.",
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
  primaryCta: { label: "Apply Now", href: "/apply" },
  secondaryCta: { label: "Explore the Program", href: "/#program" },
  image: {
    // Card-framed derivative: the portrait original is cropped to his body and
    // the plain studio backdrop mirrored outward, so he fills the mockup's
    // landscape card without losing his feet.
    src: "/team/chad-tons-seated-card.jpg",
    alt: "Chad Tons, seated",
    width: 1664,
    height: 1258,
  } satisfies Asset,
  seal: {
    // TODO: set `src` to the gold ribbon artwork once it lands in
    // public/brand/. Until then the seal is drawn in SVG.
    src: null as string | null,
    eyebrow: "Industry Recognized",
    title: "Fellowship",
    footnote: "For high school & college students",
  },
  card: {
    eyebrow: "Featuring",
    name: "Chad Tons",
    role: "Founder & CEO, Infinity Marketing Team",
    credentials: [
      { icon: "shield", label: "USC Marshall Entrepreneur Hall of Fame" },
      { icon: "star", label: "USA Today\u2019s Notable Entrepreneurs of 2026" },
    ] satisfies HeroCredential[],
  },
} as const;

export const learnFrom = {
  heading: "Who You\u2019ll Learn From",
  featured: {
    title: "Chad Tons Keynotes USC Marshall Leadership Summit",
    // Native 16:9 (1672x941), exactly the card's frame, so nothing is cropped
    // and object-position has no effect. Kept as plain "center" because the
    // section component reads this key.
    image: "/press/usc-marshall-keynote-wide.png",
    focal: "center",
    href: "https://www.marshall.usc.edu/posts/marshall-alumni-reconnect-at-leadership-summit",
  } satisfies LearnFromCard,
  cards: [
    {
      title: "Tons Keynotes Pico Global Conference",
      image: "/press/pico-international-conference.jpg",
      href: "https://www.linkedin.com/posts/chadtons_always-a-highlight-to-end-my-year-imt-and-activity-7407860934221869056-pWOo",
    },
    {
      title: "Chad Tons Family Caf\u00e9 unveiled at USC\u2019s Fertitta Hall",
      image: "/press/chad-tons-family-cafe.jpg",
      href: "https://www.marshall.usc.edu/posts/chad-tons-caf-unveiled-in-fertitta-hall",
    },
    {
      title: "USA Today\u2019s Notable Entrepreneurs of 2026",
      image: "/team/chad-tons-seated.jpg",
      focal: "center 52%",
      href: "https://www.usatoday.com/story/special/contributor-content/2026/08/11/notable-entrepreneurs-of-2026/91260640007/",
    },
  ] satisfies LearnFromCard[],

  // The standalone "Who leads it" section was retired because it repeated this
  // copy; this block is now the only place the quote and bio appear.
  quoteCard: {
    quote:
      "Great marketing doesn\u2019t just sell, it moves people, shifts culture, and drives real impact.",
    name: "Chad Tons",
    role: "Founder & CEO, Infinity Marketing Team",
    body: [
      "Chad Tons has spent his career building integrated campaigns for brands operating at national scale \u2014 the kind of work where strategy, media, creative, and measurement have to move as one or not at all.",
      "He founded Infinity Marketing Team to do that work end to end, and built the fellowship because the gap between how marketing is taught and how it is practised kept showing up in the people he hired.",
      "He teaches every module himself, and sits in the room for every final pitch.",
    ],
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
  /** Second line renders in brand blue. */
  headingLead: "Eight weeks,",
  headingHighlight: "three phases.",
  body: "Structured enough to follow while you study or work. Demanding enough to be worth putting on a résumé.",
  background: {
    src: "/brand/phases-bg.jpg",
    alt: "",
    width: 2200,
    height: 1466,
  } satisfies Asset,
  phases: [
    {
      number: "01",
      accent: "accent",
      icon: "book-open",
      eyebrow: "Weeks 1–4",
      title: "Self-Paced Learning",
      description:
        "Four modules taught by Chad Tons, covering how an agency runs, how a brand defines itself, and how a 360 campaign is designed from brief to buy.",
      detailIcon: "calendar",
      detail: "Roughly 3–5 hours per week, on your own schedule.",
    },
    {
      number: "02",
      accent: "primary",
      icon: "users",
      eyebrow: "Weeks 5–7",
      title: "The CEO Challenge Project",
      description:
        "Teams receive a live client brief and build a full integrated campaign against it — strategy, channels, budget allocation, and creative direction.",
      detailIcon: "users",
      detail: "Team-based, with checkpoints along the way.",
    },
    {
      number: "03",
      accent: "violet",
      icon: "trophy",
      eyebrow: "Week 8",
      title: "Program Close",
      description:
        "Every team presents live. Work is judged on strategic clarity, channel logic, and the strength of the pitch itself.",
      detailIcon: "star",
      detail: "Live pitch, awards, and recognition.",
    },
  ] satisfies ProgramPhase[],
  cta: {
    note: "Applications for the next cohort are open.",
    label: "Apply Now",
    href: "/apply",
  },
} as const;

export const journey = {
  heading: "A Fellowship Based On The Way Agencies Actually Work",
  body: "A step-by-step fellowship designed to take you from foundational insights to a real-world CEO challenge \u2014 the brief, the budget, the channel plan, and the room where the work gets sold.",
  badge: {
    src: "/brand/ceo-challenge-logo-v2.jpg",
    alt: "The CEO Challenge",
    width: 1254,
    height: 1254,
  } satisfies Asset,

  modules: {
    title: "Module-by-Module Outline",
    meta: "(Weeks 1\u20134)",
    items: [
      {
        title: "Module 1 \u2013 Welcome & IMT Story",
        description:
          "Chad Tons\u2019 background (Nike, Adidas), the evolution of experiential marketing, IMT\u2019s founding, growth, and 2002\u20132025 campaign highlights.",
      },
      {
        title: "Module 2 \u2013 Mission, Vision & Capabilities",
        description:
          "IMT\u2019s mission and vision, the full-service toolbox (pre-event, design & fabrication, production, amplification, influencer programs, PICO partnership), and award-winning case studies (State Farm Gamermood, HP x Coachella REGEN, State Farm \u201cBatman vs. Bateman\u201d).",
      },
      {
        // NOTE: the supplied copy ended "...State Farm x Khaby Lame and Archer
        // x Usher case studies." The Archer reference is omitted under the
        // standing rule that "Archer" must never render on the site.
        title: "Module 3 \u2013 Building a 360 Campaign",
        description:
          "The 360 framework (brand strategy, audience intelligence, content/creative, channel mix, journey mapping, martech stack, analytics/attribution, governance), 2025 marketing trends, offline-to-digital integration, and the concept of \u201cBig Swing\u201d ideas, illustrated with the State Farm x Khaby Lame case study.",
      },
      {
        title: "Module 4 \u2013 The CEO Challenge Client",
        description:
          "Introduction of the live IMT client \u2014 company overview, technology, target audience, brand voice, launch markets, and the strategic tension the campaign must solve.",
      },
    ] satisfies JourneyModule[],
  },

  challenge: {
    title: "The CEO Challenge",
    meta: "(Final Weeks)",
    items: [
      {
        icon: "megaphone",
        label: "Assignment",
        description:
          "In teams, design a $25M 360 marketing campaign for a live IMT client, driving market awareness, community education, and public trust.",
      },
      {
        icon: "folder",
        label: "Deliverables",
        description:
          "A written report and pitch deck allocating budget and proposals across four channels \u2014 Linear/Traditional, Digital Content/Social, Experiential/Events, and Big Swings.",
      },
      {
        icon: "target",
        label: "Key Objectives",
        description:
          "Increase market reach; educate on safety & trust; promote the consumer experience; and leverage the client\u2019s partners.",
      },
      {
        icon: "users",
        label: "Process",
        description:
          "Live Zoom sessions with an MLFP Coordinator, team collaboration, and a final live pitch presentation to Chad Tons for scoring and feedback.",
      },
    ] satisfies ChallengeFacet[],
  },

  bottomBar: {
    headline: "Four modules, then the live brief.",
    note: "The application takes approx. 1 hr \u2014 you can save and return.",
    cta: { label: "Apply Now", href: "/apply" },
  },
} as const;

export const outcomes = {
  /** Each line is a white run followed by a brand-blue run. */
  headingLines: [
    { plain: "Uplevel your", accent: "resume &" },
    { plain: "college or", accent: "job application." },
  ],
  subhead: {
    plain: "Real skills. Real work. Real recognition that",
    accent: "opens doors.",
  },
  certificate: {
    src: "/brand/mlfp-certificate-logo.png",
    alt: "Marketing Leaders Fellow certificate signed by Chad Tons",
    width: 700,
    height: 524,
  } satisfies Asset,
  items: [
    {
      icon: "award",
      titleTop: "Industry-Recognized",
      titleBottom: "Fellowship",
      description:
        "Finish as a Marketing Leaders Fellow \u2014 a credential that reads clearly on a resume, a LinkedIn profile and a college application.",
    },
    {
      icon: "briefcase",
      titleTop: "Portfolio-Ready",
      titleBottom: "Work",
      description:
        "You leave holding a real $25M campaign strategy and pitch deck for a live client \u2014 polished enough to show and talk through.",
    },
    {
      icon: "chart",
      titleTop: "Real Industry",
      titleBottom: "Skills",
      description:
        "Strategy, branding, digital, social, analytics, content and presenting \u2014 the same skills working marketers use every week.",
    },
    {
      icon: "clipboard",
      titleTop: "Resume + College",
      titleBottom: "App Upgrade",
      description:
        "A selective, project-based fellowship that demonstrates initiative, leadership, collaboration and applied learning.",
    },
    {
      icon: "trophy",
      titleTop: "Recognition That",
      titleBottom: "Sets You Apart",
      description:
        "Channel awards across all four disciplines, plus a personal letter of recommendation from Chad Tons for the winning team.",
    },
  ] satisfies Outcome[],
  tagline: [
    { text: "Do the work." },
    { text: "Get recognized.", accent: true },
    { text: "Open more doors." },
  ] satisfies TaglinePhrase[],
  taglineSeparator: "\u00b7",
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
  subhead:
    "Everything applicants ask before they start. If yours isn\u2019t here, write to us directly.",
  contact: {
    label: "Still have a question?",
    email: brand.email,
  },
  items: [
    {
      question: "Who is eligible to apply?",
      answer:
        "High school and college students. No prior marketing coursework is required \u2014 what matters is that you show up ready to do the work.",
    },
    {
      question: "How much time does the program take?",
      answer:
        "Roughly 3\u20135 hours per week during the self-paced modules, with more during the team project weeks.",
    },
    {
      question: "Is the program remote?",
      answer:
        "Yes. Modules are self-paced online, and team sessions and the final pitch happen live over Zoom.",
    },
    {
      question: "What exactly is the CEO Challenge?",
      answer:
        "A live client brief: in teams, design a $25M 360 marketing campaign, then present it live to Chad Tons for scoring and feedback.",
    },
    {
      question: "Do I need to bring my own team?",
      answer:
        "No. Teams are formed inside the program, with an MLFP Coordinator supporting each one.",
    },
    {
      question: "What do I receive at the end?",
      answer:
        "A portfolio-grade campaign and pitch deck, a certificate of completion, and \u2014 for the winning team \u2014 a letter of recommendation.",
    },
  ] satisfies FaqEntry[],
} as const;

export const application = {
  eyebrow: "Apply now",
  heading: "Take the first step.",
  body: "Tell us a bit about yourself and your goals. We’re looking for curious, motivated leaders ready to make an impact.",
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

export const apply = {
  heading: "Apply to the Marketing Leaders Fellowship",
  subhead:
    "The application takes about an hour \u2014 your progress saves automatically, so you can leave and come back.",
  draftSaved: "Draft saved",
  // The CTA panel renders this same array, so the preview can never drift
  // from the real form.
  steps: [
    { id: "about", label: "About you", title: "About you" },
    { id: "academics", label: "Cohort & academics", title: "Cohort & academics" },
    { id: "activities", label: "Activities & honors", title: "Activities & honors" },
    { id: "links", label: "Links & portfolio", title: "Links & portfolio" },
    { id: "essays", label: "Three short essays", title: "Three short essays" },
  ] satisfies ApplyStep[],
  stepCounter: "Step {current} of {total}",
  backLabel: "Back",
  continueLabel: "Continue",
  submitLabel: "Submit application",
  submittingLabel: "Submitting\u2026",
  retryLabel: "Try again",

  // Essay prompts are EDITABLE — swap the wording freely. The `name` values are
  // the keys stored in the `details.essays` jsonb, so change those deliberately.
  essayPrompts: [
    {
      name: "why_join",
      prompt:
        "Why do you want to join the Marketing Leaders Fellowship, and what do you hope to take from the CEO Challenge?",
      placeholder: "Be specific about what you want out of the eight weeks.",
    },
    {
      name: "admired_campaign",
      prompt:
        "Describe a marketing campaign or \u201cbig swing\u201d idea you admire \u2014 and what you\u2019d have done differently.",
      placeholder: "We care more about your reasoning than the brand you pick.",
    },
    {
      name: "team_under_pressure",
      prompt:
        "Tell us about a time you led or contributed to a team under pressure. What was your role, and what was the outcome?",
      placeholder: "It does not have to be marketing work.",
    },
  ] satisfies EssayPrompt[],

  anythingElse: {
    label: "Anything else you\u2019d like us to know?",
    placeholder: "Optional.",
  },

  errors: {
    required: "This one is required.",
    email: "Enter a valid email address.",
    url: "Enter a full URL, starting with https://",
    gradYear: "Enter a four-digit year.",
    activity: "Add at least one activity, with an organization or activity name.",
    generic:
      "Something went wrong submitting your application. Please try again, or email us directly.",
    duplicate: "It looks like you\u2019ve already applied for this cohort.",
    invalid: "Some answers need another look. Check the highlighted fields.",
  },

  success: {
    title: "Application received",
    /** `{firstName}` is replaced with the applicant's first name. */
    body: "Thanks, {firstName} \u2014 our team will review your application and get back to you shortly. Keep an eye on your inbox.",
    backLabel: "Back to home",
  },
} as const;


export const footer = {
  tagline: "An eight-week experiential fellowship in marketing leadership.",
  // Reuses the nav hrefs so the footer can never point somewhere the nav does not.
  linkGroups: [nav.links.slice(0, 3), nav.links.slice(3)] satisfies NavLink[][],
  email: brand.email,
  copyright: `© ${new Date().getFullYear()} Marketing Leaders Fellowship Program. All rights reserved.`,
} as const;

export const applyCta = {
  heading: "Apply now",
  subheading: { plain: "Take the", accent: "first step." },
  body: "Tell us about yourself and your goals. We\u2019re looking for curious, motivated students ready to do real work for a real client.",
  cta: { label: "Start your application", href: "/apply" },
  note: "Rolling admissions. No application fee.",
  panel: {
    title: "The application, in five steps",
    footnote: "Approx. 1 hr \u00b7 Save and return anytime",
  },
} as const;
