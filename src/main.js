import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './app/App.vue';
import router from './app/router';
import './shared/styles/index.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
