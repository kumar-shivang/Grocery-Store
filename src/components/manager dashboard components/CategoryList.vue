<script>
import { useManagerStore } from '@/stores/managerStore'
import { useBaseStore } from '@/stores/baseStore'
export default {
  name: 'CategoryList',
  setup() {
    const managerStore = useManagerStore()
    const baseStore = useBaseStore()
    return { managerStore, baseStore }
  },
  data() {
    return {
      categoryRequest: {
        category_name: '',
        category_description: ''
      }
    }
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
  },
  methods: {
    deleteCategory(id) {
      this.managerStore.deleteCategory(id)
    },
    editCategory(id) {
      this.managerStore.editCategory(id)
    },
    async requestCategory() {
      if (!this.categoryRequest.category_name) {
        this.baseStore.showNotification('Category name is required', 'danger')
        return
      }
      if (this.categoryRequest.category_name.length < 4) {
        this.baseStore.showNotification(
          'Category name must be at least 4 characters long',
          'danger'
        )
        return
      }
      if (this.categoryRequest.category_name.length > 20) {
        this.baseStore.showNotification(
          'Category name must be at most 20 characters long',
          'danger'
        )
        return
      }
      if (!this.categoryRequest.category_description) {
        this.baseStore.showNotification('Category description is required', 'danger')
        return
      }
      if (this.categoryRequest.category_description.length < 10) {
        this.baseStore.showNotification(
          'Category description must be at least 10 characters long',
          'danger'
        )
        return
      }
      if (this.categoryRequest.category_description.length > 140) {
        this.baseStore.showNotification(
          'Category description must be at most 140 characters long',
          'danger'
        )
        return
      }
      const response = await fetch('http://localhost:5000/api/manager/request_category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.managerStore.access_token
        },
        body: JSON.stringify({
          category_name: this.categoryRequest.category_name,
          category_description: this.categoryRequest.category_description,
          request_type: 'add'
        })
      })
      let data = await response.json()
      if (response.ok) {
        console.log('ok')
        this.baseStore.showNotification(data.message, 'success')
      } else {
        console.log('not ok')
        this.baseStore.showNotification(data.message, 'danger')
      }
    }
  }
}
</script>

<template>
  <table class="table table-bordered table-responsive m-2">
    <tr class="heading">
      <th><strong>ID</strong></th>
      <th><strong>Name</strong></th>
      <th><strong>Description</strong></th>
      <th><strong>Delete</strong></th>
      <th><strong>Edit</strong></th>
    </tr>
    <tr v-for="category in categories">
      <td>{{ category.id }}</td>
      <td class="name">{{ category.category_name }}</td>
      <td class="description">{{ category.category_description }}</td>
      <td @click="deleteCategory(category.id)" class="bg-danger text-white edit">Delete</td>
      <td @click="editCategory(category.id)" class="edit">Edit</td>
    </tr>
    <tr class="insert">
      <td><strong style="font-size: 90%">New</strong></td>
      <td>
        <input
          type="text"
          v-model="categoryRequest.category_name"
          placeholder="New Category Name"
          class="form-control-sm"
        />
      </td>
      <td>
        <input
          type="text"
          v-model="categoryRequest.category_description"
          placeholder="New Category Description"
          class="form-control-sm"
        />
      </td>
      <td @click="requestCategory" class="bg-success text-white edit" colspan="2">Request</td>
    </tr>
  </table>
</template>

<style scoped>
table {
  width: 98%;
  border-collapse: collapse;
  margin: auto;
  border: 1px solid black;
}
.heading {
  background-color: #f5f5f5;
  height: 150%;
}
th {
  text-align: center;
}
td {
  text-align: center;
  cursor: cell;
}
strong {
  font-size: 1.2rem;
  margin: auto;
  background-color: transparent;
}
.edit {
  cursor: pointer;
  width: 100%;
}
.edit:hover {
  text-decoration: underline;
  background-color: #f5f5f5;
}
input {
  padding: 0;
  border: transparent;
  width: 100%;
}
.description {
  width: 30%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.name {
  width: 20%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
