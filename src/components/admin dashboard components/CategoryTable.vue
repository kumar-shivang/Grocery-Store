<script>
import { useAdminStore } from '@/stores/adminStore'
import { useBaseStore } from '@/stores/baseStore'
export default {
  name: 'CategoryTable',
  setup() {
    const adminStore = useAdminStore()
    const baseStore = useBaseStore()
    return { adminStore, baseStore }
  },
  data() {
    return {
      categoryRequest: {
        category_name: '',
        category_description: ''
      },
      toDelete: null
    }
  },
  beforeMount() {
    this.adminStore.fetchCategories()
  },
  computed: {
    categories() {
      return this.adminStore.categories
    }
  },
  methods: {
    async createCategory() {
      const response = await fetch(`http://localhost:5000/api/admin/create_category`, {
        headers: {
          Authorization: `Bearer ${this.adminStore.access_token}`,
          'Content-Type': 'application/json'
        },
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
          category_name: this.categoryRequest.category_name,
          category_description: this.categoryRequest.category_description
        })
      })
      let data = await response.json()
      if (response.ok) {
        this.baseStore.showNotification(this.cleanJSON(data.message), 'success')
        this.categoryRequest.category_name = ''
        this.categoryRequest.category_description = ''
        await this.adminStore.fetchCategories()
      } else {
        this.baseStore.showNotification(this.cleanJSON(data.message), 'danger')
        this.categoryRequest.category_name = ''
        this.categoryRequest.category_description = ''
      }
    },
    cleanJSON(string) {
      // write a function that sets this.message to a string removing everything expect what is between '' in the string
      let start = string.indexOf('[')
      let end = string.indexOf(']')
      return (this.message = string.slice(start + 1, end))
    },
    async deleteCategory() {}
  }
}
</script>

<template>
  <table class="table table-bordered table-responsive">
    <tr>
      <th><strong>ID</strong></th>
      <th><strong>Name</strong></th>
      <th><strong>Description</strong></th>
      <th colspan="2"><strong>Actions</strong></th>
    </tr>
    <tr v-for="category in categories" :key="category.id">
      <td>{{ category.id }}</td>
      <td>{{ category.category_name }}</td>
      <td>{{ category.category_description }}</td>
      <td>
        <button
          type="button"
          class="btn btn-danger delete"
          data-bs-toggle="modal"
          data-bs-target="#deleteModal"
          v-on:click="toDelete = category.id"
        >
          Delete
        </button>
      </td>
      <td @click="editCategory(category.id)">
        <button
          type="button"
          class="btn btn-primary edit"
          data-bs-toggle="modal"
          data-bs-target="#editModal"
        >
          Edit
        </button>
      </td>
    </tr>
    <tr>
      <td><strong style="font-size: 90%">New</strong></td>
      <td>
        <input
          type="text"
          v-model="categoryRequest.category_name"
          placeholder="Category Name"
          class="form-control"
        />
      </td>
      <td>
        <input
          type="text"
          v-model="categoryRequest.category_description"
          placeholder="Category Description"
          class="form-control"
        />
      </td>
      <td colspan="2">
        <button type="button" class="btn btn-success create" @click="createCategory">Create</button>
      </td>
    </tr>
  </table>
</template>

<style scoped>
table {
  width: 98%;
  margin: 1rem auto;
  border-collapse: collapse;
  border: 1px solid black;
}
strong {
  font-size: 95%;
  background-color: transparent;
}
th {
  text-align: center;
}
td {
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
button {
  width: 100%;
  cursor: pointer;
}
input {
  width: 100%;
  padding: 0;
  margin: 0;
  border: transparent;
  text-align: center;
}
.edit {
  cursor: pointer;
  border: transparent;
  border-radius: 0;
  color: blue;
}
.edit:hover {
  text-decoration: underline;
  background-color: blue;
  color: white;
}
.delete {
  cursor: pointer;
  border: transparent;
  border-radius: 0;
  color: orangered;
}
.delete:hover {
  text-decoration: underline;
  background-color: orangered;
  color: white;
}
.create {
  cursor: pointer;
  color: green;
  border-radius: 0;
  border: transparent;
}
.create:hover {
  text-decoration: underline;
  background-color: green;
  color: white;
}
</style>
