<template>
  <el-row>
    <el-col :span="8">
      <el-input placeholder="订单查询功能敬请期待" @change.native="focusearch">
        <el-button slot="append" icon="el-icon-search" @click="focusearch"></el-button>
      </el-input>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'SearchTab',
  methods: {
    focusearch() {
      this.$message.warning('订单查询功能敬请期待')
    }
  }
}
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
</style>