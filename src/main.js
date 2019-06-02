import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import axios from 'axios'
import moment from 'moment'
import md5 from '@/js/md5'
import {getCookie,delCookie,setCookie} from '@/js/Cookie.js'



Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(md5);
Vue.prototype.$ajax = axios;
Vue.prototype.$moment = moment;

router.beforeEach((to, from, next) => {

  if(!Vue.prototype.$userInfo){
    var user = getCookie('userInfo');
    if(user&&user!="") Vue.prototype.$userInfo = JSON.parse(user);
  }

  if(to.path == '/login'){
    delete Vue.prototype.$userInfo;
    delCookie('userInfo');
  }

  if(to.path != "/login" && getCookie('userInfo') == "")
    next({ path: '/login' });
  else
    next();
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
