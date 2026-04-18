<template>
  <div :class="[$style.badge, $style['badge-' + trip.productName], $style['badge-' + trip.name]]">
    {{ trip.name }}
  </div>
</template>

<script setup lang="ts">
import type { Product } from '../store/Departures';

defineProps<{
  trip: Product;
}>();
</script>


<style module>
.badge {
  padding: 0;
  margin: 0;
  padding-left: 5px;
  padding-right: 5px;
  border: thin solid red;
  width: 2em;
  text-align: center !important;
  font-size: 0.75em;
  height: 1.2em;
  line-height: 1.2em;;
}

.badge-S {
  --service-color: green;
  border: thin solid var(--service-color);
  background-color: var(--service-color);
  color: white;
  border-radius: 0.6rem;
}

.badge-U {
  --service-color: rgb(0,101,173);
  border: thin solid var(--service-color);
  background-color: var(--service-color);
  width: 1.5em;
  color: white;
}

.badge-Bus {
  --service-color: rgb(166,22,128);
  border: thin solid var(--service-color);
  background-color: var(--service-color);
  color: white;
  border-radius: 0.6rem;
}

.badge-S3 {
  --service-color: #0066ad;
  border: thin solid var(--service-color);
  background-color: var(--service-color);
}

.badge-S41 {
  --service-color: #ad5937;
  border: thin solid var(--service-color);
  background-color: var(--service-color);
}

.badge-S42 {
  --service-color: #cb6418;
  border: thin solid var(--service-color);
  background-color: var(--service-color);
}

.badge-S45, .badge-S46 {
  --service-color: #cd9c53;
  border: thin solid var(--service-color);
  background-color: var(--service-color);
}

.badge-S5 {
  --service-color: #eb7405;
  border: thin solid var(--service-color);
  background-color: var(--service-color);
}

.badge-S7, .badge-S75 {
  --service-color: #816da6;
  border: thin solid var(--service-color);
  background-color: var(--service-color);
}

.badge-S2, .badge-S25, .badge-S26 {
  --service-color: #007734;
  border: thin solid var(--service-color);
  background-color: var(--service-color);
}

.badge-S8, .badge-S85 {
  --service-color: #6a2;
  border: thin solid var(--service-color);
  background-color: var(--service-color);
}

.badge-Tram {
  --service-color: red;
  border: thin solid var(--service-color);
  background-color: var(--service-color);
  color: white;
}

.badge-RE, .badge-RB {
  --service-color: red;
  border: thin solid var(--service-color);
  background-color: var(--service-color);
  color: white;
  width: 2.5em;
}
</style>