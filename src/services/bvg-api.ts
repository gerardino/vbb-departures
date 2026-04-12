import type { DepartureBoardQuery } from "../store/Departures";

export interface DeparturesResponse {
  departures: {
    tripId: string;
    when: string;
    plannedWhen: string;
    delay: number;
    platform?: string | null;
    direction: string;
    line: {
      id: string;
      name: string;
      productName: string;
      product: string;
    };
  }[];
}

export function buildDeparturesFromStationParameters(query: DepartureBoardQuery): string {
  const transportFilter = Object.keys(query.transportMode || {}).reduce(
    (fullFilter: Record<string, string>, option) => {
      fullFilter[option] = query.transportMode![option].toString();
      return fullFilter;
    },
    {},
  );

  return new URLSearchParams({
    ...transportFilter,
    ...(query.destination ? { destination: query.destination } : {}),
    ...(query.duration ? { duration: query.duration.toString() } : {}),
  }).toString();
}

export async function getDeparturesFromStation(query: DepartureBoardQuery): Promise<DeparturesResponse> {
  const url = `https://v6.bvg.transport.rest/stops/${query.station}/departures?${buildDeparturesFromStationParameters(query)}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return await response.json() as DeparturesResponse;
}
