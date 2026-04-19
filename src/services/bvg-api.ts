import type { DepartureQuery, JourneyQuery } from "../store/Departures";

export interface Line {
  id: string;
  name: string;
  productName: string;
  product: string;
}

export interface Remarks {
  type: string; // hint, warning
  text: string;
  priority?: number;
}

export interface DeparturesResponse {
  departures: {
    tripId: string;
    when: string;
    plannedWhen: string;
    delay: number;
    platform?: string | null;
    direction: string;
    line: Line;
    remarks: Remarks[];
  }[];
}

export function buildDeparturesFromStationParameters(query: DepartureQuery): string {
  const transportFilter = Object.keys(query.transportMode || {}).reduce(
    (fullFilter: Record<string, string>, option) => {
      fullFilter[option] = query.transportMode![option].toString();
      return fullFilter;
    },
    {},
  );

  const when = new Date();
  if (query.delay) {
    when.setMinutes(when.getMinutes() + query.delay);
  }

  return new URLSearchParams({
    when: when.toISOString(),
    ...transportFilter,
    ...(query.destination ? { destination: query.destination } : {}),
    ...(query.duration ? { duration: query.duration.toString() } : {}),
  }).toString();
}

export async function getDeparturesFromStation(query: DepartureQuery): Promise<DeparturesResponse> {
  const url = `https://v6.bvg.transport.rest/stops/${query.station}/departures?${buildDeparturesFromStationParameters(query)}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return (await response.json()) as DeparturesResponse;
}

export interface JourneyStop {
  type: string;
  id: string;
  name: string;
}

export interface JourneyResponse {
  journeys: {
    type: string;
    legs: {
      origin: JourneyStop;
      destination: JourneyStop;
      departure: string; // Date
      departureDelay: number;
      arrival: string; // Date
      arrivalDelay: number;
      reachable: boolean;
      direction: String;
      arrivalPlatform: string;
      line?: Line;
      remarks: Remarks[];
      walking?: boolean;
    }[];
    refreshToken: string;
  }[];
}

export function buildJourneyParameteres(query: JourneyQuery): string {
  const departure = new Date();
  if (query.delay) {
    departure.setMinutes(departure.getMinutes() + query.delay);
  }

  return new URLSearchParams({
    from: query.from,
    to: query.to,
    results: "6",
    departure: departure.toISOString()
  }).toString();
}

export async function getJourney(query: JourneyQuery): Promise<JourneyResponse> {
  const url = `https://v6.bvg.transport.rest/journeys?${buildJourneyParameteres(query)}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return (await response.json()) as JourneyResponse;
}
