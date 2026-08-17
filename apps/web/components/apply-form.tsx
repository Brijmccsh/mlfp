"use client";

import { useEffect, useRef, useState } from "react";

import Link from "next/link";

import { ArrowLeft, ArrowRight, Check, CheckCircle2, Plus, X } from "lucide-react";

import { Button, Input, Label, Select, Textarea, cn } from "@mlfp/ui";

import { apply, application } from "@/content/landing";

/** Bumped when the shape OR the step order changes, so an old draft is
 *  discarded rather than resumed onto the wrong screen. */
const DRAFT_KEY = "mlfp.apply.draft.v2";
const MAX_ACTIVITIES = application.activities.max;
const ESSAY_WORD_TARGET = { min: application.essays.minWords, max: application.essays.maxWords };

type Activity = { organization: string; role: string; description: string };

type Draft = {
  step: number;
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  cohort: string;
  educationLevel: string;
  school: string;
  gradYear: string;
  testScore: string;
  activities: Activity[];
  honorsAwards: string;
  resume: string;
  portfolio: string;
  essays: Record<string, string>;
  anythingElse: string;
};

const EMPTY_ACTIVITY: Activity = { organization: "", role: "", description: "" };

function emptyDraft(): Draft {
  return {
    step: 0,
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
    cohort: "",
    educationLevel: "",
    school: "",
    gradYear: "",
    testScore: "",
    activities: [{ ...EMPTY_ACTIVITY }],
    honorsAwards: "",
    resume: "",
    portfolio: "",
    essays: Object.fromEntries(apply.essayPrompts.map((e) => [e.name, ""])),
    anythingElse: "",
  };
}

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
const isUrl = (value: string) => /^https?:\/\/\S+$/i.test(value.trim());

function countWords(value: string) {
  const trimmed = value.trim();
  return trimmed.length === 0 ? 0 : trimmed.split(/\s+/).length;
}

/** Required-field rules per step, mirroring the server schema. */
function validateStep(step: number, draft: Draft): Record<string, string> {
  const e = apply.errors;
  const errors: Record<string, string> = {};

  // 0 — About you
  if (step === 0) {
    if (!draft.fullName.trim()) errors.fullName = e.required;
    if (!draft.email.trim()) errors.email = e.required;
    else if (!isEmail(draft.email)) errors.email = e.email;
  }

  // 1 — Cohort & academics
  if (step === 1) {
    if (!draft.cohort) errors.cohort = e.required;
    if (!draft.educationLevel) errors.educationLevel = e.required;
    if (draft.gradYear.trim() && !/^\d{4}$/.test(draft.gradYear.trim()))
      errors.gradYear = e.gradYear;
  }

  // 2 — Activities & honors
  if (step === 2) {
    const filled = draft.activities.filter(
      (a) => a.organization.trim() || a.role.trim() || a.description.trim(),
    );
    if (filled.length === 0 || filled.some((a) => !a.organization.trim()))
      errors.activities = e.activity;
  }

  // 3 — Links & portfolio
  if (step === 3) {
    if (draft.linkedin.trim() && !isUrl(draft.linkedin)) errors.linkedin = e.url;
    if (draft.resume.trim() && !isUrl(draft.resume)) errors.resume = e.url;
    if (draft.portfolio.trim() && !isUrl(draft.portfolio)) errors.portfolio = e.url;
  }

  // 4 — Three short essays
  if (step === 4) {
    for (const prompt of apply.essayPrompts) {
      if (!(draft.essays[prompt.name] ?? "").trim()) errors[prompt.name] = e.required;
    }
  }

  return errors;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="text-sm text-destructive">
      {message}
    </p>
  );
}

export function ApplyForm() {
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>(apply.errors.generic);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [restored, setRestored] = useState(false);
  const firstNameRef = useRef("");

  // Restore a draft before the first autosave can overwrite it.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(DRAFT_KEY);
      if (raw) setDraft({ ...emptyDraft(), ...(JSON.parse(raw) as Partial<Draft>) });
    } catch {
      // Corrupt or unavailable storage just means starting fresh.
    }
    setRestored(true);
  }, []);

  useEffect(() => {
    if (!restored || status === "success") return;
    try {
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
      setSavedAt(Date.now());
    } catch {
      // Private mode / quota — autosave is a convenience, not a requirement.
    }
  }, [draft, restored, status]);

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) =>
    setDraft((current) => ({ ...current, [key]: value }));

  const setActivity = (index: number, key: keyof Activity, value: string) =>
    setDraft((current) => ({
      ...current,
      activities: current.activities.map((row, i) =>
        i === index ? { ...row, [key]: value } : row,
      ),
    }));

  const step = draft.step;
  const isLast = step === apply.steps.length - 1;

  function goNext() {
    const found = validateStep(step, draft);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    if (!isLast) set("step", step + 1);
  }

  async function handleSubmit() {
    // A restored draft can land on the last step with an earlier one incomplete,
    // so every step is checked and the first failure is surfaced where it lives.
    for (let i = 0; i < apply.steps.length; i++) {
      const found = validateStep(i, draft);
      if (Object.keys(found).length > 0) {
        setErrors(found);
        set("step", i);
        return;
      }
    }
    setErrors({});

    setStatus("submitting");
    firstNameRef.current = draft.fullName.trim().split(/\s+/)[0] ?? "";

    const payload = {
      cohort: draft.cohort,
      fullName: draft.fullName,
      email: draft.email,
      phone: draft.phone,
      educationLevel: draft.educationLevel,
      school: draft.school,
      ...(draft.gradYear.trim() ? { gradYear: Number(draft.gradYear) } : {}),
      testScore: draft.testScore,
      extracurriculars: draft.activities,
      honorsAwards: draft.honorsAwards,
      links: {
        resume: draft.resume,
        linkedin: draft.linkedin,
        portfolio: draft.portfolio,
        other: "",
      },
      essays: draft.essays,
      anythingElse: draft.anythingElse,
    };

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        try {
          window.localStorage.removeItem(DRAFT_KEY);
        } catch {
          // Nothing to clean up if storage is unavailable.
        }
        setStatus("success");
        return;
      }

      if (response.status === 409) setErrorMessage(apply.errors.duplicate);
      else if (response.status === 400) setErrorMessage(apply.errors.invalid);
      else setErrorMessage(apply.errors.generic);
      setStatus("error");
    } catch {
      setErrorMessage(apply.errors.generic);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-5 rounded-2xl border border-border bg-surface p-10 shadow-sm">
        <CheckCircle2 aria-hidden className="size-10 text-success" />
        <h2 className="text-2xl font-bold text-foreground">{apply.success.title}</h2>
        <p className="max-w-md leading-relaxed text-foreground-muted">
          {apply.success.body.replace("{firstName}", firstNameRef.current)}
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-medium text-primary-subtle-foreground hover:underline"
        >
          <ArrowLeft className="size-4" />
          {apply.success.backLabel}
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Progress */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <ol className="flex flex-1 items-center gap-2" aria-label="Progress">
          {apply.steps.map((s, index) => (
            <li key={s.id} className="flex flex-1 flex-col gap-2">
              <span
                className={cn(
                  "h-1 rounded-full transition-colors duration-200 ease-emphasis",
                  index <= step ? "bg-primary-strong" : "bg-border",
                )}
              />
              <span
                className={cn(
                  "text-xs font-medium",
                  index === step ? "text-foreground" : "text-foreground-subtle",
                )}
              >
                {s.label}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <p className="mt-5 text-sm text-foreground-subtle" aria-live="polite">
        {apply.stepCounter
          .replace("{current}", String(step + 1))
          .replace("{total}", String(apply.steps.length))}
        {savedAt ? <span className="ml-3 text-success">· {apply.draftSaved}</span> : null}
      </p>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (isLast) void handleSubmit();
          else goNext();
        }}
        className="mt-6 rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-9"
      >
        <h2 className="text-xl font-bold text-foreground">{apply.steps[step]?.title}</h2>

        {/* ── Step 1: About you ─────────────────────────────────────────────── */}
        {step === 0 ? (
          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2 sm:col-span-2">
              <Label htmlFor="fullName">{application.about.fullName}</Label>
              <Input
                id="fullName"
                value={draft.fullName}
                onChange={(e) => set("fullName", e.target.value)}
                autoComplete="name"
              />
              <FieldError message={errors.fullName} />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email">{application.about.email}</Label>
              <Input
                id="email"
                type="email"
                value={draft.email}
                onChange={(e) => set("email", e.target.value)}
                autoComplete="email"
              />
              <FieldError message={errors.email} />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="phone">
                {application.about.phone}{" "}
                <span className="font-normal text-foreground-subtle">
                  ({application.optionalHint})
                </span>
              </Label>
              <Input
                id="phone"
                type="tel"
                value={draft.phone}
                onChange={(e) => set("phone", e.target.value)}
                autoComplete="tel"
              />
            </div>
          </div>
        ) : null}

        {/* ── Step 2: Cohort & academics ─────────────────────────────────────────────── */}
        {step === 1 ? (
          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="cohort">{application.cohort.label}</Label>
              <Select
                id="cohort"
                value={draft.cohort}
                onChange={(e) => set("cohort", e.target.value)}
              >
                <option value="" disabled>
                  {application.selectPrompt}
                </option>
                {application.cohorts.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </Select>
              <FieldError message={errors.cohort} />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="educationLevel">{application.about.educationLevel}</Label>
              <Select
                id="educationLevel"
                value={draft.educationLevel}
                onChange={(e) => set("educationLevel", e.target.value)}
              >
                <option value="" disabled>
                  {application.selectPrompt}
                </option>
                {application.educationLevels.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </Select>
              <FieldError message={errors.educationLevel} />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="school">
                {application.about.school}{" "}
                <span className="font-normal text-foreground-subtle">
                  ({application.optionalHint})
                </span>
              </Label>
              <Input
                id="school"
                value={draft.school}
                onChange={(e) => set("school", e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="gradYear">
                {application.about.gradYear}{" "}
                <span className="font-normal text-foreground-subtle">
                  ({application.optionalHint})
                </span>
              </Label>
              <Input
                id="gradYear"
                inputMode="numeric"
                value={draft.gradYear}
                onChange={(e) => set("gradYear", e.target.value)}
              />
              <FieldError message={errors.gradYear} />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="testScore">
                {application.cohort.testScoreLabel}{" "}
                <span className="font-normal text-foreground-subtle">
                  ({application.optionalHint})
                </span>
              </Label>
              <Input
                id="testScore"
                placeholder={application.cohort.testScorePlaceholder}
                value={draft.testScore}
                onChange={(e) => set("testScore", e.target.value)}
              />
              <p className="text-sm text-foreground-subtle">
                {application.cohort.testScoreHint}
              </p>
            </div>
          </div>
        ) : null}

        {/* ── Step 3: Activities & honors ─────────────────────────────────────────────── */}
        {step === 2 ? (
          <div className="mt-7 flex flex-col gap-8">
            <div>
              <p className="font-semibold text-foreground">
                {application.activities.heading}
              </p>
              <p className="mt-2 text-sm text-foreground-muted">
                {application.activities.hint}
              </p>

              <div className="mt-5 flex flex-col gap-5">
                {draft.activities.map((row, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-border bg-surface-muted p-5"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm font-semibold text-foreground">
                        {application.activities.rowLabel} {index + 1}
                      </span>
                      {draft.activities.length > 1 ? (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            set(
                              "activities",
                              draft.activities.filter((_, i) => i !== index),
                            )
                          }
                        >
                          <X />
                          {application.activities.removeLabel}
                        </Button>
                      ) : null}
                    </div>

                    <div className="mt-4 grid gap-4">
                      {application.activities.fields.map((field) => {
                        const key = field.name as keyof Activity;
                        const id = `activity-${index}-${field.name}`;

                        return (
                          <div key={field.name} className="flex flex-col gap-2">
                            <Label htmlFor={id}>{field.label}</Label>
                            {field.name === "description" ? (
                              <Textarea
                                id={id}
                                rows={2}
                                className="min-h-20"
                                placeholder={field.placeholder}
                                value={row[key]}
                                onChange={(e) => setActivity(index, key, e.target.value)}
                              />
                            ) : (
                              <Input
                                id={id}
                                placeholder={field.placeholder}
                                value={row[key]}
                                onChange={(e) => setActivity(index, key, e.target.value)}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <FieldError message={errors.activities} />

              {draft.activities.length < MAX_ACTIVITIES ? (
                <button
                  type="button"
                  onClick={() => set("activities", [...draft.activities, { ...EMPTY_ACTIVITY }])}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border-strong py-3.5 text-sm font-medium text-foreground-muted transition-colors hover:border-primary hover:text-primary-subtle-foreground"
                >
                  <Plus className="size-4" />
                  {application.activities.addLabel}
                </button>
              ) : null}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="honorsAwards">
                {application.honors.label}{" "}
                <span className="font-normal text-foreground-subtle">
                  ({application.optionalHint})
                </span>
              </Label>
              <Textarea
                id="honorsAwards"
                placeholder={application.honors.placeholder}
                value={draft.honorsAwards}
                onChange={(e) => set("honorsAwards", e.target.value)}
              />
            </div>

          </div>
        ) : null}

        {/* ── Step 4: Links & portfolio ──────────────────────────── */}
        {step === 3 ? (
          <div className="mt-7 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="linkedin">
                LinkedIn{" "}
                <span className="font-normal text-foreground-subtle">
                  ({application.optionalHint})
                </span>
              </Label>
              <Input
                id="linkedin"
                type="url"
                placeholder="https://linkedin.com/in/…"
                value={draft.linkedin}
                onChange={(e) => set("linkedin", e.target.value)}
              />
              <FieldError message={errors.linkedin} />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="resume">Resume URL</Label>
                <Input
                  id="resume"
                  type="url"
                  placeholder="https://…"
                  value={draft.resume}
                  onChange={(e) => set("resume", e.target.value)}
                />
                <FieldError message={errors.resume} />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="portfolio">
                  Portfolio or website{" "}
                  <span className="font-normal text-foreground-subtle">
                    ({application.optionalHint})
                  </span>
                </Label>
                <Input
                  id="portfolio"
                  type="url"
                  placeholder="https://…"
                  value={draft.portfolio}
                  onChange={(e) => set("portfolio", e.target.value)}
                />
                <FieldError message={errors.portfolio} />
              </div>
            </div>
          </div>
        ) : null}

        {/* ── Step 5: Three short essays ─────────────────────────── */}
        {step === 4 ? (
          <div className="mt-7 flex flex-col gap-8">
            {apply.essayPrompts.map((prompt, index) => {
              const value = draft.essays[prompt.name] ?? "";
              const words = countWords(value);
              const inRange =
                words >= ESSAY_WORD_TARGET.min && words <= ESSAY_WORD_TARGET.max;

              return (
                <div key={prompt.name} className="flex flex-col gap-2">
                  <Label htmlFor={prompt.name}>
                    {index + 1}. {prompt.prompt}
                  </Label>
                  <Textarea
                    id={prompt.name}
                    rows={7}
                    className="min-h-40"
                    placeholder={prompt.placeholder}
                    value={value}
                    onChange={(e) =>
                      set("essays", { ...draft.essays, [prompt.name]: e.target.value })
                    }
                  />
                  <p
                    aria-live="polite"
                    className={cn(
                      "text-sm tabular-nums",
                      inRange ? "text-success" : "text-foreground-subtle",
                    )}
                  >
                    {application.essays.counterTemplate.replace("{count}", String(words))}
                  </p>
                  <FieldError message={errors[prompt.name]} />
                </div>
              );
            })}

            <div className="flex flex-col gap-2">
              <Label htmlFor="anythingElse">
                {apply.anythingElse.label}{" "}
                <span className="font-normal text-foreground-subtle">
                  ({application.optionalHint})
                </span>
              </Label>
              <Textarea
                id="anythingElse"
                placeholder={apply.anythingElse.placeholder}
                value={draft.anythingElse}
                onChange={(e) => set("anythingElse", e.target.value)}
              />
            </div>
          </div>
        ) : null}

        {status === "error" ? (
          <p
            role="alert"
            className="mt-8 rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          >
            {errorMessage}
          </p>
        ) : null}

        <div className="mt-9 flex items-center justify-between gap-4 border-t border-border pt-7">
          <Button
            type="button"
            variant="outline"
            onClick={() => set("step", Math.max(0, step - 1))}
            disabled={step === 0}
          >
            <ArrowLeft />
            {apply.backLabel}
          </Button>

          <Button type="submit" size="lg" disabled={status === "submitting"}>
            {isLast ? (
              status === "submitting" ? (
                apply.submittingLabel
              ) : status === "error" ? (
                apply.retryLabel
              ) : (
                <>
                  <Check />
                  {apply.submitLabel}
                </>
              )
            ) : (
              <>
                {apply.continueLabel}
                <ArrowRight />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
