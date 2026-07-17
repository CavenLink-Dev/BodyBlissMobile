import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { CookieNotice } from "@/components/cookie-notice";
import { TestModeBanner } from "@/components/test-mode-banner";
import { Toaster } from "@/components/toaster";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Body Bliss Mobile Massage",
  description:
    "Book a vetted massage therapist to come to your home, hotel or workplace in Adelaide.",
  appleWebApp: {
    capable: true,
    title: "Body Bliss",
    statusBarStyle: "default",
  },
};

// iPhone-first: fit content into the safe area (notch / home indicator) and
// keep the browser chrome on-brand with the vibrant gold accent #E3AC2B.
export const viewport: Viewport = {
  themeColor: "#E3AC2B",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// Self-hosted variable fonts (files committed in app/fonts — no external
// requests at build or runtime). Use weights 400+ only; no light weights
// per design guardrails. SIL OFL licences alongside the files.
const sora = localFont({
  src: "./fonts/sora-latin-wght-normal.woff2",
  variable: "--font-sora",
  display: "swap",
  weight: "100 800",
});

const dmSans = localFont({
  src: "./fonts/dm-sans-latin-wght-normal.woff2",
  variable: "--font-dm-sans",
  display: "swap",
  weight: "100 1000",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU">
      <body className={`${sora.variable} ${dmSans.variable} font-sans antialiased`}>
        <TestModeBanner />
        {children}
        <CookieNotice />
        <Toaster />
      </body>
    </html>
  );
}
