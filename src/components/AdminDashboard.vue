<script>
import { useBaseStore } from '@/stores/baseStore'
import { useAdminStore } from '@/stores/adminStore'
import CategoryTable from '@/components/Admin Dashboard Components/CategoryTable.vue'
import CategoryRequestTable from '@/components/Admin Dashboard Components/CategoryRequestTable.vue'
import ManagerRequestTable from '@/components/Admin Dashboard Components/ManagerRequestTable.vue'
export default {
  name: 'AdminDashboard',
  setup() {
    const baseStore = useBaseStore()
    const adminStore = useAdminStore()
    adminStore.setToken(baseStore.access_token)
    return { baseStore, adminStore }
  },
  components: {
    CategoryTable,
    CategoryRequestTable,
    ManagerRequestTable
  }
}
</script>

<template>
  <div id="dashboard" class="d-flex flex-row m-0">
    <div id="left">
      <div>
        <h1>Categories</h1>
        <CategoryTable />
      </div>
    </div>
    <div id="right">
      <div id="top-right">
        <h2>Category Requests</h2>
        <template v-if="adminStore.noCategoryRequests">
          <h3>No category requests</h3>
        </template>
        <template v-else>
          <CategoryRequestTable />
        </template>
      </div>
      <div id="bottom-right">
        <h2>Manager Requests</h2>
        <template v-if="adminStore.noManagerRequests">
          <h3>No manager requests</h3>
        </template>
        <template v-else>
          <ManagerRequestTable />
        </template>
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
  //background-color: red;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
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
  align-items: start;
  justify-content: start;
}
#bottom-right {
  width: 100%;
  height: 50%;
  background-color: yellow;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
}
</style>
