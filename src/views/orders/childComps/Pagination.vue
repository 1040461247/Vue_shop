<template>
  <pagination 
    :categoryData="categoryData" 
    @handleChange="handleChange"/>
</template>

<script>
import Pagination from 'components/common/Pagination'

export default {
  name: 'OrderPagination',
  components: {
    Pagination
  },
  props: {
    categoryData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    handleChange(newParams) {
      this.$emit('handleChange', newParams)
    }
  }
}
</script>

<style>

</style>