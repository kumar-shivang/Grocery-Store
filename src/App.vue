<script>
import Navbar from '@/components/Navbar.vue'
import { RouterView } from 'vue-router'
export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<template>
  <header>
    <Navbar />
  </header>
  <main class="d-flex flex-row justify-content-center align-items-center">
    <router-view />
  </main>
  <footer class="d-flex flex-column"></footer>
</template>

<style scoped>
main {
  min-height: 90vh;
}
router-view {
  flex: 1;
  margin: auto;
}
</style>
