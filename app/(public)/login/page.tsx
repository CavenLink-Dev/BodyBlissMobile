import type { Metadata } from "next";
import { Suspense } from "react";

import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = { title: "Sign in | Body Bliss Mobile Massage" };

export default function LoginPage() {
  return (
    <main className="px-page-inline py-page-block">
      <div className="mx-auto flex max-w-md flex-col gap-card-gap">
        <h1 className="font-heading text-display text-bb-text-display">Sign In</h1>
        <p className="text-description text-bb-text-description">
          Sign in to manage your bookings and saved details.
        </p>
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
