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
  <footer class="d-flex flex-row">
    <router-link to="admin">Open as admin</router-link>
  </footer>
</template>

<style scoped>
main {
  min-height: 85vh;
}
header {
  height: 10vh;
}
router-view {
  flex: 1;
  margin: auto;
}
footer {
  height: 5vh;
  background-color: whitesmoke;
}
a {
  text-decoration: none;
  color: black;
  margin: auto;
}
</style>
