import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './app/App.vue';
import router from './app/router';
import './shared/styles/index.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);

app.mount('#app');
