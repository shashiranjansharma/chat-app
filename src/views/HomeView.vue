<script setup lang="ts">
import { onMounted } from 'vue';
import { useAxios } from '@/services/axios';
import { useRouter } from 'vue-router';
import { reactive } from 'vue';

import { useAuthStore } from '@/stores/auth';
const authStore: any = useAuthStore();

const { get } = useAxios();
const router = useRouter();
const state = reactive({
  currentUser: {} as Record<string, any>
});

onMounted(async () => {
  try {
    const res = await get('/user');
    const { data } = res;
    state.currentUser = data;
  } catch (e) {
    console.error(e);
  }
});

function logout() {
  authStore.logout();
  router.push({ name: 'Login' });
}
</script>

<template>
  <main class="w-100">
    <h1 class="mb-10 text-center text-deep-orange">Welcome</h1>
    <v-card width="40%" class="mx-auto pa-10">
      <h3 class="text-center">{{ state.currentUser.name }}</h3>
      <p class="text-center mt-4">{{ state.currentUser.email }}</p>
      <div class="d-flex justify-center mt-10">
        <v-btn variant="text" color="deep-orange" class="mt-2 text-center" @click="logout">
          Logout
        </v-btn>
      </div>
    </v-card>
  </main>
</template>
