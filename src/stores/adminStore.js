import { defineStore } from 'pinia'

export const useAdminStore = defineStore({
  id: 'admin',
  state: () => ({
    admin: {
      id: '',
      username: '',
      email: ''
    },
    access_token: '',
    managerRequests: []
  }),
  getters: {
    getAdmin() {
      return this.admin
    }
  },
  actions: {
    setAdmin(admin) {
      this.admin = admin
    },
    setToken(token) {
      this.access_token = token
    },
    async fetchManagerRequests() {
      if (this.access_token) {
        const response = await fetch('http://localhost:5000/api/admin/get_manager_requests', {
          headers: {
            Authorization: `Bearer ${this.access_token}`
          },
          method: 'GET',
          mode: 'cors'
        })
        if (response.ok) {
          const data = await response.json()
          this.managerRequests = data.manager_requests // manager_requests is a list of objects
        }
      }
    }
  }
})
