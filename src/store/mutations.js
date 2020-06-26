const mutations = {
  // 标记分类参数页中是否选择了商品分类
  updataCas(state, msg) {
    if(msg == 1) {
      state.goodsCascaderIsNull = false
    } else if(msg == 0) {
      state.goodsCascaderIsNull = true
    }
  }
}

export default mutations