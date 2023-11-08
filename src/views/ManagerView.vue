<script>
import { useBaseStore } from '@/stores/baseStore'
import { useManagerStore } from '@/stores/managerStore'
import LoginForm from '@/components/LoginForm.vue'
export default {
  name: 'ManagerView',
  setup() {
    const managerStore = useManagerStore()
    const baseStore = useBaseStore()
    return { managerStore, baseStore }
  },
  components: {
    LoginForm
  },
  data: () => ({})
}
</script>

<template>
  <div id="managerDashboard" v-if="baseStore.isLogged">
    <h1>Manager Dashboard</h1>
  </div>
  <div id="managerLogin" v-else>
    <LoginForm type="manager" />
  </div>
</template>

<style scoped>
#managerLogin {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
