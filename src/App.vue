<script setup>
// import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
<v-app>
  <v-app-bar rounded elevation="2">
    <v-app-bar-title>
    <v-img class="logo" src="./src/assets/logo.svg" alt="logo" inline=true></v-img>
      <div class="title">Grocery App</div>
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn text to="/">Home</v-btn>
    <v-btn text to="/about">About</v-btn>
  </v-app-bar>
  <v-main>
    <router-view></router-view>
  </v-main>
</v-app>
</template>

<style scoped>
.logo {
  width: 30px;
  height: 30px;
  max-width: inherit;
  max-height: inherit;
  margin-right: 10px;

}
.title {
  font-size: 20px;
}
</style>
