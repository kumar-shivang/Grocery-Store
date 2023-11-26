import { defineStore } from 'pinia'
import { useBaseStore } from '@/stores/baseStore'

const store = useBaseStore()

export const useManagerStore = defineStore({
  id: 'manager',
  state: () => ({
    manager: {
      id: '',
      username: '',
      email: ''
    },
    products: [],
    categories: [],
    access_token: store.access_token
  }),
  getters: {
    getManager() {
      return this.manager
    },
    getProducts() {
      return this.products
    },
    getCategories() {
      return this.categories
    }
  },
  actions: {
    setToken(token) {
      this.access_token = token
    },
    async fetchProducts() {
      if (this.access_token) {
        const response = await fetch('http://localhost:5000/api/manager/get_products', {
          headers: {
            Authorization: `Bearer ${this.access_token}`
          },
          method: 'GET',
          mode: 'cors'
        })
        let data = await response.json()
        if (response.ok) {
          this.products = data.products
          console.log(data.products)
        } else {
          console.log(data)
        }
      } else {
        console.log('no token')
      }
    },
    async fetchCategories() {
      if (this.access_token) {
        const response = await fetch('http://localhost:5000/api/user/get_categories', {
          method: 'GET',
          mode: 'cors'
        })
        let data = await response.json()
        if (response.ok) {
          this.categories = data.categories
          console.log(data.categories)
        } else {
          console.log(response)
        }
      } else {
        console.log('no token')
      }
    }
  }
})
