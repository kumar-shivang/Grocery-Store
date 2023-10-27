<template>
  <div class="about">
    <login-form type="admin"></login-form>
  </div>
</template>

<style>
</style>

<script>
import LoginForm from "@/components/LoginForm.vue";
export default {
  name: 'AboutView',
  components: {
    LoginForm,
  }

}
</script>
