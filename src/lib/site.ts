/**
 * Demo/staging builds set SITE_NOINDEX=true to keep a non-production copy out
 * of search results — this content is near-identical to the live site, and an
 * indexable duplicate on another hostname competes with it.
 *
 * Read at build time, since both pages are statically prerendered. Defaults to
 * indexable so a production build is never accidentally hidden.
 */
export const noIndex = process.env.SITE_NOINDEX === "true";
