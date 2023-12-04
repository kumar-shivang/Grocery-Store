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
    },
    getType(state) {
      return state.type
    }
  },
  actions: {
    async getUser() {
      const response = await fetch('http://localhost:5000/api/login/get_user', {
        headers: {
          Authorization: `Bearer ${this.access_token}`
        },
        method: 'GET',
        mode: 'cors'
      })
      const data = await response.json()
      if (response.ok) {
        return {
          id: data.id,
          username: data.username,
          email: data.email
        }
      } else {
        console.log(data)
        return {
          id: '',
          username: '',
          email: ''
        }
      }
    },
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
          this.user = await this.getUser()
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
      deleteCookie()
      this.access_token = ''
      this.user = {
        id: '',
        username: '',
        email: ''
      }
      this.isLogged = false
      this.type = 'user'
      console.log('logged out')
    },
    setAccessToken(state, token, type) {
      this.access_token = token
      this.type = type
      this.isLogged = true
    },
    async fetchAccessToken(username, password, type) {
      ;[this.access_token, this.type] = getCookie()
      if (this.access_token !== '' && this.type === type) {
        this.isLogged = true
        return true
      } else if (this.access_token !== '' && this.type !== type) {
        this.logout()
        return false
      } else {
        const response = await fetch('http://localhost:5000/api/login/' + type, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        })
        const data = await response.json()
        if (data.access_token) {
          this.access_token = data.access_token
          this.type = type
          this.isLogged = true
          setCookie(data.access_token, type)
          return true
        } else {
          this.showError(data.message)
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
