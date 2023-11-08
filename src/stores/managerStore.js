import { defineStore } from 'pinia'

export const useManagerStore = defineStore({
  id: 'manager',
  state: () => ({
    manager: {
      id: '',
      username: '',
      email: ''
    },
    products: [],
    categories: []
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
    fetchManager() {
      return true
    }
  }
})
