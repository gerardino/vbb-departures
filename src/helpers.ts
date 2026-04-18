import type { DeparturesResponse, JourneyResponse } from "./services/bvg-api";
import type { DepartureQuery, DepartureBoard, Connection, Journey } from "./store/Departures";

export function pad(n: number): string {
  return n < 10 ? "0" + n : n.toString();
}

export function getTime(date: Date): string {
  return `${date.getHours()}:${pad(date.getMinutes())}`;
}

export function getTimeDifferenceInMinutes(date1: Date, date2: Date): string {
  const difference = (date2.getTime() - date1.getTime())/(60000);

  return `${difference}m`;
}

export function parseDeparturesResponseToDepartureBoard(
  query: DepartureQuery,
  data: DeparturesResponse,
): DepartureBoard {
  const trips = data.departures?.reduce((partialTrips: Connection[], departure) => {
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


export function parseJourneysResponseToJourneys(
  data: JourneyResponse,
): Journey[] {
  return data.journeys.map(j => ({
    from: j.legs[0].origin.name,
    to: j.legs[j.legs.length -1].destination.name,
    legs: j.legs.map(l => ({
      from: l.origin.name,
      to: l.destination.name,
      arrival: new Date(l.arrival),
      arrivalDelay: l.arrivalDelay,
      departure: new Date(l.departure),
      departureDelay: l.departureDelay,
      walk: !!l.walking,
      productName: l.line?.productName,
      name: l.line?.name,
      warnings: l.remarks?.filter(r => r.type === 'warning').map(r => r.text) || []
    })),
    lastUpdated: new Date(),
    token: j.refreshToken,
  }));
}