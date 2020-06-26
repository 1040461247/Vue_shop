<template>
  <tabs :tabsLabel="tabsLabel"/>
</template>

<script>
import Tabs from 'components/common/Tabs'

export default {
  name: 'AddTabs',
  components: {
    Tabs
  },
  data() {
    return {
      tabsLabel: ['基本信息', '商品参数', '商品属性', '商品图片', '商品内容',]
    }
  }
}
</script>

<style>

</style>