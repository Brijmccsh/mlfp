# Working agreement

Site for [themlfp.com](https://themlfp.com). This is production-facing marketing
work — treat correctness and polish as the baseline, not the goal line.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · next-themes

Next is pinned to the 15 line to match production. Do not bump it casually.

## Bar for the code

No hacky quick fixes, no shortcuts that trade a working demo for a problem
later. If the correct fix is bigger than the quick one, do the correct one and
say why. If the correct fix is genuinely out of scope, do the smaller thing but
name the debt explicitly rather than leaving it silent.

Code should read like it was already here: match the surrounding naming,
comment density, and idiom.

## Simplicity and reuse — how they resolve

Both matter, and they pull against each other. The tiebreaker is timing:

- Build the concrete thing first. Extract an abstraction on the second or third
  real use, never on the first.
- Speculative "flexibility" for a caller that does not exist yet is a defect,
  not rigor.
- If 200 lines could be 50, rewrite it.
- No error handling for scenarios that cannot occur.

Reuse what is already here before adding anything: shared primitives live in
`src/components/ui.tsx`, copy and data in `src/content/`, shared flags in
`src/lib/`. Copy belongs in `src/content/`, not inlined into components.

## Surgical changes

Every changed line traces to the request.

- Do not improve, refactor, or reformat adjacent code that is not broken.
- Remove imports and variables that *your* change orphaned; leave pre-existing
  dead code alone and mention it instead.

## Before implementing

State assumptions explicitly. If two readings of the request lead to materially
different work, ask rather than picking silently. If a simpler approach exists,
say so.

For multi-step work, state the plan with a verification step per item, then
loop until verified rather than reporting done on unverified work.

## Verification

Run before claiming a change works:

```bash
npm run typecheck && npm run lint && npm run build
```

Report failures with the actual output. Never describe a skipped step as done.

## Open item

`POST /api/apply` validates its payload and returns 501 — nothing is delivered
anywhere, and the form does not call it. Submitting shows the confirmation
screen client-side, as the design specifies. A destination must be wired up and
the form connected before launch.
