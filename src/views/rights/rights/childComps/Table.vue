<template>
  <el-table :data="rightsList" style="width: 100%" border stripe>
    <el-table-column type="index"/>
    <el-table-column prop="authName" label="权限名称"/>
    <el-table-column prop="path" label="路径"/>
    <el-table-column prop="level" label="权限等级">
      <template slot-scope="scope">
        <el-tag v-if="scope.row.level === '0'">一级</el-tag>
        <el-tag type="success" v-if="scope.row.level === '1'">二级</el-tag>
        <el-tag type="warning" v-if="scope.row.level === '2'">三级</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "RightTable",
  props: {
    rightsList: {
      type: Array,
      default() {
        return []
      }
    }
  }
};
</script>

<style scoped>
</style>