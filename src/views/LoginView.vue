<script>
import { RouterLink, RouterView } from 'vue-router'
import { useBaseStore } from '@/stores/baseStore'
import LoginForm from '@/components/LoginForm.vue'
export default {
  name: 'LoginView',
  components: {
    LoginForm
  },
  data: () => ({
    baseStore: useBaseStore()
  }),
  methods: {
    login() {
      this.baseStore.login()
    }
  }
}
</script>

<template>
  <div class="login-form">
    <LoginForm type="user" />
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
