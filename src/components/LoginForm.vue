<script setup lang="ts">
import { reactive, inject } from 'vue';

import { useAuthStore } from '@/stores/auth';
const authStore: any = useAuthStore();

import { useRouter } from 'vue-router';
const router = useRouter();

const $notify: any = inject('$notify');

const state = reactive({
  valid: false,
  showRegisterForm: false,
  showPass: false,
  email: '',
  password: '',
  profile: '',
  phone: '',
  emailRules: [
    (value: string) => {
      if (value?.length < 5) return 'Email must contain 5 characters.';
      else if (/.+@.+\..+/.test(value)) return true;
      else return 'E-mail must be valid.';
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
  state.profile = '';
  state.phone = '';
}

async function login() {
  if (state.valid) {
    try {
      await authStore.login({ email: state.email, password: state.password });
      resetForm();
      router.push({ name: 'Home' });
    } catch (e: any) {
      console.log(e);
      $notify({ type: 'error', text: e.message });
    }
  }
}
</script>
<template>
  <div class="w-100">
    <h1 class="mb-10 text-center text-deep-orange">Login</h1>
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
          v-model="state.password"
          label="Password"
          :type="state.showPass ? 'text' : 'password'"
          append-inner-icon="mdi-eye"
          variant="solo"
          :rules="state.passwordRule"
          @click:append-inner="state.showPass = !state.showPass"
        ></v-text-field>
        <div class="d-flex justify-space-between mt-4">
          <v-btn type="submit" color="blue" class="mt-2" @click="login">Login</v-btn>
          <v-btn
            variant="text"
            color="deep-orange"
            class="mt-2"
            @click="router.push({ name: 'ForgotPassword' })"
            >Forgot Password?</v-btn
          >
        </div>
        <div class="text-end">
          <v-btn
            variant="text"
            color="deep-orange"
            class="mt-2"
            @click="router.push({ name: 'Register' })"
            >Register</v-btn
          >
        </div>
      </v-form>
    </v-card>
  </div>
</template>
