const getters = {
  isDisabled(state, getters) {
    return state.goodsCascaderIsNull
  }
}

export default getters