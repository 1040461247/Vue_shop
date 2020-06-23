// 监听Vuex关于“分类参数”中button的禁用
import { mapGetters } from 'vuex'
export const lisIsDisabled = { 
  computed: {
    ...mapGetters(['isDisabled'])
  }
}