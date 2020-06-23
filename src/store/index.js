import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 标记分类参数页中是否选择了商品分类
    goodsCascaderIsNull: true
  },
  mutations: {
    // 更改标记参数分类cascader持有状态
    updataCas(state, msg) {
      if(msg === 1) {
        state.goodsCascaderIsNull = false
      } else if(msg === 0) {
        state.goodsCascaderIsNull = true
      }
    }
  },
  getters: {
    isDisabled(state, getters) {
      return state.goodsCascaderIsNull
    }
  },
  actions: {
    
  },
  modules: {

  }
})
