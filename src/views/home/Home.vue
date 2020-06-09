<template>
  <div class="home">
    <el-button type="info" @click="logout">退出</el-button>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    // 退出登录
    logout() {
      // 1、清空token值
      window.sessionStorage.clear();
      // 2、返回登陆界面
      this.$router.replace("/login");
    }
  }
};
</script>

<style scoped>
</style>