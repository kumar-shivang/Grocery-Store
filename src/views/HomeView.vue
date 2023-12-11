<script>
import { useBaseStore } from '@/stores/baseStore'
import { useUserStore } from '@/stores/userStore'
import productCard from '@/components/user components/ProductCard.vue'
import sidebar from '@/components/user components/Sidebar.vue'

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
    sort: null,
    expire: {
      number: null,
      unit: 'days'
    }
  }),
  components: {
    productCard,
    sidebar
  },
  computed: {
    expiryDate() {
      if (this.expire.number) {
        let date = new Date()
        if (this.expire.unit === 'days') {
          date.setDate(date.getDate() + this.expire.number)
        } else if (this.expire.unit === 'weeks') {
          date.setDate(date.getDate() + this.expire.number * 7)
        } else if (this.expire.unit === 'months') {
          date.setMonth(date.getMonth() + this.expire.number)
        }
        return date
      } else {
        return null
      }
    },
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
        products = products.sort((a, b) => {
          if (this.sort === 0) {
            return a.rate - b.rate
          } else {
            return b.rate - a.rate
          }
        })
      }
      if (this.expire.number) {
        products = products.filter((product) => {
          return this.productExpiryDate(product) >= this.expiryDate
        })
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
  methods: {
    resetFilters() {
      this.searchQuery = ''
      this.filterCategory = ''
      this.sort = null
      this.expire.number = null
      this.expire.unit = 'days'
    },
    productExpiryDate(product) {
      let dateString = product.expiry_date
      //dateString is yyyy-mm-dd
      let dateParts = dateString.split('-')
      //dateParts[0] is year
      //dateParts[1] is month
      //dateParts[2] is day
      let dateObject = new Date(+dateParts[0], dateParts[1] - 1, +dateParts[2])
      console.log(dateObject)
      return dateObject
    }
  },
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
    <div class="d-flex flex-column w-25 shadow" id="side">
      <sidebar />
    </div>
    <div class="d-flex flex-column w-75">
      <div id="top-bar" class="d-flex flex-row align-content-center shadow-sm">
        <div id="filtering" class="d-flex flex-row">
          <div id="searchBar" class="d-flex flex-row justify-content-between w-50 m-1">
            <input
              id="searchInput"
              type="search"
              v-model="searchQuery"
              placeholder="Search products"
              class="form-control"
            />
          </div>
          <div id="filters" class="d-flex flex-row justify-content-between align-items-center w-50">
            <select class="form-select filter w-25" v-model.number="filterCategory">
              <option selected disabled value="">Category</option>
              <option value="">All</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.category_name }}
              </option>
            </select>
            <select class="form-select filter w-25" v-model.number="sort">
              <option selected disabled value="null">Price</option>
              <option value="0">Low to High</option>
              <option value="1">High to Low</option>
            </select>
            <div id="expiryDate" class="d-flex flex-row input-group w-50">
              <label for="expiryDate" class="input-group-text">Expiry Date within</label>
              <input
                type="number"
                v-model.number="expire.number"
                :placeholder="expire.unit"
                class="form-control"
              />
              <select class="form-select px-0" v-model="expire.unit" style="width: 20%">
                <option value="days" selected>Days</option>
                <option value="weeks">Weeks</option>
                <option value="months">Months</option>
              </select>
            </div>
          </div>
        </div>
        <div id="resetting">
          <h2><i class="bi bi-arrow-clockwise" @click="resetFilters"></i></h2>
        </div>
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
}
#top-bar {
  height: 5%;
  width: 100%;
}
#products {
  height: 95%;
  width: 100%;
}
#filtering {
  width: 98%;
}
#resetting {
  width: 2%;
}
.bi-arrow-clockwise {
  transition: transform 0.5s;
}
.bi-arrow-clockwise:hover {
  cursor: pointer;
  transition: tranform 0.5s;
  transform: rotate(90deg);
}
.input-group-text {
  padding-right: 0;
}
</style>
