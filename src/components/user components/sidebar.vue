<script>
import { useBaseStore } from '@/stores/baseStore'
import { useUserStore } from '@/stores/userStore'

export default {
  name: 'sidebar',
  setup() {
    const baseStore = useBaseStore()
    const userStore = useUserStore()
    return { baseStore, userStore }
  },
  data() {
    return {
      user: {
        id: null,
        username: '',
        email: ''
      }
    }
  },
  computed: {
    access_token() {
      return this.baseStore.getAccessToken
    },
    loggedIn() {
      return this.baseStore.getIsLogged
    }
  },
  methods: {
    async getUser() {
      if (this.access_token) {
        const response = await fetch('http://localhost:5000/api/user/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.access_token
          }
        })
        const data = await response.json()
        if (response.ok) {
          this.user.id = data.id
          this.user.username = data.username
          this.user.email = data.email
        }
      }
    }
  },
  beforeMount() {
    this.getUser()
  }
}
</script>

<template>
  <div class="d-flex flex-column h-100 bg-danger-subtle">
    <div id="brand" class="d-flex flex-column justify-content-center align-items-center h-25">
      <img id="brandLogo" src="@/assets/logo.svg" alt="logo" />
      <h2>Grocery Store</h2>
    </div>
    <div class="d-flex flex-column align-items-center" v-if="loggedIn">
      <div class="d-flex flex-column align-items-center">
        <h3>{{ user.username }}</h3>
      </div>
      <div class="d-flex flex-column align-items-center">
        <h4>{{ user.email }}</h4>
      </div>
    </div>
    <div id="buttons"></div>
  </div>
  <button v-if="!loggedIn" class="btn btn-primary" @click="this.$router.push('/login')">
    Login
  </button>
  <button v-if="loggedIn" class="btn btn-primary" @click="this.baseStore.logout()">Logout</button>
</template>

<style scoped>
img {
  width: 20vh;
  height: 20vh;
}
#brand {
  height: 25%;
  margin: 3rem;
}
</style>
