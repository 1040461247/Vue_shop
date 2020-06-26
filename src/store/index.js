import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import mutations from './mutations'
import getters from './getters'
// modules
import goodsList from './modules/goodsList'

export default new Vuex.Store({
  state: {
    // 标记分类参数页中是否选择了商品分类
    goodsCascaderIsNull: true
  },
  mutations,
  getters,
  modules: {
    goodsList
  }
})
