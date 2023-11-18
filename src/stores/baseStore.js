import { defineStore } from 'pinia'

function getCookie() {
  let token = document.cookie.split(';').some((item) => item.trim().startsWith('access_token='))
  let type = document.cookie.split(';').some((item) => item.trim().startsWith('type='))
  if (token && type) {
    token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('access_token'))
      .split('=')[1]
    type = document.cookie
      .split('; ')
      .find((row) => row.startsWith('type'))
      .split('=')[1]
  } else {
    token = ''
    type = 'user'
  }
  return [token, type]
}
function setCookie(token, type) {
  document.cookie = `access_token=${token};type=${type}; path=/; SameSite=None; Secure;HttpOnly;`
}

function deleteCookie() {
  document.cookie = `access_token=;type=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`
}

export const useBaseStore = defineStore('base', {
  state: () => {
    return {
      access_token: getCookie()[0],
      user: {
        id: '',
        username: '',
        email: ''
      },
      isLogged: false,
      loginError: '',
      type: getCookie()[1]
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
      ;[this.access_token, this.type] = getCookie()
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
    setAccessToken(state, token, type) {
      this.access_token = token
      setCookie(token, type)
    },
    async fetchAccessToken(username, password, type) {
      ;[this.access_token, this.type] = getCookie()
      if (this.access_token === '') {
        try {
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
          if (!response.ok) {
            throw new Error('Something went wrong!')
          }
          const data = await response.json()
          this.access_token = data.access_token
          this.type = type
          setCookie(data.access_token, type)
          this.isLogged = true
        } catch (error) {
          console.log(error)
        }
      } else {
        this.isLogged = true
      }
    },
    showError(error) {
      this.loginError = error
      setTimeout(() => {
        this.loginError = ''
      }, 3000)
    }
  }
})
