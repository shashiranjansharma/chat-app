<script setup lang="ts">
import { reactive } from 'vue'

const state = reactive({
  email: '',
  emailRules: [
    (value: string) => {
      if (value?.length < 5) return 'Email must contain 5 characters.'
      else if (/.+@.+\..+/.test(value)) return true
      else return 'E-mail must be valid.'
    }
  ],
  password: '123',
  passwordRule: [
    (value: string) => {
      if (value?.length < 6) return 'Password must contain 6 characters.'
      else return true
    }
  ]
})
</script>
<template>
  <div class="w-100">
    <h1 class="mb-10 text-center text-deep-orange">Login</h1>
    <v-card width="40%" class="mx-auto pa-10">
      <v-form fast-fail @submit.prevent>
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
          type="password"
          variant="solo"
          :rules="state.passwordRule"
        ></v-text-field>
        <div class="d-flex justify-space-between mt-4">
          <v-btn type="submit" color="blue" class="mt-2">Login</v-btn>
          <v-btn variant="text" color="deep-orange" class="mt-2">Forgot Password?</v-btn>
        </div>
        <div class="text-end">
          <v-btn variant="text" color="deep-orange" class="mt-2">Register</v-btn>
        </div>
      </v-form>
    </v-card>
  </div>
</template>
