/*
  Service areas — static demonstration data for the suburb/postcode
  availability checker. No maps or address APIs; a plain lookup against
  sample Adelaide suburbs, grouped into zones:

  - core:     included in every price (no travel fee)
  - extended: available with a small additional travel fee
  - hills:    selected Adelaide Hills areas, larger travel fee
  Anything not listed → not currently available.
*/

export type AreaZone = "core" | "extended" | "hills";

export type ServiceArea = {
  suburb: string;
  postcode: string;
  zone: AreaZone;
};

export const TRAVEL_FEES_CENTS: Record<AreaZone, number> = {
  core: 0,
  extended: 1500,
  hills: 2500,
};

export const SERVICE_AREAS: ServiceArea[] = [
  // Core — Adelaide metro
  { suburb: "Adelaide", postcode: "5000", zone: "core" },
  { suburb: "North Adelaide", postcode: "5006", zone: "core" },
  { suburb: "Norwood", postcode: "5067", zone: "core" },
  { suburb: "Kent Town", postcode: "5067", zone: "core" },
  { suburb: "Unley", postcode: "5061", zone: "core" },
  { suburb: "Parkside", postcode: "5063", zone: "core" },
  { suburb: "Burnside", postcode: "5066", zone: "core" },
  { suburb: "Kensington", postcode: "5068", zone: "core" },
  { suburb: "Prospect", postcode: "5082", zone: "core" },
  { suburb: "Walkerville", postcode: "5081", zone: "core" },
  { suburb: "Glenelg", postcode: "5045", zone: "core" },
  { suburb: "Henley Beach", postcode: "5022", zone: "core" },
  { suburb: "West Beach", postcode: "5024", zone: "core" },
  { suburb: "Mile End", postcode: "5031", zone: "core" },
  { suburb: "Hindmarsh", postcode: "5007", zone: "core" },
  { suburb: "Goodwood", postcode: "5034", zone: "core" },
  { suburb: "Fullarton", postcode: "5063", zone: "core" },
  { suburb: "Magill", postcode: "5072", zone: "core" },
  // Extended — a little further out
  { suburb: "Marion", postcode: "5043", zone: "extended" },
  { suburb: "Brighton", postcode: "5048", zone: "extended" },
  { suburb: "Hallett Cove", postcode: "5158", zone: "extended" },
  { suburb: "Modbury", postcode: "5092", zone: "extended" },
  { suburb: "Golden Grove", postcode: "5125", zone: "extended" },
  { suburb: "Mawson Lakes", postcode: "5095", zone: "extended" },
  { suburb: "Semaphore", postcode: "5019", zone: "extended" },
  { suburb: "Port Adelaide", postcode: "5015", zone: "extended" },
  { suburb: "West Lakes", postcode: "5021", zone: "extended" },
  { suburb: "Glen Osmond", postcode: "5064", zone: "extended" },
  // Selected Adelaide Hills
  { suburb: "Stirling", postcode: "5152", zone: "hills" },
  { suburb: "Aldgate", postcode: "5154", zone: "hills" },
  { suburb: "Crafers", postcode: "5152", zone: "hills" },
  { suburb: "Bridgewater", postcode: "5155", zone: "hills" },
  { suburb: "Mount Barker", postcode: "5251", zone: "hills" },
];

export type AreaCheckResult =
  | { status: "available"; area: ServiceArea }
  | { status: "travel-fee"; area: ServiceArea; feeCents: number }
  | { status: "unavailable" };

/** Look up a suburb name or 4-digit postcode against the sample area list. */
export function checkArea(query: string): AreaCheckResult {
  const q = query.trim().toLowerCase();
  if (!q) return { status: "unavailable" };
  const match = SERVICE_AREAS.find(
    (a) => a.suburb.toLowerCase() === q || a.postcode === q,
  );
  if (!match) return { status: "unavailable" };
  if (match.zone === "core") return { status: "available", area: match };
  return {
    status: "travel-fee",
    area: match,
    feeCents: TRAVEL_FEES_CENTS[match.zone],
  };
}

/** Travel fee for a free-typed suburb/postcode used during booking. */
export function travelFeeForSuburb(suburbOrPostcode: string): number {
  const res = checkArea(suburbOrPostcode);
  return res.status === "travel-fee" ? res.feeCents : 0;
}

export const ZONE_LABELS: Record<AreaZone, string> = {
  core: "Included, no travel fee",
  extended: "Available, small travel fee",
  hills: "Adelaide Hills, travel fee applies",
};
