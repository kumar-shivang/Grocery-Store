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
      this.routes = await response.json()
      console.log(response)
    }
  },
  beforeMount() {
    if (this.baseStore.checkLogin()) {
      console.log('HomeView beforeMount')
      if (this.baseStore.type === 'admin') {
        console.log('HomeView beforeMount admin')
        console.log(this.baseStore.$state.type)
        this.$router.push('/admin')
      } else if (this.baseStore.type === 'manager') {
        console.log('HomeView beforeMount manager')
        console.log(this.baseStore.$state.type)
        this.$router.push('/manager')
      } else {
        console.log('HomeView beforeMount user')
        console.log(this.baseStore.$state.type)
      }
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
