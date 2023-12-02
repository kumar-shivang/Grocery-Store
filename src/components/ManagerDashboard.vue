<script>
import { useBaseStore } from '@/stores/baseStore'
import { useManagerStore } from '@/stores/managerStore'
import productCard from '@/components/manager dashboard components/productCard.vue'
import categoryList from '@/components/manager dashboard components/CategoryList.vue'
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
    categoryList
  },
  beforeMount() {
    this.managerStore.fetchProducts()
  },
  computed: {
    products() {
      let prod = this.managerStore.getProducts
      if (prod.length === 0) {
        this.noProducts = true
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
    <div id="title" class="w-100 d-flex flex-row">
      <h2 class="mx-auto">Manager Dashboard</h2>
    </div>
    <div id="container" class="d-flex flex-row m-0 w-100">
      <div id="left">
        <div>
          <h3>Categories</h3>
          <categoryList />
        </div>
      </div>
      <div id="right">
        <div v-if="noProducts">
          <h3>No products</h3>
        </div>
        <div v-else class="cards">
          <div v-for="product in products">
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
  border: thin solid dimgray;
  overflow: auto;
}
#right {
  width: 62%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  border: thin solid dimgray;
  overflow: auto;
}
#title {
  height: 10%;
  border: thin solid dimgray;
}
#container {
  height: 90%;
  justify-content: space-between;
}
.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 30rem;
}
</style>
