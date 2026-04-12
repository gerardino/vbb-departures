import type { DeparturesResponse } from "./services/bvg-api";
import type { DepartureBoardQuery, DepartureBoard, Trip } from "./store/Departures";

export function pad(n: number): string {
  return n < 10 ? "0" + n : n.toString();
}

export function getTime(date: Date): string {
  return `${date.getHours()}:${pad(date.getMinutes())}`;
}

export function parseDeparturesResponseToDepartureBoard(
  query: DepartureBoardQuery,
  data: DeparturesResponse,
): DepartureBoard {
  const trips = data.departures?.reduce((partialTrips: Trip[], departure) => {
    if (!query.platforms || (departure.platform && query.platforms.includes(departure.platform))) {
      partialTrips.push({
        name: departure.line.name,
        direction: departure.direction,
        productName: departure.line.productName,
        platform: departure.platform,
        when: getTime(new Date(departure.when)),
        delay: departure.delay,
      });
    }

    return partialTrips;
  }, []);

  return { trips, lastUpdated: new Date(), isErrored: false, isLoading: false };
}
