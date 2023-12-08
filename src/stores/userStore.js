import { defineStore } from 'pinia'
import { useBaseStore } from '@/stores/baseStore'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: {
        id: '',
        username: '',
        email: ''
      },
      products: [],
      categories: [],
      unconfirmed: [],
      confirmed: []
    }
  },
  getters: {
    getProducts() {
      return this.products
    },
    getCategories() {
      return this.categories
    },
    getAccessToken() {
      let store = useBaseStore()
      return store.getAccessToken
    },
    getIsLogged() {
      let store = useBaseStore()
      return store.getIsLogged
    },
    getConfirmed() {
      return this.confirmed
    },
    getUnconfirmed() {
      return this.unconfirmed
    },
    getTotalOrderValue() {
      let total = 0
      this.unconfirmed.forEach((order) => {
        total += order.value
      })
      return total
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
    },
    async fetchUnconfirmedOrders() {
      const response = await fetch('http://localhost:5000/api/order/unconfirmed', {
        headers: {
          Authorization: `Bearer ${this.getAccessToken}`
        },
        method: 'GET',
        mode: 'cors'
      })
      const data = await response.json()
      console.log(data)
      if (response.ok) {
        this.unconfirmed = []
        data.orders.forEach((order) => {
          this.unconfirmed.push(order)
        })
      } else {
        console.log(data)
        this.unconfirmed = []
      }
    },
    async fetchConfirmedOrders() {
      const response = await fetch('http://localhost:5000/api/order/confirmed', {
        headers: {
          Authorization: `Bearer ${this.getAccessToken}`
        },
        method: 'GET',
        mode: 'cors'
      })
      const data = await response.json()
      if (response.ok) {
        this.confirmed = []
        data.orders.forEach((order) => {
          this.unconfirmed.push(order)
        })
      } else {
        console.log(data)
        this.confirmed = []
      }
    }
  }
})
