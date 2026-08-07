"use client";

import { useState, type FormEvent } from "react";

import { CheckCircle2 } from "lucide-react";

import { Button, Input, Label, Select, Textarea } from "@mlfp/ui";

import { application } from "@/content/landing";

type Status = "idle" | "submitting" | "success" | "error";

export function ApplicationForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = new FormData(event.currentTarget);
    const payload = {
      fullName: form.get("fullName"),
      email: form.get("email"),
      phone: form.get("phone"),
      educationLevel: form.get("educationLevel"),
      school: form.get("school"),
      graduationYear: Number(form.get("graduationYear")),
      answers: Object.fromEntries(
        application.shortAnswers.map((item) => [item.name, form.get(item.name)]),
      ),
    };

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setStatus(response.ok ? "success" : "error");
    } catch {
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
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2 sm:col-span-2">
          <Label htmlFor="fullName">Full name</Label>
          <Input id="fullName" name="fullName" required autoComplete="name" />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required autoComplete="email" />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" type="tel" required autoComplete="tel" />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="educationLevel">Education level</Label>
          <Select id="educationLevel" name="educationLevel" required defaultValue="">
            <option value="" disabled>
              Select one
            </option>
            {application.educationLevels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="graduationYear">Graduation year</Label>
          <Input
            id="graduationYear"
            name="graduationYear"
            type="number"
            required
            min={1950}
            max={2100}
            inputMode="numeric"
          />
        </div>

        <div className="flex flex-col gap-2 sm:col-span-2">
          <Label htmlFor="school">School</Label>
          <Input id="school" name="school" required autoComplete="organization" />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-6 border-t border-border pt-8">
        {application.shortAnswers.map((item) => (
          <div key={item.name} className="flex flex-col gap-2">
            <Label htmlFor={item.name}>{item.label}</Label>
            <Textarea
              id={item.name}
              name={item.name}
              required
              maxLength={item.maxLength}
              placeholder={item.placeholder}
            />
          </div>
        ))}
      </div>

      {status === "error" ? (
        <p
          role="alert"
          className="mt-6 rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          <span className="font-medium">{application.error.title}.</span>{" "}
          {application.error.body}
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
