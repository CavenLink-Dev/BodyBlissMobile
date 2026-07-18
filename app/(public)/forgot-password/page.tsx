import type { Metadata } from "next";

import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export const metadata: Metadata = {
  title: "Reset password | Body Bliss Mobile Massage",
  robots: { index: false },
};

export default function ForgotPasswordPage() {
  return (
    <main className="px-page-inline py-page-block">
      <div className="mx-auto flex max-w-md flex-col gap-card-gap">
        <h1 className="font-heading text-display text-bb-text-display">
          Reset Password
        </h1>
        <p className="text-description text-bb-text-description">
          Enter your email and we&apos;ll send you a code to set a new password.
        </p>
        <ForgotPasswordForm />
      </div>
    </main>
  );
}
