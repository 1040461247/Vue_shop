<template>
  <el-row>
    <el-col :span="8">
      <el-input placeholder="请输入内容">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'SearchTab'
}
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
</style>