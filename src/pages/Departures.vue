<template>
  <div :class="$style.container">
    <div :class="$style.tripsContainer">
      <div :class="$style.tripTab">
        <div :class="$style.selectorContainer">
          <div :class="{ [$style.tripSelector]: true, [$style.selectedTrip]: selectedJourney === 0 }">
            <input name="selectedJourney" type="radio" v-model="selectedJourney" :value="0" :id="`trip-0`"><label
              :for="`trip-0`">🚃</label>
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
            <div :class="[$style.departureBoardContainer]" v-for="board in boards">
              <DepartureBoardVue :board="board.board!" :name="board.query.name" />
            </div>
          </div>
          <TripBoard v-else :trip="trips[selectedJourney - 1]" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDeparturesStore, type Trip } from "../store/Departures";
import { computed, onMounted, onUnmounted, ref, type ComputedRef } from "vue";
import DepartureBoardVue from "../components/DepartureBoard.vue";
import TripBoard from "../components/TripBoard.vue";

const state = useDeparturesStore();

state.init();

const boards = computed(() => state.departures);
const trips: ComputedRef<Trip[]> = computed(() => state.trips);

const selectedJourney = ref<number>(0);

const interval = ref();

onMounted(() => {
  interval.value = setInterval(() => {
    state.init();
  }, 5 * 60 * 1000);
});

onUnmounted(() => {
  clearInterval(interval.value);
});

</script>

<style module>
.container,
.tripsContainer,
.tripTab,
.selectorContainer,
.tripContainer {
  height: 100%;
  overflow: hidden;
}

.container {
  display: flex;
  flex-direction: rows;
}

.tripsContainer {
  width: 100%;
  padding-right: 0.25em;
}

.tripContainer {
  width: 100%;
}

.tripTab {
  display: flex;
  flex-direction: row;
}

.selectorContainer {
  text-align: end;

  & .tripSelector {
    border: thin solid transparent;
    border-right: 0;
    border-top-left-radius: 1em;
    border-bottom-left-radius: 1em;
    filter: grayscale(100%);
    background-color: #222;
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
    background: linear-gradient(135deg, #777 0%, #444 33%, #222 75%);
    border-left-color: black;
    filter: none;
  }
}

.departuresContainer {
  width: 100%;
  padding-left: 0.25em;
}

.departuresBoardContainer {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.departureBoardContainer {
  width: 49%;
  margin: 0.25em;
}

h1 {
  margin-top: 0.5em;
  margin-bottom: 0.25em;
}
</style>
