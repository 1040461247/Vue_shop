import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入element-ui
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'
// 导入字体图标
import 'assets/fonts/iconfont.css'

Vue.config.productionTip = false
// 事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
