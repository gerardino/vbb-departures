<template>
  <div :class="$style.header">
    <h1>VBB Departures</h1>
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
</script>

<style module>
h1 {
  font-style: italic;
  font-size: large;
}
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>