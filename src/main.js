import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Admin from "./components/Admin"
import Notifications from "./components/Notifications"
import TimeLine from "./components/TimeLine";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/', component: TimeLine },
    { path: '/notifications', component: Notifications},
    { path: '/admin', component: Admin}
  ],
  mode: 'history'
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');


