<script>
import { useAdminStore } from '@/stores/adminStore'
export default {
  name: 'CategoryRequestTable',
  setup() {
    const adminStore = useAdminStore()
    return { adminStore }
  },
  data: () => ({
    categoryRequests: []
  }),
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
        <button
          class="btn btn-success"
          @click="adminStore.approveCategoryRequest(categoryRequest.id)"
        >
          Approve
        </button>
      </td>
      <td>
        <button
          class="btn btn-danger"
          @click="adminStore.rejectCategoryRequest(categoryRequest.id)"
        >
          Reject
        </button>
      </td>
    </tr>
  </table>
</template>

<style scoped></style>
