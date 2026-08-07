import type { Metadata } from "next";
import type { ReactNode } from "react";

import { ThemeProvider, fontVariables } from "@mlfp/ui";

import "./globals.css";

export const metadata: Metadata = {
  title: "Marketing Leaders Fellowship Program",
  description: "A fellowship for marketers stepping into leadership.",
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
