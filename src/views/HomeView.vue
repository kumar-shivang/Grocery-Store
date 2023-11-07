<script>
import { RouterLink, RouterView } from 'vue-router'
import { useBaseStore } from '@/stores/baseStore'
export default {
  name: 'HomeView',
  components: {
    // LoginForm
  },
  data: () => ({
    baseStore: useBaseStore(),
    routes: {}
  }),
  methods: {
    async getRoutes() {
      const response = await fetch('http://localhost:5000/routes', {
        method: 'GET',
        headers: {}
      })
      const data = await response.json()
      this.routes = data
      console.log(response)
    },
    async checkOptions() {
      const response = await fetch('http://localhost:5000/routes', {
        method: 'OPTIONS',
        headers: {
          'Access-Control-Request-Method': 'GET'
        }
      })
      console.log(response)
    }
  }
}
</script>

<template>
  <div>
    <h1>Welcome to the grocery store</h1>
    <div class="btn btn-primary" @click="getRoutes">Get Routes</div>
    <div class="btn btn-primary" @click="checkOptions">Check Options</div>
    <div v-for="route in routes">
      <p>{{ route }}</p>
    </div>
  </div>
</template>

<style scoped>
div {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
