"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { signInDemo } from "@/lib/demo-store";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Card } from "@/components/ui/card";

/*
  DEMO MODE — any valid-looking email + any password signs in.
  REAL: supabase.auth.signInWithPassword — see DEMO-MODE.md §1.
*/

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/account";

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [loading, setLoading] = React.useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      errs.email = "Please enter a valid email address.";
    if (password.length < 1) errs.password = "Please enter your password.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    // Simulate a network round-trip so the loading state is visible.
    await new Promise((r) => setTimeout(r, 600));
    signInDemo({
      name: email.split("@")[0].replace(/[._-]+/g, " "),
      email: email.trim(),
    });
    router.push(next);
  }

  return (
    <Card className="flex flex-col gap-card-gap">
      <form noValidate onSubmit={onSubmit} className="flex flex-col gap-component">
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
          autoComplete="current-password"
          required
          value={password}
          error={errors.password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="inline-flex min-h-hit-target items-center text-description font-medium text-primary underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Forgot password?
          </Link>
        </div>
        <Button type="submit" variant="secondary" disabled={loading} className="w-full">
          {loading ? "Signing in…" : "Sign in"}
        </Button>
      </form>
      <p className="text-description text-bb-text-description">
        New to Body Bliss?{" "}
        <Link
          href={`/signup?next=${encodeURIComponent(next)}`}
          className="font-medium text-primary underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Create an account
        </Link>
      </p>
    </Card>
  );
}
