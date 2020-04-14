import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastClick from 'fastclick'
Vue.config.productionTip = false
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
import  confirm from "@/api/confirm.js"
Vue.use(VueAwesomeSwiper /* { default global options } */);
import Video from 'video.js'
import 'video.js/dist/video-js.css'
import './assets/css/main.css'
import global from "./api/common.js";
import {get , post,delayFun} from './api/api.js';
import {hbPay,wxPay,zfbPay,createPayIframe} from "./api/pay.js";
Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$video = Video
Vue.prototype.$global = global
Vue.prototype.$delayFun = delayFun
Vue.prototype.$wxPay = wxPay
Vue.prototype.$zfbPay = zfbPay
Vue.prototype.$hbPay = hbPay
Vue.prototype.$createPayIframe = createPayIframe
Vue.prototype.$confirm = confirm
import toastMessage from './api/toast.js' // message 提示消息插件

fastClick.attach(document.body)
Vue.use(toastMessage)


 new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


//