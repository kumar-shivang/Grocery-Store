import { defineStore } from 'pinia'

export const useAdminStore = defineStore({
  id: 'admin',
  state: () => ({
    admin: {
      id: '',
      username: '',
      email: ''
    }
  }),
  getters: {
    getAdmin() {
      return this.admin
    }
  },
  actions: {
    setAdmin(admin) {
      this.admin = admin
    }
  }
})
