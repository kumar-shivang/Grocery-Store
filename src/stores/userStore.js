import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: {
        id: '',
        username: '',
        email: ''
      },
      products: [],
      categories: []
    }
  },
  getters: {
    getProducts() {
      return this.products
    },
    getCategories() {
      return this.categories
    }
  },
  actions: {
    async fetchProducts() {
      const response = await fetch('http://localhost:5000/api/user/get_products', {
        method: 'GET',
        mode: 'cors'
      })
      const data = await response.json()
      if (response.ok) {
        this.products = []
        data.products.forEach((product) => {
          this.products.push(product)
        })
      } else {
        console.log(data)
        this.products = []
      }
    },
    async fetchCategories() {
      const response = await fetch('http://localhost:5000/api/user/get_categories', {
        method: 'GET',
        mode: 'cors'
      })
      const data = await response.json()
      if (response.ok) {
        this.categories = []
        data.categories.forEach((category) => {
          this.categories.push(category)
        })
      } else {
        console.log(data)
        this.categories = []
      }
    }
  }
})
