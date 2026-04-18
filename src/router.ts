import { createMemoryHistory, createRouter } from 'vue-router'
import Departures from './pages/Departures.vue';

const routes = [
  { path: '/', component: Departures },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})