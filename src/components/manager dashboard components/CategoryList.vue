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
      creationRequest: {
        category_name: '',
        category_description: ''
      },
      editRequest: {
        category_id: null,
        category_name: '',
        category_description: ''
      },
      toDelete: null
    }
  },
  computed: {
    categories() {
      return this.managerStore.categories
    }
  },
  beforeMount() {
    this.managerStore.fetchCategories()
  },
  methods: {
    async deleteCategory(id) {
      const response = await fetch(`http://localhost:5000/api/manager/delete_category/${id}`, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + this.managerStore.access_token
        }
      })
      let data = await response.json()
      if (response.ok) {
        this.baseStore.showNotification(data.message, 'success')
      } else {
        this.baseStore.showNotification(data.message, 'danger')
      }
      await this.managerStore.fetchCategories()
    },
    async updateRequest() {
      const response = await fetch(
        `http://localhost:5000/api/manager/update_category/${this.editRequest.category_id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.managerStore.access_token
          },
          body: JSON.stringify({
            category_id: this.editRequest.category_id,
            category_name: this.editRequest.category_name,
            category_description: this.editRequest.category_description
          })
        }
      )
      let data = await response.json()
      if (response.ok) {
        this.baseStore.showNotification(data.message, 'success')
      } else {
        this.baseStore.showNotification(data.message, 'danger')
      }
      this.editRequest.category_id = null
      this.editRequest.category_name = ''
      this.editRequest.category_description = ''
    },
    async requestCategory() {
      const response = await fetch('http://localhost:5000/api/manager/request_category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.managerStore.access_token
        },
        body: JSON.stringify({
          category_name: this.creationRequest.category_name,
          category_description: this.creationRequest.category_description
        })
      })
      let data = await response.json()
      if (response.ok) {
        this.baseStore.showNotification(data.message, 'success')
      } else {
        this.baseStore.showNotification(data.message, 'danger')
      }
      this.creationRequest.category_name = ''
      this.creationRequest.category_description = ''
    },
    editButtonClicked(id, name, description) {
      this.editRequest.category_id = id
      this.editRequest.category_name = name
      this.editRequest.category_description = description
    },
    cancelButtonClicked() {
      this.editRequest.category_id = null
      this.editRequest.category_name = ''
      this.editRequest.category_description = ''
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
    <tr v-for="category in categories" :key="category.id">
      <td>{{ category.id }}</td>
      <td class="name" v-if="category.id !== editRequest.category_id">
        {{ category.category_name }}
      </td>
      <td class="name" v-else>
        <input
          type="text"
          v-model="editRequest.category_name"
          placeholder="category.category_name"
          class="form-control"
        />
      </td>

      <td class="description" v-if="category.id !== editRequest.category_id">
        {{ category.category_description }}
      </td>
      <td class="description" v-else>
        <input
          type="text"
          v-model="editRequest.category_description"
          placeholder="category.category_description"
          class="form-control"
        />
      </td>

      <td class="edit">
        <button
          type="button"
          class="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target="#deleteModal"
          v-on:click="toDelete = category.id"
          :disabled="category.id === 1"
          v-if="editRequest.category_id !== category.id"
        >
          Delete
        </button>
        <button v-else class="btn btn-outline-dark" @click="cancelButtonClicked">
          Cancel <i class="bi bi-x" />
        </button>
      </td>
      <td>
        <button
          class="btn btn-primary"
          @click="
            editButtonClicked(category.id, category.category_name, category.category_description)
          "
          :disabled="category.id === 1"
          v-if="editRequest.category_id !== category.id"
        >
          Edit
        </button>
        <button class="btn btn-success" @click="updateRequest" :disabled="category.id === 1" v-else>
          Save
        </button>
      </td>
    </tr>
    <tr class="insert">
      <td><strong style="font-size: 90%">New</strong></td>
      <td>
        <input
          type="text"
          v-model="creationRequest.category_name"
          placeholder="Category Name"
          class="form-control-sm"
        />
      </td>
      <td>
        <input
          type="text"
          v-model="creationRequest.category_description"
          placeholder="Category Description"
          class="form-control-sm"
        />
      </td>
      <td @click="requestCategory" class="bg-success text-white edit" colspan="2">Request</td>
    </tr>
  </table>
  <!-- Modal -->
  <div
    class="modal fade"
    id="deleteModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Request Deletion</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">Are you sure to request deletion of this category?</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button
            type="button"
            class="btn btn-danger"
            @click="deleteCategory(toDelete)"
            data-bs-dismiss="modal"
          >
            Request Delete
          </button>
        </div>
      </div>
    </div>
  </div>
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
  text-align: center;
}
.description {
  width: 30%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.name {
  width: 25%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.btn-danger {
  color: white;
  background-color: red;
}
.btn-danger:hover {
  color: white;
  background-color: darkred;
}
.btn {
  border-radius: 0;
  border: transparent;
}
</style>
