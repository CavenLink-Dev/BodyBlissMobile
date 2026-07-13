/*
  Clearly-labelled sample content for pre-launch layout only.

  These testimonials are illustrative placeholders and are shown with a visible
  "sample" label in the UI. Replace with real, consented reviews before launch.
  No fabricated therapist profiles, ratings or verification claims live here —
  therapist data comes only from approved records in the database.
*/

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  suburb: string;
};

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
      "I loved being able to read the details before confirming. It felt safe and professional.",
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
