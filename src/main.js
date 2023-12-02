import './assets/main.css'
import './scss/styles.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { router } from './router/router'

import * as bootstrap from 'bootstrap'

const app = createApp(App)
app.use(createPinia()).use(router).mount('#app')
