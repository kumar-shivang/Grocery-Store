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
    if (this.baseStore.checkLogin('admin')) {
      this.adminStore.fetchCategoryRequests()
      this.adminStore.fetchCategories()
      this.adminStore.fetchManagerRequests()
    } else {
      this.baseStore.$state.type = 'admin'
    }
  }
}
</script>

<template>
  <div id="adminDashboard" v-if="baseStore.isLogged & (baseStore.$state.type === 'admin')">
    <AdminDashboard />
  </div>
  <div id="adminLogin" v-else>
    <LoginForm type="admin" />
  </div>
</template>

<style scoped>
#adminLogin {
  width: var(--app-width);
  height: var(--main-height);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
