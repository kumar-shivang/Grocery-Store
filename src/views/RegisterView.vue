<script>
import { RouterLink, RouterView } from 'vue-router'
import { useBaseStore } from '@/stores/baseStore'
import RegistrationForm from '@/components/RegistrationForm.vue'
export default {
  name: 'RegisterView',
  components: {
    RegistrationForm
  },
  data: () => ({
    baseStore: useBaseStore()
  })
}
</script>

<template>
  <div class="signup-form">
    <RegistrationForm type="user" />
  </div>
</template>

<style scoped>
.signup-form {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
