<script>
import Navbar from '@/components/Navbar.vue'
import Notification from '@/components/Notification.vue'
import { useBaseStore } from '@/stores/baseStore'
export default {
  name: 'App',
  setup() {
    const store = useBaseStore()
    return { store }
  },
  components: {
    Navbar,
    Notification
  },
  methods: {
    open_as_user() {
      this.store.logout()
      this.store.$state.type = 'user'
      this.$router.push('/')
    }
  },
  computed: {
    notify() {
      return this.store.$state.notification.show
    },
    message() {
      return this.store.$state.notification.message
    },
    type() {
      return this.store.$state.notification.type
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
  <Notification v-if="notify" :message="message" :type="type" />
</template>

<style scoped>
main {
  height: var(--main-height);
}
header {
  height: var(--header-height);
}
router-view {
  flex: 1;
  margin: auto;
}
footer {
  height: var(--footer-height);
  background-color: whitesmoke;
  width: var(--app-width);
  position: fixed;
  z-index: 9999;
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
