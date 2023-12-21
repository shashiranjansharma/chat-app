<script setup lang="ts">
import { reactive, inject } from 'vue';

import { useAuthStore } from '@/stores/auth';
const authStore: any = useAuthStore();

import { useRouter } from 'vue-router';
const router = useRouter();

const $notify: any = inject('$notify');

const state = reactive({
  valid: false,
  isOtpSent: false,
  showPass: false,
  email: '',
  password: '',
  otp: '',
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
  ],
  otpRule: [
    (value: string) => {
      if (value?.length < 6) return 'OTP must contain 6 numbers.';
      else return true;
    }
  ]
});

function resetForm() {
  state.email = '';
  state.password = '';
  state.otp = '';
}

async function sendOtp() {
  if (state.valid || state.isOtpSent) {
    try {
      await authStore.sendOtp({ email: state.email });
      state.isOtpSent = true;
    } catch (e: any) {
      console.log(e);
      $notify({ type: 'error', text: e.message });
    }
  }
}
async function resetPassword() {
  if (state.valid) {
    try {
      await authStore.resetPassword({
        email: state.email,
        otp: state.otp,
        password: state.password
      });
      resetForm();
      router.push({ name: 'Login' });
    } catch (e: any) {
      console.log(e);
      $notify({ type: 'error', text: e.message });
    }
  }
}
</script>
<template>
  <div class="w-100">
    <h1 class="mb-10 text-center text-deep-orange">Forgot Password</h1>
    <v-card width="40%" class="mx-auto pa-10">
      <v-form fast-fail v-model="state.valid" @submit.prevent>
        <v-text-field
          v-model="state.email"
          label="Email"
          type="email"
          variant="solo"
          class="mb-6"
          :rules="state.emailRules"
          :disabled="state.isOtpSent"
        ></v-text-field>
        <v-otp-input
          v-if="state.isOtpSent"
          v-model="state.otp"
          :rules="state.otpRule"
          variant="filled"
        ></v-otp-input>
        <v-text-field
          v-if="state.isOtpSent"
          v-model="state.password"
          label="New Password"
          :type="state.showPass ? 'text' : 'password'"
          append-inner-icon="mdi-eye"
          variant="solo"
          :rules="state.passwordRule"
          @click:append-inner="state.showPass = !state.showPass"
        ></v-text-field>
        <div class="d-flex justify-space-between mt-4">
          <v-btn v-if="!state.isOtpSent" type="submit" color="blue" class="mt-2" @click="sendOtp">
            Send OTP
          </v-btn>
          <v-btn v-else type="submit" color="blue" class="mt-2" @click="resetPassword">
            Reset Password
          </v-btn>
          <v-btn v-if="state.isOtpSent" variant="text" color="blue" class="mt-2" @click="sendOtp">
            Resend OTP
          </v-btn>
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
