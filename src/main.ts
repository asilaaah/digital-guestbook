import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import App from './App.vue'
import router from './router'
import naive from 'naive-ui'

import './assets/main.css'

const pinia = createPinia()
pinia.use(piniaPersist)
const app = createApp(App)

app.use(router)
.use(pinia)
.use(naive)

app.mount('#app')
