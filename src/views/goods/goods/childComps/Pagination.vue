<template>
  <pagination :background='true' :categoryData="goodsList" @handleChange="handleChange"/>
</template>

<script>
import Pagination from 'components/common/Pagination'

export default {
  name: 'GoodsPagination',
  components: {
    Pagination
  },
  props: {
    goodsList: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    handleChange(params) {
      this.$emit('pageHandleChange', params)
    }
  }
}
</script>

<style>

</style>