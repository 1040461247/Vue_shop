<template>
  <div class="GoodsParams">
    <el-form :data="paramsList" label-position="top">
      <el-form-item v-for="(item, index) in paramsList" :key="index" :label="item.attr_name">
        <el-checkbox-group v-model="item.attr_vals">
          <el-checkbox border :label="cb" v-for="cb in item.attr_vals" :key="cb">{{cb}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// imNetwork
import { getPramasList } from 'network/Goods_list'
// imCommon
import { mapGetters } from 'vuex'

export default {
  name: 'GoodsParams',
  data() {
    return {
      paramsList: []
    }
  },
  computed: {
    ...mapGetters(['getCateId'])
  },
  methods: {
    // 请求参数列表数据
    _getPramasList() {
      getPramasList(this.getCateId[this.getCateId.length -1]).then(res => {
        if(res.meta.status == 200) {
          res.data.forEach(item => {
            item.attr_vals = 
              item.attr_vals.length === 0 ? 
              [] :item.attr_vals.split(' ')
          })
          this.paramsList = res.data
        } else {
          console.log(res.meta.msg)
        }
      })
    }
  },
  created() {
    this._getPramasList()
    // 监听分类选择是否改变
    this.$bus.$on('cateIdChange', this._getPramasList)
  },
  deactivated() {
    if(this.paramsList.length !== 0) {
      const attrs = []
      this.paramsList.forEach(item => {
        const newParams = {
          attr_id: item.attr_id,
          attr_value: item.attr_vals
        }
        attrs.push(newParams)
      })
      this.$emit('paramsFinish', attrs)
    }
    this.$store.commit('pushValid', 2)
  }
}
</script>

<style scoped>
.el-checkbox {
  margin: 0 10px 0 0 !important;
}

</style>