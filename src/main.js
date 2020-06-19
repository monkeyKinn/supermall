import Vue from 'vue'
import App from './App.vue'
import store from './store'

import toast from 'components/common/toast'
// 挂载路由
import router from './router'

import FastClick from 'fastclick'

Vue.config.productionTip = false

// 定义事件总线为一个vue实例,这样才能发送事件
Vue.prototype.$bus = new Vue();
// 安装toast插件
Vue.use(toast)

// 解决移动端的300ms延迟
FastClick.attach(document.body)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
