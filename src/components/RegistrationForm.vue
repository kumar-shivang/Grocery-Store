<script>
import { Form, Field, ErrorMessage } from 'vee-validate'
export default {
  name: 'SignUpForm',
  components: {
    Form,
    Field,
    ErrorMessage
  },
  props: {
    type: {
      type: String,
      required: true,
      validator: (value) => {
        return ['user', 'manager'].includes(value)
      },
      default: 'user'
    }
  },
  data() {
    return {
      form: {
        username: '',
        password: '',
        email: ''
      }
    }
  },

  methods: {
    signup() {
      console.log(this.form)
      console.log(this.type)
    },
    validateUsername(username) {
      if (!username) {
        return 'Username is required'
      } else if (username.length < 4) {
        return 'Username must be at least 4 characters long'
      } else if (username.length > 20) {
        return 'Username must be at most 20 characters long'
      } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
        return 'Username must contain only alphanumeric characters'
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
      } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/.test(password)) {
        return 'Password must contain at least one lowercase letter, one uppercase letter, one numeric digit.'
      } else {
        return true
      }
    },
    validateEmail(email) {
      if (!email) {
        return 'Email is required'
      } else if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
        return 'Email is invalid'
      } else {
        return true
      }
    }
  }
}
</script>

<template>
  <Form class="form-control d-flex flex-column" @submit.prevent="signup">
    <h1 class="text-center">Sign Up</h1>
    <div class="form-group">
      <label for="username" class="form-label mb-1">Username</label>
      <Field
        name="username"
        label="Username"
        :rules="[validateUsername]"
        v-model="form.username"
        class="form-control mb3"
        id="username"
      />
      <ErrorMessage name="username" class="text-danger" />
    </div>
    <div class="form-group">
      <label for="password" class="form-label mb-2">Password</label>
      <Field
        name="password"
        label="Password"
        :rules="[validatePassword]"
        v-model="form.password"
        class="form-control mb3"
      />
      <ErrorMessage name="password" class="text-danger mx-auto" />
    </div>
    <div class="form-group">
      <label for="email" class="form-label mb-2">Email</label>
      <Field
        name="email"
        label="Email"
        :rules="[validateEmail]"
        v-model="form.email"
        class="form-control mb-3"
      />
      <ErrorMessage name="email" class="text-danger mx-auto" />
    </div>
    <div class="d-flex flex-row">
      <button type="submit" class="btn btn-lg btn-primary w-75 mx-auto">Sign Up</button>
    </div>
    <div class="mx-auto">Already have an account? <router-link to="login">Login</router-link></div>
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
.form-group {
  margin: 10px;
}
</style>
