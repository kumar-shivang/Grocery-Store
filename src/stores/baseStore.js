import { defineStore } from 'pinia'

function getCookie() {
  let tokenExists = document.cookie
    .split(';')
    .some((item) => item.trim().startsWith('access_token='))
  let typeExists = document.cookie.split(';').some((item) => item.trim().startsWith('login_type='))
  if (tokenExists && typeExists) {
    let access_token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('access_token'))
      .split('=')[1]
    let type = document.cookie
      .split('; ')
      .find((row) => row.startsWith('login_type'))
      .split('=')[1]
    return [access_token, type]
  } else {
    return ['', 'user']
  }
}
function setCookie(token, type) {
  let expires = new Date()
  expires.setTime(expires.getTime() + 24 * 60 * 60 * 1000)
  document.cookie = `access_token=${token}; path=/; expires=${expires.toUTCString()}`
  document.cookie = `login_type=${type}; path=/; expires=${expires.toUTCString()}`
}

function deleteCookie() {
  document.cookie = `access_token=;type=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`
  document.cookie = `login_type=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`
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
      if (state.access_token !== '') {
        return true
      }
      return false
    }
  },

  actions: {
    checkLogin() {
      ;[this.access_token, this.type] = getCookie()
      console.log(this.access_token, this.type)
      if (this.access_token !== '') {
        this.isLogged = true
        return true
      }
      return false
    },
    logout() {
      this.access_token = ''
      this.user = {
        id: '',
        username: '',
        email: ''
      }
      this.type = 'user'
      this.isLogged = false
      deleteCookie()
      console.log('logged out')
    },
    setAccessToken(state, token, type) {
      this.access_token = token
      this.type = type
      setCookie(token, type)
      this.isLogged = true
    },
    async fetchAccessToken(username, password, type) {
      console.log('fetching access token')
      console.log(username, password, type)
      ;[this.access_token, this.type] = getCookie()
      if (this.access_token !== '' && this.type === type) {
        console.log('access token exists')
        this.isLogged = true
        setCookie(this.access_token, type)
        return true
      } else if (this.access_token !== '' && this.type !== type) {
        console.log('access token exists but type is different')
        this.logout()
        return false
      } else {
        console.log('access token does not exist')
        console.log(type)
        const response = await fetch('http://localhost:5000/api/login/' + type, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        })
        const data = await response.json()
        console.log('response received')
        console.log(data)
        if (data.access_token) {
          console.log('access token received')
          this.access_token = data.access_token
          this.type = type
          this.isLogged = true
          setCookie(data.access_token, type)
          return true
        } else {
          console.log('access token not received')
          this.showError(data.message)
          console.log(data)
          return false
        }
      }
    },
    showError(error) {
      this.loginError = error
      setTimeout(() => {
        this.loginError = ''
      }, 5000)
    }
  }
})
