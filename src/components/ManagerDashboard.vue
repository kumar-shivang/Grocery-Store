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
      manager: {},
      products: [],
      noProducts: false
    }
  },
  components: {
    productCard,
    categoryList
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
          <h3 class="card-title">Categories</h3>
          <categoryList :categories="categories" class="card-body" />
        </div>
      </div>
      <div id="right">
        <div v-if="noProducts">
          <h3>No products</h3>
        </div>
        <div v-else class="cards" v-for="product in products">
          <product-card :product="product" />
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
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  border: thin solid dimgray;
}
#right {
  width: 60%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  border: thin solid dimgray;
}
#title {
  height: 10%;
  border: thin solid dimgray;
}
#container {
  height: 90%;
  justify-content: space-between;
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
.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 30rem;
}
</style>
