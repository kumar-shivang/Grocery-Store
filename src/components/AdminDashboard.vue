<script>
import { useBaseStore } from '@/stores/baseStore'
import { useAdminStore } from '@/stores/adminStore'
import CategoryTable from '@/components/admin dashboard components/CategoryTable.vue'
import CategoryRequestTable from '@/components/admin dashboard components/CategoryRequestTable.vue'
import ManagerRequestTable from '@/components/admin dashboard components/ManagerRequestTable.vue'
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
  <div id="dashboard">
    <div id="title" class="w-100 d-flex flex-row align-items-center">
      <h2 class="mx-auto">Admin Dashboard</h2>
    </div>
    <div id="container" class="d-flex flex-row m-0 w-100">
      <div id="left">
        <h1>Categories</h1>
        <CategoryTable />
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
  </div>
</template>

<style scoped>
#dashboard {
  width: var(--app-width);
  height: var(--main-height);
}
#title {
  height: 10%;
  border: thin solid dimgray;
}
#container {
  height: 90%;
}
#left {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
}
#right {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  border: thin solid dimgray;
}
#top-left {
  width: 100%;
  height: 75%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  border: thin solid dimgray;
  padding: 1rem;
}
#bottom-left {
  width: 100%;
  height: 25%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  border: thin solid dimgray;
  padding: 1rem;
}
#top-right {
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  border: thin solid dimgray;
  padding: 1rem;
}
#bottom-right {
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  border: thin solid dimgray;
  padding: 1rem;
}
</style>
