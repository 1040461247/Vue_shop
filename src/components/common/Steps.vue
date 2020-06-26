<template>
  <el-steps align-center :space="200" :active="activeIndex" finish-status="success">
    <el-step v-for="item in titleArray" :key="item" :title="item"></el-step>
  </el-steps>
</template>

<script>
export default {
  name: 'Steps',
  data() {
    return {
      activeIndex: 0
    }
  },
  props: {
    titleArray: {
      type: Array,
      default() {
        return []
      }
    }
  },
  created() {
    this.$bus.$on('indexChange', index => {
      this.activeIndex = Number(index)
    })
  }
}
</script>

<style scoped>
.el-steps {
  margin: 15px 0;
}

</style>