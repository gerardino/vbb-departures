<template>
  <h1>Departures</h1>
  <div>
    <div :class="[$style.departureBoardContainer]">
      <DepartureBoardVue v-for="board in boards" :board="board.board!" :name="board.query.name" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDeparturesStore } from "../store/Departures";
import { computed } from "vue";
import DepartureBoardVue from "../components/DepartureBoard.vue";

const state = useDeparturesStore();

state.init();

const boards = computed(() => state.boards);
</script>

<style module>
.departureBoardContainer {
  display: flex;
  flex-direction: row;
  width: 100%;
}
</style>
