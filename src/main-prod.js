import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 富文本编辑器
import VueQuillEditor from 'vue-quill-editor'

// 导入element-ui
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'
// 导入字体图标
import 'assets/fonts/iconfont.css'
// 导入treeTable组件
import TreeTable from 'vue-table-with-tree-grid'

Vue.config.productionTip = false
// 事件总线
Vue.prototype.$bus = new Vue()
// 注册全局组件
Vue.component('tree-table', TreeTable)
// 注册副文本编辑器
Vue.use(VueQuillEditor)

// 全局时间过滤器，originVal为时间戳字符串
Vue.filter('dateFormat', (originVal) => {
  // 创建事件对象
  const dt = new Date(originVal)
  // 获取年月日时分秒
  const y = dt.getFullYear()
  const m = (String(dt.getMonth() + 1)).padStart(2, '0')
  const d = (String(dt.getDate())).padStart(2, '0')
  const hh = (String(dt.getMonth())).padStart(2, '0')
  const mm = (String(dt.getMinutes())).padStart(2, '0')
  const ss = (String(dt.getSeconds())).padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
