<script>
import { RouterLink, RouterView } from 'vue-router'
import LoginForm from '@/components/LoginForm.vue'
import AdminDashboard from '@/components/AdminDashboard.vue'
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
    LoginForm,
    AdminDashboard
  },
  data: () => ({
    baseStore: useBaseStore(),
    adminStore: useAdminStore()
  }),
  beforeMount() {
    if (this.baseStore.checkLogin()) {
      console.log('AdminView beforeMount')
      console.log('Logged in as ' + this.baseStore.type)
      if (this.baseStore.type === 'admin') {
        // this.adminStore.fetchAdminData()
        console.log('ok')
      } else {
        this.baseStore.logout()
      }
    } else {
      console.log('AdminView beforeMount not logged in')
    }
  }
}
</script>

<template>
  <div id="adminDashboard" v-if="baseStore.isLogged">
    <AdminDashboard />
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
#adminDashboard {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
