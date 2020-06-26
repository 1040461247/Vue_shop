<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/welcome' }">{{home}}</el-breadcrumb-item>
    <el-breadcrumb-item v-for="item in tagArray" :key="item">{{item}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'Breadcrumb',
  props: {
    home: {
      type: String,
      default: 'home_无数据'
    },
    tagArray: {
      type: Array,
      default() {
        return ['tagArray_无数据']
      }
    }
  }
}
</script>

<style>
.el-breadcrumb {
  margin-bottom: 20px;
}
</style>