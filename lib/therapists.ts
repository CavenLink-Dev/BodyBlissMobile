/*
  Therapist profiles — FICTIONAL demonstration data.

  Every therapist here is an invented sample profile so the prototype can
  show how discovery, filtering and selection will work. None of these are
  real people, and no real qualifications or credentials are claimed. The
  UI labels this content as sample/demonstration data.
*/

export type TherapistGender = "female" | "male";
export type PressureStyle = "light" | "medium" | "firm";

export type Therapist = {
  id: string;
  /** First name only, as shown to customers. */
  name: string;
  gender: TherapistGender;
  /** Service codes from lib/catalogue this therapist offers. */
  specialties: string[];
  yearsExperience: number;
  languages: string[];
  rating: number;
  reviewCount: number;
  completedBookings: number;
  pressure: PressureStyle[];
  /** Area zones served (see lib/service-areas). */
  areas: ("core" | "extended" | "hills")[];
  /** Days of week available, Mon–Sun. */
  availability: string[];
  bio: string;
  shortBio: string;
};

export const THERAPISTS: Therapist[] = [
  {
    id: "mia",
    name: "Mia",
    gender: "female",
    specialties: ["relaxation", "pregnancy", "couples", "hotel"],
    yearsExperience: 8,
    languages: ["English", "Mandarin"],
    rating: 4.9,
    reviewCount: 214,
    completedBookings: 1132,
    pressure: ["light", "medium"],
    areas: ["core", "extended"],
    availability: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    shortBio:
      "Calm, intuitive relaxation and pregnancy massage with a gentle, unhurried style.",
    bio: "Mia has spent eight years helping Adelaide clients switch off, with a particular love of prenatal work. Her treatments are slow, rhythmic and deeply calming, clients often say the hour disappears. She brings a warm, quiet presence into your home and always checks in on pressure before she begins.",
  },
  {
    id: "daniel",
    name: "Daniel",
    gender: "male",
    specialties: ["deep_tissue", "remedial"],
    yearsExperience: 10,
    languages: ["English"],
    rating: 4.8,
    reviewCount: 189,
    completedBookings: 968,
    pressure: ["medium", "firm"],
    areas: ["core", "extended", "hills"],
    availability: ["Mon", "Tue", "Thu", "Fri", "Sat", "Sun"],
    shortBio:
      "Strong, methodical deep tissue work for stubborn tension and active bodies.",
    bio: "A decade of hands-on experience has given Daniel a reputation for finding the knot you didn't know you had. He works methodically, always within your comfort, and finishes every session with simple stretches you can do at home. Popular with runners, cyclists and desk workers alike.",
  },
  {
    id: "priya",
    name: "Priya",
    gender: "female",
    specialties: ["relaxation", "remedial", "pregnancy"],
    yearsExperience: 6,
    languages: ["English", "Hindi"],
    rating: 4.9,
    reviewCount: 162,
    completedBookings: 704,
    pressure: ["light", "medium", "firm"],
    areas: ["core"],
    availability: ["Tue", "Wed", "Thu", "Fri", "Sat"],
    shortBio:
      "Versatile all-rounder who tailors every session to how you feel that day.",
    bio: "Priya believes no two massages should be the same. She starts every appointment with a short chat about how your body is feeling, then blends techniques to suit, gentle and flowing one visit, targeted and firm the next. Clients love her adaptability and easy warmth.",
  },
  {
    id: "tom",
    name: "Tom",
    gender: "male",
    specialties: ["deep_tissue", "hotel"],
    yearsExperience: 5,
    languages: ["English"],
    rating: 4.7,
    reviewCount: 121,
    completedBookings: 547,
    pressure: ["medium", "firm"],
    areas: ["core", "extended"],
    availability: ["Mon", "Wed", "Fri", "Sat", "Sun"],
    shortBio:
      "Friendly and efficient, with focused deep tissue work that gets results.",
    bio: "Tom's relaxed, friendly manner puts first-timers instantly at ease. His deep tissue work is focused and effective, and he's a great pick if you like a firmer touch without the small talk.",
  },
  {
    id: "hana",
    name: "Hana",
    gender: "female",
    specialties: ["relaxation", "couples", "hotel"],
    yearsExperience: 7,
    languages: ["English", "Japanese"],
    rating: 4.9,
    reviewCount: 203,
    completedBookings: 891,
    pressure: ["light", "medium"],
    areas: ["core", "extended"],
    availability: ["Mon", "Tue", "Wed", "Sat", "Sun"],
    shortBio:
      "Serene, detail-focused relaxation massage, a regular pick for couples bookings.",
    bio: "Hana's sessions are known for their attention to detail: warmed oil, carefully arranged linens, and pacing that never feels rushed. She frequently pairs with another therapist for couples bookings, and hotel guests appreciate her discreet, polished service.",
  },
  {
    id: "marco",
    name: "Marco",
    gender: "male",
    specialties: ["deep_tissue", "remedial", "couples"],
    yearsExperience: 9,
    languages: ["English", "Italian"],
    rating: 4.8,
    reviewCount: 175,
    completedBookings: 826,
    pressure: ["medium", "firm"],
    areas: ["core", "extended", "hills"],
    availability: ["Tue", "Wed", "Thu", "Fri", "Sun"],
    shortBio:
      "Experienced, adaptable therapist happy anywhere from the CBD to the Hills.",
    bio: "Marco covers more ground than any of our sample team, city apartments, suburban homes and Hills properties alike. Nine years of practice show in his confident, adaptable technique, and he's equally at home doing firm remedial-style work or a slower couples session.",
  },
];

export function getTherapist(id: string): Therapist | undefined {
  return THERAPISTS.find((t) => t.id === id);
}

export function therapistsForService(serviceCode: string): Therapist[] {
  return THERAPISTS.filter((t) => t.specialties.includes(serviceCode));
}

export const APPROVAL_STEPS = [
  {
    title: "Application review",
    body: "Every therapist starts with a written application covering their training, experience and the styles they offer.",
  },
  {
    title: "Identity confirmation",
    body: "We confirm each applicant's identity before anything else proceeds.",
  },
  {
    title: "Qualification review",
    body: "Massage qualifications and training records are reviewed against the services the therapist wants to offer.",
  },
  {
    title: "Reference checks",
    body: "We speak to previous employers or clinics about reliability and professionalism.",
  },
  {
    title: "Insurance review",
    body: "Where applicable, we sight current professional insurance before approval.",
  },
  {
    title: "Interview",
    body: "A face-to-face interview covers technique, communication and how they handle real situations in clients' homes.",
  },
  {
    title: "Code-of-conduct agreement",
    body: "Every therapist agrees in writing to our professional conduct standards before their first booking.",
  },
  {
    title: "Ongoing feedback review",
    body: "Customer feedback is reviewed continuously, consistently poor feedback means a therapist is stood down.",
  },
] as const;
