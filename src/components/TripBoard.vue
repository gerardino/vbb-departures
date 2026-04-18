<template>
  <div :class="$style.tripContainer">
    <h2>{{ trip.name }}</h2>
  
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
.tripContainer {
  min-height: 260px;
  border: thin solid var(--border);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: #111;
  margin-bottom: 0.5em;;
}

.tripContainer h2 {
  background: linear-gradient(90deg,blue 0%, darkblue 100%);
  border-width: 0;
  padding: 0.2em;
  margin: 0;
}
.journeysContainer {
  padding-left: 2px;
  padding-right: 2px;
}
.journey {
  border: thin solid #333;
  width:100%;
  margin-bottom: 0.25em;
  background-color: #222;
}
</style>