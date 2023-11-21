<script>
import { useAdminStore } from '@/stores/adminStore'
export default {
  name: 'CategoryTable',
  setup() {
    const adminStore = useAdminStore()
    return { adminStore }
  },
  data: () => ({
    categories: []
  }),
  beforeMount() {
    this.adminStore.fetchCategories()
  },
  computed: {
    categories() {
      return this.adminStore.categories
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
    </tr>
    <tr v-for="category in categories" :key="category.id">
      <td>{{ category.id }}</td>
      <td>{{ category.category_name }}</td>
      <td>{{ category.category_description }}</td>
    </tr>
  </table>
</template>

<style scoped></style>
