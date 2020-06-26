<template>
  <div class="TableContent">
    <el-table :data="orderList.goods" border stripe>
      <el-table-column type="index"/>
      <el-table-column label="订单编号" prop="order_number"/>
      <el-table-column label="订单价格" prop="order_price"/>
      <el-table-column label="是否付款" prop="pay_status">
        <template slot-scope="scope">
          <el-tag type="danger" v-if="scope.row.pay_status == 0">未付款</el-tag>
          <el-tag type="success" v-if="scope.row.pay_status == 1">已付款</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="是否发货" prop="is_send"/>
      <el-table-column label="下单时间" prop="create_time">
        <template slot-scope="scope">
          {{scope.row.create_time | dateFormat}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200px">
        <template slot-scope="scope">
          <el-tooltip :enterable="false" class="item" effect="dark" content="修改地址" placement="top">
            <el-button icon="el-icon-edit" type="primary" size="mini" @click="alertAddress"/>
          </el-tooltip>
          <el-tooltip :enterable="false" class="item" effect="dark" content="物流进度" placement="top">
            <el-button icon="el-icon-location" type="success" size="mini" @click="progress"/>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <alert-address-dialog ref="aDialog"/>
    <progress-dialog ref="pDialog"/>
  </div>
</template>

<script>
import AlertAddressDialog from './AlertAddressDialog'
import ProgressDialog from './ProgressDialog'

export default {
  name: 'TableContent',
  components: {
    AlertAddressDialog,
    ProgressDialog
  },
  data() {
    return {
      showAlDialog: false
    }
  },
  props: {
    // table数据源
    orderList: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    // 点击修改地址按钮
    alertAddress() {
      this.$refs.aDialog.isShow = true
    },
    // 点击查看进度按钮
    progress() {
      this.$refs.pDialog.isShow = true
    }
  }
}
</script>

<style>

</style>