<template>
  <div :class="$style.journeyContainer">
    <div :class="$style.legsContainer">
      <div v-for="(leg, index) in journey.legs" :class="$style.product">
        <div v-if="!leg.walk" :class="$style.leg">
          <div :class="$style.legHeader">
            <span :class="$style.time">{{ getTime(leg.departure) }}</span>
            <ProductBadge :trip="leg" />
            <span :class="$style.time">{{ getTime(leg.arrival) }}</span>
          </div>
          <div :class="$style.legContent">
            <span :class="$style.from">{{ leg.from }}</span>
            <span :class="$style.to">→ {{ leg.to }}</span>
          </div>
        </div>
        <div v-else :class="$style.walk">
          <span :class="$style.time">{{ calculateWalkingTime(index) }}</span>
          🏃‍➡️
        </div>
      </div>
      <div :class="$style.walk">
        <span :class="$style.time">
          {{ calculateJourneyTime() }}
        </span>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">

import { getTime, getTimeDifferenceInMinutes } from '../helpers';
import { type Journey } from '../store/Departures';
import ProductBadge from './ProductBadge.vue';

const props = defineProps<{
  journey: Journey;
}>();

function calculateWalkingTime(legIndex: number): string {
  const leg = props.journey.legs[legIndex];
  if (leg.from === leg.to) {
    return getTimeDifferenceInMinutes(leg.departure, props.journey.legs[legIndex + 1].departure);
  } else {
    return getTimeDifferenceInMinutes(leg.departure, leg.arrival);
  }
}

function calculateJourneyTime(): string {
  return getTimeDifferenceInMinutes(props.journey.legs[0].departure, props.journey.legs[props.journey.legs.length - 1].arrival)
}

</script>

<style module>
.journeyContainer {
  margin-bottom: 0.2em;
  padding-left: 0.2em;
  padding-right: 0.2em;
}

.journeyHeader {
  font-size: large;
}

.legsContainer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.leg {
  display: flex;
  flex-direction: column;
  background-color: #333;
  padding: 3px 1px 1px 1px;
  margin: 2px;
}

.legHeader {
  display: flex;
  justify-content: center;
}

.time {
  font-size: medium;
  line-height: 0.9em;
  margin-right: 0.5em;
  margin-left: 0.5em;
}

.legContent {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: medium;
  line-height: 1.7em;
  padding-left: 0.4em;
  padding-right: 0.4em;
  text-align: center;

  & .from, & .to {
    max-width: 12em;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 400;
    overflow: hidden;
  }

  & .from {
    font-weight: 600;
  }
}

.walk {
  width: 3em;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
</style>