import { Inter, Poppins, Sora } from "next/font/google";

/** Body / UI text. */
export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/** Display / headline text. */
export const fontDisplay = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

/** Hero / brand face. */
export const fontPoppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins-src",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

/** Put this on <html> so the theme's font tokens resolve. */
export const fontVariables = `${fontSans.variable} ${fontDisplay.variable} ${fontPoppins.variable}`;
