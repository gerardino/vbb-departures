<template>
  <div :class="$style.departureBoardContainer">
    <h2>{{ name }}</h2>
    <div :class="$style.tripContainer">
      <div v-for="trip in board.trips" :class="[$style.trip, $style[board.style!]]">
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
  height: fit-content;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-bottom: 2px;
}

.departureBoardContainer h2 {
  background: linear-gradient(90deg, goldenrod 0%, orange 100%);
  border-top-right-radius: 0.6em;
  border-width: 0;
  padding: 0.2em;
  margin: 0;
  font-size: larger;
}

.tripContainer {
  overflow-y: scroll;
  overflow-x: hidden;

  border-image: linear-gradient(90deg, goldenrod 0%, orange 100%) 1;
  border-style: solid;
  border-width: thin;
  border-top-width: 0;

}

.trip {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: larger;
  background: linear-gradient(90deg, #000 0%, #111 5%, #222 50%, #111 95%, #000 100%);

  &:nth-child(odd) {
    background: linear-gradient(90deg, #222 0%, #333 5%, #444 50%, #333 95%, #222 100%);
  }

  &.bvg {
    font-family: 'Courier New', Courier, monospace;
    font-weight: 700;
    color: gold;

    & .direction {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: clip;

    }
  }

  &.db {
    color: white;
    background: darkblue;

    &:nth-child(odd) {
      background-color: darkblue !important;
    }
  }
}

.trip div {
  margin: 0.2em;
  text-align: left;
}

.trip .name {
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