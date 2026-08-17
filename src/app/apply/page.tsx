import type { Metadata } from "next";
import { ApplicationForm } from "@/components/application-form";

export const metadata: Metadata = {
  title: "Apply — Marketing Leaders Fellowship Program",
  description:
    "Apply to the Marketing Leaders Fellowship Program — five steps, about an hour.",
};

export default function Apply() {
  return <ApplicationForm />;
}
