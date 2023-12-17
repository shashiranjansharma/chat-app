import { computed, reactive } from 'vue';
import { defineStore } from 'pinia';
import { useAxios } from '@/services/axios';
const { post } = useAxios();

export const useAuthStore = defineStore('auth', () => {
  const state = reactive({
    token: ''
  });

  const isLoggedIn = computed(() => !!state.token);

  function setToken(payload: string){
    state.token = payload
  }

  async function register(payload: any) {
      try {
        await post('/register', payload);
      } catch  (e: any) {
        throw e.response.data
      }

  }

  async function login(payload: any) {
      try {
        const res = await post('/login', payload);
        const { data } = res;
        localStorage.setItem('chat_app_token', data.token);
        setToken(data.token);
        return true;
      } catch (e: any) {
        throw e.response.data
      }
  }

  async function logout() {
      localStorage.removeItem('chat_app_token');
      setToken('');
}

  return { isLoggedIn, setToken, login, logout, register };
});
