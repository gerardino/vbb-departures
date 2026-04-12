import { createMemoryHistory, createRouter } from 'vue-router'

// import Trips from './pages/Trips.vue';
import Departures from './pages/Departures.vue';

const routes = [
  // { path: '/', component: HelloWorldVue },
  // { path: '/trips', component: Trips },
  // { path: '/departures', component: Departures },
  { path: '/', component: Departures },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})