<template>
  <el-table :data="goodsList.goods" border stripe>
    <el-table-column type="index"/>
    <el-table-column label="名称" prop="goods_name"/>
    <el-table-column label="商品价格(元)" prop="goods_price" width="100px"/>
    <el-table-column label="商品重量" prop="goods_weight" width="80px"/>
    <el-table-column label="创建时间" prop="add_timed" width="140px">
      <template slot-scope="scope">
        {{scope.row.add_time | dateFormat}}
      </template>
    </el-table-column>
    <el-table-column label="操作" width="200px">
      <template slot-scope="scope">
        <el-button type="primary" icon="el-icon-edit" size="mini">修改</el-button>
        <el-button type="danger" icon="el-icon-delete" size="mini" @click="deletegoods(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'TableContent',
  props: {
    goodsList: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    // 删除商品
    deletegoods(row) {
      this.$emit('deleteGoods', row)
    }
  }
}
</script>

<style>
</style>