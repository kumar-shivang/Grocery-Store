<script>
export default {
  name: "LoginForm",
  props: {
    type: {
      type: String,
      required: true,
      validator: (value) => {
        return ["admin","user","manager"].includes(value);
        }
      },
    },
  methods: {
    login() {
      console.log("ok");
    }
  },
  data: () => ({
    username: '',
    password: '',
  }),

}
</script>

<template>
  <v-form>
    <v-text-field label="username" v-model="username"></v-text-field>
    <v-text-field label="password" v-model="password"></v-text-field>
    <v-btn @click.prevent="login">Submit</v-btn>
  </v-form>

</template>

<style scoped>

</style>