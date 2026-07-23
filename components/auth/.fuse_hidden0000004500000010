"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { signInDemo } from "@/lib/demo-store";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Card } from "@/components/ui/card";

/*
  DEMO MODE — creates a local demo session immediately (no email
  confirmation). REAL: supabase.auth.signUp — see DEMO-MODE.md §1.
*/

export function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/account";

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [loading, setLoading] = React.useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (firstName.trim().length < 1) errs.firstName = "Please enter your first name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      errs.email = "Please enter a valid email address.";
    if (password.length < 8)
      errs.password = "Please choose a password of at least 8 characters.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    signInDemo({
      name: `${firstName.trim()}${lastName.trim() ? ` ${lastName.trim()}` : ""}`,
      email: email.trim(),
    });
    router.push(next);
  }

  return (
    <Card className="flex flex-col gap-card-gap">
      <form noValidate onSubmit={onSubmit} className="flex flex-col gap-component">
        <div className="grid grid-cols-1 gap-component tablet:grid-cols-2">
          <Field
            id="firstName"
            name="firstName"
            label="First name"
            autoComplete="given-name"
            required
            value={firstName}
            error={errors.firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Field
            id="lastName"
            name="lastName"
            label="Last name"
            autoComplete="family-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <Field
          id="email"
          name="email"
          type="email"
          label="Email address"
          autoComplete="email"
          inputMode="email"
          required
          value={email}
          error={errors.email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Field
          id="password"
          name="password"
          type="password"
          label="Password"
          hint="At least 8 characters."
          autoComplete="new-password"
          required
          value={password}
          error={errors.password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="secondary" disabled={loading} className="w-full">
          {loading ? "Creating account…" : "Create account"}
        </Button>
      </form>
      <p className="text-description text-bb-text-description">
        Already have an account?{" "}
        <Link
          href={`/login?next=${encodeURIComponent(next)}`}
          className="font-medium text-primary underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Sign in
        </Link>
      </p>
    </Card>
  );
}
