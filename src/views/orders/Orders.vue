<template>
  <div class="orders">
    <breadcrumb :home="'首页'" :tagArray="['订单管理', '订单列表']"/>

    <el-card>
      <search-tab/>
      <table-content :orderList="orderList"/>
      <pagination :categoryData="orderList" @handleChange="handleChange"/>
    </el-card>
  </div>
</template>

<script>
// imComponents
import Breadcrumb from 'components/content/Breadcrumb'
import SearchTab from './childComps/SearchTab'
import TableContent from './childComps/TableContent'
import Pagination from './childComps/Pagination'
// imNetworl
import { getOrderList } from 'network/Order'

export default {
  name: 'Orders',
  components: {
    Breadcrumb,
    SearchTab,
    TableContent,
    Pagination
  },
  data() {
    return {
      // order数据列表
      orderList: {},
      // order数据请求参数
      queryOrder: {
        pagenum: 1,
        pagesize: 4
      }
    }
  },
  methods: {
    // 请求order数据列表
    _getOrderList() {
      getOrderList(this.queryOrder).then(res => {
        this.orderList  = 
          res.meta.status == 200 ? 
          res.data : console.log(res)
      })
    },
    // 页面控件选择改变
    handleChange({ pagesize, pagenum }) {
      this.queryOrder.pagesize = pagesize
      this.queryOrder.pagenum = pagenum
      this._getOrderList()
    }
  },
  created() {
    this._getOrderList()
  }
}
</script>

<style>

</style>