<script>
import { useBaseStore } from '@/stores/baseStore'
import { useManagerStore } from '@/stores/managerStore'
import categoryRequestForm from '@/components/manager dashboard components/CategoryRequestForm.vue'
export default {
  name: 'ManagerDashboard',
  setup() {
    const baseStore = useBaseStore()
    const managerStore = useManagerStore()
    managerStore.setToken(baseStore.access_token)
    return { baseStore, managerStore }
  },
  data() {
    return {
      manager: {},
      categories: [],
      products: [],
      noCategories: false,
      noProducts: false
    }
  },
  components: {
    categoryRequestForm
  },
  mounted() {
    this.managerStore
      .fetchProducts()
      .then(() => {
        this.products = this.managerStore.products
        if (this.products.length === 0) {
          this.noProducts = true
        }
      })
      .catch((error) => {
        console.log(error)
      })
    this.managerStore
      .fetchCategories()
      .then(() => {
        this.categories = this.managerStore.categories
        if (this.categories.length === 0) {
          this.noCategories = true
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>

<template>
  <div id="dashboard">
    <div id="title" class="w-100 d-flex flex-row align-items-center">
      <h2 class="mx-auto">Manager Dashboard</h2>
    </div>
    <div id="container" class="d-flex flex-row m-0 w-100">
      <div id="left">
        <div id="top-left">
          <h1>Top Left</h1>
          <div v-if="noCategories">
            <h3>No categories</h3>
          </div>
          <div v-else>
            <div v-for="category in categories" :key="category.id">
              <h3>
                {{ category.category_name }}
              </h3>
            </div>
          </div>
        </div>
        <div id="bottom-left">
          <categoryRequestForm />
        </div>
      </div>
      <div id="right">
        <div v-if="noProducts">
          <h3>No products</h3>
        </div>
        <div v-else>
          <div v-for="product in products" :key="product.id">
            <h3>
              {{ product.product_name }}
            </h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#dashboard {
  width: var(--app-width);
  height: var(--main-height);
}
#left {
  width: 50%;
  //height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  border: thin solid dimgray;
  //padding: 1rem;
}
#right {
  width: 50%;
  //height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  border: thin solid dimgray;
  //padding: 1rem;
}
#title {
  height: 10%;
  border: thin solid dimgray;
}
#container {
  height: 90%;
}
#top-left {
  height: 70%;
  width: 100%;
  border: thin solid dimgray;
}
#bottom-left {
  height: 30%;
  width: 100%;
  border: thin solid dimgray;
}
</style>
