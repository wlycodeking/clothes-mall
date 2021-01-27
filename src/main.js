import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
//网络
import './network/request'
import vuetify from '@/plugins/vuetify'



//注册bus
Vue.prototype.$bus = new Vue()
//使用fastclick:解决移动端300ms的延迟
import FastClick from 'fastclick'
FastClick.attach(document.body)
//图片懒加载
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
  loading:require('./assets/img/common/placeholder.png')
})
Vue.use(Vant);
// Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
