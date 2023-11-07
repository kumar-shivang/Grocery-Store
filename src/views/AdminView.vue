<script>
import { RouterLink, RouterView } from 'vue-router'
import LoginForm from '@/components/LoginForm.vue'
import { useBaseStore } from '@/stores/baseStore'
import { useAdminStore } from '@/stores/adminStore'
export default {
  name: 'adminView',
  setup() {
    const baseStore = useBaseStore()
    const adminStore = useAdminStore()
    return { baseStore, adminStore }
  },
  components: {
    RouterLink,
    RouterView,
    LoginForm
  },
  data: () => ({
    baseStore: useBaseStore(),
    adminStore: useAdminStore()
  }),
  methods: {
    logout() {
      this.baseStore.logout()
    }
  }
}
</script>

<template>
  <div id="adminDashboard" v-if="baseStore.isLogged">
    <h1>Admin Dashboard</h1>
  </div>
  <div id="adminLogin" v-else>
    <LoginForm type="admin" />
  </div>
</template>

<style scoped>
#adminLogin {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
