<script>
import { useBaseStore } from '@/stores/baseStore'
import { useUserStore } from '@/stores/userStore'
import productCard from '@/components/user components/ProductCard.vue'
import sidebar from '@/components/user components/sidebar.vue'

export default {
  name: 'HomeView',
  setup() {
    const baseStore = useBaseStore()
    const userStore = useUserStore()
    return { baseStore, userStore }
  },
  data: () => ({
    user: {
      id: null,
      username: '',
      email: ''
    },
    searchQuery: '',
    filterCategory: '',
    sort: null
  }),
  components: {
    productCard,
    sidebar
  },
  computed: {
    products() {
      let products = this.userStore.getProducts
      if (this.filterCategory) {
        products = products.filter((product) => {
          return product.category.id === this.filterCategory
        })
      }
      if (this.searchQuery) {
        products = products.filter((product) => {
          return product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        })
      }
      if ([0, 1].includes(this.sort)) {
        console.log('Sorting')
        products = products.sort((a, b) => {
          if (this.sort === 0) {
            return a.rate - b.rate
          } else {
            return b.rate - a.rate
          }
        })
      } else {
        console.log('Not sorting')
      }
      return products
    },
    categories() {
      return this.userStore.getCategories
    },
    access_token() {
      return this.baseStore.getAccessToken
    },
    loggedIn() {
      return this.baseStore.getIsLogged
    },
    type() {
      return this.baseStore.getType
    }
  },
  methods: {},
  beforeMount() {
    if (this.loggedIn) {
      if (this.type === 'user') {
        this.userStore.fetchProducts()
        this.userStore.fetchCategories()
      } else if (this.type === 'manager') {
        this.$router.push('/manager')
      } else if (this.type === 'admin') {
        this.$router.push('/admin')
      }
    } else {
      this.userStore.fetchProducts()
      this.userStore.fetchCategories()
    }
  }
}
</script>

<template>
  <div class="d-flex flex-row w-100 main">
    <div class="d-flex flex-column overflow-auto w-25">
      <sidebar />
    </div>
    <div class="d-flex flex-column w-75">
      <div id="searchBar" class="d-flex flex-row justify-content-between mx-3">
        <input
          type="search"
          v-model="searchQuery"
          placeholder="Search products"
          class="form-control"
          style="width: 50%; height: 80%"
        />
        <span>Filters</span>
        <select class="form-select" style="width: 20%" v-model.number="filterCategory">
          <option selected disabled value="">Category</option>
          <option value="">All</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.category_name }}
          </option>
        </select>
        <select class="form-select" v-model.number="sort" style="width: 20%">
          <option selected disabled value="null">Price</option>
          <option value="0">Low to High</option>
          <option value="1">High to Low</option>
        </select>
      </div>
      <div id="products" class="d-flex flex-row overflow-auto flex-wrap">
        <productCard v-for="product in products" :key="product.id" :product="product" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  height: var(--main-height);
  background-color: mintcream;
}
#searchBar {
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  height: 5%;
}
#products {
  height: 90%;
  scroll-behavior: smooth;
}
</style>
