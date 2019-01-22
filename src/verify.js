import Vue from 'vue'
//import VueCookie from 'vue-cookie'
//import axios from 'axios'

//Vue.use(VueCookie)
//Vue.prototype.$cookie = VueCookie

Vue.prototype.verify = function () {
   let token = Vue.$cookie.get('token');
   console.log(token);
   Vue.axios.get('/auth/verify',{
     params:{
      'ly-token': token
    }}).then(resp =>{
    Vue.$cookie.set("token",resp.data.token);
  })
  return ;
};
