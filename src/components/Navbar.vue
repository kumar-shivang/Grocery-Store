<script>
import { useBaseStore } from '@/stores/baseStore'
export default {
  name: 'Navbar',
  setup() {
    const store = useBaseStore()
    console.log('Setting up store in navbar component')
    return { store }
  },
  data() {
    return {
      searchForm: {
        query: '',
        type: 'Product'
      }
    }
  },
  methods: {
    search() {
      console.log(this.searchForm)
    },
    searchTypeChange(type) {
      this.searchForm.type = type
    },
    logout() {
      this.store.logout()
    }
  },
  computed: {
    isLoggedIn() {
      return this.store.$state.isLogged
    }
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">
        <img src="@/assets/logo.svg" alt="logo" />
        <span>Grocery Store</span>
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <form v-if="store.$state.type === 'user'" class="d-flex mx-auto" role="search">
          <input
            class="form-control"
            type="search"
            placeholder="Search product or category"
            aria-label="Search"
            spellcheck="false"
            data-ms-editor="true"
            v-model="searchForm.query"
          />
          <div class="dropdown">
            <button
              class="btn btn-outline-success dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ searchForm.type }}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <div class="dropdown-item" @click="searchTypeChange('Product')">Product</div>
              </li>
              <li>
                <div class="dropdown-item" @click="searchTypeChange('Category')">Category</div>
              </li>
            </ul>
          </div>
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
              to="/manager/add_product"
              v-if="store.$state.type === 'manager' && this.$route.name !== 'add_product'"
              class="nav-link active"
            >
              Add Product
            </router-link>
            <router-link
              to="/manager"
              v-else-if="store.$state.type === 'manager' && this.$route.name === 'add_product'"
              class="nav-link active"
            >
              Dashboard
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="login" v-if="!isLoggedIn" class="nav-link active"> Login </router-link>
            <div v-else class="nav-link active" @click="logout">Logout</div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 0;
  width: var(--app-width);
  height: var(--header-height);
}
.navbar-brand {
  color: #000;
  font-size: 1.5rem;
  font-weight: 700;
  text-decoration: none;
  justify-content: center;
  align-content: center;
  align-items: center;
}
img {
  height: 50px;
  width: 50px;
  margin-right: 10px;
}
form {
  width: 50%;
}
</style>
