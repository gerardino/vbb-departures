<template>
  <div :class="$style.departureBoardContainer">
    <h2>{{ name }}</h2>
    <div :class="[$style.tripContainer, $style[board.style!]]">
      <div v-for="trip in board.trips" :class="[$style.trip, $style[board.style!]]">
        <ProductBadge :trip="trip" :class="$style.name" />
        <div :class="$style.direction">
          <marquee v-if="trip.direction.length > 30">{{ trip.direction }}</marquee>
          <span v-else>{{ trip.direction }}</span>
        </div>
        <div v-if="trip.platform" :class="$style.platform">{{ trip.platform }}</div>
        <div :class="$style.time">{{ trip.when }}</div>
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
  height: 19em;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-top-right-radius: 0.6em;
  width: 48%;
}

.departureBoardContainer h2 {
  background: var(--layer-1);
  color: var(--accent);
  border-top-right-radius: 0.6em;
  border-width: 0;
  padding: 0.2em;
  margin: 0;
  font-size: larger;
  padding-left: 0.5em;
}

.tripContainer {
  overflow-y: scroll;
  overflow-x: hidden;
  
  border: var(--layer-1) solid 0.5em;
  height: 100%;
  border-top-width: 0;

  &.db {
    background-color: var(--db-blue);
  }
  
  &.bvg {
    background-color: var(--layer-1);
  }
}

.trip {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: larger;
  background: linear-gradient(90deg, #000 0%, #111 5%, #222 50%, #111 95%, #000 100%);

  padding: 0.1em 0 0.1em 0;

  @media (max-width: 900px) {
    font-size: small;
  }


  &:nth-child(odd) {
    background: linear-gradient(90deg, #222 0%, #333 5%, #444 50%, #333 95%, #222 100%);
  }

  & div {
    margin: 0.2em 2px 2px 0.2em;
    text-align: left;
  }
  
  & .name {
    width: 2em;
    text-align: center;
    white-space: nowrap;
    text-overflow: clip;
    margin-top: 8px;
  }
  
  .direction {
    flex: 1 16em;
    max-width: 16em;
    white-space: nowrap;
    overflow: clip;
  }
  
  .platform {
    width: 1em;
    text-align: center;
    align-self: flex-end;
    margin-right: 5px;
  }
  
  .time {
    width: 3em;
    text-align: right;
    align-self: flex-end;
    margin-right: 0.5em;
  }

  &.bvg {
    font-family: 'Courier New', Courier, monospace;
    font-weight: 700;
    color: gold;
  }

  &.db {
    color: white;
    background: darkblue;
  }
}

</style>
