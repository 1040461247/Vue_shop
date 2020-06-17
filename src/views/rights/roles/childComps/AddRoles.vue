<template>
  <div class="AddRoles">
    <el-row>
      <el-col>
        <el-button type="primary" @click="addRoles">添加角色</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'AddRoles',
  methods: {
    addRoles() {
      this.$bus.$emit('addRoles')
    }
  }
}
</script>

<style>

</style>