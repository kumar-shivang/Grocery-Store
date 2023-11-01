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
  document.cookie = `access_token=${token}; path=/;`
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
      isLogged: false
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
    }
  }
})
