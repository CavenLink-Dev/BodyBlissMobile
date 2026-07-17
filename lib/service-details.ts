/*
  Editorial content for service detail pages, keyed by service code.
  Names, durations and prices always come from the live catalogue —
  this file only adds the explanatory copy a customer needs to choose:
  what's included, who it suits, how it may help, and anything to
  consider. Wellbeing claims are kept modest ("may help") — massage is
  not presented as a medical treatment anywhere on the site.
*/

export type ServiceDetail = {
  tagline: string;
  intro: string;
  includes: string[];
  mayHelp: string[];
  suitableFor: string[];
  considerations: string[];
};

const SHARED_INCLUDES = [
  "A vetted, professional massage therapist who comes to you",
  "Professional massage table, fresh linens, oils and music",
  "Set-up and pack-down — you don't lift a finger",
];

export const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  relaxation: {
    tagline: "Gentle, flowing strokes to switch your whole body off.",
    intro:
      "Our most popular massage. Long, rhythmic Swedish-style strokes with light to medium pressure, designed to calm the nervous system, ease everyday tension and leave you feeling deeply rested — without leaving home.",
    includes: [
      ...SHARED_INCLUDES,
      "Light to medium pressure, adjusted to your preference on the day",
      "A quiet word beforehand about any areas to focus on or avoid",
    ],
    mayHelp: [
      "Unwinding after a stressful week",
      "Easing general muscle tightness and fatigue",
      "Supporting better sleep and relaxation",
      "A first massage if you're unsure what to choose",
    ],
    suitableFor: [
      "Almost everyone — it's our gentlest option",
      "First-time massage customers",
      "Anyone who prefers lighter pressure",
    ],
    considerations: [
      "If you want firm, targeted work on stubborn knots, Deep Tissue may suit you better.",
      "Tell your therapist about any injuries, skin conditions or allergies before you start.",
    ],
  },
  remedial: {
    tagline: "Assessment-based treatment for specific problem areas.",
    intro:
      "A targeted session that starts with a short conversation and assessment of how your body is moving, then focuses treatment on the areas that need it — combining deeper techniques, stretching and aftercare suggestions you can use between visits.",
    includes: [
      ...SHARED_INCLUDES,
      "A short assessment and chat before hands-on treatment begins",
      "Targeted techniques on your nominated problem areas",
      "Simple aftercare and stretch suggestions",
    ],
    mayHelp: [
      "Specific, recurring areas of tension or discomfort",
      "Postural strain from desk work, driving or repetitive tasks",
      "General mobility and movement comfort",
      "Recovery support alongside advice from your health practitioner",
    ],
    suitableFor: [
      "People with a specific problem area they can point to",
      "Regulars who want a more structured, targeted session",
    ],
    considerations: [
      "Remedial massage supports wellbeing — it isn't a substitute for diagnosis or treatment by a health practitioner.",
      "If you're under treatment for an injury or medical condition, check with your practitioner first and mention it in your booking notes.",
      "Some tenderness for a day or two afterwards is normal.",
    ],
  },
  deep_tissue: {
    tagline: "Firm, focused pressure for stubborn tension and knots.",
    intro:
      "A slower, stronger massage that works into the deeper layers of muscle. Your therapist uses firm pressure, forearms and targeted techniques on the areas that need it most — ideal after heavy training, long hours at a desk, or persistent tightness.",
    includes: [
      ...SHARED_INCLUDES,
      "Firm, targeted pressure — always adjusted to your feedback",
      "Focus on the areas you nominate: back, shoulders, neck, legs",
    ],
    mayHelp: [
      "Persistent muscle tightness and knots",
      "Recovery after sport or physical work",
      "Postural tension from desk work or driving",
      "Restricted movement from tight muscles",
    ],
    suitableFor: [
      "People who like strong pressure and targeted work",
      "Active people and regular massage-goers",
    ],
    considerations: [
      "Some tenderness for a day or two afterwards is normal — drink water and take it easy.",
      "Not recommended immediately after acute injury. If you're under treatment for an injury or medical condition, check with your health practitioner first.",
      "You're always in control — ask your therapist to go lighter at any time.",
    ],
  },
  pregnancy: {
    tagline: "Comfort and relief, adapted safely for each trimester.",
    intro:
      "A nurturing massage designed for pregnancy, delivered by therapists experienced in prenatal work. Positioning, pressure and techniques are adapted to your stage of pregnancy so you can relax safely and comfortably.",
    includes: [
      ...SHARED_INCLUDES,
      "A therapist with suitable pregnancy massage experience",
      "Side-lying positioning with supportive cushioning",
      "Gentle, appropriate pressure — never on unsafe areas",
    ],
    mayHelp: [
      "Lower back, hip and pelvic discomfort",
      "Swollen, tired legs and feet",
      "Sleep quality and general comfort",
      "Stress and tension through pregnancy",
    ],
    suitableFor: [
      "Mums-to-be past the first trimester (12+ weeks)",
      "Anyone wanting a slower, gentler full-body treatment",
    ],
    considerations: [
      "We generally recommend waiting until after the first trimester. If your pregnancy is high-risk or you have any complications, please check with your midwife or doctor first.",
      "Let us know how far along you are in your booking notes so we match a suitably experienced therapist.",
    ],
  },
  couples: {
    tagline: "Two therapists, side by side, in your own space.",
    intro:
      "Share the experience. Two vetted therapists arrive together and set up side by side, so you and your partner, friend or family member are massaged at the same time. Each of you chooses your own style and pressure.",
    includes: [
      "Two vetted therapists arriving together",
      "Two professional tables, fresh linens, oils and music",
      "Individual preferences — different pressure or focus for each person",
      "Set-up and pack-down of everything",
    ],
    mayHelp: [
      "Anniversaries, birthdays and special occasions",
      "Relaxing together without organising two separate appointments",
      "Introducing someone to massage in comfortable company",
    ],
    suitableFor: [
      "Couples, friends, or parents and adult children",
      "Anyone who wants a shared wind-down at home or in a hotel",
    ],
    considerations: [
      "You'll need space for two massage tables — a lounge room or large bedroom usually works well.",
      "Both massages run simultaneously and finish together.",
    ],
  },
  hotel: {
    tagline: "In-room massage for hotel stays in Adelaide.",
    intro:
      "Travelling for work or staying in town? Your therapist comes straight to your hotel room with everything needed — perfect after a flight, a conference day, or as part of a weekend away.",
    includes: [
      ...SHARED_INCLUDES,
      "Discreet, professional service that respects hotel policies",
      "Your choice of relaxation or firmer pressure",
    ],
    mayHelp: [
      "Travel fatigue and jet lag",
      "Neck and shoulder tension from flights and meetings",
      "Making a stay feel like a proper break",
    ],
    suitableFor: [
      "Hotel and serviced-apartment guests across Adelaide",
      "Business travellers and weekend visitors",
    ],
    considerations: [
      "Add your hotel name and room number in the booking notes, and let reception know you're expecting a therapist.",
      "Most hotel rooms comfortably fit a massage table — a little floor space beside the bed is all we need.",
    ],
  },
  corporate: {
    tagline: "Seated, fully-clothed massage for workplaces and events.",
    intro:
      "Boost your team's day with professional chair massage. Therapists set up a purpose-built massage chair in your office or event space, and staff enjoy short, seated neck-shoulder-back treatments — no oils, no undressing, minimal disruption.",
    includes: [
      "A vetted therapist with a purpose-built massage chair",
      "Short seated treatments focused on neck, shoulders and back",
      "Fully clothed, no oils — straight back to work afterwards",
      "Flexible scheduling for teams and events",
    ],
    mayHelp: [
      "Team morale, wellbeing days and staff rewards",
      "Desk-related neck and shoulder tension",
      "Conferences, events and client days",
    ],
    suitableFor: [
      "Offices, workplaces and corporate events of any size",
      "Anyone short on time — sessions from 30 minutes",
    ],
    considerations: [
      "We just need a quiet corner roughly two metres square.",
      "For larger teams or recurring visits, mention numbers in your booking notes and we'll be in touch to plan.",
    ],
  },
};

/* Fallback so a new service added in the database still renders sensibly. */
export const DEFAULT_DETAIL: ServiceDetail = {
  tagline: "Professional mobile massage, delivered to you.",
  intro:
    "A professional massage delivered by a vetted Body Bliss therapist at your home, hotel or workplace, with everything provided.",
  includes: [...SHARED_INCLUDES],
  mayHelp: [
    "General relaxation and wellbeing",
    "Everyday muscle tension",
  ],
  suitableFor: ["Most people — ask us if you're unsure"],
  considerations: [
    "Tell your therapist about any injuries, conditions or allergies before you start.",
  ],
};

export function getServiceDetail(code: string): ServiceDetail {
  return SERVICE_DETAILS[code] ?? DEFAULT_DETAIL;
}

/* ---------- shared page extras: preparation, medical guidance, FAQs ---------- */

export const PREPARATION_STEPS = [
  "Choose a quiet room with space for the massage table — about the size of a single bed, plus room to walk around.",
  "Add parking and access notes to your booking so your therapist arrives ready.",
  "Secure curious pets in another room for the duration of the appointment.",
  "Wear whatever's comfortable — you'll be professionally draped throughout a table massage.",
  "Have a glass of water handy for afterwards, and give yourself a little quiet time if you can.",
];

export const SEEK_ADVICE = [
  "You're recovering from a recent injury, surgery or acute illness",
  "You have a heart condition, blood-clotting disorder or take blood thinners",
  "You have a skin condition or infection in the treatment area",
  "You're pregnant with any complications, or in your first trimester",
  "You're simply unsure whether massage is right for you at the moment",
];

type ServiceFaq = { q: string; a: string };

const SHARED_FAQS: ServiceFaq[] = [
  {
    q: "How much space do I need?",
    a: "Room for a massage table plus space for the therapist to move around it — roughly two metres by three. A lounge room or bedroom usually works well.",
  },
  {
    q: "When should I arrive… or rather, be ready?",
    a: "Your therapist arrives about 10 minutes before your booked time to set up. Being showered and in comfortable clothes is all the prep you need.",
  },
  {
    q: "Can I use a gift card for this service?",
    a: "Yes — enter the gift card code at checkout and any remaining balance stays on the card.",
  },
];

const SERVICE_FAQS: Record<string, ServiceFaq[]> = {
  relaxation: [
    {
      q: "I've never had a massage before — is this the one?",
      a: "It's the one we recommend for first-timers: gentle, flowing and easy to enjoy. Tell your therapist it's your first massage and they'll explain everything as they go.",
    },
  ],
  deep_tissue: [
    {
      q: "Will it hurt?",
      a: "Firm doesn't have to mean painful. Your therapist works within your comfort and checks in on pressure — you're always in control, and can ask them to go lighter at any time.",
    },
  ],
  remedial: [
    {
      q: "Do I need a referral?",
      a: "No referral is needed. If you're under treatment for an injury or condition, check with your health practitioner first and let us know in your booking notes.",
    },
  ],
  pregnancy: [
    {
      q: "How far along do I need to be?",
      a: "We book pregnancy massage from 12 weeks (after the first trimester). Add how far along you are in your booking notes so we match a suitably experienced therapist.",
    },
  ],
  couples: [
    {
      q: "Can we choose different massage styles?",
      a: "Yes — each of you chooses your own style and pressure. The two treatments run side by side and finish together.",
    },
  ],
  hotel: [
    {
      q: "Do I need to tell the hotel?",
      a: "A quick heads-up to reception that you're expecting a therapist keeps arrival smooth. Include your room number in the booking notes.",
    },
  ],
  corporate: [
    {
      q: "How is corporate massage booked?",
      a: "Through a tailored quote rather than the standard checkout — tell us your team size and timing via the corporate enquiry form and we'll come back with options.",
    },
  ],
};

export function getServiceFaqs(code: string): ServiceFaq[] {
  return [...(SERVICE_FAQS[code] ?? []), ...SHARED_FAQS];
}
