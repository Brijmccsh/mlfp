# Marketing Leaders Fellowship Program

Site for [themlfp.com](https://themlfp.com).

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · next-themes

Pinned to the Next 15 line to match what is currently running in production.

## Getting started

```bash
npm install
npm run dev
```

Other scripts: `npm run build`, `npm start`, `npm run lint`, `npm run typecheck`.

## Structure

```
src/app/          routes — / (home) and /apply
src/app/api/      route handlers
src/components/   shared components
public/           brand/, team/, press/ images
design/           approved design comps (see design/README.md)
```

## Routes

| Route         | Notes                                                      |
| ------------- | ---------------------------------------------------------- |
| `/`           | Sections `#program` `#modules` `#challenge` `#outcomes` `#faq` |
| `/apply`      | Application form                                            |
| `/api/apply`  | `POST` — application submissions                            |

The approved design splits the application onto its own page. Every Apply CTA
in `Home-V2` points at the application page rather than an on-page anchor, which
differs from the current production site where the form sits inline at `#apply`.

## Open item

`POST /api/apply` validates the payload and then returns **501** — nothing is
delivered anywhere yet. Wire up the destination (email, CRM, or datastore) and
replace that response before launch.
