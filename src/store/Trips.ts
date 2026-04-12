import { defineStore } from "pinia";

export interface Trip {
    source: string;
    destination: string;
    lastUpdated: Date;
}

export interface TripState {
    trips: Trip[];
}

export const useDeparturesStore = defineStore("departures", {});
