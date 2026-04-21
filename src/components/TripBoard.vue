<template>
  <div :class="$style.tripBoardContainer">
    <h2>{{ trip.name }}</h2>
    <h3>{{ trip.trips[0].from }} → {{ trip.trips[trip.trips.length - 1].to }}</h3>

    <div :class="$style.journeysContainer">
      <div v-for="journey in trip.trips" :class="$style.journey">
        <Journey :journey="journey"></Journey>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { type Trip } from '../store/Departures';
import Journey from './Journey.vue';

defineProps<{
  trip: Trip;
}>();

</script>

<style module>
.tripBoardContainer {
  height: 89%;
}

.tripBoardContainer {
  overflow: hidden;

  display: flex;
  flex-direction: column;
  margin-bottom: 0.5em;
  width: 100%;

  & h2 {
    background: linear-gradient(90deg, blue 0%, darkblue 100%);
    border-width: 0;
    border-top-right-radius: 0.6em;
    padding: 0.2em;
    margin: 0;
    font-size: larger;
  }

  & h3 {
    background: linear-gradient(90deg, blue 0%, darkblue 100%);
    border-width: 0;
    padding: 0.2em;
    margin: 0;
    font-size: smaller;
    line-height: 1em;
    font-weight: 400;
    padding-left: 1em;
  }
}

.tripBoardContainer .journeysContainer {
  overflow-x: hidden;
  overflow-y: scroll;
}

.journeysContainer {
  border-image: linear-gradient(90deg, blue 0%, darkblue 100%) 1;
  border-style: solid;
  border-width: thin;
  border-top-width: 0;
  max-height: 88%;
  width: 99%;
}

.journey {
  margin-bottom: 0.25em;
  background: linear-gradient(90deg, black 0%, #111 15%, #222 50%, #111 85%, black 100%);
  border: thin solid blue;
  padding: 0;
  margin: 0;
  overflow: clip;
}
</style>