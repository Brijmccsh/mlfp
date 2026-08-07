import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { ThemeProvider, fontVariables } from "@mlfp/ui";

import "./globals.css";

export const metadata: Metadata = {
  title: "Marketing Leaders Fellowship Program",
  description: "A fellowship for marketers stepping into leadership.",
};

/**
 * Tints mobile browser chrome. These mirror the `--background` token for each
 * theme in packages/config/tailwind/theme.css — metadata cannot read CSS vars,
 * so update both together.
 */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#050e24" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
