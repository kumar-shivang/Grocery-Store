<script>
import { Form, Field, ErrorMessage } from 'vee-validate'
import { useBaseStore } from '@/stores/baseStore'
import HomeView from '@/views/HomeView.vue'
export default {
  name: 'LoginForm',
  components: {
    HomeView,
    Form,
    Field,
    ErrorMessage
  },
  props: {
    type: {
      type: String,
      required: true,
      validator: (value) => {
        return ['user', 'admin', 'manager'].includes(value)
      }
    }
  },
  data() {
    return {
      store: useBaseStore(),
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      console.log(this.form)
      this.store.fetchAccessToken(this.form.username, this.form.password, this.type)
    },
    validateUsername(username) {
      if (!username) {
        return 'Username is required'
      } else if (username.length < 4) {
        return 'Username must be at least 4 characters long'
      } else if (username.length > 20) {
        return 'Username must be at most 20 characters long'
      } else {
        return true
      }
    },
    validatePassword(password) {
      if (!password) {
        return 'Password is required'
      } else if (password.length < 8) {
        return 'Password must be at least 8 characters long'
      } else if (password.length > 20) {
        return 'Password must be at most 20 characters long'
      } else {
        return true
      }
    }
  }
}
</script>
<template>
  <Form class="form-control d-flex flex-column" @submit="login">
    <div class="mx-auto">
      <h1>{{ type[0].toUpperCase() + type.slice(1) }} Login</h1>
    </div>
    <div class="form-group">
      <label for="username" class="form-label mb-1">Username</label>
      <Field
        name="username"
        label="Username"
        type="text"
        v-model="form.username"
        :rules="validateUsername"
        class="form-control mb-3"
        id="username"
      />
      <div class="mb-2">
        <ErrorMessage name="username" class="text-danger" />
      </div>
    </div>
    <div class="form-group">
      <label for="password" class="form-label mb-1">Password</label>
      <Field
        name="password"
        label="Password"
        type="password"
        v-model="form.password"
        :rules="validatePassword"
        class="form-control mb-3"
        id="password"
      />
      <div class="mb-2">
        <ErrorMessage name="password" class="text-danger" />
      </div>
    </div>
    <div class="d-flex flex-column align-items-center">
      <button class="btn btn-lg btn-primary w-75 mb-2" @click="login">Login</button>
      <button
        class="btn btn-lg btn-light btn-outline-primary w-75 mb-2 btn"
        @click="$router.push('register')"
      >
        Sign Up
      </button>
    </div>
  </Form>
</template>

<style scoped>
.form-control {
  width: 50%;
  margin: auto;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
