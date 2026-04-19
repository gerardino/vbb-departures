<template>
  <div :class="$style.container">
    <div :class="$style.tripsContainer">
      <h1>Trips</h1>
      <div :class="$style.tripTab">
        <div :class="$style.selectorContainer">
          <div v-for="(trip, index) in trips"
            :class="{ [$style.tripSelector]: true, [$style.selectedTrip]: index === selectedJourney }">
            <input name="selectedJourney" type="radio" v-model="selectedJourney" :value="index"
              :id="`trip-${index}`"><label :for="`trip-${index}`">{{ trip.icon
              }}</label>
          </div>
        </div>
        <TripBoard :trip="trips[selectedJourney]" />
      </div>
    </div>
    <div :class="$style.departuresContainer">
      <h1>Departures</h1>
      <div :class="[$style.departureBoardContainer]">
        <DepartureBoardVue v-for="board in boards" :board="board.board!" :name="board.query.name" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDeparturesStore, type Trip } from "../store/Departures";
import { computed, ref, type ComputedRef } from "vue";
import DepartureBoardVue from "../components/DepartureBoard.vue";
import TripBoard from "../components/TripBoard.vue";

const state = useDeparturesStore();

state.init();

const boards = computed(() => state.departures);
const trips: ComputedRef<Trip[]> = computed(() => state.trips);

const selectedJourney = ref<number>(0);
</script>

<style module>
.container {
  display: flex;
  flex-direction: rows;
}

.tripsContainer {
  width: 50%;
  padding-right: 0.25em;
}

.tripTab {
  display: flex;
  flex-direction: row;
}

.selectorContainer {
  text-align: end;

  & .tripSelector {
    border: thin solid var(--border);
    border-right: 0;
    background-color: #222;
    width: 5em;
    height: 5em;
    text-align: center;
    border-top-left-radius: 15%;
    border-bottom-left-radius: 15%;
    filter: grayscale(100%);

    & input {
      display: none;
    }

    & label {
      font-size: 3em;
      line-height: 1.5em;

    }
  }

  & .selectedTrip {
    background: linear-gradient(135deg, #777 0%, #444 33%, #222 75%);
    border-left-color: black;
    filter: none;
  }
}

.tripContainer {
  width: 100%;
}

.departuresContainer {
  width: 50%;
  padding-left: 0.25em;
}

h1 {
  margin-top: 0.5em;
  margin-bottom: 0.25em;
}
</style>
