import { defineStore } from 'pinia'

function getCookie() {
  let tokenExists = document.cookie
    .split(';')
    .some((item) => item.trim().startsWith('access_token='))
  let typeExists = document.cookie.split(';').some((item) => item.trim().startsWith('login_type='))
  if (tokenExists && typeExists) {
    console.log('both cookies exist')
    let access_token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('access_token'))
      .split('=')[1]
    let type = document.cookie
      .split('; ')
      .find((row) => row.startsWith('login_type'))
      .split('=')[1]
    console.log(access_token, type)
    return [access_token, type]
  } else {
    console.log('cookie does not exist')
    return ['', 'user']
  }
}
function setCookie(token, type) {
  console.log('setting cookie')
  let expires = new Date()
  expires.setTime(expires.getTime() + 24 * 60 * 60 * 1000)
  document.cookie = `access_token=${token}; path=/; expires=${expires.toUTCString()}`
  document.cookie = `login_type=${type}; path=/; expires=${expires.toUTCString()}`
}

function deleteCookie() {
  document.cookie = `access_token=;type=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`
  document.cookie = `login_type=user; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`
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
      type: getCookie()[1],
      notification: {
        message: '',
        type: '',
        show: false
      }
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
      return state.access_token !== ''
    }
  },

  actions: {
    async checkLogin(type) {
      let access_token = getCookie()[0]
      if (access_token !== '') {
        const response = await fetch('http://localhost:5000/api/login/check_token/' + type, {
          headers: {
            Authorization: `Bearer ${this.access_token}`
          },
          method: 'GET',
          mode: 'cors'
        })
        if (response.ok) {
          console.log('token is valid')
          this.isLogged = true
          this.type = type
          this.access_token = access_token
          setCookie(access_token, type)
          return true
        } else {
          console.log('token is invalid')
          this.logout()
          this.type = type
          return false
        }
      } else {
        console.log('token does not exist')
        this.logout()
        this.type = type
        return false
      }
    },
    logout() {
      console.log('logging out')
      this.access_token = ''
      this.user = {
        id: '',
        username: '',
        email: ''
      }
      this.isLogged = false
      this.type = 'user'
      deleteCookie()
      console.log('logged out')
    },
    setAccessToken(state, token, type) {
      this.access_token = token
      this.type = type
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
          console.log('cookie set to: ' + document.cookie)
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
    },
    showNotification(message, type) {
      this.notification.message = message
      this.notification.type = type
      this.notification.show = true
      setTimeout(() => {
        this.notification.show = false
        this.notification.message = ''
        this.notification.type = ''
      }, 5000)
    },
    hideNotification() {
      this.notification.show = false
      this.notification.message = ''
      this.notification.type = ''
    }
  }
})
