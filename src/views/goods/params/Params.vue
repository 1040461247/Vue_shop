<template>
  <div class="params">
    <breadcrumb :home="'首页'" :tagArray="['商品管理', '参数列表']"/>
    <el-card>
      <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning" show-icon :closable="false"/>
      <select-button/>
      <Tabs/>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from 'components/content/Breadcrumb'
import SelectButton from './childComps/SelectButton'
import Tabs from './childComps/Tabs'

export default {
  name: 'Params',
  components: {
    Breadcrumb,
    SelectButton,
    Tabs
  },
  data() {
    return {

    }
  }
}
</script>

<style scoped>

</style>