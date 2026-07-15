/*
  Customer reviews — adapted from real Google reviews of Body Bliss Massage
  & Day Spa (the bricks-and-mortar business behind this mobile service).
  Reviewer and therapist names removed; wording lightly edited for length.
  The UI attributes them to the day spa, not to the mobile service.
*/

export type Testimonial = {
  id: string;
  quote: string;
  attribution: string;
  rating: 5;
};

const SOURCE = "Google review · Body Bliss Massage & Day Spa";

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote:
      "One of the best massages I've had yet. Feeling so refreshed — my body feels like it's been given another life. So lovely and professional.",
    attribution: SOURCE,
    rating: 5,
  },
  {
    id: "t2",
    quote:
      "I was looking for a proper pregnancy massage and this is exactly what I needed. Very relaxing — my first visit and I'll surely be back.",
    attribution: SOURCE,
    rating: 5,
  },
  {
    id: "t3",
    quote:
      "Booked a 60-minute relaxation massage and it was so relaxing I almost fell asleep.",
    attribution: SOURCE,
    rating: 5,
  },
  {
    id: "t4",
    quote:
      "I've had massage here twice and both were a really great experience — one of the best I've ever had, and I've had a lot because of my back. Great price for the quality.",
    attribution: SOURCE,
    rating: 5,
  },
  {
    id: "t5",
    quote:
      "Excellent customer service. I was running late and they still made sure everything was looked after. Lovely staff and a calm, refreshing atmosphere — 5/5, will be back.",
    attribution: SOURCE,
    rating: 5,
  },
  {
    id: "t6",
    quote:
      "They really thought of all the details — the aromas, the textures in the towels and linen. The massage was very thorough and left me feeling brand new.",
    attribution: SOURCE,
    rating: 5,
  },
  {
    id: "t7",
    quote:
      "Absolutely loved my massage — amazing therapist and great value for money. Very relaxed after my 90-minute treatment, and I've already started telling friends to book.",
    attribution: SOURCE,
    rating: 5,
  },
  {
    id: "t8",
    quote:
      "Gift vouchers are my go-to gift for family. Can't go wrong.",
    attribution: SOURCE,
    rating: 5,
  },
];
