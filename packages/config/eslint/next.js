import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { FlatCompat } from "@eslint/eslintrc";

import base from "./base.js";

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
});

/**
 * Shared flat config for the Next.js apps.
 *
 * `next/core-web-vitals` sets its own parser, which does not track type-only
 * imports. It goes first so the TypeScript parser from `base` wins.
 */
export default [...compat.extends("next/core-web-vitals"), ...base];
