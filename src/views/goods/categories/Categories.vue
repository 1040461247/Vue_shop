<template>
  <div class="categorier">
    <breadcrumb :home="'首页'" :tagArray="['商品管理', '商品分类']"/>

    <!-- 卡片视图区域 -->
    <el-card>
      <add-button/>
      <!-- 表格 -->
      <cat-table :categoryData="categoryData" @updateData="_getCategoryList"/>
      <!-- 页码控件 -->
      <pagination :categoryData="categoryData" @handleChange="handleChange"/>
    </el-card>

    <!-- 添加分类对话框 -->
    <add-dialog @updateData="_getCategoryList"/>
    <!-- 编辑分类对话框 -->
    <update-dialog @updateData="_getCategoryList"/>
  </div>
</template>

<script>
// 组件相关导入
import Breadcrumb from 'components/content/Breadcrumb'
import AddButton from './childComps/AddButton'
import CatTable from './childComps/CatTable'
import Pagination from 'components/common/Pagination'
import AddDialog from './childComps/AddDialog'
import UpdateDialog from './childComps/UpdateDialog'
// 网络请求相关导入
import { getCategoryList } from 'network/Goods'

export default {
  name: 'Categories',
  components: {
    Breadcrumb,
    AddButton,
    CatTable,
    Pagination,
    AddDialog,
    UpdateDialog
  },
  data() {
    return {
      // 获取商品分类数据的请求参数
      catRequestPramas: {
        type: [],
        pagenum: 1,
        pagesize: 4
      },
      // 获取到的商品分类数据
      categoryData: {
        total: 0,
        result: [],
        pagesize: 0,
        pagenum: 0,
      },
    }
  },
  methods: {
    // 请求商品分类数据
    _getCategoryList() {
      getCategoryList(this.catRequestPramas).then(res => {
        if(res.meta.status !== 200) {
          return console.log(res.meta.msg)
        } else {
          this.categoryData = res.data
        }
      })
    },
    // 更改了页码/显示条数
    handleChange(newCatRequestPramas) {
      this.catRequestPramas = newCatRequestPramas
      this._getCategoryList()
    }
  },
  created() {
    this._getCategoryList()
  }
}
</script>

<style>

</style>