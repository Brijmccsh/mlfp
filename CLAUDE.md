# MLFP — Marketing Leaders Fellowship Program

Two products, one design system.

- `apps/web` → **themlfp.com**, the marketing site. Premium, editorial, clearly not templated.
- `apps/app` → **app.themlfp.com**, the gated workspace for accepted, paying students.

Look-and-feel is the top bar. If something works but looks generic, it is not done.

---

## Stack

| Concern     | Choice                                                         |
| ----------- | -------------------------------------------------------------- |
| Monorepo    | pnpm workspaces + Turborepo                                     |
| Runtime     | Node 22 (pinned in `.nvmrc`; pnpm 11 requires ≥ 22.13)          |
| Framework   | Next.js 15, App Router, TypeScript                              |
| Styling     | Tailwind CSS v4, CSS-first — tokens ARE the Tailwind scale      |
| Primitives  | shadcn-style components owned by us, in `packages/ui`           |
| Icons       | `lucide-react`. **Never emojis as UI icons.**                   |
| Backend     | Supabase (auth, Postgres, storage) — scaffolded, not yet wired  |

## Structure

```
apps/web        marketing site        (port 3000)
apps/app        gated web app         (port 3001)
packages/ui     design system         presentational ONLY
packages/db     Supabase + env        data access ONLY
packages/config tailwind / tsconfig / eslint
```

`packages/ui` and `packages/db` ship raw TypeScript and are compiled by each app via
`transpilePackages`. There is no build step and no `dist/` — edit source, see it live.

## Commands

```bash
nvm use            # Node 22, per .nvmrc
pnpm install
pnpm dev           # both apps
pnpm build         # both apps
pnpm lint
pnpm typecheck
```

Turborepo derives its graph from workspace dependencies, so `apps/web` and `apps/app` never
rebuild each other.

---

## Design system

**One tokens file: [packages/config/tailwind/theme.css](packages/config/tailwind/theme.css).**
It is the single source of truth. Both apps import it and nothing else.

- Light and dark are a **token swap**. Same semantic names, different values under `.dark`.
  A component never knows which theme is active.
- **Never write a raw colour in a component.** `bg-surface`, not `bg-white`. If you need a
  colour that does not exist, add a token to both themes — never a one-off hex.
- Any new token must be legible in **both** themes. Check contrast before shipping it. This is
  why `--accent-subtle-foreground` exists: ink-on-gold works in light and fails in dark.
- Brand: deep navy ink `#0B1E3B`, royal blue primary `#2E6BFF`, gold accent `#E0A526`.
  Neutrals do most of the work. Gold is rare enough to still mean something.
- No gradient soup. No glassmorphism.
- Type: Sora (display) + Inter (body), loaded once in `packages/ui/src/theme/fonts.ts`.
- Motion: 150–200ms, `ease-emphasis`. Spacing on a 4/8px grid.

Existing primitives: `Accordion`, `Avatar`, `Badge`, `Button`, `Card`, `Container`, `Input`,
`Label`, `Logo`, `Media`, `Progress`, `Select`, `Skeleton`, `Spotlight`, `Textarea`,
`ThemeToggle`. Export everything through
[packages/ui/src/index.ts](packages/ui/src/index.ts).

`--primary` is the literal brand blue and carries **no text** — white on it is only 3.8:1.
Solid surfaces that carry a label use `--primary-strong`. Blue text on a light background uses
`--primary-subtle-foreground`.

---

## Conventions

**Naming**

- Files: `kebab-case.tsx` (`module-card.tsx`). Components: `PascalCase`. Folders: lowercase.
- **One component per file.**
- Shared types in a `types.ts` near usage, or in `packages/db`.

**Boundaries — these are hard rules**

- `packages/ui` is presentational. No data fetching, no Supabase import, ever.
- Data access lives in `packages/db` or an app-level data layer. Never in a UI component,
  never inline in a page.
- `packages/db` has no barrel export, by design. Import the exact entry point:
  `@mlfp/db/client` (browser), `@mlfp/db/server` (RSC/actions), `@mlfp/db/admin` (service
  role, bypasses RLS). `server` and `admin` are fenced with `server-only`.
- The service-role key is server-only and must never gain a `NEXT_PUBLIC_` prefix.

**Reuse is mandatory**

- No duplicated components across apps. Anything both apps could use belongs in `packages/ui`.
- Zero copy-paste between `apps/web` and `apps/app`. If you are about to paste, extract.

**Components**

- No hardcoded content and no magic values inside components. Content arrives via props or a
  data module; visual values come from tokens.
- Marketing copy lives in `apps/web/content/`. A section component reads from there and holds
  no strings of its own — see [landing.ts](apps/web/content/landing.ts).
- Mark server vs client explicitly. Prefer server components; add `"use client"` only when you
  need state, effects, or event handlers.

---

## How to work in this repo

Bias toward caution over speed. For trivial tasks, use judgment.

**1. Think before coding.** State assumptions explicitly; if uncertain, ask. If multiple
interpretations exist, present them — do not pick silently. If a simpler approach exists, say
so. If something is unclear, stop and name what is confusing.

**2. Simplicity first.** The minimum code that solves the problem. No features beyond what was
asked, no abstractions for single-use code, no unrequested "flexibility", no error handling for
impossible scenarios. If you wrote 200 lines and it could be 50, rewrite it. Ask: would a
senior engineer call this overcomplicated?

**3. Surgical changes.** Touch only what you must. Do not improve adjacent code, comments, or
formatting. Do not refactor what is not broken. Match existing style even if you would do it
differently. Remove imports and variables *your* change orphaned; mention pre-existing dead
code rather than deleting it. Every changed line should trace to the request.

**4. Goal-driven execution.** Define success criteria, then verify.

- "Add validation" → write tests for invalid inputs, then make them pass
- "Fix the bug" → write a test that reproduces it, then make it pass
- "Refactor X" → tests pass before and after

For multi-step work, state the plan as `step → verify` pairs before starting.

**5. Never commit.** Do not run `git commit`. Finish the work, say what changed, and stop —
the user commits themselves. Reading git state is fine.

---

## Not built yet

Landing page, auth, Stripe, real features. The foundation only.

`.env.example` lists the Supabase variables; nothing reads them until Supabase is provisioned.
