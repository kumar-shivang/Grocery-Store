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
    if (this.store.checkLogin()) {
      console.log('App beforeMount')
      console.log('Logged in as ' + this.store.type)
    } else {
      console.log('App beforeMount not logged in')
    }
  },
  methods: {
    open_as_user() {
      console.log('open as user')
      this.store.logout()
      console.warn(this.store.$state.type)
      this.$router.push('/')
      console.log('pushed')
    }
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
    <span>
      Open as
      <button
        v-if="store.$state.type !== 'admin'"
        class="btn btn-sm"
        @click="$router.push('admin')"
      >
        admin
      </button>
      <button
        v-if="store.$state.type !== 'manager'"
        class="btn btn-sm"
        @click="$router.push('manager')"
      >
        manager
      </button>
      <button v-if="store.$state.type !== 'user'" class="btn btn-sm" @click="open_as_user">
        user
      </button>
    </span>
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
