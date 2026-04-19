<template>
  <div :class="$style.timeContainer">
    <div :class="$style.time">
      {{ time.getHours() }}<span :class="$style.blink">:</span>{{ pad(time.getMinutes()) }}
    </div>
    <div :class="$style.lastUpdated">Last update:{{ getTime(state.lastUpdated) }}</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { getTime, pad } from '../helpers';
import { useDeparturesStore } from '../store/Departures';

const time = ref(new Date());

const interval = ref();

onMounted(() => {
  interval.value = setInterval(() => {
    time.value = new Date();
  }, 1000);
});

onUnmounted(() => {
  clearInterval(interval.value);
});

const state = useDeparturesStore();


</script>

<style module>

.timeContainer {
  display: flex;
  flex-direction: column;
  align-items: end;
}

.time, .lastUpdated {
  margin-right: 0.5em;
}

.time {
  margin-top: 0.5em;
  font-size: x-large;
}

.blink {
  animation: blinker 2s steps(1) infinite;
  padding: 0;
  margin: 0;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}

.lastUpdated {
  font-size: smaller;
}

</style>