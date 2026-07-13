/*
  Sample content for pre-launch.

  IMPORTANT — this is placeholder content for layout and review only.
  Every testimonial and therapist here is illustrative and must be replaced
  with real, consented content before launch. No prices are set (a business
  decision gate) and nothing here is a legal, medical or compliance claim.
  The `SAMPLE_CONTENT` flag is rendered in the UI so it is never mistaken
  for live data.
*/

export const SAMPLE_CONTENT = true;

export type Service = {
  slug: string;
  name: string;
  blurb: string;
  duration: string;
};

export const SERVICES: Service[] = [
  {
    slug: "relaxation",
    name: "Relaxation massage",
    blurb: "Gentle, flowing massage to calm the nervous system and unwind.",
    duration: "60 / 90 min",
  },
  {
    slug: "deep-tissue",
    name: "Deep tissue massage",
    blurb: "Firmer, focused pressure for deeper muscle tension and knots.",
    duration: "60 / 90 min",
  },
  {
    slug: "pregnancy",
    name: "Pregnancy massage",
    blurb: "Adapted for each trimester, with suitably experienced therapists.",
    duration: "60 min",
  },
  {
    slug: "couples",
    name: "Couples massage",
    blurb: "Two therapists, side by side, in the comfort of your own space.",
    duration: "60 / 90 min",
  },
  {
    slug: "hotel",
    name: "Hotel massage",
    blurb: "In-room massage for hotel guests staying in Adelaide.",
    duration: "60 / 90 min",
  },
  {
    slug: "corporate",
    name: "Corporate chair massage",
    blurb: "Seated, fully-clothed massage for workplaces and events.",
    duration: "By arrangement",
  },
];

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  suburb: string;
};

// Illustrative only — replace with real, consented reviews before launch.
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Booking took two minutes and my therapist arrived right on time with everything set up. I didn't have to lift a finger.",
    name: "Sample review",
    suburb: "Norwood, SA",
  },
  {
    id: "t2",
    quote:
      "Being able to say exactly where to park and which door to use made it completely stress-free.",
    name: "Sample review",
    suburb: "Prospect, SA",
  },
  {
    id: "t3",
    quote:
      "I loved being able to read the therapist's profile before confirming. It felt safe and professional.",
    name: "Sample review",
    suburb: "Glenelg, SA",
  },
  {
    id: "t4",
    quote:
      "A proper deep-tissue massage in my own lounge room after a long week — I've already rebooked.",
    name: "Sample review",
    suburb: "Unley, SA",
  },
];

export type TherapistSample = {
  id: string;
  firstName: string;
  headline: string;
  focus: string[];
  experience: string;
  rating: number;
  reviews: number;
};

// Illustrative only — no surnames, phone numbers or home suburbs are ever
// shown publicly (matches the database privacy model). Replace before launch.
export const THERAPISTS_SAMPLE: TherapistSample[] = [
  {
    id: "th1",
    firstName: "Sample therapist",
    headline: "Relaxation & remedial",
    focus: ["Relaxation", "Deep tissue"],
    experience: "Vetted · qualified",
    rating: 4.9,
    reviews: 0,
  },
  {
    id: "th2",
    firstName: "Sample therapist",
    headline: "Pregnancy & relaxation",
    focus: ["Pregnancy", "Relaxation"],
    experience: "Vetted · qualified",
    rating: 5.0,
    reviews: 0,
  },
  {
    id: "th3",
    firstName: "Sample therapist",
    headline: "Deep tissue & sports",
    focus: ["Deep tissue", "Sports"],
    experience: "Vetted · qualified",
    rating: 4.8,
    reviews: 0,
  },
];
