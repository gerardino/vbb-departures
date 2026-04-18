<template>
  <div :class="$style.departureBoardContainer">
    <h2>{{ name }}</h2>
    <div :class="$style.tripContainer">
      <div v-for="trip in board.trips" :class="[$style.trip]">
        <div :class="$style.name">
          <ProductBadge :trip="trip" />
        </div>
        <div :class="[$style.direction]">{{ trip.direction }}</div>
        <div :class="[$style.platform]">{{ trip.platform }}</div>
        <div :class="[$style.time]">{{ trip.when }}</div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">

import { type DepartureBoard } from '../store/Departures';
import ProductBadge from './ProductBadge.vue';

defineProps<{
  name: string;
  board: DepartureBoard;
}>();


</script>

<style module>
.departureBoardContainer {
  min-height: 260px;
  border: thin solid var(--border);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-bottom: 0.5em;
}

.departureBoardContainer h2 {
  background: linear-gradient(90deg, goldenrod 0%, orange 100%);
  border-width: 0;
  padding: 0.2em;
  margin: 0;
}

.tripContainer {
  overflow-y: scroll;
  overflow-x: hidden;
}

.trip {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.trip div {
  margin: 5px;
  text-align: left;
}

.trip:nth-child(odd) {
  background-color: var(--accent-bg);
}

.name {
  width: 3em;
  text-align: center;
  white-space: nowrap;
  text-overflow: clip;
}

.direction {
  width: 60%;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.platform {
  width: 1em;
  text-align: center;
  align-self: flex-end;
}

.time {
  text-align: right;
  width: 3em;
  align-self: flex-end;
}
</style>