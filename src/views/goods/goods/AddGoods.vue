<template>
  <div class="AddGoods">
    <breadcrumb :home="'首页'" :tagArray="['商品管理', '添加商品']"/>
    <!-- 卡片视图 -->
    <el-card>
      <el-alert title="添加商品信息" type="info" center show-icon :closable="false"/>
      <steps/>
      <tabs/>
    </el-card>
  </div>
</template>

<script>
// imComponents
import Breadcrumb from 'components/content/Breadcrumb'
import Steps from './AddGoodsComps/Steps'
import Tabs from './AddGoodsComps/Tabs'

export default {
  name: 'AddGoods',
  components: {
    Breadcrumb,
    Steps,
    Tabs
  }
}
</script>

<style>

</style>