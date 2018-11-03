import Vue from "vue";
import VueRouter from "vue-router";

import Explore from "./containers/Explore/Explore.vue";
import Profile from "./containers/Profile/Profile.vue";

Vue.use(VueRouter);
Vue.config.devtools = true;

Vue.config.productionTip = false;

const router = new VueRouter({
  mode: "history",
  base: __dirname,
  routes: [
    { path: "/", component: Explore },
    { path: "/profile", component: Profile },
  ]
});

new Vue({
  router,
  render: h => <router-view />
}).$mount("#app");
