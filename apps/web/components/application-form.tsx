"use client";

import { useState, type FormEvent } from "react";

import { CheckCircle2, Plus, X } from "lucide-react";

import { Button, Input, Label, Select, Textarea, cn } from "@mlfp/ui";

import { application } from "@/content/landing";

type Status = "idle" | "submitting" | "success" | "error";

const ACTIVITY_FIELDS = application.activities.fields;
const ESSAYS = application.essays.items;

function countWords(value: string) {
  const trimmed = value.trim();
  return trimmed.length === 0 ? 0 : trimmed.split(/\s+/).length;
}

/** Reads `activity-<index>-<field>` inputs back into ordered rows. */
function readActivities(form: FormData, rowCount: number) {
  return Array.from({ length: rowCount }, (_, index) =>
    Object.fromEntries(
      ACTIVITY_FIELDS.map((field) => [
        field.name,
        String(form.get(`activity-${index}-${field.name}`) ?? ""),
      ]),
    ),
  );
}

export function ApplicationForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>(application.error.body);
  const [activityRows, setActivityRows] = useState(1);
  const [essayValues, setEssayValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(ESSAYS.map((essay) => [essay.name, ""])),
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = new FormData(event.currentTarget);
    const gradYear = String(form.get("gradYear") ?? "").trim();

    const payload = {
      cohort: form.get("cohort"),
      fullName: form.get("fullName"),
      email: form.get("email"),
      phone: form.get("phone"),
      educationLevel: form.get("educationLevel"),
      school: form.get("school"),
      ...(gradYear ? { gradYear: Number(gradYear) } : {}),
      testScore: form.get("testScore"),
      extracurriculars: readActivities(form, activityRows),
      honorsAwards: form.get("honorsAwards"),
      links: Object.fromEntries(
        application.links.fields.map((field) => [field.name, form.get(field.name) ?? ""]),
      ),
      essays: essayValues,
    };

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus("success");
        return;
      }

      if (response.status === 409) {
        setErrorMessage(application.error.duplicate);
      } else if (response.status === 400) {
        setErrorMessage(application.error.invalid);
      } else {
        setErrorMessage(application.error.body);
      }

      setStatus("error");
    } catch {
      setErrorMessage(application.error.body);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-4 rounded-xl border border-border bg-surface p-10">
        <CheckCircle2 aria-hidden className="size-8 text-success" />
        <h3 className="font-display text-2xl font-semibold">{application.success.title}</h3>
        <p className="max-w-md leading-relaxed text-foreground-muted">
          {application.success.body}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-border bg-surface p-6 sm:p-10"
    >
      {/* ── About you ─────────────────────────────────────────────── */}
      <fieldset>
        <legend className="text-eyebrow text-primary-subtle-foreground uppercase">
          {application.about.heading}
        </legend>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label htmlFor="fullName">{application.about.fullName}</Label>
            <Input id="fullName" name="fullName" required autoComplete="name" />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email">{application.about.email}</Label>
            <Input id="email" name="email" type="email" required autoComplete="email" />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="phone">
              {application.about.phone}{" "}
              <span className="font-normal text-foreground-subtle">
                ({application.optionalHint})
              </span>
            </Label>
            <Input id="phone" name="phone" type="tel" autoComplete="tel" />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="educationLevel">{application.about.educationLevel}</Label>
            <Select id="educationLevel" name="educationLevel" required defaultValue="">
              <option value="" disabled>
                {application.selectPrompt}
              </option>
              {application.educationLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </Select>
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
              name="gradYear"
              type="number"
              min={1950}
              max={2100}
              inputMode="numeric"
            />
          </div>

          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label htmlFor="school">
              {application.about.school}{" "}
              <span className="font-normal text-foreground-subtle">
                ({application.optionalHint})
              </span>
            </Label>
            <Input id="school" name="school" autoComplete="organization" />
          </div>
        </div>
      </fieldset>

      {/* ── Cohort ────────────────────────────────────────────────── */}
      <fieldset className="mt-10 border-t border-border pt-8">
        <legend className="text-eyebrow text-primary-subtle-foreground uppercase">
          {application.cohort.heading}
        </legend>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="cohort">{application.cohort.label}</Label>
            <Select id="cohort" name="cohort" required defaultValue="">
              <option value="" disabled>
                {application.selectPrompt}
              </option>
              {application.cohorts.map((cohort) => (
                <option key={cohort.value} value={cohort.value}>
                  {cohort.label}
                </option>
              ))}
            </Select>
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
              name="testScore"
              placeholder={application.cohort.testScorePlaceholder}
            />
            <p className="text-sm text-foreground-subtle">
              {application.cohort.testScoreHint}
            </p>
          </div>
        </div>
      </fieldset>

      {/* ── Extracurriculars ──────────────────────────────────────── */}
      <fieldset className="mt-10 border-t border-border pt-8">
        <legend className="text-eyebrow text-primary-subtle-foreground uppercase">
          {application.activities.heading}
        </legend>
        <p className="mt-3 text-sm text-foreground-muted">{application.activities.hint}</p>

        <div className="mt-6 flex flex-col gap-5">
          {Array.from({ length: activityRows }, (_, index) => (
            <div key={index} className="rounded-lg border border-border bg-surface-muted p-5">
              <div className="flex items-center justify-between gap-4">
                <span className="font-display text-sm font-semibold">
                  {application.activities.rowLabel} {index + 1}
                </span>
                {index === activityRows - 1 && activityRows > 1 ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setActivityRows((rows) => rows - 1)}
                  >
                    <X />
                    {application.activities.removeLabel}
                  </Button>
                ) : null}
              </div>

              <div className="mt-4 grid gap-4">
                {ACTIVITY_FIELDS.map((field) => {
                  const id = `activity-${index}-${field.name}`;
                  const isDescription = field.name === "description";

                  return (
                    <div key={field.name} className="flex flex-col gap-2">
                      <Label htmlFor={id}>{field.label}</Label>
                      {isDescription ? (
                        <Textarea
                          id={id}
                          name={id}
                          rows={2}
                          className="min-h-20"
                          placeholder={field.placeholder}
                          required={index === 0}
                        />
                      ) : (
                        <Input
                          id={id}
                          name={id}
                          placeholder={field.placeholder}
                          required={index === 0 && field.name === "organization"}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {activityRows < application.activities.max ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-5"
            onClick={() => setActivityRows((rows) => rows + 1)}
          >
            <Plus />
            {application.activities.addLabel}
          </Button>
        ) : null}
      </fieldset>

      {/* ── Honors ────────────────────────────────────────────────── */}
      <fieldset className="mt-10 border-t border-border pt-8">
        <legend className="text-eyebrow text-primary-subtle-foreground uppercase">
          {application.honors.heading}
        </legend>

        <div className="mt-6 flex flex-col gap-2">
          <Label htmlFor="honorsAwards">
            {application.honors.label}{" "}
            <span className="font-normal text-foreground-subtle">
              ({application.optionalHint})
            </span>
          </Label>
          <Textarea
            id="honorsAwards"
            name="honorsAwards"
            placeholder={application.honors.placeholder}
          />
        </div>
      </fieldset>

      {/* ── Links ─────────────────────────────────────────────────── */}
      <fieldset className="mt-10 border-t border-border pt-8">
        <legend className="text-eyebrow text-primary-subtle-foreground uppercase">
          {application.links.heading}
        </legend>
        <p className="mt-3 text-sm text-foreground-muted">{application.links.hint}</p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {application.links.fields.map((field) => (
            <div key={field.name} className="flex flex-col gap-2">
              <Label htmlFor={field.name}>{field.label}</Label>
              <Input
                id={field.name}
                name={field.name}
                type="url"
                placeholder={field.placeholder}
              />
            </div>
          ))}
        </div>
      </fieldset>

      {/* ── Essays ────────────────────────────────────────────────── */}
      <fieldset className="mt-10 border-t border-border pt-8">
        <legend className="text-eyebrow text-primary-subtle-foreground uppercase">
          {application.essays.heading}
        </legend>
        <p className="mt-3 text-sm text-foreground-muted">{application.essays.hint}</p>

        <div className="mt-6 flex flex-col gap-8">
          {ESSAYS.map((essay, index) => {
            const value = essayValues[essay.name] ?? "";
            const words = countWords(value);
            const inRange =
              words >= application.essays.minWords && words <= application.essays.maxWords;

            return (
              <div key={essay.name} className="flex flex-col gap-2">
                <Label htmlFor={essay.name}>
                  {index + 1}. {essay.prompt}
                </Label>
                <Textarea
                  id={essay.name}
                  name={essay.name}
                  required
                  rows={7}
                  className="min-h-40"
                  placeholder={essay.placeholder}
                  value={value}
                  onChange={(event) =>
                    setEssayValues((current) => ({
                      ...current,
                      [essay.name]: event.target.value,
                    }))
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
              </div>
            );
          })}
        </div>
      </fieldset>

      {status === "error" ? (
        <p
          role="alert"
          className="mt-8 rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          <span className="font-medium">{application.error.title}.</span> {errorMessage}
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        className="mt-8 w-full sm:w-auto"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? application.submittingLabel : application.submitLabel}
      </Button>
    </form>
  );
}
