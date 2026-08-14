# Design comps

Approved direction from the Claude design export. Open either file directly in a
browser — no build step.

| File                  | Covers                    |
| --------------------- | ------------------------- |
| `Home-V2.dc.html`     | Home page                 |
| `Application.dc.html` | Application form          |
| `Preview.dc.html`     | Device-frame preview shell |

`Preview.dc.html?d=V2&bp=mobile` (or `bp=tablet`) renders a comp inside a device
frame. `support.js`, `image-slot.js`, and `scroll-sync.js` are the export runtime
and are required for the comps to render.

## Notes

- These are generated exports, kept unedited so paths resolve as-authored. Treat
  them as read-only reference, not as source.
- Only the approved V2 direction is included. The other explorations (V1, V3–V6,
  A/B/C, Application-V4) were left out.
- The floating pill in the bottom-right is the export's variant switcher. Its
  links to the other versions are dead here, by design.
- `Application.dc.html` loads the header logo from `themlfp.com`, so that one
  image needs a network connection to appear.

## Reference values

Typeface **Poppins** throughout (400–800).

| Token         | Hex       | Use                        |
| ------------- | --------- | -------------------------- |
| `navy-700`    | `#0d1c4f` | Body copy, headings        |
| `navy-950`    | `#061737` | Deep navy surfaces         |
| `navy-500`    | `#46557d` | Muted copy                 |
| `brand-500`   | `#086bff` | Primary CTA                |
| `brand-600`   | `#1a66e8` | Links                      |
| `brand-400`   | `#2f80ff` | Accents, hover             |
| `brand-50`    | `#e6efff` | Light tint backgrounds     |

These are mirrored as Tailwind theme tokens in `src/app/globals.css`.
