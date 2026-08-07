import type { Metadata } from "next";
import type { ReactNode } from "react";

import { ThemeProvider, fontVariables } from "@mlfp/ui";

import "./globals.css";

export const metadata: Metadata = {
  title: "MLFP — Fellowship",
  description: "The Marketing Leaders Fellowship Program workspace.",
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
