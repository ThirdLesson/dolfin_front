import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './app/App.vue';
import router from './router';
import i18n from './locales/i18n';
import './shared/styles/index.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { useUserStore } from '@/entities/user/user.store';

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);
app.use(i18n);

const userStore = useUserStore(pinia);
i18n.global.locale.value = userStore.userInfo?.language || 'ko';

userStore.$subscribe((_mutation, state) => {
  const lang = state.userInfo?.language;
  if (lang && i18n.global.locale.value !== lang) {
    i18n.global.locale.value = lang;
  }
});

app.mount('#app');
