<script>
import { RouterLink, RouterView } from 'vue-router'
import { useBaseStore } from '@/stores/baseStore'
export default {
  name: 'HomeView',
  components: {
    // LoginForm
  },
  data: () => ({
    baseStore: useBaseStore()
  })
}
</script>

<template>
  <div>
    <h1>Welcome to the grocery store</h1>
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
