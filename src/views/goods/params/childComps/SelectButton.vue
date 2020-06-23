<template>
  <el-row>
    <el-col>
      <span>选择商品分类：</span>
      <el-cascader
        v-model="currentId"
        :options="cateList"
        :props="props"
        @change="handleChange"/>
    </el-col>
  </el-row>
</template>

<script>
import { getCategoryList } from 'network/Goods'

export default {
  name: 'SelectButton',
  data() {
    return {
      // 商品分类列表
      cateList: [],
      // cascader配置对象 
      props: {
        expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      // cascader选择项
      currentId: []
    }
  },
  methods: {
    // 请求商品分类列表
    _getCategoryList() {
      getCategoryList({}).then(res => {
        if(res.meta.status === 200) {
          return this.cateList = res.data
        } else {
          return this.$message.error(res.meta.msg)
        }
      })
    },
    // 改变cascader选择时触发
    handleChange() {
      // 更改vuex中的状态
      if(this.currentId.length > 0) {
        this.$store.commit('updataCas', 1)
      } else this.$store.commit('updataCas', 0)
      // 根据所选分类的id和面板获取数据
      this.$bus.$emit('handleCascader', this.currentId)
    }
  },
  created() {
    this._getCategoryList()
  }
}
</script>

<style scoped>
.el-row {
  margin-top: 20px;
}
</style>