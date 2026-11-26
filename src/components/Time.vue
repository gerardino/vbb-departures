<template>
    <div :class="$style.time">
        {{ time.getHours() }}<span :class="$style.blink">:</span>{{ pad(time.getMinutes()) }}
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { pad } from '../helpers';

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
</script>

<style module>

.time {
  margin-right: 0.5em;
  margin-top: 0.25em;
  margin-bottom: 0.25em;
  font-size: x-large;
  color: white;
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
