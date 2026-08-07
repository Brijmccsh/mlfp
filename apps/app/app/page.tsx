import { BookOpen, CalendarDays, MessageSquare } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Progress,
  Skeleton,
  ThemeToggle,
} from "@mlfp/ui";

const MODULES = [
  { title: "Positioning", status: "Complete", progress: 100, variant: "success" },
  { title: "Systems", status: "In progress", progress: 45, variant: "primary" },
  { title: "Influence", status: "Locked", progress: 0, variant: "neutral" },
] as const;

const NAV = [
  { label: "Curriculum", icon: BookOpen },
  { label: "Sessions", icon: CalendarDays },
  { label: "Cohort", icon: MessageSquare },
] as const;

export default function WorkspacePage() {
  return (
    <div className="min-h-dvh bg-surface-muted">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <span className="font-display text-base font-semibold tracking-tight">
              MLFP
            </span>
            <nav className="hidden items-center gap-1 sm:flex">
              {NAV.map((item) => {
                const Icon = item.icon;

                return (
                  <Button key={item.label} variant="ghost" size="sm">
                    <Icon />
                    {item.label}
                  </Button>
                );
              })}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Avatar className="size-8">
              <AvatarFallback>BT</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-eyebrow text-foreground-muted uppercase">Cohort 01</p>
            <h1 className="mt-3 text-display-sm font-display">Your fellowship</h1>
          </div>
          <Badge variant="primary">4 weeks remaining</Badge>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {MODULES.map((module) => (
            <Card key={module.title}>
              <CardHeader>
                <Badge variant={module.variant} className="w-fit">
                  {module.status}
                </Badge>
                <CardTitle className="mt-2">{module.title}</CardTitle>
                <CardDescription>{module.progress}% complete</CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={module.progress} />
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Next live session</CardTitle>
            <CardDescription>
              Content loads here once Supabase is wired — the skeleton is the real
              loading state.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
