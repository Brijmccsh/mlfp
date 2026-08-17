# Marketing Leaders Fellowship Program

Site for [themlfp.com](https://themlfp.com), built from the approved V2 design
in [`design/`](design/).

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
src/app/          routes — / and /apply
src/app/api/      route handlers
src/components/   page sections and the application form
src/content/      copy and data (modules, FAQs, nav)
src/lib/          shared flags
public/           brand/, team/, press/ images
design/           approved design comps (see design/README.md)
```

## Routes

| Route         | Notes                                                             |
| ------------- | ----------------------------------------------------------------- |
| `/`           | Sections `#program` `#modules` `#challenge` `#outcomes` `#faq` `#apply` |
| `/apply`      | Five-step application form                                        |
| `/api/apply`  | `POST` — application submissions                                  |
| `/robots.txt` | Generated; follows `SITE_NOINDEX`                                 |

The design puts the application on its own page — every Apply CTA links to
`/apply` rather than an on-page anchor, which differs from the current
production site where the form sits inline at `#apply`.

## Environment

| Variable        | Default | Effect                                                     |
| --------------- | ------- | ---------------------------------------------------------- |
| `SITE_NOINDEX`  | unset   | Set to `true` for demo/staging builds to emit `noindex` and a disallow-all `robots.txt`. Read at **build** time, since both pages are prerendered. |

Leave it unset for production.

## Open item

`POST /api/apply` validates the payload and returns **501** — nothing is
delivered anywhere yet, and the form does not call it (submitting shows the
confirmation screen client-side, as the design specifies). Wire up a
destination and connect the form before launch.
