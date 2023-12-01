import { defineStore } from 'pinia'
import { useBaseStore } from '@/stores/baseStore'

const store = useBaseStore()

export const useAdminStore = defineStore({
  id: 'admin',
  state: () => ({
    admin: {
      id: '',
      username: '',
      email: ''
    },
    access_token: store.access_token,
    managerRequests: [],
    categoryRequests: [],
    categories: [],
    noCategoryRequests: false,
    noManagerRequests: false,
    message: '',
    error: ''
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
        } else if (response.status === 404) {
          this.noManagerRequests = true
          console.log(response.json())
        }
      } else {
        console.log('no token')
      }
    },
    async fetchCategoryRequests() {
      if (this.access_token) {
        const response = await fetch('http://localhost:5000/api/admin/get_category_requests', {
          headers: {
            Authorization: `Bearer ${this.access_token}`
          },
          method: 'GET',
          mode: 'cors'
        })
        if (response.ok) {
          const data = await response.json()
          this.categoryRequests = data.category_requests // category_requests is a list of objects
        } else if (response.status === 404) {
          this.noCategoryRequests = true
          console.log(response.json())
        } else {
          console.log(response.json())
        }
      } else {
        console.log('no token')
      }
    },
    async fetchCategories() {
      if (this.access_token) {
        const response = await fetch('http://localhost:5000/api/user/get_categories', {
          headers: {
            // Authorization: `Bearer ${this.access_token}`
          },

          method: 'GET',
          mode: 'cors'
        })
        if (response.ok) {
          const data = await response.json()
          this.categories = data.categories // categories is a list of objects
        } else {
          console.log(response.json())
        }
      } else {
        console.log('no token')
      }
    },
    async approveManagerRequest(managerId) {
      console.log('managerId', managerId)
      if (this.access_token) {
        const response = await fetch(
          `http://localhost:5000/api/admin/approve_manager_request/${managerId}`,
          {
            headers: {
              Authorization: `Bearer ${this.access_token}`
            },
            method: 'PUT',
            mode: 'cors'
          }
        )
        if (response.ok) {
          console.log('manager request approved')
          await this.fetchManagerRequests()
        } else {
          console.log(response.json())
        }
      } else {
        console.log('no token')
      }
    },
    async rejectManagerRequest(managerId) {
      if (this.access_token) {
        const response = await fetch(
          `http://localhost:5000/api/admin/reject_manager_request/${managerId}`,
          {
            headers: {
              Authorization: `Bearer ${this.access_token}`
            },
            method: 'PUT',
            mode: 'cors'
          }
        )
        if (response.ok) {
          console.log('manager request rejected')
          await this.fetchManagerRequests()
        } else {
          console.log(response.json())
        }
      } else {
        console.log('no token')
      }
    },
    async approveCategoryRequest(categoryId, type) {
      if (this.access_token) {
        if (type === 'add') {
          const response = await fetch(
            `http://localhost:5000/api/admin/approve_category/${categoryId}`,
            {
              headers: {
                Authorization: `Bearer ${this.access_token}`
              },
              method: 'PUT',
              mode: 'cors'
            }
          )
          if (response.ok) {
            store.showNotification('Category approved', 'success')
            await this.fetchCategoryRequests()
          } else {
            store.showNotification('Something went wrong', 'danger')
            await this.fetchCategoryRequests()
          }
        }
        if (type === 'delete') {
          const response = await fetch(
            `http://localhost:5000/api/admin/approve_delete_category/${categoryId}`,
            {
              headers: {
                Authorization: `Bearer ${this.access_token}`
              },
              method: 'POST',
              mode: 'cors'
            }
          )
          let data = await response.json()
          if (response.ok) {
            store.showNotification('Category deleted', 'success')
          } else {
            store.showNotification(data.message, 'danger')
          }
        }
      }
    },
    async rejectCategoryRequest(categoryId) {
      if (this.access_token) {
        const response = await fetch(
          `http://localhost:5000/api/admin/reject_category/${categoryId}`,
          {
            headers: {
              Authorization: `Bearer ${this.access_token}`
            },
            method: 'PUT',
            mode: 'cors'
          }
        )
        if (response.ok) {
          console.log('category request rejected')
          await this.fetchCategoryRequests()
        } else {
          console.log(response.json())
        }
      } else {
        console.log('no token')
      }
      await this.fetchCategoryRequests()
    }
  }
})
