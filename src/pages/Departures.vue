<template>
  <div :class="$style.container">
    <div :class="$style.tripsContainer">
      <h1>Trips</h1>
      <div v-for="trip in trips">
        <TripBoard :trip="trip" />
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
import { computed, type ComputedRef } from "vue";
import DepartureBoardVue from "../components/DepartureBoard.vue";
import TripBoard from "../components/TripBoard.vue";

const state = useDeparturesStore();

state.init();

const boards = computed(() => state.departures);
const trips: ComputedRef<Trip[]> = computed(() => state.trips);
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
.departuresContainer {
  width: 50%;
  padding-left: 0.25em;
}

h1 {
  margin-top: 0.5em;
  margin-bottom: 0.25em;
}
</style>
