import type { Metadata } from "next";
import { Suspense } from "react";

import { SignupForm } from "@/components/auth/signup-form";

export const metadata: Metadata = { title: "Create account | Body Bliss Mobile Massage" };

export default function SignupPage() {
  return (
    <main className="px-page-inline py-page-block">
      <div className="mx-auto flex max-w-md flex-col gap-card-gap">
        <h1 className="font-heading text-display text-bb-text-display">Create Account</h1>
        <p className="text-description text-bb-text-description">
          Create an account to book a massage and manage your bookings.
        </p>
        <Suspense fallback={null}>
          <SignupForm />
        </Suspense>
      </div>
    </main>
  );
}
