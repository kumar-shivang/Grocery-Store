<script>
import { useBaseStore } from '@/stores/baseStore'
import LoginForm from '@/components/LoginForm.vue'
import RegistrationForm from '@/components/RegistrationForm.vue'
export default {
  name: 'LoginView',
  components: {
    RegistrationForm,
    LoginForm
  },
  data: () => ({
    baseStore: useBaseStore(),
    signUp: false
  })
}
</script>

<template>
  <div class="login-form" v-if="!signUp">
    <LoginForm type="user" @signup-clicked="signUp = true" />
  </div>
  <div class="login-form" v-else-if="signUp">
    <RegistrationForm type="user" @login-clicked="signUp = false" />
  </div>
</template>

<style scoped>
.login-form {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
