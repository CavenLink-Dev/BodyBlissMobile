"use client";

import * as React from "react";

import {
  IllustrationChoose,
  IllustrationLocation,
  IllustrationTherapist,
  IllustrationRelax,
} from "@/components/step-illustrations";

/*
  How It Works cards. Each card is tappable: one tap swaps the description
  for an even shorter plain version, another tap brings the full text back.
  Works by touch, mouse and keyboard, and the tap also triggers the
  illustration's little lift.
*/

const STEPS = [
  {
    illustration: IllustrationChoose,
    title: "Choose your treatment",
    body: "Pick the massage, length and time that suits you.",
    short: "Pick a massage and a time.",
  },
  {
    illustration: IllustrationLocation,
    title: "Tell us where",
    body: "Add your address, parking and access notes so your therapist arrives ready.",
    short: "Type your address.",
  },
  {
    illustration: IllustrationTherapist,
    title: "Pick your therapist",
    body: "Choose a therapist yourself, or let Body Bliss match you with the best available.",
    short: "Choose someone, or let us match you.",
  },
  {
    illustration: IllustrationRelax,
    title: "Relax at your place",
    body: "Your therapist brings the table, fresh linen and everything else needed.",
    short: "We bring everything. You relax.",
  },
];

export function HowItWorksCards() {
  const [simple, setSimple] = React.useState<boolean[]>(() =>
    STEPS.map(() => false),
  );

  function toggle(i: number) {
    setSimple((s) => s.map((v, idx) => (idx === i ? !v : v)));
  }

  return (
    <ol className="grid grid-cols-1 gap-card-gap tablet:grid-cols-2 desktop:grid-cols-4">
      {STEPS.map((step, i) => (
        <li key={step.title} className="h-full">
          <button
            type="button"
            onClick={() => toggle(i)}
            aria-pressed={simple[i]}
            aria-label={`Step ${i + 1}: ${step.title}. Tap to ${simple[i] ? "show the full description" : "show a shorter description"}.`}
            className="group flex h-full w-full flex-col gap-component rounded border border-border bg-card p-card-padding text-left shadow-rest transition-shadow duration-fade hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <step.illustration />
            <p className="flex items-center gap-compact font-heading text-subtitle font-semibold text-bb-text-subtitle">
              <span
                aria-hidden="true"
                className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary text-description font-bold text-secondary-foreground"
              >
                {i + 1}
              </span>
              <span>{step.title}</span>
            </p>
            <p className="text-description text-bb-text-description">
              {simple[i] ? step.short : step.body}
            </p>
            <p className="mt-auto text-caption text-bb-text-caption">
              {simple[i] ? "Tap for full version" : "Tap for the short version"}
            </p>
          </button>
        </li>
      ))}
    </ol>
  );
}
