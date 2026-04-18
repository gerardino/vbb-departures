<template>
  <div :class="$style.journeyContainer">
    <div :class="$style.journeyHeader">{{ journey.from }} → {{ journey.to }}</div>
  
    <div :class="$style.legsContainer">
      <div v-for="(leg, index) in journey.legs" :class="$style.product">
        <div v-if="!leg.walk" :class="$style.leg">
          <div :class="$style.legHeader">
            <span :class="$style.time">{{ getTime(leg.departure) }}</span>
            <ProductBadge :trip="leg" />
            <span :class="$style.time">{{ getTime(leg.arrival) }}</span>
          </div>
          <div :class="$style.legContent">
            {{ leg.from }}
            <br>
            → {{ leg.to }}
          </div>
        </div>
        <div v-else :class="$style.walk">
          <span :class="$style.time">{{ calculateWalkingTime(index) }}</span>
          🏃‍➡️
        </div>
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

</script>

<style module>
.journeyContainer {
  /* border: thin solid var(--border);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 3%; */
  margin-bottom: 1em;
  /* width: 100%; */
}

.journeyHeader {
  font-size: small;
}

.legsContainer {
  display: flex;
  flex-direction: row;
  justify-content: center;
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
  justify-content: center;
  font-size: x-small;
}

.product {}

.walk {
  width: 3em;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>