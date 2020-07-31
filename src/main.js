import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import { auth } from "./firebase";

Vue.config.productionTip = false;

/* When user refreshes a page make sure firebase is initialized */
let app;
auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
