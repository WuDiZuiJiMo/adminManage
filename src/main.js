import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// ElementUI
import ElementUI from "element-ui";
import elementUIVerify from "element-ui-verify";
import "element-ui/lib/theme-chalk/index.css";
// mavonEditor
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";

Vue.use(ElementUI);
Vue.use(elementUIVerify);
Vue.use(mavonEditor);

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});
