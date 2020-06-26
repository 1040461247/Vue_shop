<template>
  <el-row :gutter="20">
    <el-col :span="8">
      <el-input 
        placeholder="请输入名称" 
        v-model="searchInfo" 
        @keyup.enter.native="sreachConfirm(searchInfo)"
        clearable
        @clear="sreachConfirm(searchInfo)">
        <el-button slot="append" icon="el-icon-search" @click="sreachConfirm(searchInfo)"></el-button>
      </el-input>
    </el-col>
    <el-col :span="4">
      <el-button type="primary" @click="addGoods">添加商品</el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      searchInfo: ''
    }
  },
  methods: {
    // 搜索商品
    sreachConfirm(param) {
      this.$emit('sreachConfirm', param)
    },
    // 跳转到添加商品路由页面
    addGoods() {
      this.$router.push('/goods/add')
    }
  }
}
</script>

<style>
  .el-row {
    margin-bottom: 15px;
  }
</style>