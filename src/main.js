// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import Vuetify from 'vuetify'
import config from './config'
import MyComponent from './components/MyComponent'
import './http';
import 'vuetify/dist/vuetify.min.css'
import qs from 'qs'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/material.css'
import VueCookie from 'vue-cookie'

Vue.use(Vuetify, {theme: config.theme})
Vue.use(MyComponent)
Vue.use(VueCookie)
Vue.prototype.$qs = qs;
Vue.prototype.$cookie = VueCookie

Vue.config.productionTip = false;

Vue.prototype.verify = function () {
  let token = this.$cookie.get('token');
  console.log(token);
  return this.axios.get('/auth/verify', {
    params: {
      'token': token
    }
  });
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
