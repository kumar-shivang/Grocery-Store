<script>
import { useBaseStore } from '@/stores/baseStore'
import { useUserStore } from '@/stores/userStore'
import productCard from '@/components/user components/ProductCard.vue'

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
    filterCategory: ''
  }),
  components: {
    productCard
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
      return products
    },
    categories() {
      return this.userStore.getCategories
    }
  },
  methods: {},
  beforeMount() {
    if (!this.baseStore.getAccessToken) {
      this.user.id = null
      this.user.username = 'Guest'
      this.user.email = ''
      this.userStore.fetchProducts()
      this.userStore.fetchCategories()
      this.baseStore.type = 'user'
    } else {
      if (this.baseStore.checkLogin('manager')) {
        this.$router.push('/manager')
      } else if (this.baseStore.checkLogin('admin')) {
        this.$router.push('/admin')
      } else if (this.baseStore.checkLogin('user')) {
        let user = this.baseStore.getUser()
        this.user.id = user.id
        this.user.username = user.username
        this.user.email = user.email
        this.userStore.fetchProducts()
        this.userStore.fetchCategories()
      } else {
      }
    }
  }
}
</script>

<template>
  <div class="d-flex flex-row w-100 main">
    <div class="d-flex flex-column overflow-auto w-25"></div>
    <div class="d-flex flex-column w-75">
      <div id="searchBar" class="d-flex flex-row justify-content-between mx-3">
        <input
          type="search"
          v-model="searchQuery"
          placeholder="Search products"
          class="form-control"
          style="width: 50%; height: 80%"
        />
        <select class="form-select" style="width: 20%" v-model="filterCategory">
          <option selected disabled value="">Filter by</option>
          <option value="">All</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.category_name }}
          </option>
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
}
</style>
