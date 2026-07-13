"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";

export function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/account";

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | undefined>();
  const [loading, setLoading] = React.useState(false);
  const [checkEmail, setCheckEmail] = React.useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 8) {
      setError("Please choose a password of at least 8 characters.");
      return;
    }
    setLoading(true);
    setError(undefined);
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { first_name: firstName, last_name: lastName },
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });
    if (error) {
      setError("We couldn't create your account. That email may already be registered.");
      setLoading(false);
      return;
    }
    // If email confirmation is off, a session is returned immediately.
    if (data.session) {
      router.push(next);
      router.refresh();
      return;
    }
    setCheckEmail(true);
    setLoading(false);
  }

  if (checkEmail) {
    return (
      <Card className="flex flex-col gap-component" role="status">
        <CardTitle className="text-subtitle">Check your email</CardTitle>
        <CardDescription>
          We&apos;ve sent a confirmation link to {email}. Open it to finish
          creating your account, then you can sign in.
        </CardDescription>
      </Card>
    );
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
          error={error}
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
