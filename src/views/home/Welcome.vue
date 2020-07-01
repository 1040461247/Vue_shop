<template>
  <div class="wrapper">
    <div class="textDiv"><h4>欢迎使用电商后台管理系统</h4></div>
    <el-divider content-position="center">Current date</el-divider>
    <div class="calendarWra"><el-calendar v-model="value"/></div>
    
  </div>
</template>

<script>
export default {
  name: "Welcome",
  data() {
    return {
      value: new Date()
    }
  }
}
</script>

<style scoped>
.textDiv {
  text-align: center;
  font-size: 40px;
  color: #373d41;
}
.calendarWra {
  width: 70%;
  margin-left: 15%;
}
</style>