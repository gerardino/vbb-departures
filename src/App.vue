<template>
  <div :class="$style.header">
    <h1>VBB Departures</h1>
    <div :class="$style.lastUpdated">Last update:{{ getTime(state.lastUpdated) }}</div>
    <Time />
  </div>
  <!-- <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/trips">Trips</RouterLink>
      <RouterLink to="/departures">Departures</RouterLink>
    </nav> -->
  <RouterView />
</template>

<script setup lang="ts">
import Time from './components/Time.vue';
import { getTime } from './helpers';
import { useDeparturesStore } from './store/Departures';

const state = useDeparturesStore();

</script>

<style module>
h1 {
  font-style: italic;
  font-size: large;
  margin-left: 0.5em;
}
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: black;
}

.lastUpdated {
  margin-top: 0.25em;
  margin-bottom: 0.25em;
  font-size: smaller;
}
</style>
