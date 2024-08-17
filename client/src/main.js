import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import lazyLoadDirective from "./directives/v-lazy-load";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const app = createApp(App);
const pinia = createPinia();

app.directive("lazy-load", lazyLoadDirective);
pinia.use(piniaPluginPersistedstate);

app.use(router);
app.use(pinia);

app.directive('focus', {
    mounted(el) {
      el.focus();
    },
    updated(el) {
      el.focus();
    }
  });

app.mount("#app");
