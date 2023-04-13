import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.scss'
import App from './App.vue'
import { CSSQuestions } from './questions/CSSQuestions'; // add for CSSQuestions HMR

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')
