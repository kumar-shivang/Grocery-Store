<script>
import { useManagerStore } from '@/stores/managerStore'
import { useBaseStore } from '@/stores/baseStore'
import { ErrorMessage, Field, Form } from 'vee-validate'

export default {
  name: 'AddProductForm',
  setup() {
    const managerStore = useManagerStore()
    const baseStore = useBaseStore()
    return { managerStore, baseStore }
  },
  components: {
    Form,
    Field,
    ErrorMessage
  },
  data() {
    return {
      product_name: '',
      product_description: '',
      product_rate: '',
      product_stock: '',
      product_category: '',
      product_unit: '',
      expiry_date: new Date(),
      useDefaultImage: false,
      imageUpload: {
        previewImage: null,
        fileToUpload: null,
        done: false,
        alert: ''
      },
      image: {
        id: 1,
        url: ''
      }
    }
  },
  computed: {
    categories() {
      return this.managerStore.categories
    }
  },
  methods: {
    async createProduct() {
      const response = await fetch('http://localhost:5000/api/manager/create_product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.managerStore.access_token
        },
        body: JSON.stringify({
          name: this.product_name,
          rate: this.product_rate,
          unit: this.product_unit,
          description: this.product_description,
          category_id: this.product_category,
          image_id: this.image.id,
          expiry_date: this.expiry_date,
          current_stock: this.product_stock
        })
      })
      let data = await response.json()
      if (response.ok) {
        this.baseStore.showNotification(data.message, 'success')
        await this.managerStore.fetchProducts()
      } else {
        this.baseStore.showNotification(data.message, 'danger')
      }
    },
    validateProductName(product_name) {
      if (!product_name) {
        return 'Product name is required'
      } else if (product_name.length < 4) {
        return 'Product name must be at least 4 characters long'
      } else if (product_name.length > 20) {
        return 'Product name must be at most 20 characters long'
      } else {
        return true
      }
    },
    validateProductDescription(product_description) {
      if (!product_description) {
        return 'Product description is required'
      } else if (product_description.length < 20) {
        return 'Product description must be at least 20 characters long'
      } else if (product_description.length > 140) {
        return 'Product description must be at most 140 characters long'
      } else {
        return true
      }
    },
    handleFileChange(e) {
      console.log('Handling file change')
      this.imageUpload.fileToUpload = e.target.files[0]
      if (this.imageUpload.fileToUpload.size <= 2097152) {
        console.log('Image size is less than 2MB')
        console.log(this.imageUpload.fileToUpload.size / 1048576 + 'MB')
        const reader = new FileReader()
        reader.onload = (e) => {
          this.imageUpload.previewImage = e.target.result
        }
        reader.readAsDataURL(this.imageUpload.fileToUpload)
      } else {
        this.imageUpload.alert = 'Image size must be less than 2MB'
        this.imageUpload.fileToUpload = null
      }
    },
    async uploadImage(e) {
      e.preventDefault()
      const formData = new FormData()
      formData.append('image', this.imageUpload.fileToUpload)
      const response = await fetch('http://localhost:5000/api/image/upload', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + this.managerStore.access_token
        },
        body: formData
      })
      let data = await response.json()
      console.log(data)
      if (response.ok) {
        this.imageUpload.done = true
        this.imageUpload.previewImage = null
        this.imageUpload.fileToUpload = null
        this.imageUpload.alert = data.message
        this.image = data.image
      } else {
        this.imageUpload.previewImage = null
        this.imageUpload.fileToUpload = null
        this.imageUpload.alert = data.message
      }
    },
    async deleteImage() {
      return await fetch('http://localhost:5000/api/image/delete/' + this.image.id, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + this.managerStore.access_token
        }
      })
    },
    async imageReset() {
      if (this.imageUpload.done) {
        let response = await this.deleteImage()
        let data = response.json()
        if (response.ok) {
          this.imageUpload.done = false
          this.imageUpload.previewImage = null
          this.imageUpload.fileToUpload = null
          this.image = {
            id: 1,
            url: ''
          }
        } else {
          this.imageUpload.alert = data.message
        }
      } else {
        this.imageUpload.previewImage = null
        this.imageUpload.fileToUpload = null
        this.imageUpload.alert = ''
      }
      this.useDefaultImage = false
    }
  }
}
</script>

<template>
  <div class="form">
    <h3>Create Product</h3>
    <!--    form for uploading image -->
    <form id="uploadImage" class="form-group d-flex flex-row" v-if="!useDefaultImage">
      <label for="product_image">Product Image</label>
      <input
        id="product_image"
        name="product_image"
        type="file"
        class="form-control"
        @change="handleFileChange"
        accept="image/*"
        :disabled="imageUpload.done"
      />
      <button
        id="uploadButton"
        class="btn btn-primary"
        @click="uploadImage"
        :disabled="imageUpload.done"
      >
        Upload Image
      </button>
      <!-- Reset Image--->
      <i class="bi bi-arrow-clockwise" @click="imageReset" id="resetImage"></i>
    </form>
    <!--- Image Upload Alert --->
    <div v-show="imageUpload.alert" :class="imageUpload.done ? 'text-success' : 'text-danger'">
      {{ imageUpload.alert }}
    </div>
    <!--    Image preview -->
    <div v-if="imageUpload.previewImage && !useDefaultImage">
      <h4>Preview Image</h4>
      <img :src="imageUpload.previewImage" alt="preview Image" />
    </div>
    <!-- Use Default Image --->
    <div v-if="!imageUpload.done">
      <input type="checkbox" v-model="useDefaultImage" id="useDefault" class="me-2" />
      <label for="useDefault">Use default image</label>
    </div>
    <!--    Product Creation Form-->
    <Form @submit="createProduct">
      <div class="form-group">
        <label for="product_name">Product Name</label>
        <Field
          id="product_name"
          name="product_name"
          type="text"
          class="form-control"
          v-model="product_name"
          :rules="validateProductName"
        />
        <ErrorMessage name="product_name" class="text-danger" />
      </div>
      <div class="form-group">
        <label for="product_description">Product Description</label>
        <Field
          id="product_description"
          name="product_description"
          type="text"
          class="form-control"
          v-model="product_description"
          :rules="validateProductDescription"
        />
        <ErrorMessage name="product_description" class="text-danger" />
      </div>
      <div class="d-flex flex-row rate">
        <div class="form-group rate-group">
          <label for="product_rate">Product Price</label>
          <Field
            id="product_rate"
            name="product_rate"
            type="number"
            class="form-control"
            v-model="product_rate"
            placeholder="0.5"
            min="0.5"
            step="0.5"
          />
        </div>
        <p class="m-auto">Rs per</p>
        <div class="form-group rate-group d-flex flex-column justify-content-end">
          <select id="product_unit" name="product_unit" class="form-select" v-model="product_unit">
            <option selected disabled value="">Choose Unit</option>
            <option value="kg">Kilogram</option>
            <option value="litre">Litre</option>
            <option value="unit">Unit</option>
          </select>
        </div>
      </div>
      <div class="d-flex flex-row w-100 justify-content-between">
        <div class="form-group cat-stock w-50 d-flex flex-column justify-content-end mb-0">
          <select
            id="product_category"
            name="product_category"
            type="option"
            class="form-select"
            v-model="product_category"
          >
            <option selected disabled value="">Product Category</option>
            <option v-for="category in categories" :value="category.id" :key="category.id">
              {{ category.category_name }}
            </option>
          </select>
        </div>
        <div id="stockGroup" class="input-group cat-stock d-flex flex-column">
          <label for="stock" class="mx-2">Stock</label>
          <div id="stockInput" class="d-flex flex-row">
            <input
              id="stock"
              type="number"
              v-model="product_stock"
              min="1"
              step="1"
              class="form-control"
            />
            <span id="stockUnit" class="input-group-text">
              {{ product_unit }}
            </span>
          </div>
        </div>
      </div>
      <div class="form-group my-3">
        <label for="date">Expiry Date</label>
        <Field
          type="date"
          v-model="expiry_date"
          class="form-control w-50"
          name="date"
          id="expiryDate"
        />
      </div>
      <button
        type="submit"
        class="btn btn-primary"
        :disabled="!imageUpload.done && !useDefaultImage"
      >
        Create Product
      </button>
      <button type="reset" class="btn btn-outline-dark" @click="imageReset">
        Reset<i class="bi bi-arrow-clockwise" />
      </button>
    </Form>
  </div>
</template>

<style scoped>
.form {
  width: 100%;
  margin: 0 auto;
  border: thin solid dimgray;
  padding: 2rem;
}
.rate {
  justify-content: space-between;
  width: 100%;
}
.rate-group {
  width: 40%;
}
.form-group {
  margin-bottom: 1rem;
}
#uploadImage {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
#product_image {
  height: 2.5rem;
  width: 80%;
  margin-right: 1rem;
}
#uploadButton {
  height: 2.5rem;
  width: 20%;
}
img {
  height: 10rem;
  width: 10rem;
}
#resetImage {
  font-size: 2rem;
  cursor: pointer;
}
#resetImage:hover {
  rotate: 180deg;
}
button:hover {
  cursor: pointer;
  zoom: 105%;
}
button {
  margin-right: 1rem;
}
#stockGroup {
  width: 40%;
}
#stockUnit {
  width: 20%;
}
#product_description {
  height: 4rem;
}
</style>
