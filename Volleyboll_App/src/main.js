import './assets/main.css'
import './assets/popup.css'

import { createApp } from 'vue'
import App from './Fram.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
