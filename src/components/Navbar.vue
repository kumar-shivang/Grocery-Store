<script>
import { useBaseStore } from '@/stores/baseStore'
export default {
  name: 'Navbar',
  setup() {
    const store = useBaseStore()
    return { store }
  },
  methods: {
    logout() {
      this.store.logout()
    }
  },
  computed: {
    isLoggedIn() {
      return this.store.getIsLogged
    },
    type() {
      return this.store.getType
    },
    home() {
      if (this.type === 'admin') {
        return '/admin'
      } else if (this.type === 'manager') {
        return '/manager'
      } else {
        return '/'
      }
    }
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
    <div class="container-fluid">
      <a class="navbar-brand" :href="home">
        <img src="@/assets/logo.svg" alt="logo" />
        <span>Grocery Store</span>
      </a>
    </div>
    <div v-if="isLoggedIn">
      <div class="nav-link active" @click="logout">Logout</div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: #ffffcd;
  padding: 0;
  width: var(--app-width);
  height: var(--header-height);
}
.navbar-brand {
  color: #000;
  font-size: 1.5rem;
  font-weight: 700;
  text-decoration: none;
  justify-content: center;
  align-content: center;
  align-items: center;
}
img {
  height: 50px;
  width: 50px;
  margin-right: 10px;
}
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}
</style>
