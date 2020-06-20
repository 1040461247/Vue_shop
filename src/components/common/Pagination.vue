<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="catRequestPramas.pagenum"
    :page-sizes="[4, 6, 8, 10]"
    :page-size="catRequestPramas.pagesize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="categoryData.total">
  </el-pagination>
</template>

<script>
export default {
  name: 'Pagination',
  data() {
    return {
      // 商品分类数据的请求参数
      catRequestPramas: {
        type: [],
        pagenum: 1,
        pagesize: 4
      }
    }
  },
  props: {
    // 商品分类数据
    categoryData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    handleSizeChange(pagesize) {
      this.catRequestPramas.pagesize = pagesize
      this.$emit('handleChange', this.catRequestPramas)
      console.log('Change of pageSize')
    },
    handleCurrentChange(pagenum) {
      this.catRequestPramas.pagenum = pagenum
      this.$emit('handleChange', this.catRequestPramas)
      console.log('Change of pageNum')
    }
  }
}
</script>

<style scoped>
.el-pagination {
  margin-top: 20px;
}
</style>