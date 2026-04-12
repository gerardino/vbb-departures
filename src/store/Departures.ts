import { defineStore } from "pinia";
import { getDeparturesFromStation } from "../services/bvg-api";
import { parseDeparturesResponseToDepartureBoard } from "../helpers";
import * as DEPARTURES_CONFIG from "../assets/sample-config.json";

export interface Trip {
  name: string;
  direction: string;
  platform?: string | undefined | null;
  productName: string; // Transport type, S, U, RE, Tram, ICE, Bus
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

export interface DepartureBoardQuery {
  name: string;
  station: string;
  destination?: string;
  transportMode?: Record<TransportModeTypes, boolean>;
  platforms?: string[];
  duration?: number;
}

export interface DepartureBoard {
  trips: Trip[];
  lastUpdated: Date;
  isLoading: boolean;
  isErrored: boolean;
}

export interface DepartureStateBoard {
  query: DepartureBoardQuery;
  board?: DepartureBoard;
}

export interface DepartureState {
  boards: DepartureStateBoard[];
  isLoading: boolean;
}

export const useDeparturesStore = defineStore("departures", {
  state: (): DepartureState => {
    return {
      boards: [],
      isLoading: false,
    };
  },
  actions: {
    async init() {
      this.boards = await Promise.all(
        DEPARTURES_CONFIG.departures.map<Promise<DepartureStateBoard>>(async (query) => ({
          query,
          board: parseDeparturesResponseToDepartureBoard(query, await getDeparturesFromStation(query)),
        })),
      );
    },
    async refreshBoards() {
      await this.boards.forEach(async (board) => {
        board.board = await parseDeparturesResponseToDepartureBoard(
          board.query,
          await getDeparturesFromStation(board.query),
        );
      });
    },
  },
});
