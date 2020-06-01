import Vue from 'vue'
import App from './App.vue'

// 挂载路由
import router from './router'

Vue.config.productionTip = false

// 定义事件总线为一个vue实例,这样才能发送事件
Vue.prototype.$bus = new Vue();

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
