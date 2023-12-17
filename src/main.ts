import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

import { useNotificationStore } from '@/stores/notification';

import App from './App.vue'
import router from './router'

const app = createApp(App)
const vuetify = createVuetify({
    components,
    directives,
  })

app.use(createPinia())
const notificationStore: any = useNotificationStore();
app.use(router)
app.use(vuetify)
app.provide("$notify", notificationStore.notify )
app.mount('#app')
