<template>
  <el-row>
    <el-col>
      <el-button type="primary" @click="addCategory">添加分类</el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'AddCategory',
  methods: {
    addCategory() {
      this.$bus.$emit('clickAddButton')
    }
  }
}
</script>

<style scoped>
.el-row {
  padding-bottom: 20px;
}
</style>