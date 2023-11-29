<script>
import { useManagerStore } from '@/stores/managerStore'
export default {
  name: 'CategoryList',
  setup() {
    const managerStore = useManagerStore()
    return { managerStore }
  },
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  beforeMount() {
    this.managerStore.fetchCategories()
  },
  computed: {
    categories() {
      return this.managerStore.categories
    }
  }
}
</script>

<template>
  <div v-for="category in categories">
    <table class="table table-bordered table-responsive ms-2">
      <tr>
        <th><strong>ID</strong></th>
        <th><strong>Name</strong></th>
        <th><strong>Description</strong></th>
      </tr>
      <tr>
        <td>{{ category.id }}</td>
        <td>{{ category.category_name }}</td>
        <td>{{ category.category_description }}</td>
      </tr>
    </table>
  </div>
</template>

<style scoped></style>
