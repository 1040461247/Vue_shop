<template>
  <div class="goods">
    <breadcrumb :home="'首页'" :tagArray="['商品管理', '商品列表']"/>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索栏 -->
      <search-bar @sreachConfirm="sreachConfirm"/>
      <!-- 表格区域 -->
      <table-content :goodsList="goodsList" @deleteGoods="deleteGoods"/>
      <!-- 页面控件 -->
      <pagination :goodsList="goodsList" @pageHandleChange="pageHandleChange"/>
    </el-card>
  </div>
</template>

<script>
// imComponents
import Breadcrumb from 'components/content/Breadcrumb'
import SearchBar from './childComps/SearchBar'
import TableContent from './childComps/TableContent'
import Pagination from './childComps/Pagination'
// imNetwork
import { getGoodsList, deleteGoods } from 'network/Goods_list'

export default {
  name: 'Goods',
  components: {
    Breadcrumb,
    SearchBar,
    TableContent,
    Pagination
  },
  data() {
    return {
      // 请求商品列表的参数
      getGoodsListParam: {
        query: '',
        pagenum: 1,
        pagesize: 4
      },
      // 请求到的商品列表
      goodsList: {
        goods: [],
        total: 0
      }
    }
  },
  methods: {
    // 请求商品列表数据
    _getGoodsList() {
      getGoodsList(this.getGoodsListParam).then(res => {
        if(res.meta.status === 200) {
          this.goodsList = res.data
          console.log('Update goodsList')
        } else {
          return console.log(res)
        }
      })
    },
    // 页面控件改变，重新请求goodsList
    pageHandleChange(msg) {
      this.getGoodsListParam = msg
      this._getGoodsList()
    },
    // 根据名称搜索商品
    sreachConfirm(param) {
      this.getGoodsListParam.query = param
      this._getGoodsList()
    },
    // 删除商品
    deleteGoods(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(res => {
        deleteGoods(row).then(res => {
          if(res.meta.status === 200) {
            this.$message.success('商品删除成功！')
            this._getGoodsList()
          } else {
            this.$message.error(res.meta.msg)
          }
        })
      }).catch(err => {
        return console.log(err)
      })
    }
  },
  created() {
    this._getGoodsList()
  }
}
</script>

<style>

</style>