"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * The approved design defines its own light and dark zones per section with
 * explicit colours, so there is no separate dark theme to switch into — the
 * theme is forced light. next-themes stays wired (matching production) so a
 * real dark palette can be enabled by dropping forcedTheme.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      storageKey="theme"
      defaultTheme="light"
      forcedTheme="light"
      enableColorScheme
    >
      {children}
    </NextThemesProvider>
  );
}
