<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { computed } from 'vue';
import NotificationAlert from '@/components/global/NotificationAlert.vue';

const authStore = useAuthStore();
const isLoggedIn = computed(() => authStore.isLoggedIn);
</script>

<template>
  <header>
    <v-toolbar dark prominent class="px-10">
      <v-toolbar-title class="ma-0 text-deep-orange text-bold">ChatApp</v-toolbar-title>
      <v-spacer></v-spacer>
      <nav v-if="!isLoggedIn">
        <RouterLink to="/auth/login" class="text-deep-orange">Login</RouterLink>
      </nav>
      <nav v-else>
        <RouterLink to="/" class="mr-6 text-deep-orange">Home</RouterLink>
        <RouterLink to="/about" class="mr-6 text-deep-orange">About</RouterLink>
      </nav>
    </v-toolbar>
  </header>
  <main class="main-layout">
    <RouterView class="px-10 py-6" />
    <NotificationAlert />
  </main>
</template>
<style lang="scss">
.main-layout {
  display: flex;
  align-items: center;
  width: 100vw;
  height: calc(100vh - 4rem);
  overflow-y: auto;
}
nav > a {
  text-decoration: none;
}
</style>
