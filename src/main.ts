import { createApp } from "vue";
import { createPinia } from "pinia";
import { Lazyload,Loading ,Dialog } from 'vant';

import App from "./App.vue";
import router from "./router";

import "./assets/reset.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Lazyload);
app.use(Loading);
app.use(Dialog);
app.use(Lazyload, {
    lazyComponent: true,
});

router.afterEach((to, from) => {
    if (from.matched.length === 0) {
        to.meta.transitionName = ''
    } else {
        to.meta.transitionName = 'slide-right'
    }
})
app.mount("#app");
