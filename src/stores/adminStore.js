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
    async createCategory(name, description) {
      console.log('name', name)
      console.log('description', description)
      if (this.access_token) {
        const response = await fetch(`http://localhost:5000/api/admin/create_category`, {
          headers: {
            Authorization: `Bearer ${this.access_token}`,
            'Content-Type': 'application/json'
          },
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify({
            category_name: name,
            category_description: description
          })
        })
        let data = await response.json()
        if (response.ok) {
          console.log('category created')
          this.message = data.message
          await this.fetchCategories()
        } else {
          console.log(data)
          this.error = data.message
        }
      } else {
        console.log('no token')
      }
    },
    async approveCategoryRequest(categoryId) {
      if (this.access_token) {
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
          console.log('category request approved')
          await this.fetchCategoryRequests()
        } else {
          console.log(response.json())
        }
      } else {
        console.log('no token')
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
    }
  }
})
