"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, MailOpen } from "lucide-react";

import { signInDemo } from "@/lib/demo-store";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";

/*
  DEMO MODE — full password-reset journey with no email actually sent:
    1. enter email → "we've emailed you a code"
    2. enter the 6-digit code (any 6 digits are accepted)
    3. choose a new password → signed in and taken to the account.
  REAL: supabase.auth.resetPasswordForEmail + verifyOtp — DEMO-MODE.md §1.
*/

type Stage = "email" | "code" | "password" | "done";

export function ForgotPasswordForm() {
  const router = useRouter();

  const [stage, setStage] = React.useState<Stage>("email");
  const [email, setEmail] = React.useState("");
  const [code, setCode] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | undefined>();
  const [loading, setLoading] = React.useState(false);

  async function advance(validate: () => string | undefined, nextStage: Stage) {
    const problem = validate();
    if (problem) {
      setError(problem);
      return;
    }
    setError(undefined);
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600)); // simulated round-trip
    setLoading(false);
    setStage(nextStage);
  }

  if (stage === "done") {
    return (
      <Card className="flex flex-col items-start gap-component" role="status">
        <span
          className="inline-flex size-12 items-center justify-center rounded-full bg-secondary"
          aria-hidden="true"
        >
          <Check className="size-6 text-secondary-foreground" />
        </span>
        <CardTitle className="text-subtitle">Password updated</CardTitle>
        <CardDescription>
          You&apos;re signed in with your new password.
        </CardDescription>
        <Button asChild variant="secondary">
          <Link href="/account">Go to my account</Link>
        </Button>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col gap-card-gap">
      {stage === "email" && (
        <form
          noValidate
          className="flex flex-col gap-component"
          onSubmit={(e) => {
            e.preventDefault();
            void advance(
              () =>
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
                  ? undefined
                  : "Please enter a valid email address.",
              "code",
            );
          }}
        >
          <Field
            id="resetEmail"
            name="email"
            type="email"
            label="Email address"
            hint="We'll email you a 6-digit code to reset your password."
            autoComplete="email"
            inputMode="email"
            required
            value={email}
            error={error}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit" variant="secondary" disabled={loading} className="w-full">
            {loading ? "Sending…" : "Send reset code"}
          </Button>
        </form>
      )}

      {stage === "code" && (
        <form
          noValidate
          className="flex flex-col gap-component"
          onSubmit={(e) => {
            e.preventDefault();
            void advance(
              () =>
                /^\d{6}$/.test(code.trim())
                  ? undefined
                  : "Please enter the 6-digit code.",
              "password",
            );
          }}
        >
          <div className="flex items-start gap-component rounded border border-border bg-background p-3">
            <MailOpen aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
            <p className="text-description text-bb-text-description" role="status">
              We&apos;ve emailed a 6-digit code to{" "}
              <span className="font-medium text-bb-text-display">{email}</span>.
              Enter it below.
            </p>
          </div>
          <Field
            id="resetCode"
            name="code"
            label="6-digit code"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            required
            value={code}
            error={error}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            className="[&_input]:text-center [&_input]:font-heading [&_input]:text-title [&_input]:tracking-[0.5em]"
          />
          <Button type="submit" variant="secondary" disabled={loading} className="w-full">
            {loading ? "Checking…" : "Verify code"}
          </Button>
          <button
            type="button"
            className="inline-flex min-h-hit-target items-center self-start text-description font-medium text-primary underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => setStage("email")}
          >
            Use a different email
          </button>
        </form>
      )}

      {stage === "password" && (
        <form
          noValidate
          className="flex flex-col gap-component"
          onSubmit={(e) => {
            e.preventDefault();
            void advance(
              () =>
                password.length >= 8
                  ? undefined
                  : "Please choose a password of at least 8 characters.",
              "done",
            ).then(() => {
              if (password.length >= 8) {
                signInDemo({
                  name: email.split("@")[0].replace(/[._-]+/g, " "),
                  email: email.trim(),
                });
                router.prefetch("/account");
              }
            });
          }}
        >
          <Field
            id="newPassword"
            name="password"
            type="password"
            label="New password"
            hint="At least 8 characters."
            autoComplete="new-password"
            required
            value={password}
            error={error}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="secondary" disabled={loading} className="w-full">
            {loading ? "Updating…" : "Set new password"}
          </Button>
        </form>
      )}

      <p className="text-description text-bb-text-description">
        Remembered it?{" "}
        <Link
          href="/login"
          className="font-medium text-primary underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Back to sign in
        </Link>
      </p>
    </Card>
  );
}
