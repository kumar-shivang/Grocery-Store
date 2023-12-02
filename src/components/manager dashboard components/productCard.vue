<script>
import { useBaseStore } from '@/stores/baseStore'
import { useManagerStore } from '@/stores/managerStore'

export default {
  name: 'productCard',
  setup() {
    const store = useBaseStore()
    const managerStore = useManagerStore()
    return { store, managerStore }
  },
  data: () => ({
    editing: false,
    editingProduct: {
      id: null,
      name: '',
      description: '',
      rate: ''
    },
    addStock: {
      id: null,
      stock: ''
    }
  }),
  props: {
    product: {
      type: Object,
      required: true,
      validator(product) {
        console.log(product)
        let id = product.id
        let name = product.name
        let description = product.description
        let rate = product.rate
        let unit = product.unit
        let current_stock = product.current_stock
        let category = product.category
        let image = product.image
        if (id && name && description && rate && unit && current_stock && category && image) {
          return true
        } else {
          return false
        }
      }
    }
  },
  methods: {
    toURL(string) {
      return 'http://localhost:5000/' + string
    },
    async updateProduct() {},
    editProduct() {
      this.editing = true
      this.editingProduct.id = this.product.id
      this.editingProduct.name = this.product.name
      this.editingProduct.description = this.product.description
      this.editingProduct.rate = this.product.rate
    },
    cancelEdit() {
      this.editing = false
      this.editingProduct.id = null
      this.editingProduct.name = ''
      this.editingProduct.description = ''
      this.editingProduct.rate = ''
    },
    editStock() {
      this.addStock.id = this.product.id
      this.addStock.stock = this.product.current_stock
    },
    cancelStock() {
      this.addStock.id = null
      this.addStock.stock = ''
    },
    async updateStock() {
      const response = await fetch(
        `http://localhost:5000/api/manager/update_stock/${this.addStock.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.store.access_token
          },
          body: JSON.stringify({
            quantity: this.addStock.stock
          })
        }
      )
      let data = await response.json()
      if (response.ok) {
        this.store.showNotification(data.message, 'success')
        await this.managerStore.fetchProducts()
      } else {
        this.store.showNotification(data.message, 'danger')
      }
      this.cancelStock()
    }
  }
}
</script>

<template>
  <div class="card">
    <div class="card-header">
      {{ product.category.category_name }}
      <div class="dropstart" v-if="!editing && !addStock.id">
        <i class="bi bi-three-dots" data-bs-toggle="dropdown" aria-expanded="false"> </i>
        <ul class="dropdown-menu">
          <li><p class="dropdown-item" @click="editProduct">Edit</p></li>
          <li><p class="dropdown-item" @click="editStock">Edit Stock</p></li>
          <li data-bs-toggle="modal" data-bs-target="#deleteModal">
            <p class="dropdown-item text-danger">Delete</p>
          </li>
        </ul>
      </div>
    </div>
    <img class="card-img img" :src="toURL(product.image.image_path)" />
    <div v-if="!editing && !addStock.id">
      <div class="card-body" v-if="!editing && !addStock.id">
        <h3 class="card-title">
          {{ product.name }}
        </h3>
        <div class="card-subtitle">
          {{ product.description }}
        </div>
        <hr />
        <div class="card-text stock">{{ product.current_stock }} {{ product.unit }} in stock</div>
      </div>
      <div class="card-footer">
        <span class="rate" style="display: inline">{{ product.rate }}₹</span>
        per {{ product.unit }}
      </div>
    </div>
    <div v-else-if="editing">
      <div class="card-body">
        <label class="form-label" for="name">New Product Name</label>
        <input
          type="text"
          v-model="editingProduct.name"
          class="form-control"
          name="name"
          autocomplete="false"
        />
        <label class="form-label" for="Description">New Description</label>
        <input
          type="text"
          v-model="editingProduct.description"
          class="form-control"
          name="description"
        />
        <label class="form-label" for="rate">New Rate</label>
        <input
          type="number"
          v-model.number="editingProduct.rate"
          class="form-control"
          name="rate"
          autocomplete="false"
          min="0.5"
          step="0.5"
        />
      </div>

      <div class="card-footer">
        <button class="btn btn-success" @click="editing = false">Save</button>
        <button class="btn btn-danger" @click="editing = false">Cancel</button>
      </div>
    </div>
    <div v-else-if="addStock.id">
      <div class="card-body">
        <h3 class="card-title">
          {{ product.name }}
        </h3>
        <label class="form-label" for="stock">New Stock</label>
        <input
          type="number"
          v-model.number="addStock.stock"
          class="form-control"
          name="stock"
          autocomplete="false"
          min="0"
          step="1"
        />
        <div class="buttons">
          <button class="btn btn-success" @click="addStock.stock += 1">
            <i class="bi bi-plus-square text-white"></i>
          </button>
          <button
            class="btn btn-danger"
            @click="addStock.stock = addStock.stock > 1 ? addStock.stock - 1 : addStock.stock"
            :disabled="addStock.stock <= 1"
          >
            <i class="bi bi-dash-square text-white"></i>
          </button>
        </div>
      </div>
      <div class="card-footer">
        <button class="btn btn-success" @click="updateStock">Save</button>
        <button class="btn btn-danger" @click="cancelStock">Cancel</button>
      </div>
    </div>
  </div>
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
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
            Request Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import 'bootstrap-icons/font/bootstrap-icons.css';
.card {
  width: 15rem;
  margin: 1rem;
  border: 1px solid black;
}
.card-img-top {
  width: 100%;
  height: 15rem;
  object-fit: cover;
}
.rate {
  font-size: 1.5rem;
}
.card-footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.stock {
  font-size: 1.2rem;
  background-color: whitesmoke;
  border: 1px solid #a3cfbb;
  padding: 10px;
  width: 100%;
}
.card-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
i {
  font-size: 1.5rem;
  color: black;
  margin-right: 0;
}
button:hover {
  color: red;
}
.dropstart {
  position: relative;
  display: inline-block;
}
.bi-pencil {
  color: black;
  zoom: 0.5;
}
li {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 1rem;
}
</style>
