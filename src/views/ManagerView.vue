<script>
import { useBaseStore } from '@/stores/baseStore'
import { useManagerStore } from '@/stores/managerStore'
import LoginForm from '@/components/LoginForm.vue'
import RegistrationForm from '@/components/RegistrationForm.vue'
import managerDashboard from '@/components/manager dashboard components/ManagerDashboard.vue'
export default {
  name: 'ManagerView',
  setup() {
    const managerStore = useManagerStore()
    const baseStore = useBaseStore()
    return { managerStore, baseStore }
  },
  components: {
    LoginForm,
    RegistrationForm,
    managerDashboard
  },
  data: () => ({
    signUp: false
  }),
  beforeMount() {
    if (this.baseStore.checkLogin('manager')) {
      this.managerStore.fetchProducts()
      this.managerStore.fetchCategories()
    } else {
      this.baseStore.$state.type = 'manager'
    }
  }
}
</script>

<template>
  <div v-if="baseStore.isLogged && baseStore.type === 'manager'">
    <managerDashboard />
  </div>
  <div class="form" v-else-if="!baseStore.isLogged & signUp">
    <RegistrationForm type="manager" @login-clicked="signUp = false" />
  </div>
  <div class="form" v-else-if="!baseStore.isLogged & !signUp">
    <LoginForm type="manager" @signup-clicked="signUp = true" />
  </div>
</template>

<style scoped>
.form {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
