<script>
import { useBaseStore } from '@/stores/baseStore'
import { useAdminStore } from '@/stores/adminStore'
export default {
  name: 'AdminDashboard',
  setup() {
    const baseStore = useBaseStore()
    const adminStore = useAdminStore()
    adminStore.setToken(baseStore.access_token)
    return { baseStore, adminStore }
  },
  data: () => ({
    baseStore: useBaseStore(),
    adminStore: useAdminStore()
  }),
  beforeMount() {
    this.adminStore.fetchManagerRequests()
  }
}
</script>

<template>
  <div id="leftHalf" class="w-50">
    <h1>Left</h1>
  </div>
  <div id="rightHalf" class="w-50">
    <h1>Right</h1>
  </div>
</template>

<style scoped>
#leftHalf {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: red;
}
</style>
