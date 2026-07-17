/*
  Customer reviews — FICTIONAL demonstration content.

  These sample reviews exist so the prototype can show how verified
  customer feedback will look once the service is live. They are invented,
  internally consistent with the sample suburbs, services and therapists
  elsewhere on the site, and always labelled as demonstration content in
  the UI.
*/

export type Testimonial = {
  id: string;
  quote: string;
  name: string; // First name + initial
  suburb: string;
  service: string;
  rating: number;
  date: string; // e.g. "June 2026"
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Booked a 90-minute relaxation massage after a brutal work week. The therapist arrived right on time, set everything up in ten minutes, and I honestly haven't felt that rested in months.",
    name: "Sarah L.",
    suburb: "Norwood",
    service: "Relaxation Massage",
    rating: 5,
    date: "June 2026",
  },
  {
    id: "t2",
    quote:
      "Deep tissue was exactly what my shoulders needed. Firm without being brutal, and he checked in on pressure the whole way through. Rebooked before he'd even packed the table down.",
    name: "James K.",
    suburb: "Prospect",
    service: "Deep Tissue Massage",
    rating: 5,
    date: "June 2026",
  },
  {
    id: "t3",
    quote:
      "At 31 weeks pregnant, getting to a clinic was the last thing I wanted. Having a pregnancy-experienced therapist come to me — with all the cushions and side-lying setup — was a game changer.",
    name: "Emily R.",
    suburb: "Glenelg",
    service: "Pregnancy Massage",
    rating: 5,
    date: "May 2026",
  },
  {
    id: "t4",
    quote:
      "Surprised my wife with a couples massage for our anniversary. Two therapists, two tables, side by side in our lounge room. Better than any day spa because afterwards we were already home.",
    name: "Michael T.",
    suburb: "Burnside",
    service: "Couples Massage",
    rating: 5,
    date: "May 2026",
  },
  {
    id: "t5",
    quote:
      "Booked back-to-back massages for me and my mum at my place. One therapist, two happy customers, zero driving anywhere. Such an easy way to treat her.",
    name: "Priyanka S.",
    suburb: "Mawson Lakes",
    service: "Relaxation Massage",
    rating: 5,
    date: "April 2026",
  },
  {
    id: "t6",
    quote:
      "In town for a conference and booked an in-room massage after a long flight. Discreet, professional, and the hotel didn't bat an eyelid. Travel fatigue gone by morning.",
    name: "David W.",
    suburb: "Adelaide CBD",
    service: "Hotel Massage",
    rating: 5,
    date: "April 2026",
  },
  {
    id: "t7",
    quote:
      "The remedial session actually addressed my desk-job neck properly — she assessed first, explained what she found, and followed up with stretches. Rare to get that level of care at home.",
    name: "Anna M.",
    suburb: "Unley",
    service: "Remedial Massage",
    rating: 5,
    date: "March 2026",
  },
  {
    id: "t8",
    quote:
      "Bought Mum a gift card for her birthday. She picked her own time, the therapist came to her place in the Hills, and she's already asking for another one for Christmas.",
    name: "Chloe H.",
    suburb: "Stirling",
    service: "Relaxation Massage",
    rating: 5,
    date: "March 2026",
  },
];
