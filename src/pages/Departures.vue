<template>
  <div :class="$style.container">
    <div :class="$style.tripsContainer">
      <div :class="$style.tripTab">
        <div :class="$style.selectorContainer">
          <div :class="{ [$style.tripSelector]: true, [$style.selectedTrip]: selectedJourney === 0 }">
            <input name="selectedJourney" type="radio" v-model="selectedJourney" :value="0" :id="`trip-0`"><label
              :for="`trip-0`">⏲</label>
          </div>
          <div v-for="(trip, index) in trips"
            :class="{ [$style.tripSelector]: true, [$style.selectedTrip]: index + 1 === selectedJourney }">
            <input name="selectedJourney" type="radio" v-model="selectedJourney" :value="index + 1"
              :id="`trip-${index + 1}`"><label :for="`trip-${index + 1}`">{{ trip.icon
              }}</label>
          </div>
        </div>
        <div :class="$style.tripContainer">
          <div v-if="selectedJourney === 0" :class="[$style.departuresBoardContainer]">
            <DepartureBoardVue v-for="board in boards" :board="board.board!" :name="board.query.name" :class="[$style.departureBoard]" />
          </div>
          <TripBoard v-else :trip="trips[selectedJourney - 1]" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDeparturesStore, type Trip } from "../store/Departures";
import { computed, onUnmounted, ref, type ComputedRef } from "vue";
import DepartureBoardVue from "../components/DepartureBoard.vue";
import TripBoard from "../components/TripBoard.vue";

const state = useDeparturesStore();

state.init();

const boards = computed(() => state.departures);
const trips: ComputedRef<Trip[]> = computed(() => state.trips);

const selectedJourney = ref<number>(0);

const interval = ref();

onUnmounted(() => {
  clearInterval(interval.value);
});

</script>

<style module>
.container,
.tripsContainer,
.tripTab,
.selectorContainer {
  height: 100%;
  overflow: hidden;
}

.tripContainer {
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  flex-wrap: wrap;
}

.container {
  display: flex;
  flex-direction: rows;
}

.tripsContainer {
  width: 100%;
  padding-right: 0.25em;
  width: 100%;
  overflow-y: scroll;
}

.tripTab {
  display: flex;
  flex-direction: row;
}

.selectorContainer {
  text-align: end;

  & .tripSelector {
    border: thin solid transparent;
    border-top-width: 0;
    border-right: 0;
    border-top-left-radius: 0.75em;
    border-bottom-left-radius: 0.75em;
    color: var(--text);
    filter: grayscale(100%);
    background: var(--layer-1);
    width: 5em;
    height: 5em;
    text-align: center;
    margin-bottom: 0.25em;
    ;

    & input {
      display: none;
    }

    & label {
      font-size: 3em;
      line-height: 1.5em;

    }
  }

  & .selectedTrip {
    background: var(--layer-2);
    border-color: var(--layer-1);
    color: var(--text-h);
    filter: none;
  }
}

.departuresContainer {
  width: 100%;
  padding-left: 0.25em;
}

.departuresBoardContainer {
  width: 100%;
  height: 100%;
  align-content: baseline;
  justify-content: baseline;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: var(--layer-2);
}

.departureBoard {
  box-shadow: 10px 10px 25px #222;
  border: 0;
  flex-grow: 1;
  max-width: 49.5%;
  margin: 0.25em;
}

h1 {
  margin-top: 0.5em;
  margin-bottom: 0.25em;
}
</style>
