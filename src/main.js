import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/app.css';
import router from './router';
import 'flowbite';
import { createPinia } from 'pinia';

const pinia = createPinia()

createApp(App)
    .use(router)
    .use(pinia)
    .mount('#app')
