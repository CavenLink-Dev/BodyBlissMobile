import type { Metadata } from "next";

export const metadata: Metadata = { title: "About — Body Bliss Mobile Massage" };

/*
  About shell — nine-years message is approved for hero + About only.
  Full About copy is owner-approved content (design doc §8 reference);
  awaiting the approved wording before expanding this page.
*/

export default function AboutPage() {
  return (
    <main className="px-page-inline py-page-block">
      <div className="mx-auto flex max-w-content flex-col gap-component">
        <h1 className="font-heading text-display text-bb-text-display">
          About Body Bliss
        </h1>
        <p className="max-w-prose text-description text-bb-text-description">
          Body Bliss Mobile Massage brings the care of Body Bliss Massage &amp;
          Day Spa — nine years of Adelaide massage and wellness experience —
          to your home, hotel or workplace.
        </p>
      </div>
    </main>
  );
}
