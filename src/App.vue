<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { VSpacer } from 'vuetify/components'
import { VToolbar, VToolbarTitle } from 'vuetify/components/VToolbar'
// import IconSupport from './components/icons/IconSupport.vue'
</script>

<template>
  <header>
    <v-toolbar dark prominent class="px-10">
      <v-toolbar-title class="ma-0 text-deep-orange text-bold">ChatApp</v-toolbar-title>
      <v-spacer></v-spacer>
      <nav>
        <RouterLink to="/" class="mr-6 text-deep-orange">Home</RouterLink>
        <RouterLink to="/about" class="mr-6 text-deep-orange">About</RouterLink>
        <RouterLink to="/auth/login" class="text-deep-orange">Login</RouterLink>
      </nav>
    </v-toolbar>
  </header>
  <main class="main-layout">
    <RouterView class="px-10 py-6" />
  </main>
</template>
<style lang="scss">
.main-layout {
  display: flex;
  align-items: center;
  width: 100vw;
  height: calc(100vh - 6rem);
}
nav > a {
  text-decoration: none;
}
</style>
