import { computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

function getCookie() {
  let token = document.cookie.split(';').some((item) => item.trim().startsWith('access_token='))
  if (token) {
    token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('access_token'))
      .split('=')[1]
  } else {
    token = ''
  }
  return token
}
function setCookie(token) {
  document.cookie = `access_token=${token}; path=/; SameSite=None; Secure;`
}

function deleteCookie() {
  document.cookie = `access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`
}

export const useBaseStore = defineStore('base', {
  state: () => {
    return {
      access_token: getCookie(),
      user: {
        id: '',
        username: '',
        email: ''
      },
      isLogged: false,
      loginError: ''
    }
  },
  getters: {
    getAccessToken(state) {
      return state.access_token
    },
    getUserData(state) {
      return state.user
    },
    getIsLogged(state) {
      return state.isLogged
    }
  },

  actions: {
    checkLogin() {
      this.access_token = getCookie()
      if (this.access_token !== '') {
        this.isLogged = true
      }
    },
    logout() {
      this.access_token = ''
      this.user = {
        id: '',
        username: '',
        email: ''
      }
      this.isLogged = false
      deleteCookie()
    },
    async getUser(state, userType) {
      if (this.access_token === '') {
        return
      }
      await axios
        .get('http://localhost:5000/api/' + userType, {
          headers: {
            Authorization: `Bearer ${this.access_token}`
          }
        })
        .then((response) => {
          this.user = response.data
          this.isLogged = true
        })
        .catch((error) => {
          console.log(error)
        })
    },
    setAccessToken(state, token) {
      this.access_token = token
      setCookie(token)
    },
    async fetchAccessToken(username, password, type) {
      this.access_token = getCookie()
      if (this.access_token === '') {
        const response = await fetch('http://localhost:5000/api/login/' + type, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username,
            password: password
          })
        })
        const data = await response.json()
        if (data.access_token) {
          this.access_token = data.access_token
          setCookie(data.access_token)
          this.isLogged = true
          this.loginError = ''
        } else {
          this.loginError = data.message
        }
      } else {
        this.isLogged = true
      }
    }
  }
})
