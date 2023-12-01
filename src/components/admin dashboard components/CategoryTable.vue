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
      createCat: {
        category_name: '',
        category_description: ''
      },
      toDelete: null,
      editCat: {
        category_id: null,
        category_name: '',
        category_description: ''
      }
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
          category_name: this.createCat.category_name,
          category_description: this.createCat.category_description
        })
      })
      let data = await response.json()
      if (response.ok) {
        this.baseStore.showNotification(this.cleanJSON(data.message), 'success')
        await this.adminStore.fetchCategories()
      } else {
        this.baseStore.showNotification(this.cleanJSON(data.message), 'danger')
      }
      this.createCat.category_name = ''
      this.createCat.category_description = ''
    },
    cleanJSON(string) {
      // write a function that sets this.message to a string removing everything expect what is between '' in the string
      let start = string.indexOf('[')
      let end = string.indexOf(']')
      return (this.message = string.slice(start + 1, end))
    },
    async deleteCategory() {
      const response = await fetch(`http://localhost:5000/api/admin/category/${this.toDelete}`, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + this.adminStore.access_token
        }
      })
      let data = await response.json()
      if (response.ok) {
        this.baseStore.showNotification(this.cleanJSON(data.message), 'success')
      } else {
        this.baseStore.showNotification(this.cleanJSON(data.message), 'danger')
      }
      await this.adminStore.fetchCategories()
    },
    editButtonClicked(id, name, description) {
      this.editCat.category_id = id
      this.editCat.category_name = name
      this.editCat.category_description = description
    },
    cancelButtonClicked() {
      this.editCat.category_id = null
      this.editCat.category_name = ''
      this.editCat.category_description = ''
    },
    async editCategory() {
      const response = await fetch(
        `http://localhost:5000/api/admin/update_category/${this.editCat.category_id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${this.adminStore.access_token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            category_name: this.editCat.category_name,
            category_description: this.editCat.category_description
          })
        }
      )
      const data = await response.json()
      if (response.ok) {
        this.baseStore.showNotification(data.message, 'success')
        await this.adminStore.fetchCategories()
      } else {
        this.baseStore.showNotification(data.message, 'danger')
      }
      this.cancelButtonClicked()
    }
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
      <td v-if="editCat.category_id !== category.id">{{ category.category_name }}</td>
      <td v-else>
        <input
          type="text"
          v-model="editCat.category_name"
          :placeholder="category.category_name"
          class="form-control"
        />
      </td>

      <td v-if="editCat.category_id !== category.id">{{ category.category_description }}</td>
      <td v-else>
        <input
          type="text"
          v-model="editCat.category_description"
          :placeholder="category.category_description"
          class="form-control"
        />
      </td>

      <td>
        <button
          type="button"
          class="btn btn-danger delete"
          data-bs-toggle="modal"
          data-bs-target="#deleteModal"
          v-on:click="toDelete = category.id"
          v-if="editCat.category_id !== category.id"
          :disabled="category.id === 1"
        >
          Delete
        </button>
        <button type="button" class="btn btn-primary cancel" @click="cancelButtonClicked" v-else>
          Cancel <i class="bi bi-x" />
        </button>
      </td>
      <td>
        <button
          type="button"
          class="btn btn-primary edit"
          @click="
            editButtonClicked(category.id, category.category_name, category.category_description)
          "
          v-if="editCat.category_id !== category.id"
          :disabled="category.id === 1"
        >
          Edit
        </button>
        <button type="button" class="btn btn-success edit" @click="editCategory" v-else>
          Edit
        </button>
      </td>
    </tr>
    <tr>
      <td><strong style="font-size: 90%">New</strong></td>
      <td>
        <input
          type="text"
          v-model="createCategory.category_name"
          placeholder="Category Name"
          class="form-control"
        />
      </td>
      <td>
        <input
          type="text"
          v-model="createCategory.category_description"
          placeholder="Category Description"
          class="form-control"
        />
      </td>
      <td colspan="2">
        <button type="button" class="btn btn-success create" @click="createCategory">Create</button>
      </td>
    </tr>
  </table>
  <!-- Modal -->
  <div
    class="modal fade"
    id="deleteModal"
    tabindex="-1"
    aria-labelledby="deleteModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title" id="deleteModalLabel">Delete Category</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">Are you sure you want to delete this category?</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button
            type="button"
            class="btn btn-danger"
            data-bs-dismiss="modal"
            @click="deleteCategory"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
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
}
.create:hover {
  text-decoration: underline;
  background-color: green;
  color: white;
}
.btn {
  border-radius: 0;
  border: transparent;
}
.cancel {
  padding: 2px;
}
</style>
