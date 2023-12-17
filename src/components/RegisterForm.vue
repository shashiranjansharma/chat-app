<script setup lang="ts">
import { inject, reactive } from 'vue';
import { useRouter } from 'vue-router';
const router: any = useRouter();

import { useAuthStore } from '@/stores/auth';
const authStore: any = useAuthStore();

const $notify: any = inject('$notify');

const state = reactive({
  valid: false,
  showRegisterForm: false,
  email: '',
  password: '',
  name: '',
  emailRules: [
    (value: string) => {
      if (value?.length < 5) return 'Email must contain 5 characters.';
      else if (/.+@.+\..+/.test(value)) return true;
      else return 'E-mail must be valid.';
    }
  ],
  nameRules: [
    (value: string) => {
      if (value?.length < 3) return 'Name must contain 5 characters.';
      else return true;
    }
  ],
  passwordRule: [
    (value: string) => {
      if (value?.length < 6) return 'Password must contain 6 characters.';
      else return true;
    }
  ]
});

function resetForm() {
  state.email = '';
  state.password = '';
  state.name = '';
}

async function register() {
  if (state.valid) {
    try {
      await authStore.register({
        email: state.email,
        password: state.password,
        name: state.name
      });
      resetForm();
      router.push({ name: 'Login' });
    } catch (e: any) {
      $notify({ text: e.message, type: 'error' });
    }
  }
}
</script>
<template>
  <div class="w-100">
    <h1 class="mb-10 text-center text-deep-orange">Register</h1>
    <v-card width="40%" class="mx-auto pa-10">
      <v-form fast-fail v-model="state.valid" @submit.prevent>
        <v-text-field
          v-model="state.email"
          label="Email"
          type="email"
          variant="solo"
          class="mb-6"
          :rules="state.emailRules"
        ></v-text-field>
        <v-text-field
          v-model="state.name"
          label="Name"
          variant="solo"
          class="mb-6"
          :rules="state.nameRules"
        ></v-text-field>
        <v-text-field
          v-model="state.password"
          label="Password"
          type="password"
          variant="solo"
          :rules="state.passwordRule"
        ></v-text-field>
        <div class="d-flex justify-space-between mt-4">
          <v-btn type="submit" color="blue" class="mt-2" @click="register">Register</v-btn>
        </div>
        <div class="text-end">
          <v-btn
            variant="text"
            color="deep-orange"
            class="mt-2"
            @click="router.push({ name: 'Login' })"
            >Login</v-btn
          >
        </div>
      </v-form>
    </v-card>
  </div>
</template>
