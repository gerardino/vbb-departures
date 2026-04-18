import { defineStore } from "pinia";
import { getDeparturesFromStation, getJourney } from "../services/bvg-api";
import { parseDeparturesResponseToDepartureBoard, parseJourneysResponseToJourneys } from "../helpers";
import * as DEPARTURES_CONFIG from "../assets/sample-config.json";


export interface Product {
  productName?: string; // Transport type, S, U, RE, Tram, ICE, Bus
  name?: string;
}

export type Connection = Product & {
  direction: string;
  platform?: string | undefined | null;
  when: string;
  delay: number;
}

export const TransportModes = {
  sbahn: "suburban",
  ubahn: "subway",
  tram: "tram",
  bus: "bus",
  ferry: "ferry",
  express: "express",
  regional: "regional",
};

export type TransportModeTypes = (typeof TransportModes)[keyof typeof TransportModes];

export interface DepartureQuery {
  name: string;
  station: string;
  destination?: string;
  transportMode?: Record<TransportModeTypes, boolean>;
  platforms?: string[];
  duration?: number;
}

export interface DepartureBoard {
  trips: Connection[];
  lastUpdated: Date;
  isLoading: boolean;
  isErrored: boolean;
}

export interface Departure {
  query: DepartureQuery;
  board?: DepartureBoard;
  isLoading: boolean;
}

export type TripLeg = Product & {
  from: string;
  to: string;
  arrival: Date;
  departure: Date;
  arrivalDelay: number;
  departureDelay: number;
  walk: boolean;
  warnings: string[];
}

export interface Journey {
    from: string;
    to: string;
    legs: TripLeg[];
    lastUpdated: Date;
    token: string;
}

export interface JourneyQuery {
  from: string;
  to: string;
  name: string;
}

export interface Trip {
  name: string;
  trips: Journey[];
  query: JourneyQuery;
  isLoading: boolean;
}

export interface DepartureState {
  departures: Departure[];
  trips: Trip[];
  isLoading: boolean;
}

export const useDeparturesStore = defineStore("departures", {
  state: (): DepartureState => {
    return {
      departures: [],
      trips: [],
      isLoading: false,
    };
  },
  actions: {
    async init() {
      this.departures = await Promise.all(
        DEPARTURES_CONFIG.departures.map<Promise<Departure>>(async (query) => ({
          query,
          board: parseDeparturesResponseToDepartureBoard(query, await getDeparturesFromStation(query)),
          isLoading: false,
        })),
      );

      this.trips = await Promise.all(DEPARTURES_CONFIG.trips.map(async (query) => ({
        name: query.name,
        query,
        trips: parseJourneysResponseToJourneys(await getJourney(query)),
        isLoading: false
      })))
    },
    async refreshBoards() {
      await this.departures.forEach(async (board) => {
        board.board = await parseDeparturesResponseToDepartureBoard(
          board.query,
          await getDeparturesFromStation(board.query),
        );
      });
    },
  },
});
