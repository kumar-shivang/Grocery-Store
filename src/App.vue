<script>
import Navbar from '@/components/Navbar.vue'
import { useBaseStore } from '@/stores/baseStore'
export default {
  name: 'App',
  setup() {
    const store = useBaseStore()
    return { store }
  },
  components: {
    Navbar
  },
  beforeMount() {
    this.store.checkLogin()
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
  <footer class="d-flex flex-row align-items-center justify-content-center">
    <span v-show="!store.isLogged"
      >Open as <button class="btn btn-sm" @click="$router.push('admin')">admin</button
      ><button class="btn btn-sm" @click="$router.push('manager')">manager</button></span
    >
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
footer button:hover {
  color: white;
  background-color: black;
}
.btn {
  border: black 1px solid;
}
</style>
