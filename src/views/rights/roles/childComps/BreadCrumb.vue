<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>角色列表</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'RolesBreadCrumb'
}
</script>

<style scoped>
  .el-breadcrumb {
    margin-bottom: 20px;
  }
</style>