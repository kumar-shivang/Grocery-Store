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
  <div id="dashboard" class="d-flex flex-row m-0">
    <div id="left">
      <h1>Left</h1>
    </div>
    <div id="right">
      <div id="top-right">
        <h1>Top</h1>
      </div>
      <div id="bottom-right">
        <h1>Bottom</h1>
      </div>
    </div>
  </div>
</template>

<style scoped>
#dashboard {
  width: var(--app-width);
  height: var(--main-height);
}
#left {
  width: 50%;
  height: 100%;
  background-color: red;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#right {
  width: 50%;
  height: 100%;
  background-color: blue;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#top-right {
  width: 100%;
  height: 50%;
  background-color: green;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#bottom-right {
  width: 100%;
  height: 50%;
  background-color: yellow;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
