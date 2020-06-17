<template>
  <div class="rights">
    <!-- 面包屑导航 -->
    <bread-crumb/>
    <!-- 卡片视图 -->
    <el-card> 
      <!-- 表格内容主体区 -->
      <table-content :rightsList="rightsList"/>
    </el-card>
  </div>
</template>

<script>
// 组件相关导入
import BreadCrumb from './childComps/BreadCrumb'
import TableContent from './childComps/Table'
// 网络请求相关导入
import { getRights } from 'network/Rights'

export default {
  name: 'Rights',
  components: {
    BreadCrumb,
    TableContent
  },
  data() {
    return {
      rightsList: []
    }
  },
  methods: {
    // 请求权限列表
    _getRights() {
      getRights().then(res => {
        this.rightsList = res.data
      })
    }
  },
  created() {
    this._getRights()
  }
}
</script>

<style scoped lang="less">
.el-card {
  margin-top: 20px;
}
</style>