<script>
import { useAdminStore } from '@/stores/adminStore'
export default {
  name: 'CategoryRequestTable',
  setup() {
    const adminStore = useAdminStore()
    return { adminStore }
  },
  beforeMount() {
    this.adminStore.fetchCategoryRequests()
  },
  computed: {
    categoryRequests() {
      return this.adminStore.categoryRequests
    }
  }
}
</script>

<template>
  <table class="table table-bordered">
    <tr>
      <th><strong>ID</strong></th>
      <th><strong>Name</strong></th>
      <th><strong>Description</strong></th>
      <th><strong>Approve</strong></th>
      <th><strong>Reject</strong></th>
    </tr>
    <tr v-for="categoryRequest in categoryRequests" :key="categoryRequest.id">
      <td>{{ categoryRequest.id }}</td>
      <td>{{ categoryRequest.category_name }}</td>
      <td>{{ categoryRequest.category_description }}</td>
      <td>
        <span id="approve" @click="adminStore.approveCategoryRequest(categoryRequest.id)">
          Approve
        </span>
      </td>
      <td>
        <div id="reject" @click="adminStore.rejectCategoryRequest(categoryRequest.id)">Reject</div>
      </td>
    </tr>
  </table>
</template>

<style scoped>
#approve {
  cursor: pointer;
  color: limegreen;
}
#approve:hover {
  text-decoration: underline;
  background-color: limegreen;
  color: white;
}
#reject {
  cursor: pointer;
  color: red;
}
#reject:hover {
  text-decoration: underline;
  background-color: red;
  color: white;
}
</style>
