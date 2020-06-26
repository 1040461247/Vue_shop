<template>
  <steps :titleArray="stepsArray"/>
</template>

<script>
import Steps from 'components/common/Steps'

export default {
  name: 'AddSteps',
  components: {
    Steps
  },
  data() {
    return {
      stepsArray: ['基本信息', '商品参数', '商品属性', '商品图片', '商品内容', '完成',]
    }
  }
}
</script>

<style>

</style>