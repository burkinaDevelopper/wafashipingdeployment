import '@/assets/vendor/fonts/boxicons.css';
import '@/assets/vendor/css/core.css';
import '@/assets/vendor/css/theme-default.css';
import '@/assets/css/demo.css';
import '@/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css';
import '@/assets/vendor/css/pages/page-auth.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import axios from 'axios';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import i18n from './i18n';

import App from './App.vue'
import router from './router'

const app = createApp(App)

// axios.defaults.withCredentials = true;
// axios.defaults.withXSRFToken = true;
app.use(createPinia())
app.use(i18n)
app.use(router)

app.mount('#app')


import '@/assets/vendor/js/helpers.js';
import '@/assets/js/config.js';
import '@/assets/vendor/libs/jquery/jquery.js';
import '@/assets/vendor/libs/popper/popper.js';
import '@/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js';
import '@/assets/vendor/js/menu.js';
import '@/assets/js/main.js';
import '@/assets/vendor/js/bootstrap.js';
