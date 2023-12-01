<script>
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
      this.routes = await response.json()
      console.log(response)
    }
  },
  beforeMount() {
    if (this.baseStore.checkLogin('user')) {
      console.log('user is logged in')
    } else {
      console.log('user is not logged in')
    }
  }
}
</script>

<template>
  <div>
    <h1>Welcome to the grocery store</h1>
    <div class="btn btn-primary" @click="getRoutes">Get Routes</div>
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
