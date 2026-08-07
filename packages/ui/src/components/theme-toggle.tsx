"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "../lib/cn";
import { Button, type ButtonProps } from "./button";

type ThemeToggleProps = Omit<ButtonProps, "children" | "onClick" | "asChild">;

/**
 * The icons swap via the `dark:` variant rather than React state, so the
 * correct one is painted on first render with no hydration flash.
 */
export function ThemeToggle({ className, variant = "ghost", ...props }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      type="button"
      variant={variant}
      size="icon"
      aria-label="Toggle colour theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={cn("relative", className)}
      {...props}
    >
      <Sun className="rotate-0 scale-100 transition-transform duration-200 ease-emphasis dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute rotate-90 scale-0 transition-transform duration-200 ease-emphasis dark:rotate-0 dark:scale-100" />
    </Button>
  );
}

export type { ThemeToggleProps };
