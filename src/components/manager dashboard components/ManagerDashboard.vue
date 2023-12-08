<script>
import { useBaseStore } from '@/stores/baseStore'
import { useManagerStore } from '@/stores/managerStore'
import productCard from '@/components/manager dashboard components/productCard.vue'
import categoryList from '@/components/manager dashboard components/CategoryList.vue'
import addProductForm from '@/components/manager dashboard components/addProductForm.vue'
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
      manager: {}
    }
  },
  components: {
    productCard,
    categoryList,
    addProductForm
  },
  beforeMount() {
    this.managerStore.fetchProducts()
  },
  computed: {
    products() {
      let prod = this.managerStore.getProducts
      if (prod.length === 0) {
        return []
      }
      return prod
    },
    noProducts() {
      return this.managerStore.getProducts.length === 0
    }
  }
}
</script>

<template>
  <div id="dashboard">
    <div id="title" class="w-100 d-flex flex-row shadow-sm">
      <h2 class="mx-auto">Manager Dashboard</h2>
    </div>
    <div id="container" class="d-flex flex-row m-0 w-100">
      <div id="left" class="d-flex flex-column shadow">
        <div id="top-left" class="d-flex flex-column overflow-y-scroll overflow-x-hidden">
          <h3 class="mx-auto">Categories</h3>
          <categoryList />
        </div>
        <div id="bottom-left " class="overflow-y-auto">
          <addProductForm />
        </div>
      </div>
      <div id="right">
        <div v-if="!products">
          <h3>No products</h3>
        </div>
        <div v-else class="cards">
          <div v-for="product in products" :key="product.id">
            <product-card :product="product" />
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
  width: 38%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
}
#right {
  width: 62%;
}
#title {
  height: 10%;
  justify-content: center;
  align-items: center;
}
#container {
  height: 90%;
  justify-content: space-between;
}
.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: start;
  width: 100%;
  height: 100%;
  overflow: auto;
  scroll-behavior: smooth;
}
#top-left {
  height: 50%;
}
#bottom-left {
  height: 50%;
  width: 100%;
}
</style>
