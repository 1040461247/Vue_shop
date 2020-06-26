const goodsList = {
  state: {
    activeIndex: 0,
    // tabs通行证
    validForm: [],
    // 选中的分类参数id
    cateId: 0,
    // 判断表单验证是否全部通过
    validMsg: []
  },
  mutations: {
    searchIndex(state, index) {
      state.activeIndex = index
    },
    // Push validForm
    pushValid(state, i) {
      if(state.validForm.indexOf(i) !== -1 ) return 
      state.validForm.push(i)
    },
    // Delete validForm
    deleteValid(state, i) {
      state.validForm.splice(state.validForm.indexOf(i), 1)
    },
    // Search cateId
    searchCateId(state, id) {
      state.cateId = id
    },
    // Search addParams
    addParams(state, key, value) {
      state.addParams[key] = value
      state.goods_name = value
    },
    // Search validMsg
    searchValidMsg(state, obj) {
      const i = state.validMsg.findIndex(item => {
        return item.msg == obj.msg
      })
      if(i == -1) return state.validMsg.push(obj)
      if(i !== -1) {
        if(obj == 'basicValid') {
          return state.validMsg.splice(i, 1)
        }
        state.validMsg.splice(i, 1)
        state.validMsg.push(obj)
        return 
      }
    }
  },
  getters: {
    // 暴露属性
    getCateId(state) {
      return state.cateId
    },
    getValidForm(state) {
      return state.validForm
    },
    getValidMsg(state) {
      return state.validMsg
    },
    getAddParams(state) {
      return state.goods_name
    }
  }
}

export default goodsList