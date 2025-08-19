import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import App from './app/App.vue';
import router from './router';

import i18n from './locales/i18n';
import { useUserStore } from '@/entities/user/user.store';
import { initLocale } from './locales/init';

import './shared/styles/index.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

app.use(router);
app.use(i18n);

const userStore = useUserStore(pinia);

initLocale(i18n, userStore);

app.mount('#app');
