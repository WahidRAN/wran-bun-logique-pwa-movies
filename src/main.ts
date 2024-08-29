import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import "./style.css";

import { register } from "swiper/element/bundle";
import "swiper/css/bundle";
import "swiper/css";

const pinia = createPinia();
const app = createApp(App);
register();

app.use(pinia);
app.mount("#app");
